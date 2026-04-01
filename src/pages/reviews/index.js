import React, { useEffect, useState } from 'react'
import { authFetch } from '@/Helper/helper'
import { AnimatedSection } from '@/components'
import toast from 'react-hot-toast'
import Link from 'next/link'

const StarRating = ({ rating, onRate, size = 20, interactive = false }) => {
  const [hover, setHover] = useState(0)
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map(star => (
        <svg
          key={star}
          width={size} height={size}
          viewBox="0 0 24 24"
          fill={star <= (hover || rating) ? '#D80621' : 'none'}
          stroke={star <= (hover || rating) ? '#D80621' : '#ccc'}
          strokeWidth="2"
          style={{ cursor: interactive ? 'pointer' : 'default', transition: 'all 0.15s' }}
          onClick={() => interactive && onRate && onRate(star)}
          onMouseEnter={() => interactive && setHover(star)}
          onMouseLeave={() => interactive && setHover(0)}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

const ReviewCard = ({ review }) => {
  const reviewer = review.reviewer
  const date = new Date(review.created_at).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })

  return (
    <div style={{
      background: '#fff', borderRadius: '16px', border: '1px solid #eee',
      padding: '24px', marginBottom: '16px', transition: 'box-shadow 0.2s',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #D80621, #6e0311)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 700, fontSize: '16px',
          }}>
            {(reviewer?.first_name?.[0] || 'U').toUpperCase()}
          </div>
          <div>
            <div style={{ fontWeight: 600, color: '#000', fontSize: '15px' }}>
              {reviewer?.first_name} {reviewer?.last_name?.[0]}.
            </div>
            <div style={{ fontSize: '13px', color: '#000000be' }}>{date}</div>
          </div>
        </div>
        <StarRating rating={review.rating} size={16} />
      </div>

      {review.comment && (
        <p style={{ fontSize: '14px', color: '#333', lineHeight: 1.6, margin: '0 0 12px' }}>
          {review.comment}
        </p>
      )}

      {(review.cleanliness_rating || review.communication_rating || review.value_rating || review.location_rating) && (
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '8px' }}>
          {review.cleanliness_rating && <MiniRating label="Cleanliness" value={review.cleanliness_rating} />}
          {review.communication_rating && <MiniRating label="Communication" value={review.communication_rating} />}
          {review.value_rating && <MiniRating label="Value" value={review.value_rating} />}
          {review.location_rating && <MiniRating label="Location" value={review.location_rating} />}
        </div>
      )}

      {review.property && (
        <div style={{ marginTop: '12px', padding: '8px 12px', background: '#fafafa', borderRadius: '8px', fontSize: '13px', color: '#666' }}>
          Property: <span style={{ color: '#000', fontWeight: 600 }}>{review.property.title}</span>
        </div>
      )}
    </div>
  )
}

