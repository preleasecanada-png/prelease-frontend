import React, { useEffect, useState, useMemo } from 'react'
import { authFetch } from '@/Helper/helper'
import Link from 'next/link'
import { EnhancedCard, AnimatedButton, LoadingSkeleton, AnimatedSection } from '@/components'

const STATUS_TABS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'pending_renter_signature', label: 'Renter Signature' },
  { key: 'pending_landlord_signature', label: 'Landlord Signature' },
  { key: 'terminated', label: 'Terminated' },
]

const Leases = () => {
  const [leases, setLeases] = useState([])
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState('renter')
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    const userRole = localStorage.getItem('role')
    const r = userRole === 'host' ? 'landlord' : 'renter'
    setRole(r)
    fetchLeases(r)
  }, [])

  const fetchLeases = async (r) => {
    try {
      const res = await authFetch(`/leases`)
      if (res?.status === 200) {
        setLeases(res?.data?.data || res?.data || [])
      }
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const filtered = useMemo(() => {
    let list = leases
    if (activeTab !== 'all') list = list.filter(l => l.status === activeTab)
    return list
  }, [leases, activeTab])

  const stats = useMemo(() => ({
    total: leases.length,
    active: leases.filter(l => l.status === 'active').length,
    pending_renter_signature: leases.filter(l => l.status === 'pending_renter_signature').length,
    pending_landlord_signature: leases.filter(l => l.status === 'pending_landlord_signature').length,
    terminated: leases.filter(l => l.status === 'terminated').length,
  }), [leases])

  const statusColor = (s) => {
    const map = { active: 'success', pending_renter_signature: 'warning', pending_landlord_signature: 'info', completed: 'secondary', terminated: 'danger' }
    return map[s] || 'secondary'
  }

  if (loading) {
    return (
      <section className="container py-5">
        <div className="text-center py-5">
          <div className="spinner-border text-danger" role="status" />
          <p className="mt-3 text-muted">Loading leases...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="container py-4">
      <div className="mb-4">
        <h1 className="fw-bold" style={{ fontSize: '28px' }}>
          {role === 'landlord' ? 'Lease Management' : 'My Lease Agreements'}
        </h1>
        <p className="text-muted mb-0">
          {role === 'landlord' ? 'Manage and track all lease agreements for your properties' : 'View and manage your rental agreements'}
        </p>
      </div>

      {/* Stats Row */}
      <div className="row g-3 mb-4">
        {[
          { label: 'Total', value: stats.total, color: '#333', bg: '#f8f9fa' },
          { label: 'Active', value: stats.active, color: '#198754', bg: '#d1e7dd' },
          { label: 'Pending', value: stats.pending_renter_signature + stats.pending_landlord_signature, color: '#ffc107', bg: '#fff3cd' },
          { label: 'Terminated', value: stats.terminated, color: '#dc3545', bg: '#f8d7da' },
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
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-5">
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📄</div>
          <h4 className="text-muted">No lease agreements found</h4>
        </div>
      ) : (
        <div className="row g-4">
          {filtered.map((lease, index) => (
            <div key={lease.id} className="col-lg-6">
              <AnimatedSection animation="fadeInUp" delay={100 + index * 100}>
                <EnhancedCard className="h-100 p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="mb-0 fw-bold">{lease.property?.title || 'Property'}</h5>
                    <span className={`badge-enhanced badge-${statusColor(lease.status)}`}>
                      {lease.status?.replace(/_/g, ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <small className="text-muted d-block mb-1">Lease Type</small>
                      <p className="mb-0 fw-semibold">{lease.lease_type?.replace('_', ' ')}</p>
                    </div>
                    <div className="col-6">
                      <small className="text-muted d-block mb-1">Monthly Rent</small>
                      <p className="mb-0 fw-semibold text-gradient">${Number(lease.monthly_rent || 0).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <small className="text-muted d-block mb-1">Start Date</small>
                      <p className="mb-0">{lease.start_date ? new Date(lease.start_date).toLocaleDateString() : '—'}</p>
                    </div>
                    <div className="col-6">
                      <small className="text-muted d-block mb-1">End Date</small>
                      <p className="mb-0">{lease.end_date ? new Date(lease.end_date).toLocaleDateString() : '—'}</p>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <small className="text-muted d-block mb-1">Total Payable</small>
                      <p className="mb-0 fw-bold fs-5">${Number(lease.total_payable || 0).toLocaleString()}</p>
                    </div>
                  </div>
                  <Link href={`/leases/${lease.id}`}>
                    <AnimatedButton variant="outline" size="small">
                      View Details
                    </AnimatedButton>
                  </Link>
                </EnhancedCard>
              </AnimatedSection>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Leases
