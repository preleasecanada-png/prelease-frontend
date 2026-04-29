import React, { useEffect, useState } from 'react'
import { authFetch } from '@/Helper/helper'
import Link from 'next/link'
import { EnhancedCard, AnimatedButton, LoadingSkeleton, AnimatedSection } from '@/components'

const Leases = () => {
  const [leases, setLeases] = useState([])
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState('renter')

  useEffect(() => {
    const userRole = localStorage.getItem('role')
    const r = userRole === 'host' ? 'landlord' : 'renter'
    setRole(r)
    fetchLeases(r)
  }, [])

  const fetchLeases = async (r) => {
    try {
      const res = await authFetch(`/leases?role=${r}`)
      if (res?.status === 200) {
        setLeases(res?.data?.data || res?.data || [])
      }
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const statusColor = (s) => {
    const map = { active: 'success', pending_renter_signature: 'warning', pending_landlord_signature: 'info', completed: 'secondary', terminated: 'danger' }
    return map[s] || 'secondary'
  }

  if (loading) {
    return (
      <section className="container py-5">
        <LoadingSkeleton lines={4} height={40} />
      </section>
    )
  }

  return (
    <section className="container py-5 section-spacing">
      <AnimatedSection animation="fadeInUp" delay={100}>
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-gradient mb-3">Lease Agreements</h1>
          <p className="lead text-muted">{role === 'landlord' ? 'Leases for your properties' : 'Your active and past leases'}</p>
        </div>
      </AnimatedSection>

      {leases.length === 0 ? (
        <AnimatedSection animation="fadeInUp" delay={300}>
          <EnhancedCard className="p-5 text-center">
            <div className="display-1 mb-3" style={{ opacity: 0.2 }}>📄</div>
            <h4 className="text-muted">No lease agreements yet</h4>
            <p className="text-muted">Your lease agreements will appear here once created.</p>
          </EnhancedCard>
        </AnimatedSection>
      ) : (
        <div className="row g-4">
          {leases.map((lease, index) => (
            <div key={lease.id} className="col-lg-6">
              <AnimatedSection animation="fadeInUp" delay={300 + index * 100}>
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
