import React, { useEffect, useState } from 'react'
import { authFetch } from '@/Helper/helper'
import Link from 'next/link'
import { EnhancedCard, AnimatedButton, LoadingSkeleton, AnimatedSection, StatCard } from '@/components'
import toast from 'react-hot-toast'

const Applications = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState('renter')

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

  const getStatusBadge = (status) => {
    const map = {
      submitted: 'bg-primary',
      under_review: 'bg-info',
      approved: 'bg-success',
      rejected: 'bg-danger',
      withdrawn: 'bg-secondary',
    }
    return map[status] || 'bg-secondary'
  }

  const getStatusColor = (status) => {
    const map = {
      submitted: '#0d6efd',
      under_review: '#0dcaf0',
      approved: '#198754',
      rejected: '#dc3545',
      withdrawn: '#6c757d',
    }
    return map[status] || '#6c757d'
  }

  if (loading) {
    return (
      <section className="container py-5">
        <div className="text-center">
          <LoadingSkeleton lines={3} height={40} />
        </div>
      </section>
    )
  }

  const stats = {
    total: applications.length,
    submitted: applications.filter(a => a.status === 'submitted').length,
    approved: applications.filter(a => a.status === 'approved').length,
    pending: applications.filter(a => a.status === 'under_review').length,
  }

  return (
    <section className="container py-5 section-spacing">
      <AnimatedSection animation="fadeInUp" delay={100}>
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-gradient mb-3">My Applications</h1>
          <p className="lead text-muted">
            {role === 'landlord' ? 'Applications received for your properties' : 'Track your rental applications'}
          </p>
        </div>
      </AnimatedSection>

      {/* Stats Cards */}
      <AnimatedSection animation="fadeInUp" delay={200}>
        <div className="row g-4 mb-5">
          <div className="col-md-3">
            <StatCard 
              title="Total Applications" 
              value={stats.total}
              color="primary"
            />
          </div>
          <div className="col-md-3">
            <StatCard 
              title="Submitted" 
              value={stats.submitted}
              color="info"
            />
          </div>
          <div className="col-md-3">
            <StatCard 
              title="Under Review" 
              value={stats.pending}
              color="warning"
            />
          </div>
          <div className="col-md-3">
            <StatCard 
              title="Approved" 
              value={stats.approved}
              color="success"
            />
          </div>
        </div>
      </AnimatedSection>

      {applications.length === 0 ? (
        <AnimatedSection animation="fadeInUp" delay={300}>
          <div className="text-center py-5">
            <div className="mb-4">
              <div className="display-1 text-muted">📋</div>
            </div>
            <h4 className="text-muted">No applications yet</h4>
            {role === 'renter' && (
              <AnimatedButton 
                variant="primary" 
                className="mt-3"
                onClick={() => window.location.href = '/properties'}
              >
                Browse Properties
              </AnimatedButton>
            )}
          </div>
        </AnimatedSection>
      ) : (
        <AnimatedSection animation="fadeInUp" delay={300}>
          <div className="row g-4">
            {applications.map((app, index) => (
              <div key={app.id} className="col-lg-6">
                <EnhancedCard 
                  className="h-100 hover-lift"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="mb-0 fw-bold">{app.property?.title || 'Property'}</h5>
                    <span className={`badge badge-enhanced ${getStatusBadge(app.status)}`}>
                      {app.status?.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="row mb-3">
                    <div className="col-6">
                      <small className="text-muted fw-semibold">Move-in Date</small>
                      <p className="mb-0">{app.desired_move_in ? new Date(app.desired_move_in).toLocaleDateString() : '—'}</p>
                    </div>
                    <div className="col-6">
                      <small className="text-muted fw-semibold">Lease Duration</small>
                      <p className="mb-0">{app.desired_lease_duration?.replace('_', ' ')}</p>
                    </div>
                  </div>
                  
                  <div className="row mb-3">
                    <div className="col-6">
                      <small className="text-muted fw-semibold">{role === 'landlord' ? 'Renter' : 'Landlord'}</small>
                      <p className="mb-0">
                        {role === 'landlord'
                          ? `${app.renter?.first_name || ''} ${app.renter?.last_name || ''}`
                          : `${app.landlord?.first_name || ''} ${app.landlord?.last_name || ''}`}
                      </p>
                    </div>
                    <div className="col-6">
                      <small className="text-muted fw-semibold">Monthly Income</small>
                      <p className="mb-0 fw-bold text-success">${Number(app.monthly_income || 0).toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="progress-enhanced mb-3">
                    <div 
                      className="progress-bar-enhanced"
                      style={{ 
                        width: `${app.status === 'approved' ? 100 : app.status === 'under_review' ? 50 : 25}%`,
                        backgroundColor: getStatusColor(app.status)
                      }}
                    />
                  </div>
                  
                  <div className="d-flex gap-2">
                    <Link href={`/applications/${app.id}`} className="w-100">
                      <AnimatedButton variant="primary" className="w-100">
                        View Details
                      </AnimatedButton>
                    </Link>
                  </div>
                </EnhancedCard>
              </div>
            ))}
          </div>
        </AnimatedSection>
      )}
    </section>
  )
}

export default Applications
