import React, { useEffect, useState } from 'react'
import { authFetch } from '@/Helper/helper'
import { useRouter } from 'next/router'
import { EnhancedCard, AnimatedButton, LoadingSkeleton, AnimatedSection, StatCard, EnhancedTable } from '@/components'
import toast from 'react-hot-toast'

const Payments = () => {
  const router = useRouter()
  const { lease_id } = router.query
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState('renter')
  const [showInitiate, setShowInitiate] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('credit_card')
  const [initiating, setInitiating] = useState(false)

  useEffect(() => {
    const userRole = localStorage.getItem('role')
    const r = userRole === 'host' ? 'landlord' : 'renter'
    setRole(r)
    fetchPayments(r)
  }, [])

  useEffect(() => {
    if (lease_id) setShowInitiate(true)
  }, [lease_id])

  const fetchPayments = async (r) => {
    try {
      const res = await authFetch(`/payments?role=${r}`)
      if (res?.status === 200) {
        setPayments(res?.data?.data || res?.data || [])
      }
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const handleInitiatePayment = async (e) => {
    e.preventDefault()
    if (!lease_id) return toast.error('No lease selected')
    setInitiating(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/payments/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ lease_agreement_id: lease_id, payment_method: paymentMethod }),
      })
      const data = await res.json()
      if (data?.status === 200) {
        toast.success('Payment initiated!')
        setShowInitiate(false)
        fetchPayments(role)
      } else if (data?.status === 409) {
        toast.error(data.message)
      } else {
        toast.error(data?.message || 'Payment initiation failed')
      }
    } catch (err) {
      toast.error('Something went wrong')
    }
    setInitiating(false)
  }

  const totalPaid = payments.filter(p => p.status === 'completed').reduce((s, p) => s + Number(p.total_amount || 0), 0)
  const totalPending = payments.filter(p => p.status === 'pending').reduce((s, p) => s + Number(p.total_amount || 0), 0)

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
          <h1 className="display-4 fw-bold text-gradient mb-3">Payments</h1>
          <p className="lead text-muted">{role === 'landlord' ? 'Payments received for your properties' : 'Your payment history'}</p>
        </div>
      </AnimatedSection>

      <AnimatedSection animation="fadeInUp" delay={200}>
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <StatCard title="Total Payments" value={payments.length} color="primary" />
          </div>
          <div className="col-md-4">
            <StatCard title="Total Paid" value={`$${totalPaid.toLocaleString()}`} color="success" />
          </div>
          <div className="col-md-4">
            <StatCard title="Pending" value={`$${totalPending.toLocaleString()}`} color="warning" />
          </div>
        </div>
      </AnimatedSection>

      {showInitiate && lease_id && role === 'renter' && (
        <AnimatedSection animation="fadeInUp" delay={250}>
          <EnhancedCard className="p-4 mb-5 border-start border-4 border-danger">
            <h5 className="fw-bold mb-4 text-gradient">Initiate Payment</h5>
            <form onSubmit={handleInitiatePayment}>
              <div className="row g-3 align-items-end">
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Lease Agreement</label>
                  <input type="text" className="form-control form-control-enhanced" value={`Lease #${lease_id}`} disabled />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Payment Method</label>
                  <select className="form-select form-control-enhanced" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                    <option value="credit_card">Credit Card</option>
                    <option value="debit_card">Debit Card</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="e_transfer">E-Transfer</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <AnimatedButton variant="primary" type="submit" loading={initiating} className="w-100">
                    {initiating ? 'Processing...' : 'Initiate Payment'}
                  </AnimatedButton>
                </div>
              </div>
            </form>
          </EnhancedCard>
        </AnimatedSection>
      )}

      <AnimatedSection animation="fadeInUp" delay={300}>
        {payments.length === 0 ? (
          <EnhancedCard className="p-5 text-center">
            <div className="display-1 mb-3" style={{ opacity: 0.2 }}>💳</div>
            <h4 className="text-muted">No payments yet</h4>
            <p className="text-muted">Your payment history will appear here.</p>
          </EnhancedCard>
        ) : (
          <EnhancedCard className="p-0 overflow-hidden">
            <EnhancedTable
              headers={['Reference', 'Property', role === 'landlord' ? 'Renter' : 'Landlord', 'Rent', 'Fees', 'Total', 'Status', 'Date']}
              rows={payments.map((p) => [
                <strong key="ref">{p.payment_reference}</strong>,
                p.property?.title || '—',
                role === 'landlord'
                  ? `${p.renter?.first_name || ''} ${p.renter?.last_name || ''}`
                  : `${p.landlord?.first_name || ''} ${p.landlord?.last_name || ''}`,
                `$${Number(p.rent_amount || 0).toLocaleString()}`,
                `$${Number((p.support_fee || 0) + (p.commission_fee || 0)).toLocaleString()}`,
                <span key="total" className="fw-bold">${Number(p.total_amount || 0).toLocaleString()}</span>,
                <span key="status" className={`badge-enhanced badge-${p.status === 'completed' ? 'success' : p.status === 'pending' ? 'warning' : 'danger'}`}>
                  {p.status?.toUpperCase()}
                </span>,
                p.created_at ? new Date(p.created_at).toLocaleDateString() : '—',
              ])}
            />
          </EnhancedCard>
        )}
      </AnimatedSection>
    </section>
  )
}

export default Payments
