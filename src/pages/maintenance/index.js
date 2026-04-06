import React, { useEffect, useState, useRef } from 'react'
import { authFetch, imageBaseUrl } from '@/Helper/helper'
import toast from 'react-hot-toast'
import Link from 'next/link'

const STATUS_STEPS = ['pending', 'in_progress', 'completed']

const Maintenance = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [role, setRole] = useState('')
  const [leases, setLeases] = useState([])
  const [statusFilter, setStatusFilter] = useState('all')
  const [photos, setPhotos] = useState([])
  const [previews, setPreviews] = useState([])
  const [lightbox, setLightbox] = useState({ open: false, src: '' })
  const fileRef = useRef(null)
  const [form, setForm] = useState({
    property_id: '',
    landlord_id: '',
    lease_id: '',
    title: '',
    description: '',
    category: 'general',
    priority: 'medium',
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const r = localStorage.getItem('role')
    setRole(r || '')
    fetchRequests()
    if (r !== 'host') fetchLeases()
  }, [])

  const fetchRequests = async () => {
    try {
      const data = await authFetch('/maintenance')
      if (data?.status === 200) {
        setRequests(data.data?.data || [])
      }
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const fetchLeases = async () => {
    try {
      const data = await authFetch('/leases')
      if (data?.status === 200) {
        setLeases(data.data || [])
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleLeaseSelect = (e) => {
    const lease = leases.find(l => l.id === parseInt(e.target.value))
    if (lease) {
      setForm(prev => ({
        ...prev,
        lease_id: lease.id,
        property_id: lease.property_id,
        landlord_id: lease.landlord_id,
      }))
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files)
    if (photos.length + files.length > 5) {
      toast.error('Maximum 5 photos allowed')
      return
    }
    setPhotos(prev => [...prev, ...files])
    const newPreviews = files.map(f => URL.createObjectURL(f))
    setPreviews(prev => [...prev, ...newPreviews])
  }

  const removePhoto = (idx) => {
    setPhotos(prev => prev.filter((_, i) => i !== idx))
    setPreviews(prev => {
      URL.revokeObjectURL(prev[idx])
      return prev.filter((_, i) => i !== idx)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.property_id || !form.landlord_id) {
      toast.error('Please select a lease first')
      return
    }
    setSubmitting(true)
    try {
      const token = localStorage.getItem('token')
      const formData = new FormData()
      Object.entries(form).forEach(([k, v]) => { if (v) formData.append(k, v) })
      photos.forEach(p => formData.append('photos[]', p))

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/maintenance`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })
      const data = await res.json()
      if (data?.status === 200) {
        toast.success('Maintenance request submitted!')
        setShowForm(false)
        setForm({ property_id: '', landlord_id: '', lease_id: '', title: '', description: '', category: 'general', priority: 'medium' })
        setPhotos([])
        setPreviews([])
        fetchRequests()
      } else if (data?.errors) {
        toast.error(Object.values(data.errors)[0][0])
      } else {
        toast.error(data?.message || 'Failed to submit')
      }
    } catch (err) {
      toast.error('Something went wrong')
    }
    setSubmitting(false)
  }

  const updateStatus = async (id, status, response) => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/maintenance/${id}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status, landlord_response: response }),
      })
      const data = await res.json()
      if (data?.status === 200) {
        toast.success('Status updated!')
        fetchRequests()
      }
    } catch (err) {
      toast.error('Failed to update')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#D97706'
      case 'in_progress': return '#2563EB'
      case 'completed': return '#059669'
      case 'cancelled': return '#6B7280'
      default: return '#D80621'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low': return '#059669'
      case 'medium': return '#D97706'
      case 'high': return '#DC2626'
      case 'urgent': return '#7C2D12'
      default: return '#6B7280'
    }
  }

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'plumbing': return '🔧'
      case 'electrical': return '⚡'
      case 'appliance': return '🏠'
      case 'structural': return '🏗️'
      case 'pest': return '🐛'
      default: return '📋'
    }
  }

  const filteredRequests = statusFilter === 'all' ? requests : requests.filter(r => r.status === statusFilter)
  const counts = { all: requests.length, pending: requests.filter(r => r.status === 'pending').length, in_progress: requests.filter(r => r.status === 'in_progress').length, completed: requests.filter(r => r.status === 'completed').length }

  if (loading) {
    return (
      <section className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 style={{ fontSize: '28px', fontWeight: '700' }}>Maintenance Requests</h1>
            {role !== 'host' && (
              <button
                onClick={() => setShowForm(!showForm)}
                style={{ backgroundColor: '#D80621', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
              >
                {showForm ? 'Cancel' : '+ New Request'}
              </button>
            )}
          </div>

          {/* Status Filter Tabs */}
          <div className="maint-tabs">
            {[
              { key: 'all', label: 'All' },
              { key: 'pending', label: 'Pending' },
              { key: 'in_progress', label: 'In Progress' },
              { key: 'completed', label: 'Completed' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setStatusFilter(tab.key)}
                className={`maint-tab ${statusFilter === tab.key ? 'maint-tab-active' : ''}`}
              >
                {tab.label}
                <span className="maint-tab-count">{counts[tab.key] || 0}</span>
              </button>
            ))}
          </div>

          {showForm && (
            <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', marginBottom: '24px', backgroundColor: '#FAFAFA' }}>
              <h5 style={{ marginBottom: '16px', fontWeight: '600' }}>Submit Maintenance Request</h5>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label fw-semibold">Select Lease *</label>
                    <select className="form-select" onChange={handleLeaseSelect} required>
                      <option value="">Choose your active lease...</option>
                      {leases.filter(l => l.status === 'active').map(l => (
                        <option key={l.id} value={l.id}>
                          {l.property?.title || `Property #${l.property_id}`} - Lease #{l.id}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Title *</label>
                    <input className="form-control" name="title" value={form.title} onChange={handleChange} placeholder="Brief description of the issue" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Category *</label>
                    <select className="form-select" name="category" value={form.category} onChange={handleChange} required>
                      <option value="general">General</option>
                      <option value="plumbing">Plumbing</option>
                      <option value="electrical">Electrical</option>
                      <option value="appliance">Appliance</option>
                      <option value="structural">Structural</option>
                      <option value="pest">Pest Control</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Priority *</label>
                    <select className="form-select" name="priority" value={form.priority} onChange={handleChange} required>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Description *</label>
                    <textarea className="form-control" name="description" value={form.description} onChange={handleChange} rows="4" placeholder="Describe the issue in detail..." required />
                  </div>

                  {/* Photo Upload */}
                  <div className="col-12">
                    <label className="form-label fw-semibold">Photos <span style={{ fontWeight: 400, color: '#999' }}>(up to 5, optional)</span></label>
                    <div className="maint-photo-upload-area">
                      {previews.map((src, i) => (
                        <div key={i} className="maint-photo-thumb">
                          <img src={src} alt={`preview ${i}`} />
                          <button type="button" className="maint-photo-remove" onClick={() => removePhoto(i)}>×</button>
                        </div>
                      ))}
                      {photos.length < 5 && (
                        <button type="button" className="maint-photo-add" onClick={() => fileRef.current?.click()}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                          <span>Add Photo</span>
                        </button>
                      )}
                      <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={handlePhotoChange} />
                    </div>
                  </div>

                  <div className="col-12">
                    <button type="submit" disabled={submitting} style={{ backgroundColor: '#D80621', color: '#fff', border: 'none', padding: '12px 32px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
                      {submitting ? 'Submitting...' : 'Submit Request'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {filteredRequests.length === 0 ? (
            <div className="text-center py-5">
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔧</div>
              <h5 className="text-muted">No maintenance requests</h5>
              <p className="text-muted">
                {role === 'host' ? 'No tenants have submitted maintenance requests yet' : 'Submit a request when you need something fixed'}
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredRequests.map(req => (
                <div key={req.id} className="maint-card">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div className="d-flex align-items-center gap-2">
                      <span style={{ fontSize: '24px' }}>{getCategoryIcon(req.category)}</span>
                      <div>
                        <h6 style={{ margin: 0, fontWeight: '600', fontSize: '16px' }}>{req.title}</h6>
                        <span style={{ fontSize: '13px', color: '#6B7280' }}>
                          {req.property?.title || `Property #${req.property_id}`}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <span style={{ fontSize: '12px', padding: '4px 10px', borderRadius: '20px', color: '#fff', backgroundColor: getPriorityColor(req.priority), fontWeight: '600' }}>
                        {req.priority}
                      </span>
                      <span style={{ fontSize: '12px', padding: '4px 10px', borderRadius: '20px', color: '#fff', backgroundColor: getStatusColor(req.status), fontWeight: '600' }}>
                        {req.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  <p style={{ color: '#6B7280', fontSize: '14px', margin: '8px 0' }}>{req.description}</p>

                  {/* Photos Gallery */}
                  {req.photos && req.photos.length > 0 && (
                    <div className="maint-photo-gallery">
                      {req.photos.map((photo, i) => (
                        <div key={i} className="maint-photo-thumb maint-photo-view" onClick={() => setLightbox({ open: true, src: imageBaseUrl(photo) })}>
                          <img src={imageBaseUrl(photo)} alt={`issue photo ${i + 1}`} />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Status Timeline */}
                  <div className="maint-timeline">
                    {STATUS_STEPS.map((step, i) => {
                      const currentIdx = req.status === 'cancelled' ? -1 : STATUS_STEPS.indexOf(req.status)
                      const isActive = i <= currentIdx
                      const isCurrent = i === currentIdx
                      return (
                        <div key={step} className="maint-timeline-step">
                          <div className={`maint-timeline-dot ${isActive ? 'maint-dot-active' : ''} ${isCurrent ? 'maint-dot-current' : ''}`}>
                            {isActive && i < currentIdx && (
                              <svg width="10" height="10" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
                            )}
                          </div>
                          {i < STATUS_STEPS.length - 1 && <div className={`maint-timeline-line ${i < currentIdx ? 'maint-line-active' : ''}`} />}
                          <span className={`maint-timeline-label ${isActive ? 'maint-label-active' : ''}`}>{step.replace('_', ' ')}</span>
                        </div>
                      )
                    })}
                    {req.status === 'cancelled' && (
                      <div className="maint-timeline-step">
                        <div className="maint-timeline-dot" style={{ background: '#6B7280' }} />
                        <span className="maint-timeline-label" style={{ color: '#6B7280' }}>cancelled</span>
                      </div>
                    )}
                  </div>

                  {req.landlord_response && (
                    <div style={{ backgroundColor: '#F0FDF4', padding: '12px', borderRadius: '8px', marginTop: '8px' }}>
                      <strong style={{ fontSize: '13px', color: '#059669' }}>Landlord Response:</strong>
                      <p style={{ margin: '4px 0 0', fontSize: '14px' }}>{req.landlord_response}</p>
                    </div>
                  )}

                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span style={{ fontSize: '12px', color: '#9CA3AF' }}>
                      {role === 'host' ? `Tenant: ${req.tenant?.first_name || 'N/A'} ${req.tenant?.last_name || ''}` : `Submitted: ${new Date(req.created_at).toLocaleDateString()}`}
                      {req.resolved_at && ` | Resolved: ${new Date(req.resolved_at).toLocaleDateString()}`}
                    </span>
                    {role === 'host' && req.status !== 'completed' && req.status !== 'cancelled' && (
                      <div className="d-flex gap-2">
                        {req.status === 'pending' && (
                          <button onClick={() => updateStatus(req.id, 'in_progress', 'We are looking into this.')} className="maint-action-btn maint-action-progress">
                            Start Work
                          </button>
                        )}
                        <button onClick={() => { const r = prompt('Response to tenant (optional):'); updateStatus(req.id, 'completed', r || 'Issue has been resolved.'); }} className="maint-action-btn maint-action-complete">
                          Mark Completed
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox.open && (
        <div className="maint-lightbox" onClick={() => setLightbox({ open: false, src: '' })}>
          <button className="maint-lightbox-close" onClick={() => setLightbox({ open: false, src: '' })}>×</button>
          <img src={lightbox.src} alt="Full size" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </section>
  )
}

export default Maintenance
