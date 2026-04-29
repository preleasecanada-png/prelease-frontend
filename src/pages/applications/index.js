import React, { useEffect, useState, useMemo } from 'react'
import { authFetch } from '@/Helper/helper'
import { imageBaseUrl } from '@/Helper/helper'
import Link from 'next/link'
import toast from 'react-hot-toast'

const STATUS_TABS = [
  { key: 'all', label: 'All' },
  { key: 'submitted', label: 'New' },
  { key: 'under_review', label: 'Under Review' },
  { key: 'approved', label: 'Approved' },
  { key: 'rejected', label: 'Rejected' },
  { key: 'withdrawn', label: 'Withdrawn' },
]

const Applications = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState('renter')
  const [activeTab, setActiveTab] = useState('all')
  const [propertyFilter, setPropertyFilter] = useState('all')
  const [rejectId, setRejectId] = useState(null)
  const [rejectReason, setRejectReason] = useState('')
  const [actionLoading, setActionLoading] = useState(null)
  const [bgChecks, setBgChecks] = useState({})
  const [bgCheckModal, setBgCheckModal] = useState(null)
  const [bgCheckType, setBgCheckType] = useState('credit')

  const [apiDebug, setApiDebug] = useState(null)

  useEffect(() => {
    const userRole = localStorage.getItem('role')?.toLowerCase()
    if (userRole === 'host' || userRole === 'admin' || userRole === 'landlord') {
      setRole('landlord')
    } else {
      setRole('renter')
    }
    // Backend now determines role automatically, no need to pass role parameter
    fetchApplications()
    fetchBgChecks()
  }, [])

  const fetchBgChecks = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/background-checks`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data?.status === 200 && data.data) {
        const map = {}
        data.data.forEach(c => { map[c.rental_application_id] = c })
        setBgChecks(map)
      }
    } catch (err) { console.warn('bg checks fetch failed', err) }
  }

  const requestBgCheck = async (appId) => {
    setActionLoading('bg_' + appId)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/background-checks/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ rental_application_id: appId, check_type: bgCheckType }),
      })
      const data = await res.json()
      if (data?.status === 200) {
        toast.success('Background check requested!')
        setBgChecks(prev => ({ ...prev, [appId]: data.data }))
        setBgCheckModal(null)
      } else {
        toast.error(data?.message || 'Failed to request')
      }
    } catch (err) { toast.error('Request failed') }
    setActionLoading(null)
  }

  const handleBgConsent = async (checkId, action) => {
    setActionLoading('consent_' + checkId)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/background-checks/${checkId}/consent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ action }),
      })
      const data = await res.json()
      if (data?.status === 200) {
        toast.success(action === 'approve' ? 'Consent given. Check in progress.' : 'Check declined.')
        fetchBgChecks()
      } else {
        toast.error(data?.message || 'Failed')
      }
    } catch (err) { toast.error('Failed') }
    setActionLoading(null)
  }

  const fetchApplications = async (r) => {
    try {
      console.log('Fetching applications...');
      // Backend now determines role automatically based on user's database role
      const res = await authFetch(`/applications`)
      console.log('API Response:', res);
      setApiDebug(res);
      if (res?.status === 200) {
        const data = res?.data?.data || res?.data || []
        console.log('Setting applications:', data);
        setApplications(data)
      } else {
        console.error('Failed to fetch applications:', res);
      }
    } catch (err) {
      console.error('Error fetching applications:', err)
    }
    setLoading(false)
  }

  const handleQuickAction = async (appId, newStatus, reason) => {
    setActionLoading(appId)
    try {
      const token = localStorage.getItem('token')
      const body = { status: newStatus }
      if (reason) body.rejection_reason = reason
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/applications/${appId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (data?.status === 200) {
        toast.success(newStatus === 'approved' ? 'Application approved!' : newStatus === 'rejected' ? 'Application rejected' : 'Status updated!')
        setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: newStatus } : a))
        setRejectId(null)
        setRejectReason('')
      } else {
        toast.error(data?.message || 'Failed to update')
      }
    } catch (err) {
      toast.error('Something went wrong')
    }
    setActionLoading(null)
  }

  const properties = useMemo(() => {
    const map = {}
    applications.forEach(a => {
      if (a.property?.id) map[a.property.id] = a.property.title
    })
    return Object.entries(map)
  }, [applications])

  const filtered = useMemo(() => {
    let list = applications
    console.log('Filtering applications, total:', list.length, 'activeTab:', activeTab, 'propertyFilter:', propertyFilter);
    if (activeTab !== 'all') list = list.filter(a => a.status === activeTab)
    if (propertyFilter !== 'all') list = list.filter(a => String(a.property?.id) === propertyFilter)
    console.log('Filtered list size:', list.length);
    return list
  }, [applications, activeTab, propertyFilter])

  const stats = useMemo(() => ({
    total: applications.length,
    submitted: applications.filter(a => a.status === 'submitted').length,
    under_review: applications.filter(a => a.status === 'under_review').length,
    approved: applications.filter(a => a.status === 'approved').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
  }), [applications])

  const getStatusBadge = (status) => {
    const map = { submitted: '#0d6efd', under_review: '#0dcaf0', approved: '#198754', rejected: '#dc3545', withdrawn: '#6c757d' }
    return map[status] || '#6c757d'
  }

  const getRenterAvatar = (renter) => {
    if (renter?.picture && renter.picture.startsWith('http')) return renter.picture
    if (renter?.picture) return `${process.env.NEXT_PUBLIC_BASE_LOCAL_IMAGE_URL}/${renter.picture}`
    return `https://ui-avatars.com/api/?name=${encodeURIComponent((renter?.first_name || 'U') + ' ' + (renter?.last_name || ''))}&background=D80621&color=fff&size=80`
  }

  if (loading) {
    return (
      <section className="container py-5">
        <div className="text-center py-5">
          <div className="spinner-border text-danger" role="status" />
          <p className="mt-3 text-muted">Loading applications...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="container py-4">
      <div className="mb-4">
        <h1 className="fw-bold" style={{ fontSize: '28px' }}>
          {role === 'landlord' ? 'Applications Dashboard' : 'My Applications'}
        </h1>
        {apiDebug && (
          <div className="alert alert-info py-2" style={{ fontSize: '11px' }}>
            <strong>Debug Info:</strong> Status: {apiDebug.status} | 
            Count: {Array.isArray(apiDebug.data) ? apiDebug.data.length : 'N/A'} |
            HasDebug: {apiDebug.debug ? 'Yes' : 'No'}
          </div>
        )}
        <p className="text-muted mb-0">
          {role === 'landlord' ? 'Manage all applications received for your properties' : 'Track your rental applications'}
        </p>
      </div>

      {/* Stats Row */}
      <div className="row g-3 mb-4">
        {[
          { label: 'Total', value: stats.total, color: '#333', bg: '#f8f9fa' },
          { label: 'New', value: stats.submitted, color: '#0d6efd', bg: '#e7f1ff' },
          { label: 'Under Review', value: stats.under_review, color: '#0dcaf0', bg: '#e0f7fa' },
          { label: 'Approved', value: stats.approved, color: '#198754', bg: '#d1e7dd' },
          { label: 'Rejected', value: stats.rejected, color: '#dc3545', bg: '#f8d7da' },
        ].map((s, i) => (
          <div key={i} className="col">
            <div style={{ background: s.bg, borderRadius: '12px', padding: '16px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: '700', color: s.color }}>{s.value}</div>
              <div style={{ fontSize: '13px', color: '#666', fontWeight: '500' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="d-flex flex-wrap align-items-center gap-2 mb-4">
        <div className="app-status-tabs d-flex flex-wrap gap-1">
          {STATUS_TABS.map(tab => (
            <button
              key={tab.key}
              className={`app-tab-btn ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
              {tab.key !== 'all' && stats[tab.key] > 0 && (
                <span className="app-tab-count">{stats[tab.key]}</span>
              )}
            </button>
          ))}
        </div>
        {role === 'landlord' && properties.length > 1 && (
          <select
            className="form-select"
            style={{ width: 'auto', minWidth: '180px', fontSize: '14px', borderRadius: '10px' }}
            value={propertyFilter}
            onChange={(e) => setPropertyFilter(e.target.value)}
          >
            <option value="all">All Properties</option>
            {properties.map(([id, title]) => (
              <option key={id} value={id}>{title}</option>
            ))}
          </select>
        )}
      </div>

      {/* Applications List */}
      {filtered.length === 0 ? (
        <div className="text-center py-5">
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
          <h4 className="text-muted">No applications found</h4>
          {role === 'renter' && (
            <Link href="/find-home" className="btn mt-3" style={{ background: '#D80621', color: '#fff', borderRadius: '10px', padding: '10px 24px' }}>
              Browse Properties
            </Link>
          )}
        </div>
      ) : (
        <div className="row g-3">
          {filtered.map((app) => (
            <div key={app.id} className="col-12">
              <div className="app-card">
                {/* Property thumbnail */}
                <div className="app-card-thumb">
                  {app.property?.property_images?.[0]?.original ? (
                    <img src={imageBaseUrl(app.property.property_images[0].original)} alt="" />
                  ) : (
                    <div className="app-card-thumb-placeholder">🏠</div>
                  )}
                </div>

                {/* Main info */}
                <div className="app-card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h6 className="fw-bold mb-1">{app.property?.title || 'Property'}</h6>
                      <span className="text-muted" style={{ fontSize: '13px' }}>
                        {app.property?.city}{app.property?.state ? `, ${app.property.state}` : ''}
                      </span>
                    </div>
                    <span className="app-status-badge" style={{ background: getStatusBadge(app.status) + '20', color: getStatusBadge(app.status), borderColor: getStatusBadge(app.status) }}>
                      {app.status?.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Renter profile row (landlord view) */}
                  {role === 'landlord' && (
                    <div className="app-renter-row">
                      <img src={getRenterAvatar(app.renter)} alt="" className="app-renter-avatar" />
                      <div className="app-renter-info">
                        <strong>{app.renter?.first_name || ''} {app.renter?.last_name || ''}</strong>
                        <div className="app-renter-details">
                          <span>💰 ${Number(app.monthly_income || 0).toLocaleString()}/mo</span>
                          <span>💼 {app.employment_status || '—'}</span>
                          <span>👥 {app.number_of_occupants || 1} occupant{app.number_of_occupants > 1 ? 's' : ''}</span>
                          {app.has_pets && <span>🐾 Pets</span>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Renter view info */}
                  {role !== 'landlord' && (
                    <div className="app-renter-details" style={{ marginTop: '4px' }}>
                      <span>📅 {app.desired_move_in ? new Date(app.desired_move_in).toLocaleDateString() : '—'}</span>
                      <span>📋 {app.desired_lease_duration?.replace('_', ' ')}</span>
                      <span>💰 ${Number(app.monthly_income || 0).toLocaleString()}/mo</span>
                    </div>
                  )}

                  {/* Meta row */}
                  {role === 'landlord' && (
                    <div className="app-meta-row">
                      <span>📅 Move-in: {app.desired_move_in ? new Date(app.desired_move_in).toLocaleDateString() : '—'}</span>
                      <span>📋 {app.desired_lease_duration?.replace('_', ' ')}</span>
                      <span>📄 {app.documents?.length || 0} doc{(app.documents?.length || 0) !== 1 ? 's' : ''}</span>
                      {app.cover_letter && <span>✉️ Cover letter</span>}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="app-card-actions">
                  <Link href={`/applications/${app.id}`}>
                    <button className="app-action-btn app-action-view">View</button>
                  </Link>
                  {role === 'landlord' && (app.status === 'submitted' || app.status === 'under_review') && (
                    <>
                      <button
                        className="app-action-btn app-action-approve"
                        disabled={actionLoading === app.id}
                        onClick={() => handleQuickAction(app.id, 'approved')}
                      >
                        {actionLoading === app.id ? '...' : '✓ Approve'}
                      </button>
                      <button
                        className="app-action-btn app-action-reject"
                        disabled={actionLoading === app.id}
                        onClick={() => setRejectId(app.id)}
                      >
                        ✗ Reject
                      </button>
                    </>
                  )}
                  {role === 'landlord' && app.status === 'submitted' && (
                    <button
                      className="app-action-btn app-action-review"
                      disabled={actionLoading === app.id}
                      onClick={() => handleQuickAction(app.id, 'under_review')}
                    >
                      🔍 Review
                    </button>
                  )}
                  {role === 'landlord' && !bgChecks[app.id] && (app.status === 'submitted' || app.status === 'under_review') && (
                    <button className="app-action-btn" style={{ background: '#f0f9ff', color: '#0284c7', border: '1px solid #bae6fd', fontSize: '12px' }} onClick={() => setBgCheckModal(app.id)}>
                      🔍 Background Check
                    </button>
                  )}
                  {bgChecks[app.id] && <BgCheckBadge check={bgChecks[app.id]} role={role} onConsent={handleBgConsent} loading={actionLoading} />}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Background Check Modal */}
      {bgCheckModal && (
        <div className="app-modal-overlay" onClick={() => setBgCheckModal(null)}>
          <div className="app-modal" onClick={e => e.stopPropagation()}>
            <h5 className="fw-bold mb-3">Request Background Check</h5>
            <p className="text-muted" style={{ fontSize: '14px' }}>Select the type of verification to request. The tenant will be asked for consent before the check is processed.</p>
            <div className="d-flex flex-column gap-2 mb-3">
              {[{ k: 'credit', l: 'Credit Check', d: 'Verify credit score and financial history', p: '$25' }, { k: 'criminal', l: 'Criminal Background', d: 'Check Canadian police databases', p: '$25' }, { k: 'both', l: 'Both Checks', d: 'Credit + Criminal background', p: '$45' }].map(opt => (
                <label key={opt.k} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', border: bgCheckType === opt.k ? '2px solid #D80621' : '1px solid #e5e7eb', borderRadius: '10px', cursor: 'pointer', background: bgCheckType === opt.k ? '#fef2f2' : '#fff' }}>
                  <input type="radio" name="bgtype" checked={bgCheckType === opt.k} onChange={() => setBgCheckType(opt.k)} style={{ accentColor: '#D80621' }} />
                  <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: '14px' }}>{opt.l}</div><div style={{ fontSize: '12px', color: '#666' }}>{opt.d}</div></div>
                  <span style={{ fontWeight: 700, color: '#D80621' }}>{opt.p}</span>
                </label>
              ))}
            </div>
            <p style={{ fontSize: '12px', color: '#999', marginBottom: '12px' }}>The tenant will receive a notification and must provide explicit consent before the check is initiated.</p>
            <div className="d-flex gap-2 justify-content-end">
              <button className="btn btn-outline-secondary" style={{ borderRadius: '10px' }} onClick={() => setBgCheckModal(null)}>Cancel</button>
              <button className="btn text-white" style={{ background: '#D80621', borderRadius: '10px' }} disabled={actionLoading} onClick={() => requestBgCheck(bgCheckModal)}>Request Check</button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {rejectId && (
        <div className="app-modal-overlay" onClick={() => { setRejectId(null); setRejectReason('') }}>
          <div className="app-modal" onClick={e => e.stopPropagation()}>
            <h5 className="fw-bold mb-3">Reject Application</h5>
            <p className="text-muted" style={{ fontSize: '14px' }}>Please provide a reason for rejecting this application. The renter will be notified.</p>
            <textarea
              className="form-control mb-3"
              rows="3"
              placeholder="Reason for rejection..."
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
              style={{ borderRadius: '10px' }}
            />
            <div className="d-flex gap-2 justify-content-end">
              <button className="btn btn-outline-secondary" style={{ borderRadius: '10px' }} onClick={() => { setRejectId(null); setRejectReason('') }}>Cancel</button>
              <button
                className="btn text-white"
                style={{ background: '#dc3545', borderRadius: '10px' }}
                disabled={!rejectReason.trim() || actionLoading}
                onClick={() => handleQuickAction(rejectId, 'rejected', rejectReason)}
              >
                Reject Application
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

const BgCheckBadge = ({ check, role, onConsent, loading }) => {
  const s = check.status
  if (s === 'pending_consent' && role === 'renter') {
    return (
      <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', padding: '8px 10px', fontSize: '12px', marginTop: '4px' }}>
        <div style={{ fontWeight: 700, marginBottom: '4px' }}>🔒 Background Check Requested</div>
        <div style={{ color: '#666', marginBottom: '6px' }}>Type: {check.check_type} | Fee: ${check.fee_amount} (paid by {check.fee_paid_by})</div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button className="app-action-btn app-action-approve" style={{ fontSize: '11px', padding: '4px 10px' }} disabled={loading} onClick={() => onConsent(check.id, 'approve')}>Give Consent</button>
          <button className="app-action-btn app-action-reject" style={{ fontSize: '11px', padding: '4px 10px' }} disabled={loading} onClick={() => onConsent(check.id, 'decline')}>Decline</button>
        </div>
      </div>
    )
  }
  if (s === 'pending_consent') return <span className="bg-check-badge bg-check-pending">⏳ Awaiting Consent</span>
  if (s === 'in_progress') return <span className="bg-check-badge bg-check-progress">⏳ Check In Progress</span>
  if (s === 'declined') return <span className="bg-check-badge bg-check-declined">❌ Check Declined</span>
  if (s === 'completed') {
    const ratingColor = { excellent: '#059669', good: '#0284c7', fair: '#d97706', poor: '#dc2626' }
    return (
      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '8px 10px', fontSize: '12px', marginTop: '4px' }}>
        <div style={{ fontWeight: 700, marginBottom: '2px' }}>✅ Background Check Complete</div>
        {check.credit_score && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
            <span>Credit: <strong style={{ color: ratingColor[check.credit_rating] || '#333' }}>{check.credit_score}</strong></span>
            <span style={{ background: (ratingColor[check.credit_rating] || '#333') + '20', color: ratingColor[check.credit_rating] || '#333', padding: '1px 8px', borderRadius: '10px', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase' }}>{check.credit_rating}</span>
          </div>
        )}
        {check.criminal_result && <div>Criminal: <strong style={{ color: check.criminal_result === 'clear' ? '#059669' : '#dc2626' }}>{check.criminal_result === 'clear' ? 'Clear' : 'Flagged'}</strong></div>}
      </div>
    )
  }
  return null
}

export default Applications
