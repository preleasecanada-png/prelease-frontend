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

  useEffect(() => {
    const userRole = localStorage.getItem('role')
    if (userRole === 'host') setRole('landlord')
    fetchApplications(userRole === 'host' ? 'landlord' : 'renter')
  }, [])

  const fetchApplications = async (r) => {
    try {
      const res = await authFetch(`/applications?role=${r}`)
      if (res?.status === 200) {
        setApplications(res?.data?.data || res?.data || [])
      }
    } catch (err) {
      console.error(err)
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
    if (activeTab !== 'all') list = list.filter(a => a.status === activeTab)
    if (propertyFilter !== 'all') list = list.filter(a => String(a.property?.id) === propertyFilter)
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
                </div>
              </div>
            </div>
          ))}
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

export default Applications