const MiniRating = ({ label, value }) => (
  <div style={{ fontSize: '12px', color: '#666' }}>
    <span style={{ fontWeight: 600, color: '#000' }}>{label}</span>
    <span style={{ marginLeft: '6px', color: '#D80621', fontWeight: 700 }}>{value}/5</span>
  </div>
)

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([])
  const [receivedReviews, setReceivedReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('given')
  const [showForm, setShowForm] = useState(false)
  const [leases, setLeases] = useState([])
  const [form, setForm] = useState({
    lease_agreement_id: '',
    property_id: '',
    review_type: 'renter_to_property',
    rating: 0,
    comment: '',
    cleanliness_rating: 0,
    communication_rating: 0,
    value_rating: 0,
    location_rating: 0,
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchReviews()
    fetchLeases()
  }, [])

  const fetchReviews = async () => {
    setLoading(true)
    try {
      const [givenRes, receivedRes] = await Promise.all([
        authFetch('/reviews?role=reviewer'),
        authFetch('/reviews?role=reviewee'),
      ])
      if (givenRes?.status === 200) setReviews(givenRes.data?.data || [])
      if (receivedRes?.status === 200) setReceivedReviews(receivedRes.data?.data || [])
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const fetchLeases = async () => {
    try {
      const res = await authFetch('/leases')
      if (res?.status === 200) {
        const eligible = (res.data?.data || []).filter(l =>
          ['active', 'expired', 'terminated'].includes(l.status)
        )
        setLeases(eligible)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleLeaseSelect = (leaseId) => {
    const lease = leases.find(l => l.id === parseInt(leaseId))
    if (lease) {
      setForm(f => ({ ...f, lease_agreement_id: lease.id, property_id: lease.property_id }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.rating === 0) { toast.error('Please select a rating'); return }
    if (!form.lease_agreement_id) { toast.error('Please select a lease'); return }

    setSubmitting(true)
    try {
      const res = await authFetch('/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res?.status === 200) {
        toast.success('Review submitted!')
        setShowForm(false)
        setForm({ lease_agreement_id: '', property_id: '', review_type: 'renter_to_property', rating: 0, comment: '', cleanliness_rating: 0, communication_rating: 0, value_rating: 0, location_rating: 0 })
        fetchReviews()
      } else if (res?.status === 409) {
        toast.error(res.message || 'You already reviewed this property.')
      } else {
        toast.error(res?.message || 'Failed to submit review.')
      }
    } catch (err) {
      toast.error('Something went wrong.')
    }
    setSubmitting(false)
  }

  const currentList = tab === 'given' ? reviews : receivedReviews

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa' }}>
      {/* Header */}
      <div style={{
        background: '#fff', borderBottom: '1px solid #eee',
        padding: '24px 2rem',
      }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#000', margin: 0 }}>
                <span style={{
                  background: 'linear-gradient(81deg, #D80621 0%, #000 62%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>Reviews</span>
              </h1>
              <p style={{ fontSize: '14px', color: '#000000be', margin: '4px 0 0' }}>
                Manage your ratings and feedback
              </p>
            </div>
            <button onClick={() => setShowForm(!showForm)} style={{
              background: 'linear-gradient(#191919, #2b2b2b)',
              color: '#fff', border: 'none', borderRadius: '50px',
              padding: '10px 24px', fontSize: '14px', fontWeight: 600,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Write Review
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '2rem' }}>
        {/* Write Review Form */}
        <div style={{
          maxHeight: showForm ? '800px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.4s ease',
          marginBottom: showForm ? '24px' : '0',
        }}>
          <AnimatedSection animation="fadeInUp" delay={100}>
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#000', margin: '0 0 20px' }}>Write a Review</h3>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={labelStyle}>Lease Agreement</label>
                    <select value={form.lease_agreement_id} onChange={e => handleLeaseSelect(e.target.value)} style={inputStyle}>
                      <option value="">Select a lease...</option>
                      {leases.map(l => (
                        <option key={l.id} value={l.id}>
                          {l.property?.title || `Lease #${l.id}`} — {l.lease_type?.replace('_', ' ')}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Review Type</label>
                    <select value={form.review_type} onChange={e => setForm({ ...form, review_type: e.target.value })} style={inputStyle}>
                      <option value="renter_to_property">Rate Property</option>
                      <option value="renter_to_landlord">Rate Landlord</option>
                      <option value="landlord_to_renter">Rate Renter</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>Overall Rating</label>
                  <StarRating rating={form.rating} onRate={r => setForm({ ...form, rating: r })} size={28} interactive />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                  {['cleanliness', 'communication', 'value', 'location'].map(cat => (
                    <div key={cat}>
                      <label style={labelStyle}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</label>
                      <StarRating
                        rating={form[`${cat}_rating`]}
                        onRate={r => setForm({ ...form, [`${cat}_rating`]: r })}
                        size={20}
                        interactive
                      />
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>Comment</label>
                  <textarea
                    rows={4}
                    placeholder="Share your experience..."
                    value={form.comment}
                    onChange={e => setForm({ ...form, comment: e.target.value })}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="submit" disabled={submitting} style={{
                    background: 'linear-gradient(#191919, #2b2b2b)',
                    color: '#fff', border: 'none', borderRadius: '50px',
                    padding: '10px 28px', fontSize: '14px', fontWeight: 600,
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    opacity: submitting ? 0.6 : 1,
                  }}>
                    {submitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} style={{
                    background: 'transparent', color: '#D80621',
                    border: '2px solid #D80621', borderRadius: '50px',
                    padding: '10px 28px', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                  }}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </AnimatedSection>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {[
            { key: 'given', label: 'Reviews Given', count: reviews.length },
            { key: 'received', label: 'Reviews Received', count: receivedReviews.length },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              background: tab === t.key ? '#000' : '#fff',
              color: tab === t.key ? '#fff' : '#000',
              border: '1px solid #ddd',
              borderRadius: '50px', padding: '8px 20px',
              fontSize: '14px', fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}>
              {t.label} ({t.count})
            </button>
          ))}
        </div>

        {/* Review List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{
              width: '40px', height: '40px', border: '3px solid #eee',
              borderTop: '3px solid #D80621', borderRadius: '50%',
              animation: 'spin 1s linear infinite', margin: '0 auto 16px',
            }} />
            <p style={{ color: '#666' }}>Loading reviews...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : currentList.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '60px 20px',
            background: '#fff', borderRadius: '16px', border: '1px solid #eee',
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" style={{ marginBottom: '16px' }}>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <h3 style={{ fontSize: '18px', color: '#000', margin: '0 0 8px' }}>
              No {tab === 'given' ? 'reviews given' : 'reviews received'} yet
            </h3>
            <p style={{ fontSize: '14px', color: '#666' }}>
              {tab === 'given'
                ? 'Complete a lease to leave a review for your landlord or property.'
                : 'Reviews from other users will appear here.'}
            </p>
          </div>
        ) : (
          <AnimatedSection animation="fadeInUp" delay={100}>
            {currentList.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </AnimatedSection>
        )}
      </div>
    </div>
  )
}

const labelStyle = { fontSize: '13px', fontWeight: 600, color: '#000', display: 'block', marginBottom: '6px' }
const inputStyle = {
  width: '100%', padding: '10px 14px', border: '1px solid #ddd',
  borderRadius: '12px', fontSize: '14px', background: '#fff',
  color: '#000', outline: 'none',
}

export default ReviewsPage
