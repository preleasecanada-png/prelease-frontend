import React, { useEffect, useState } from 'react'
import { authFetch } from '@/Helper/helper'
import { AnimatedSection } from '@/components'

const STATUS_STYLES = {
  active: { bg: '#e8f5e9', color: '#2e7d32', label: 'Active' },
  pending: { bg: '#fff3e0', color: '#e65100', label: 'Pending' },
  expired: { bg: '#fce4ec', color: '#c62828', label: 'Expired' },
  cancelled: { bg: '#f5f5f5', color: '#666', label: 'Cancelled' },
  claimed: { bg: '#e3f2fd', color: '#1565c0', label: 'Claimed' },
}

const StatBox = ({ label, value, accent }) => (
  <div style={{
    background: '#fff', borderRadius: '16px', border: '1px solid #eee',
    padding: '20px', textAlign: 'center', flex: 1, minWidth: '140px',
  }}>
    <div style={{ fontSize: '28px', fontWeight: 700, color: accent || '#000' }}>{value}</div>
    <div style={{ fontSize: '13px', color: '#000000be', marginTop: '4px' }}>{label}</div>
  </div>
)

const InsuranceCard = ({ insurance }) => {
  const lease = insurance.lease_agreement
  const property = lease?.property
  const status = STATUS_STYLES[insurance.status] || STATUS_STYLES.pending
  const coverageStart = insurance.coverage_start ? new Date(insurance.coverage_start).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'
  const coverageEnd = insurance.coverage_end ? new Date(insurance.coverage_end).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'

  return (
    <div style={{
      background: '#fff', borderRadius: '16px', border: '1px solid #eee',
      padding: '24px', marginBottom: '16px', transition: 'box-shadow 0.2s',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#000', margin: '0 0 4px' }}>
            {property?.title || `Insurance #${insurance.id}`}
          </h3>
          <p style={{ fontSize: '13px', color: '#000000be', margin: 0 }}>
            {property?.city && `${property.city}, `}{property?.state || ''}
          </p>
        </div>
        <span style={{
          background: status.bg, color: status.color,
          padding: '6px 16px', borderRadius: '20px',
          fontSize: '13px', fontWeight: 600,
        }}>
          {status.label}
        </span>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '12px', background: '#fafafa', borderRadius: '12px', padding: '16px',
      }}>
        <div>
          <div style={{ fontSize: '12px', color: '#666' }}>Policy Number</div>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#000' }}>{insurance.policy_number || 'Pending Assignment'}</div>
        </div>
        <div>
          <div style={{ fontSize: '12px', color: '#666' }}>Provider</div>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#000' }}>{insurance.provider || 'Pending Partner'}</div>
        </div>
        <div>
          <div style={{ fontSize: '12px', color: '#666' }}>Premium</div>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#D80621' }}>
            {insurance.premium_amount > 0 ? `$${Number(insurance.premium_amount).toFixed(2)}` : 'TBD'}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '12px', color: '#666' }}>Coverage Period</div>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#000' }}>{coverageStart} — {coverageEnd}</div>
        </div>
        <div>
          <div style={{ fontSize: '12px', color: '#666' }}>Lease Type</div>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#000' }}>{lease?.lease_type?.replace('_', ' ') || 'N/A'}</div>
        </div>
        <div>
          <div style={{ fontSize: '12px', color: '#666' }}>Landlord</div>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#000' }}>
            {lease?.landlord?.first_name} {lease?.landlord?.last_name?.[0]}.
          </div>
        </div>
      </div>

      {insurance.coverage_details && (
        <div style={{ marginTop: '12px', padding: '12px 16px', background: '#fffbe6', borderRadius: '8px', border: '1px solid #ffe58f' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#d48806', marginBottom: '4px' }}>Coverage Details</div>
          <div style={{ fontSize: '13px', color: '#333' }}>{insurance.coverage_details}</div>
        </div>
      )}
    </div>
  )
}

