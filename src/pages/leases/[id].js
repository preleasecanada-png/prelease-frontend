import React, { useEffect, useState } from 'react'
import { authFetch } from '@/Helper/helper'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import Link from 'next/link'

const LeaseDetail = () => {
  const router = useRouter()
  const { id } = router.query
  const [lease, setLease] = useState(null)
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState('renter')

  useEffect(() => {
    const userRole = localStorage.getItem('role')
    if (userRole === 'host') setRole('landlord')
  }, [])

  useEffect(() => {
    if (id) fetchLease()
  }, [id])

  const fetchLease = async () => {
    try {
      const res = await authFetch(`/leases/${id}`)
      if (res?.status === 200) setLease(res.data)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const handleSign = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/leases/${id}/sign`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data?.status === 200) {
        toast.success('Lease signed successfully!')
        fetchLease()
      } else {
        toast.error(data?.message || 'Failed to sign')
      }
    } catch (err) {
      toast.error('Something went wrong')
    }
  }

  const handleTerminate = async () => {
    if (!confirm('Are you sure you want to terminate this lease?')) return
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/leases/${id}/terminate`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data?.status === 200) {
        toast.success('Lease terminated')
        fetchLease()
      } else {
        toast.error(data?.message || 'Failed to terminate')
      }
    } catch (err) {
      toast.error('Something went wrong')
    }
  }

  if (loading) return <section className="container py-5 text-center"><div className="spinner-border text-danger" /></section>
  if (!lease) return <section className="container py-5 text-center"><h4 className="text-muted">Lease not found</h4></section>

  const canSign = (role === 'renter' && lease.status === 'pending_renter_signature') ||
                  (role === 'landlord' && lease.status === 'pending_landlord_signature')

  const sigSteps = [
    { label: 'Lease Created', done: true, date: lease.created_at },
    { label: 'Tenant Signature', done: !!lease.renter_signed_at, date: lease.renter_signed_at, waiting: lease.status === 'pending_renter_signature' },
    { label: 'Landlord Signature', done: !!lease.landlord_signed_at, date: lease.landlord_signed_at, waiting: lease.status === 'pending_landlord_signature' },
    { label: 'Lease Active', done: lease.status === 'active' || lease.status === 'terminated' },
  ]

  return (
    <section className="container py-5">
      <button className="btn btn-outline-dark mb-4" onClick={() => router.back()}>← Back</button>

      {/* Signature Timeline */}
      <div className="lease-sig-timeline">
        {sigSteps.map((step, i) => (
          <div key={i} className={`lease-sig-step ${step.done ? 'lease-sig-done' : ''} ${step.waiting ? 'lease-sig-waiting' : ''}`}>
            <div className="lease-sig-dot">{step.done ? '✓' : step.waiting ? '⏳' : (i + 1)}</div>
            <div className="lease-sig-info">
              <span className="lease-sig-label">{step.label}</span>
              {step.date && <span className="lease-sig-date">{new Date(step.date).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>}
              {step.waiting && <span className="lease-sig-date" style={{ color: '#f59e0b' }}>Awaiting signature...</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col-lg-8">
          {/* Summary Card */}
          <div className="lease-card">
            <div className="lease-card-header">
              <div>
                <h4 style={{ margin: 0, fontWeight: 700 }}>{lease.property?.title || 'Lease Agreement'}</h4>
                <span style={{ fontSize: '13px', color: '#64748b' }}>{lease.lease_type?.replace('_', ' ')} lease</span>
              </div>
              <span className={`lease-status-badge lease-status-${lease.status}`}>
                {lease.status?.replace(/_/g, ' ')}
              </span>
            </div>
            <div className="lease-card-body">
              <div className="lease-info-grid">
                <div><span className="lease-info-label">Tenant</span><span className="lease-info-val">{lease.renter?.first_name} {lease.renter?.last_name}</span></div>
                <div><span className="lease-info-label">Landlord</span><span className="lease-info-val">{lease.landlord?.first_name} {lease.landlord?.last_name}</span></div>
                <div><span className="lease-info-label">Start Date</span><span className="lease-info-val">{new Date(lease.start_date).toLocaleDateString()}</span></div>
                <div><span className="lease-info-label">End Date</span><span className="lease-info-val">{new Date(lease.end_date).toLocaleDateString()}</span></div>
                <div><span className="lease-info-label">Monthly Rent</span><span className="lease-info-val" style={{ color: '#D80621', fontWeight: 700 }}>${Number(lease.monthly_rent).toLocaleString()}</span></div>
                <div><span className="lease-info-label">Total Payable</span><span className="lease-info-val" style={{ fontWeight: 700 }}>${Number(lease.total_payable).toLocaleString()}</span></div>
              </div>
            </div>
          </div>

          {/* Lease Document */}
          {lease.terms && (
            <div className="lease-card">
              <div className="lease-card-header">
                <h5 style={{ margin: 0, fontWeight: 700 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D80621" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: '-3px' }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  Lease Document
                </h5>
              </div>
              <div className="lease-card-body">
                <pre className="lease-document">{lease.terms}</pre>
              </div>
            </div>
          )}
        </div>

        <div className="col-lg-4">
          {/* Sign Action */}
          {canSign && (
            <div className="lease-card" style={{ borderColor: '#059669' }}>
              <div className="lease-card-body" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '40px', marginBottom: '8px' }}>✍️</div>
                <h5 style={{ fontWeight: 700, marginBottom: '8px' }}>Sign This Lease</h5>
                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
                  By signing electronically, you agree to all terms outlined in this lease agreement. This constitutes a legally binding signature.
                </p>
                <button className="btn w-100" onClick={handleSign}
                  style={{ background: '#059669', color: '#fff', fontWeight: 700, padding: '12px', borderRadius: '8px', border: 'none', fontSize: '15px' }}>
                  Sign Lease Agreement
                </button>
              </div>
            </div>
          )}

          {/* Payment & Actions */}
          <div className="lease-card">
            <div className="lease-card-body">
              <h6 style={{ fontWeight: 700, marginBottom: '12px' }}>Payment Breakdown</h6>
              <div className="lease-pay-row"><span>Rent ({lease.lease_type === '3_month' ? '3' : '6'} mo)</span><span>${Number(lease.total_rent).toLocaleString()}</span></div>
              <div className="lease-pay-row"><span>Support Fee</span><span>${Number(lease.support_fee).toLocaleString()}</span></div>
              <div className="lease-pay-row"><span>Commission (5%)</span><span>${Number(lease.commission_fee).toLocaleString()}</span></div>
              <div className="lease-pay-row"><span>Insurance</span><span>${Number(lease.insurance_fee).toLocaleString()}</span></div>
              <div className="lease-pay-row lease-pay-total"><span>Total</span><span>${Number(lease.total_payable).toLocaleString()}</span></div>
            </div>
          </div>

          {lease.status === 'active' && (
            <>
              <Link href={`/payments?lease_id=${lease.id}`} className="btn w-100 mb-3"
                style={{ background: '#D80621', color: '#fff', fontWeight: 700, padding: '12px', borderRadius: '8px', textDecoration: 'none', display: 'block', textAlign: 'center' }}>
                Make Payment
              </Link>
              <button className="btn btn-outline-danger w-100" onClick={handleTerminate}
                style={{ borderRadius: '8px', padding: '12px' }}>
                Terminate Lease
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default LeaseDetail
