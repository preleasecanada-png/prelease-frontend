import React, { useEffect, useState } from 'react'
import { authFetch } from '@/Helper/helper'
import { EnhancedCard, AnimatedButton, LoadingSkeleton, AnimatedSection, StatCard, EnhancedTable } from '@/components'
import toast from 'react-hot-toast'

const Referrals = () => {
  const [referralCode, setReferralCode] = useState('')
  const [referralLink, setReferralLink] = useState('')
  const [applyCode, setApplyCode] = useState('')
  const [referrals, setReferrals] = useState([])
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReferrals()
  }, [])

  const buildLink = (code) => {
    if (!code) return ''
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    return `${origin}/sign-up?ref=${code}`
  }

  const fetchReferrals = async () => {
    try {
      const res = await authFetch('/referrals/my-referrals')
      if (res?.status === 200) {
        setReferrals(res.data?.referrals || [])
        setStats(res.data?.stats || {})
        const existing = res.data?.current_referral_code
        if (existing) {
          setReferralCode(existing)
          setReferralLink(buildLink(existing))
        }
      }
    } catch (err) {
      console.error('fetchReferrals error', err)
    }
    setLoading(false)
  }

  const handleGenerateCode = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/referrals/generate-code`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data?.status === 200) {
        const code = data.data?.referral_code
        setReferralCode(code)
        setReferralLink(data.data?.referral_link || buildLink(code))
        toast.success('Referral code ready!')
        fetchReferrals()
      } else {
        toast.error('Failed to generate code')
      }
    } catch (err) {
      toast.error('Something went wrong')
    }
  }

  const copyLink = () => {
    if (!referralLink) return
    navigator.clipboard.writeText(referralLink)
    toast.success('Link copied!')
  }

  const handleApplyCode = async (e) => {
    e.preventDefault()
    if (!applyCode.trim()) return toast.error('Enter a referral code')
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/referrals/apply-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ referral_code: applyCode }),
      })
      const data = await res.json()
      if (data?.status === 200) {
        toast.success(data.message)
        setApplyCode('')
      } else {
        toast.error(data?.message || 'Invalid code')
      }
    } catch (err) {
      toast.error('Something went wrong')
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode)
    toast.success('Code copied!')
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
          <h1 className="display-4 fw-bold text-gradient mb-3">Referral Program</h1>
          <p className="lead text-muted">Invite friends and earn rewards when they complete a lease.</p>
        </div>
      </AnimatedSection>

      <AnimatedSection animation="fadeInUp" delay={200}>
        <div className="row g-4 mb-5">
          <div className="col-md-3">
            <StatCard title="Total Referrals" value={stats.total_referrals || 0} color="primary" />
          </div>
          <div className="col-md-3">
            <StatCard title="Completed" value={stats.completed || 0} color="success" />
          </div>
          <div className="col-md-3">
            <StatCard title="Pending" value={stats.pending || 0} color="warning" />
          </div>
          <div className="col-md-3">
            <StatCard title="Total Earned" value={`$${Number(stats.total_earned || 0).toFixed(2)}`} color="info" />
          </div>
        </div>
      </AnimatedSection>

      <div className="row g-4 mb-5">
        <div className="col-md-6">
          <AnimatedSection animation="fadeInUp" delay={300}>
            <EnhancedCard className="h-100 p-4">
              <h5 className="fw-bold mb-4">Your Referral Code</h5>
              {referralCode ? (
                <>
                  <div className="d-flex gap-2 align-items-center mb-3">
                    <input type="text" className="form-control form-control-enhanced form-control-lg text-center fw-bold" value={referralCode} readOnly />
                    <AnimatedButton variant="outline" onClick={copyToClipboard}>
                      Copy
                    </AnimatedButton>
                  </div>
                  {referralLink && (
                    <div className="d-flex gap-2 align-items-center">
                      <input type="text" className="form-control form-control-enhanced" value={referralLink} readOnly style={{ fontSize: '0.85rem' }} />
                      <AnimatedButton variant="outline" onClick={copyLink}>
                        Copy Link
                      </AnimatedButton>
                    </div>
                  )}
                </>
              ) : (
                <AnimatedButton variant="primary" className="w-100" onClick={handleGenerateCode}>
                  Generate Referral Code
                </AnimatedButton>
              )}
              <p className="text-muted mt-3 mb-0">Share this code or link with friends. You'll earn <strong>5%</strong> when they complete their first payment.</p>
            </EnhancedCard>
          </AnimatedSection>
        </div>
        <div className="col-md-6">
          <AnimatedSection animation="fadeInUp" delay={400}>
            <EnhancedCard className="h-100 p-4">
              <h5 className="fw-bold mb-4">Apply a Referral Code</h5>
              <form onSubmit={handleApplyCode}>
                <div className="d-flex gap-2">
                  <input type="text" className="form-control form-control-enhanced" placeholder="Enter referral code" value={applyCode} onChange={(e) => setApplyCode(e.target.value)} />
                  <AnimatedButton variant="primary" type="submit">
                    Apply
                  </AnimatedButton>
                </div>
              </form>
              <p className="text-muted mt-3 mb-0">Were you referred by someone? Enter their code here.</p>
            </EnhancedCard>
          </AnimatedSection>
        </div>
      </div>

      {referrals.length > 0 && (
        <AnimatedSection animation="fadeInUp" delay={500}>
          <EnhancedCard className="p-0 overflow-hidden">
            <div className="p-4 pb-0">
              <h5 className="fw-bold mb-0">Your Referrals</h5>
            </div>
            <div className="p-4">
              <EnhancedTable
                headers={['Code', 'Referred User', 'Status', 'Reward']}
                rows={referrals.map((r) => [
                  <code key="code" className="fw-bold">{r.referral_code}</code>,
                  r.referred ? `${r.referred.first_name} ${r.referred.last_name}` : 'Pending',
                  <span key="status" className={`badge-enhanced badge-${r.status === 'completed' ? 'success' : r.status === 'registered' ? 'info' : 'warning'}`}>
                    {r.status?.toUpperCase()}
                  </span>,
                  r.remuneration_paid ? `$${Number(r.remuneration_amount).toFixed(2)}` : '—',
                ])}
              />
            </div>
          </EnhancedCard>
        </AnimatedSection>
      )}
    </section>
  )
}

export default Referrals
