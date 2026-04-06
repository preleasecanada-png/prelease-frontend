import React, { useEffect, useState } from 'react'
import { authFetch } from '@/Helper/helper'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const Payments = () => {
  const router = useRouter()
  const { lease_id } = router.query
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState('renter')
  const [paymentMethod, setPaymentMethod] = useState('credit_card')
  const [initiating, setInitiating] = useState(false)
  const [breakdown, setBreakdown] = useState(null)
  const [selectedPlan, setSelectedPlan] = useState('full_upfront')
  const [loadingBreakdown, setLoadingBreakdown] = useState(false)

  useEffect(() => {
    const userRole = localStorage.getItem('role')
    const r = userRole === 'host' ? 'landlord' : 'renter'
    setRole(r)
    fetchPayments(r)
  }, [])

  useEffect(() => {
    if (lease_id) fetchBreakdown()
  }, [lease_id])

  const fetchPayments = async (r) => {
    try {
      const res = await authFetch(`/payments?role=${r}`)
      if (res?.status === 200) {
        const d = res?.data?.data || res?.data || []
        setPayments(Array.isArray(d) ? d : [])
      }
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  const fetchBreakdown = async () => {
    if (!lease_id) return
    setLoadingBreakdown(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/payments/breakdown/${lease_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data?.status === 200) setBreakdown(data.data)
    } catch (err) { console.warn(err) }
    setLoadingBreakdown(false)
  }

  const handleInitiatePayment = async () => {
    if (!lease_id) return toast.error('No lease selected')
    setInitiating(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/payments/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ lease_agreement_id: lease_id, payment_method: paymentMethod, payment_plan: selectedPlan }),
      })
      const data = await res.json()
      if (data?.status === 200) {
        toast.success(data.message || 'Payment initiated!')
        setBreakdown(null)
        fetchPayments(role)
      } else {
        toast.error(data?.message || 'Payment failed')
      }
    } catch (err) { toast.error('Something went wrong') }
    setInitiating(false)
  }

  const totalPaid = payments.filter(p => p.status === 'completed').reduce((s, p) => s + Number(p.total_amount || 0), 0)
  const pendingPayments = payments.filter(p => p.status === 'pending')
  const totalPending = pendingPayments.reduce((s, p) => s + Number(p.total_amount || 0), 0)
  const overdueCount = pendingPayments.filter(p => p.due_date && new Date(p.due_date) < new Date()).length

  if (loading) {
    return <section className="container py-5 text-center"><div className="spinner-border text-danger" /></section>
  }

  const upfront = breakdown?.plans?.full_upfront
  const monthly = breakdown?.plans?.monthly

  return (
    <section className="container py-4">
      <div className="mb-4">
        <h1 className="fw-bold" style={{ fontSize: '28px' }}>Payments</h1>
        <p className="text-muted mb-0">{role === 'landlord' ? 'Payments received for your properties' : 'Your payment history and upcoming installments'}</p>
      </div>

      {/* Stats */}
      <div className="row g-3 mb-4">
        {[
          { label: 'Total', value: payments.length, color: '#333', bg: '#f8f9fa' },
          { label: 'Paid', value: `$${totalPaid.toLocaleString()}`, color: '#059669', bg: '#ecfdf5' },
          { label: 'Pending', value: `$${totalPending.toLocaleString()}`, color: '#d97706', bg: '#fffbeb' },
          { label: 'Overdue', value: overdueCount, color: '#dc2626', bg: '#fef2f2' },
        ].map((s, i) => (
          <div key={i} className="col-6 col-md-3">
            <div style={{ background: s.bg, borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 700, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Payment Plan Selector */}
      {lease_id && breakdown && role === 'renter' && (
        <div className="pay-plan-section">
          <h5 style={{ fontWeight: 700, marginBottom: '4px' }}>Choose Your Payment Plan</h5>
          <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
            Lease #{lease_id} — {breakdown.months} months @ ${Number(breakdown.monthly_rent).toLocaleString()}/mo
          </p>

          <div className="pay-plan-grid">
            {/* Full Upfront */}
            <label className={`pay-plan-card ${selectedPlan === 'full_upfront' ? 'pay-plan-selected' : ''}`} onClick={() => setSelectedPlan('full_upfront')}>
              <input type="radio" name="plan" checked={selectedPlan === 'full_upfront'} onChange={() => setSelectedPlan('full_upfront')} style={{ accentColor: '#D80621' }} />
              <div className="pay-plan-card-content">
                <div className="pay-plan-card-title">
                  Pay in Full
                  {upfront?.savings > 0 && <span className="pay-plan-savings">Save ${Number(upfront.savings).toLocaleString()}</span>}
                </div>
                <div className="pay-plan-card-desc">One-time payment for the entire lease period</div>
                <div className="pay-plan-details">
                  <div><span>Rent ({breakdown.months} mo)</span><span>${Number(breakdown.total_rent).toLocaleString()}</span></div>
                  <div><span>Support Fee (${upfront?.support_fee_per_month}/mo)</span><span>${Number(upfront?.total_support_fee).toLocaleString()}</span></div>
                  <div><span>Commission ({upfront?.commission_rate})</span><span>${Number(upfront?.commission_fee).toLocaleString()}</span></div>
                  <div><span>Insurance</span><span>${Number(breakdown.insurance_fee).toLocaleString()}</span></div>
                </div>
                <div className="pay-plan-total">
                  <span>Total</span><span>${Number(upfront?.total_payable).toLocaleString()}</span>
                </div>
              </div>
            </label>

            {/* Monthly */}
            <label className={`pay-plan-card ${selectedPlan === 'monthly' ? 'pay-plan-selected' : ''} ${!monthly?.enabled ? 'pay-plan-disabled' : ''}`}
              onClick={() => { if (monthly?.enabled) setSelectedPlan('monthly') }}>
              <input type="radio" name="plan" checked={selectedPlan === 'monthly'} disabled={!monthly?.enabled}
                onChange={() => { if (monthly?.enabled) setSelectedPlan('monthly') }} style={{ accentColor: '#D80621' }} />
              <div className="pay-plan-card-content">
                <div className="pay-plan-card-title">
                  Monthly Installments
                  {!monthly?.enabled && <span className="pay-plan-unavailable">Not available</span>}
                </div>
                <div className="pay-plan-card-desc">
                  {monthly?.enabled
                    ? `${breakdown.months} monthly payments — higher fees apply`
                    : 'The landlord has not enabled monthly payments for this lease'}
                </div>
                {monthly?.enabled && (
                  <>
                    <div className="pay-plan-details">
                      <div><span>Monthly Rent</span><span>${Number(monthly.monthly_rent).toLocaleString()}</span></div>
                      <div><span>Support Fee (${monthly.support_fee_per_month}/mo)</span><span>${Number(monthly.support_fee_per_month).toLocaleString()}</span></div>
                      <div><span>Commission ({monthly.commission_rate}/mo)</span><span>${Number(monthly.commission_per_month).toLocaleString()}</span></div>
                      <div><span>Insurance/mo</span><span>${Number(monthly.insurance_per_month).toLocaleString()}</span></div>
                    </div>
                    <div className="pay-plan-installment">
                      <span>Per installment</span><span>${Number(monthly.installment_amount).toLocaleString()}</span>
                    </div>
                    <div className="pay-plan-total">
                      <span>Total ({breakdown.months} payments)</span><span>${Number(monthly.total_payable).toLocaleString()}</span>
                    </div>
                    {monthly.extra_cost > 0 && (
                      <div className="pay-plan-extra">+${Number(monthly.extra_cost).toLocaleString()} more than paying in full</div>
                    )}
                  </>
                )}
              </div>
            </label>
          </div>

          {/* Payment Method + Submit */}
          <div className="pay-plan-action">
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px', display: 'block' }}>Payment Method</label>
              <select className="form-select" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}
                style={{ borderRadius: '10px', fontSize: '14px' }}>
                <option value="credit_card">Credit Card</option>
                <option value="debit_card">Debit Card</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="e_transfer">E-Transfer</option>
              </select>
            </div>
            <button className="btn" disabled={initiating} onClick={handleInitiatePayment}
              style={{ background: '#D80621', color: '#fff', fontWeight: 700, padding: '12px 32px', borderRadius: '10px', border: 'none', fontSize: '15px', whiteSpace: 'nowrap', alignSelf: 'flex-end' }}>
              {initiating ? 'Processing...' : selectedPlan === 'monthly' ? `Start Monthly Plan` : 'Pay Now'}
            </button>
          </div>
        </div>
      )}

      {lease_id && loadingBreakdown && (
        <div className="text-center py-4"><div className="spinner-border text-danger" /></div>
      )}

      {/* Payments List */}
      {payments.length === 0 ? (
        <div className="text-center py-5">
          <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.3 }}>💳</div>
          <h4 className="text-muted">No payments yet</h4>
          <p style={{ fontSize: '14px', color: '#999' }}>Your payment history will appear here once you make a payment.</p>
        </div>
      ) : (
        <div className="pay-table-wrap">
          <table className="pay-table">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Property</th>
                <th>{role === 'landlord' ? 'Tenant' : 'Landlord'}</th>
                <th>Type</th>
                <th>Rent</th>
                <th>Fees</th>
                <th>Total</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(p => {
                const isOverdue = p.status === 'pending' && p.due_date && new Date(p.due_date) < new Date()
                const isUpcoming = p.status === 'pending' && p.due_date && !isOverdue
                  && new Date(p.due_date) < new Date(Date.now() + 7 * 86400000)
                return (
                  <tr key={p.id} className={isOverdue ? 'pay-row-overdue' : ''}>
                    <td><strong style={{ fontSize: '12px' }}>{p.payment_reference}</strong>
                      {p.total_installments > 1 && <div style={{ fontSize: '11px', color: '#64748b' }}>{p.installment_number}/{p.total_installments}</div>}
                    </td>
                    <td>{p.property?.title || '—'}</td>
                    <td style={{ fontSize: '13px' }}>
                      {role === 'landlord'
                        ? `${p.renter?.first_name || ''} ${p.renter?.last_name || ''}`
                        : `${p.landlord?.first_name || ''} ${p.landlord?.last_name || ''}`}
                    </td>
                    <td>
                      <span className={`pay-type-badge ${p.payment_type === 'monthly' ? 'pay-type-monthly' : 'pay-type-full'}`}>
                        {p.payment_type === 'monthly' ? 'Monthly' : 'Full'}
                      </span>
                    </td>
                    <td>${Number(p.rent_amount || 0).toLocaleString()}</td>
                    <td style={{ fontSize: '13px' }}>${Number((Number(p.support_fee) || 0) + (Number(p.commission_fee) || 0)).toLocaleString()}</td>
                    <td><strong>${Number(p.total_amount || 0).toLocaleString()}</strong></td>
                    <td style={{ fontSize: '13px' }}>
                      {p.due_date ? new Date(p.due_date).toLocaleDateString() : '—'}
                      {isOverdue && <div className="pay-overdue-tag">OVERDUE</div>}
                      {isUpcoming && <div className="pay-upcoming-tag">DUE SOON</div>}
                    </td>
                    <td>
                      <span className={`pay-status-badge pay-status-${p.status}`}>{p.status?.replace('_', ' ')}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Payments
