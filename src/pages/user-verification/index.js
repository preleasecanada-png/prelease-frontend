import React, { useEffect, useState } from 'react'
import { authFetch } from '@/Helper/helper'
import { EnhancedCard, AnimatedButton, LoadingSkeleton, AnimatedSection, ProgressRing, EnhancedTable } from '@/components'
import toast from 'react-hot-toast'

const UserVerification = () => {
  const [verifications, setVerifications] = useState([])
  const [verificationStatus, setVerificationStatus] = useState({})
  const [loading, setLoading] = useState(true)
  const [uploadType, setUploadType] = useState('identity')
  const [docType, setDocType] = useState('')
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [listRes, statusRes] = await Promise.all([
        authFetch('/verification'),
        authFetch('/verification/status'),
      ])
      if (listRes?.status === 200) setVerifications(listRes.data || [])
      if (statusRes?.status === 200) setVerificationStatus(statusRes.data || {})
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return toast.error('Select a document')
    if (!docType) return toast.error('Enter a document type')
    setUploading(true)
    try {
      const token = localStorage.getItem('token')
      const formData = new FormData()
      formData.append('verification_type', uploadType)
      formData.append('document_type', docType)
      formData.append('document', file)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/verification/submit`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })
      const data = await res.json()
      if (data?.status === 200) {
        toast.success('Document submitted for verification!')
        setFile(null)
        setDocType('')
        fetchData()
      } else if (data?.status === 409) {
        toast.error(data.message)
      } else if (data?.errors) {
        toast.error(Object.values(data.errors)[0][0])
      } else {
        toast.error(data?.message || 'Submission failed')
      }
    } catch (err) {
      toast.error('Something went wrong')
    }
    setUploading(false)
  }

  const statusBadge = (s) => {
    const map = { verified: 'success', pending: 'warning', under_review: 'info', rejected: 'danger', not_submitted: 'secondary' }
    return map[s] || 'secondary'
  }

  const statusIcon = (s) => {
    const map = { verified: '✅', pending: '⏳', under_review: '🔍', rejected: '❌', not_submitted: '📋' }
    return map[s] || '📋'
  }

  if (loading) {
    return (
      <section className="container py-5">
        <LoadingSkeleton lines={4} height={40} />
      </section>
    )
  }

  const types = [
    { key: 'identity', label: 'Identity Verification', desc: 'Government-issued ID (passport, driver\'s license)' },
    { key: 'income', label: 'Income Verification', desc: 'Pay stubs, tax returns, or bank statements' },
    { key: 'address', label: 'Address Verification', desc: 'Utility bill, bank statement with current address' },
    { key: 'landlord_ownership', label: 'Landlord Ownership', desc: 'Property deed or ownership documents (landlords only)' },
  ]

  const verifiedCount = types.filter(t => (verificationStatus?.verifications?.[t.key]) === 'verified').length
  const progressPercent = Math.round((verifiedCount / types.length) * 100)

  return (
    <section className="container py-5 section-spacing">
      <AnimatedSection animation="fadeInUp" delay={100}>
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-gradient mb-3">Account Verification</h1>
          <p className="lead text-muted">Verify your identity and documents to unlock full access to Prelease Canada.</p>
        </div>
      </AnimatedSection>

      <AnimatedSection animation="fadeInUp" delay={150}>
        <div className="text-center mb-5">
          <ProgressRing percentage={progressPercent} size={120} color="#e74c3c" />
          <p className="mt-3 fw-semibold">{verifiedCount} of {types.length} verifications completed</p>
        </div>
      </AnimatedSection>

      {verificationStatus?.is_fully_verified && (
        <AnimatedSection animation="fadeInUp" delay={175}>
          <div className="alert-enhanced alert-success-enhanced text-center p-4 mb-5">
            <span className="display-6 me-2">🎉</span>
            <strong>Your account is fully verified!</strong>
          </div>
        </AnimatedSection>
      )}

      <AnimatedSection animation="fadeInUp" delay={200}>
        <div className="row g-4 mb-5">
          {types.map((t, index) => {
            const s = verificationStatus?.verifications?.[t.key] || 'not_submitted'
            return (
              <div key={t.key} className="col-md-6 col-lg-3">
                <AnimatedSection animation="fadeInUp" delay={250 + index * 100}>
                  <EnhancedCard className="h-100 text-center p-4">
                    <div className="display-4 mb-3">{statusIcon(s)}</div>
                    <h6 className="fw-bold mb-2">{t.label}</h6>
                    <span className={`badge-enhanced badge-${statusBadge(s)} mb-3`}>
                      {s.replace(/_/g, ' ').toUpperCase()}
                    </span>
                    <p className="text-muted small mb-0">{t.desc}</p>
                  </EnhancedCard>
                </AnimatedSection>
              </div>
            )
          })}
        </div>
      </AnimatedSection>

      <AnimatedSection animation="fadeInUp" delay={400}>
        <EnhancedCard className="p-4 mb-5">
          <h5 className="fw-bold mb-4">Submit Verification Document</h5>
          <form onSubmit={handleSubmit}>
            <div className="row g-3 align-items-end">
              <div className="col-md-3">
                <label className="form-label fw-semibold">Verification Type</label>
                <select className="form-select form-control-enhanced" value={uploadType} onChange={(e) => setUploadType(e.target.value)}>
                  <option value="identity">Identity</option>
                  <option value="income">Income</option>
                  <option value="address">Address</option>
                  <option value="landlord_ownership">Landlord Ownership</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label fw-semibold">Document Type</label>
                <input type="text" className="form-control form-control-enhanced" placeholder="e.g. Passport" value={docType} onChange={(e) => setDocType(e.target.value)} required />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-semibold">Document File</label>
                <input type="file" className="form-control form-control-enhanced" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setFile(e.target.files[0])} required />
              </div>
              <div className="col-md-2">
                <AnimatedButton variant="primary" type="submit" loading={uploading} className="w-100">
                  {uploading ? 'Submitting...' : 'Submit'}
                </AnimatedButton>
              </div>
            </div>
          </form>
        </EnhancedCard>
      </AnimatedSection>

      {verifications.length > 0 && (
        <AnimatedSection animation="fadeInUp" delay={500}>
          <EnhancedCard className="p-0 overflow-hidden">
            <div className="p-4 pb-0">
              <h5 className="fw-bold">Submission History</h5>
            </div>
            <div className="p-4">
              <EnhancedTable
                headers={['Type', 'Document', 'Status', 'Submitted', 'Notes']}
                rows={verifications.map((v) => [
                  v.verification_type?.replace(/_/g, ' '),
                  v.document_type,
                  <span key="status" className={`badge-enhanced badge-${statusBadge(v.status)}`}>{v.status?.replace(/_/g, ' ')}</span>,
                  new Date(v.created_at).toLocaleDateString(),
                  v.admin_notes || '—',
                ])}
              />
            </div>
          </EnhancedCard>
        </AnimatedSection>
      )}
    </section>
  )
}

export default UserVerification
