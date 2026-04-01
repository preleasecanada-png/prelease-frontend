import React, { useEffect, useState } from 'react'
import { authFetch } from '@/Helper/helper'
import { EnhancedCard, AnimatedButton, LoadingSkeleton, AnimatedSection, StatCard, EnhancedTable } from '@/components'
import toast from 'react-hot-toast'

const Support = () => {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ subject: '', message: '', category: 'account', priority: 'medium' })
  const [submitting, setSubmitting] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState(null)

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    try {
      const res = await authFetch('/support')
      if (res?.status === 200) {
        setTickets(res?.data?.data || res?.data || [])
      }
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/support`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data?.status === 200) {
        toast.success('Ticket submitted!')
        setForm({ subject: '', message: '', category: 'account', priority: 'medium' })
        setShowForm(false)
        fetchTickets()
      } else if (data?.errors) {
        toast.error(Object.values(data.errors)[0][0])
      } else {
        toast.error(data?.message || 'Failed to submit ticket')
      }
    } catch (err) {
      toast.error('Something went wrong')
    }
    setSubmitting(false)
  }

  const fetchTicketDetail = async (id) => {
    try {
      const res = await authFetch(`/support/${id}`)
      if (res?.status === 200) setSelectedTicket(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const openCount = tickets.filter(t => t.status === 'open').length
  const resolvedCount = tickets.filter(t => t.status === 'resolved').length

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
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h1 className="display-4 fw-bold text-gradient mb-2">Support</h1>
            <p className="lead text-muted mb-0">Need help? Submit a ticket and we'll get back to you.</p>
          </div>
          <AnimatedButton
            variant={showForm ? 'outline' : 'primary'}
            onClick={() => { setShowForm(!showForm); setSelectedTicket(null) }}
          >
            {showForm ? 'Cancel' : 'New Ticket'}
          </AnimatedButton>
        </div>
      </AnimatedSection>

      <AnimatedSection animation="fadeInUp" delay={150}>
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <StatCard title="Total Tickets" value={tickets.length} color="primary" />
          </div>
          <div className="col-md-4">
            <StatCard title="Open" value={openCount} color="warning" />
          </div>
          <div className="col-md-4">
            <StatCard title="Resolved" value={resolvedCount} color="success" />
          </div>
        </div>
      </AnimatedSection>

      {showForm && (
        <AnimatedSection animation="fadeInUp" delay={200}>
          <EnhancedCard className="p-4 mb-5">
            <h5 className="fw-bold mb-4">Create Support Ticket</h5>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-8">
                  <label className="form-label fw-semibold">Subject</label>
                  <input type="text" className="form-control form-control-enhanced" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Category</label>
                  <select className="form-select form-control-enhanced" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    <option value="account">Account</option>
                    <option value="payment">Payment</option>
                    <option value="property">Property</option>
                    <option value="application">Application</option>
                    <option value="lease">Lease</option>
                    <option value="technical">Technical</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Priority</label>
                  <select className="form-select form-control-enhanced" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold">Message</label>
                  <textarea className="form-control form-control-enhanced" rows="5" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
                </div>
                <div className="col-12">
                  <AnimatedButton variant="primary" type="submit" loading={submitting}>
                    {submitting ? 'Submitting...' : 'Submit Ticket'}
                  </AnimatedButton>
                </div>
              </div>
            </form>
          </EnhancedCard>
        </AnimatedSection>
      )}

      <AnimatedSection animation="fadeInUp" delay={300}>
        <div className="row">
          <div className={selectedTicket ? 'col-lg-7' : 'col-12'}>
            {tickets.length === 0 ? (
              <EnhancedCard className="p-5 text-center">
                <div className="display-1 mb-3" style={{ opacity: 0.2 }}>🎫</div>
                <h4 className="text-muted">No support tickets</h4>
                <p className="text-muted">Submit a ticket if you need assistance.</p>
              </EnhancedCard>
            ) : (
              <EnhancedCard className="p-0 overflow-hidden">
                <EnhancedTable
                  headers={['#', 'Subject', 'Category', 'Priority', 'Status', 'Date']}
                  rows={tickets.map((t) => [
                    t.id,
                    <span key="subj" style={{ cursor: 'pointer' }} className="fw-semibold text-primary" onClick={() => fetchTicketDetail(t.id)}>{t.subject}</span>,
                    t.category,
                    <span key="pri" className={`badge-enhanced badge-${t.priority === 'urgent' ? 'danger' : t.priority === 'high' ? 'warning' : t.priority === 'medium' ? 'info' : 'secondary'}`}>
                      {t.priority}
                    </span>,
                    <span key="status" className={`badge-enhanced badge-${t.status === 'open' ? 'primary' : t.status === 'resolved' ? 'success' : 'info'}`}>
                      {t.status?.replace('_', ' ')}
                    </span>,
                    new Date(t.created_at).toLocaleDateString(),
                  ])}
                />
              </EnhancedCard>
            )}
          </div>
          {selectedTicket && (
            <div className="col-lg-5">
              <EnhancedCard className="p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h5 className="fw-bold mb-0">{selectedTicket.subject}</h5>
                  <button className="btn-close" onClick={() => setSelectedTicket(null)} />
                </div>
                <div className="mb-3">
                  <span className={`badge-enhanced badge-${selectedTicket.priority === 'urgent' ? 'danger' : 'info'} me-2`}>{selectedTicket.priority}</span>
                  <span className={`badge-enhanced badge-${selectedTicket.status === 'resolved' ? 'success' : 'primary'}`}>{selectedTicket.status?.replace('_', ' ')}</span>
                </div>
                <p className="text-muted small">{new Date(selectedTicket.created_at).toLocaleString()}</p>
                <hr />
                <h6 className="fw-bold">Your Message</h6>
                <p>{selectedTicket.message}</p>
                {selectedTicket.admin_response && (
                  <>
                    <hr />
                    <h6 className="fw-bold">Admin Response</h6>
                    <div className="p-3 rounded" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
                      {selectedTicket.admin_response}
                    </div>
                  </>
                )}
              </EnhancedCard>
            </div>
          )}
        </div>
      </AnimatedSection>
    </section>
  )
}

export default Support