const InsurancePage = () => {
  const [insurances, setInsurances] = useState([])
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [listRes, summaryRes] = await Promise.all([
        authFetch('/insurance'),
        authFetch('/insurance/summary'),
      ])
      if (listRes?.status === 200) setInsurances(listRes.data?.data || [])
      if (summaryRes?.status === 200) setSummary(summaryRes.data)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa' }}>
      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '24px 2rem' }}>
        <div className="container">
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#000', margin: 0 }}>
            <span style={{
              background: 'linear-gradient(81deg, #D80621 0%, #000 62%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Rental Insurance</span>
          </h1>
          <p style={{ fontSize: '14px', color: '#000000be', margin: '4px 0 0' }}>
            Mandatory rental insurance for all active leases
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '2rem' }}>
        {/* Info Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #D80621 0%, #6e0311 100%)',
          borderRadius: '16px', padding: '24px', marginBottom: '24px',
          color: '#fff', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', width: '200px', height: '200px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)', top: '-60px', right: '-40px',
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span style={{ fontSize: '18px', fontWeight: 700 }}>Insurance Protection</span>
            </div>
            <p style={{ fontSize: '14px', opacity: 0.9, margin: 0, maxWidth: '600px' }}>
              Rental insurance is mandatory for all lease agreements on Prelease Canada.
              It protects both renters and landlords throughout the lease period.
              Insurance provider integration will be activated once our partnership is finalized.
            </p>
          </div>
        </div>

        {/* Summary Stats */}
        {summary && (
          <AnimatedSection animation="fadeInUp" delay={100}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
              <StatBox label="Total Policies" value={summary.total} />
              <StatBox label="Active" value={summary.active} accent="#2e7d32" />
              <StatBox label="Pending" value={summary.pending} accent="#e65100" />
              <StatBox label="Expired" value={summary.expired} accent="#c62828" />
              <StatBox label="Total Premium" value={summary.total_premium > 0 ? `$${summary.total_premium}` : 'TBD'} accent="#D80621" />
            </div>
          </AnimatedSection>
        )}

        {/* Insurance List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{
              width: '40px', height: '40px', border: '3px solid #eee',
              borderTop: '3px solid #D80621', borderRadius: '50%',
              animation: 'spin 1s linear infinite', margin: '0 auto 16px',
            }} />
            <p style={{ color: '#666' }}>Loading insurance policies...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : insurances.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '60px 20px',
            background: '#fff', borderRadius: '16px', border: '1px solid #eee',
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" style={{ marginBottom: '16px' }}>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <h3 style={{ fontSize: '18px', color: '#000', margin: '0 0 8px' }}>No Insurance Policies Yet</h3>
            <p style={{ fontSize: '14px', color: '#666' }}>
              Insurance policies are automatically created when a lease agreement becomes active.
              Sign a lease to get started.
            </p>
          </div>
        ) : (
          <AnimatedSection animation="fadeInUp" delay={200}>
            {insurances.map(ins => (
              <InsuranceCard key={ins.id} insurance={ins} />
            ))}
          </AnimatedSection>
        )}

        {/* FAQ */}
        <div style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#000', marginBottom: '16px' }}>
            Frequently Asked Questions
          </h2>
          {[
            { q: 'Is rental insurance mandatory?', a: 'Yes. All tenants on Prelease Canada are required to have rental insurance for the duration of their lease. This protects both renters and landlords.' },
            { q: 'How much does it cost?', a: 'Premiums will be determined once our insurance partner integration is finalized. The cost will be based on lease duration and property value.' },
            { q: 'When does coverage start?', a: 'Coverage begins on your lease start date and ends on your lease end date. A policy is automatically created when your lease becomes active.' },
            { q: 'What does it cover?', a: 'Rental insurance covers property damage, liability, and personal belongings protection. Detailed coverage terms will be provided by our insurance partner.' },
          ].map((faq, i) => (
            <details key={i} style={{
              background: '#fff', borderRadius: '12px', border: '1px solid #eee',
              padding: '16px 20px', marginBottom: '8px',
            }}>
              <summary style={{ fontWeight: 600, color: '#000', fontSize: '15px', cursor: 'pointer' }}>
                {faq.q}
              </summary>
              <p style={{ fontSize: '14px', color: '#333', lineHeight: 1.6, marginTop: '8px', marginBottom: 0 }}>
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InsurancePage
