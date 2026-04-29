import React, { useEffect, useState } from 'react'
import { authFetch } from '@/Helper/helper'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const Payments = () => {
  const router = useRouter()
  const { lease_id } = router.query
  const [payments, setPayments] = useState([])
  const [leases, setLeases] = useState([])
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState('renter')
  const [paymentMethod, setPaymentMethod] = useState('credit_card')
  const [initiating, setInitiating] = useState(false)
  const [breakdown, setBreakdown] = useState(null)
  const [selectedPlan, setSelectedPlan] = useState('full_upfront')
  const [loadingBreakdown, setLoadingBreakdown] = useState(false)
  const [selectedLeaseId, setSelectedLeaseId] = useState(lease_id || '')
  const [payingId, setPayingId] = useState(null)
  const [confirmModal, setConfirmModal] = useState(null)

  useEffect(() => {
    const userRole = localStorage.getItem('role')?.toLowerCase()
    if (userRole === 'host' || userRole === 'admin' || userRole === 'landlord') {
      setRole('landlord')
    } else {
      setRole('renter')
    }
    fetchPayments()
    fetchLeases()
  }, [])

  useEffect(() => {
    if (lease_id) {
      setSelectedLeaseId(lease_id)
      fetchBreakdown(lease_id)
    }
  }, [lease_id])

  useEffect(() => {
    if (selectedLeaseId && !lease_id) {
      fetchBreakdown(selectedLeaseId)
    }
  }, [selectedLeaseId])

  const fetchPayments = async () => {
    try {
      const res = await authFetch(`/payments`)
      if (res?.status === 200) {
        const d = res?.data?.data || res?.data || []
        setPayments(Array.isArray(d) ? d : [])
      }
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  const fetchLeases = async () => {
    try {
      const res = await authFetch(`/leases`)
      if (res?.status === 200) {
        const d = res?.data?.data || res?.data || []
        setLeases(Array.isArray(d) ? d : [])
      }
    } catch (err) { console.warn(err) }
  }

  const fetchBreakdown = async (lid) => {
    if (!lid) return
    setLoadingBreakdown(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/payments/breakdown/${lid}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data?.status === 200) setBreakdown(data.data)
    } catch (err) { console.warn(err) }
    setLoadingBreakdown(false)
  }

  const handleInitiatePayment = async () => {
    const lid = selectedLeaseId || lease_id
    if (!lid) return toast.error('No lease selected')
    setInitiating(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/payments/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ lease_agreement_id: lid, payment_method: paymentMethod, payment_plan: selectedPlan }),
      })
      const data = await res.json()
      if (data?.status === 200) {
        toast.success(data.message || 'Payment initiated!')
        setBreakdown(null)
        fetchPayments()
      } else {
        toast.error(data?.message || 'Payment failed')
      }
    } catch (err) { toast.error('Something went wrong') }
    setInitiating(false)
  }

  const handleConfirmPayment = async (paymentId) => {
    setPayingId(paymentId)
    try {
      const token = localStorage.getItem('token')
      const txnId = 'TXN-' + Date.now() + '-' + Math.random().toString(36).substring(2, 8)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/payments/${paymentId}/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ transaction_id: txnId }),
      })
      const data = await res.json()
      if (data?.status === 200) {
        toast.success('Payment completed successfully!')
        setConfirmModal(null)
        fetchPayments()
      } else {
        toast.error(data?.message || 'Payment confirmation failed')
      }
    } catch (err) { toast.error('Something went wrong') }
    setPayingId(null)
  }

  const totalPaid = payments.filter(p => p.status === 'completed').reduce((s, p) => s + Number(p.total_amount || 0), 0)
  const pendingPayments = payments.filter(p => p.status === 'pending')
  const totalPending = pendingPayments.reduce((s, p) => s + Number(p.total_amount || 0), 0)
  const overdueCount = pendingPayments.filter(p => p.due_date && new Date(p.due_date) < new Date()).length

  // Leases without existing payments (available for new payment)
  const paidLeaseIds = new Set(payments.filter(p => ['completed', 'processing', 'pending'].includes(p.status)).map(p => String(p.lease_agreement_id)))
  const unpaidLeases = leases.filter(l => !paidLeaseIds.has(String(l.id)) && l.status === 'active')

  if (loading) {
    return <section className="container py-5 text-center"><div className="spinner-border text-danger" /></section>
  }

  const activeLeaseId = selectedLeaseId || lease_id
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

      {/* Lease Selector for initiating payment (renter only) */}
      {role === 'renter' && unpaidLeases.length > 0 && (
        <div className="card mb-4" style={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <div className="card-body p-4">
            <h5 style={{ fontWeight: 700, marginBottom: '12px' }}>Make a Payment</h5>
            <div className="row g-3 align-items-end">
              <div className="col-md-4">
                <label style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px', display: 'block' }}>Select Lease</label>
                <select className="form-select" value={activeLeaseId || ''} onChange={e => setSelectedLeaseId(e.target.value)}
                  style={{ borderRadius: '10px', fontSize: '14px' }}>
                  <option value="">Choose a lease...</option>
                  {unpaidLeases.map(l => (
                    <option key={l.id} value={l.id}>
                      #{l.id} — {l.property?.title || 'Property'} (${Number(l.monthly_rent || 0).toLocaleString()}/mo)
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <label style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px', display: 'block' }}>Payment Method</label>
                <select className="form-select" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}
                  style={{ borderRadius: '10px', fontSize: '14px' }}>
                  <option value="credit_card">Credit Card</option>
                  <option value="debit_card">Debit Card</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="e_transfer">E-Transfer</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Plan Selector */}
      {activeLeaseId && breakdown && role === 'renter' && (
        <div className="pay-plan-section">
          <h5 style={{ fontWeight: 700, marginBottom: '4px' }}>Choose Your Payment Plan</h5>
          <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
            Lease #{activeLeaseId} — {breakdown.months} months @ ${Number(breakdown.monthly_rent).toLocaleString()}/mo
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

      {activeLeaseId && loadingBreakdown && (
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
                <th>Action</th>
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
                    <td>
                      {p.status === 'pending' && role === 'renter' && (
                        <button
                          className="btn btn-sm"
                          disabled={payingId === p.id}
                          onClick={() => setConfirmModal(p)}
                          style={{ background: '#D80621', color: '#fff', borderRadius: '8px', fontSize: '12px', padding: '4px 12px', fontWeight: 600, border: 'none' }}
                        >
                          {payingId === p.id ? '...' : 'Pay Now'}
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirm Payment Modal */}
      {confirmModal && (
        <div className="app-modal-overlay" onClick={() => setConfirmModal(null)}>
          <div className="app-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <h5 className="fw-bold mb-3">Confirm Payment</h5>
            <div style={{ background: '#f8f9fa', borderRadius: '10px', padding: '16px', marginBottom: '16px' }}>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Reference</span>
                <strong>{confirmModal.payment_reference}</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Property</span>
                <strong>{confirmModal.property?.title || '—'}</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Type</span>
                <strong>{confirmModal.payment_type === 'monthly' ? 'Monthly' : 'Full Upfront'}</strong>
              </div>
              {confirmModal.total_installments > 1 && (
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Installment</span>
                  <strong>{confirmModal.installment_number}/{confirmModal.total_installments}</strong>
                </div>
              )}
              <hr style={{ margin: '12px 0' }} />
              <div className="d-flex justify-content-between">
                <span style={{ fontWeight: 700, fontSize: '16px' }}>Total</span>
                <strong style={{ fontSize: '20px', color: '#D80621' }}>${Number(confirmModal.total_amount || 0).toLocaleString()}</strong>
              </div>
            </div>
            <div className="mb-3">
              <label style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px', display: 'block' }}>Payment Method</label>
              <select className="form-select" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}
                style={{ borderRadius: '10px', fontSize: '14px' }}>
                <option value="credit_card">Credit Card</option>
                <option value="debit_card">Debit Card</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="e_transfer">E-Transfer</option>
              </select>
            </div>
            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', padding: '12px', marginBottom: '16px', fontSize: '13px' }}>
              By confirming, you agree to pay <strong>${Number(confirmModal.total_amount || 0).toLocaleString()}</strong> via <strong>{paymentMethod.replace('_', ' ')}</strong>.
              A transaction ID will be generated automatically.
            </div>
            <div className="d-flex gap-2 justify-content-end">
              <button className="btn btn-outline-secondary" style={{ borderRadius: '10px' }} onClick={() => setConfirmModal(null)}>Cancel</button>
              <button
                className="btn text-white"
                style={{ background: '#D80621', borderRadius: '10px', fontWeight: 700, padding: '10px 24px' }}
                disabled={payingId === confirmModal.id}
                onClick={() => handleConfirmPayment(confirmModal.id)}
              >
                {payingId === confirmModal.id ? 'Processing...' : 'Confirm & Pay'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Payments
