import React, { useEffect, useState } from 'react'
import { authFetch } from '@/Helper/helper'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const ApplicationDetail = () => {
  const router = useRouter()
  const { id } = router.query
  const [app, setApp] = useState(null)
  const [loading, setLoading] = useState(true)
  const [viewerIsLandlord, setViewerIsLandlord] = useState(false)
  const [role, setRole] = useState('renter')
  const [statusNote, setStatusNote] = useState('')
  const [uploadFile, setUploadFile] = useState(null)
  const [uploadType, setUploadType] = useState('government_id')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (viewerIsLandlord) setRole('landlord')
  }, [viewerIsLandlord])

  useEffect(() => {
    if (id) fetchApplication()
  }, [id])

  const fetchApplication = async () => {
    try {
      const res = await authFetch(`/applications/${id}`)
      if (res?.status === 200) {
        setApp(res.data)
        setViewerIsLandlord(!!res.viewer_is_landlord)
      }
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const [showLeaseModal, setShowLeaseModal] = useState(false)
  const [monthlyRent, setMonthlyRent] = useState(0)

  const handleCreateLease = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/leases/create-from-application`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ 
          rental_application_id: id,
          monthly_rent: monthlyRent,
          special_conditions: '' 
        }),
      })
      const data = await res.json()
      if (data?.status === 200) {
        toast.success('Lease agreement created!')
        router.push('/leases')
      } else {
        toast.error(data?.message || 'Failed to create lease')
      }
    } catch (err) {
      toast.error('Something went wrong')
    }
  }

  const handleStatusUpdate = async (newStatus) => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/applications/${id}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus, landlord_notes: statusNote }),
      })
      const data = await res.json()
      if (data?.status === 200) {
        toast.success(`Application ${newStatus}!`)
        fetchApplication()
      } else {
        toast.error(data?.message || 'Failed to update status')
      }
    } catch (err) {
      toast.error('Something went wrong')
    }
  }

  const handleWithdraw = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/applications/${id}/withdraw`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data?.status === 200) {
        toast.success('Application withdrawn')
        fetchApplication()
      } else {
        toast.error(data?.message || 'Failed to withdraw')
      }
    } catch (err) {
      toast.error('Something went wrong')
    }
  }

  const handleDocumentUpload = async (e) => {
    e.preventDefault()
    if (!uploadFile) return toast.error('Select a file first')
    setUploading(true)
    try {
      const token = localStorage.getItem('token')
      const formData = new FormData()
      formData.append('rental_application_id', id)
      formData.append('document_type', uploadType)
      formData.append('document', uploadFile)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/applications/upload-document`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })
      const data = await res.json()
      if (data?.status === 200) {
        toast.success('Document uploaded!')
        setUploadFile(null)
        fetchApplication()
      } else {
        toast.error(data?.message || 'Upload failed')
      }
    } catch (err) {
      toast.error('Something went wrong')
    }
    setUploading(false)
  }

  if (loading) {
    return (
      <section className="container py-5 text-center">
        <div className="spinner-border text-danger" role="status" />
      </section>
    )
  }

  if (!app) {
    return (
      <section className="container py-5 text-center">
        <h4 className="text-muted">Application not found</h4>
      </section>
    )
  }

  return (
    <section className="container py-5">
      <button className="btn btn-outline-dark mb-4" onClick={() => router.back()}>← Back</button>
      <div className="row">
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Application #{app.id}</h4>
              <span className={`badge bg-${app.status === 'approved' ? 'success' : app.status === 'rejected' ? 'danger' : app.status === 'submitted' ? 'primary' : 'info'}`}>
                {app.status?.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-6"><strong>Property:</strong> {app.property?.title}</div>
                <div className="col-md-6"><strong>Employment:</strong> {app.employment_status}</div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6"><strong>Monthly Income:</strong> ${Number(app.monthly_income || 0).toLocaleString()}</div>
                <div className="col-md-6"><strong>Occupants:</strong> {app.number_of_occupants}</div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6"><strong>Move-in Date:</strong> {app.desired_move_in ? new Date(app.desired_move_in).toLocaleDateString() : '—'}</div>
                <div className="col-md-6"><strong>Lease Duration:</strong> {app.desired_lease_duration?.replace('_', ' ')}</div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6"><strong>Pets:</strong> {app.has_pets ? `Yes — ${app.pet_details}` : 'No'}</div>
                <div className="col-md-6"><strong>Current Address:</strong> {app.current_address}</div>
              </div>
              {app.cover_letter && (
                <div className="mb-3">
                  <strong>Cover Letter:</strong>
                  <p className="mt-1">{app.cover_letter}</p>
                </div>
              )}
              {app.reason_for_moving && (
                <div className="mb-3">
                  <strong>Reason for Moving:</strong>
                  <p className="mt-1">{app.reason_for_moving}</p>
                </div>
              )}
              <hr />
              <h5>References</h5>
              <div className="row mb-2">
                <div className="col-md-4">{app.reference_name_1 || '—'}</div>
                <div className="col-md-4">{app.reference_phone_1 || ''}</div>
                <div className="col-md-4">{app.reference_email_1 || ''}</div>
              </div>
              <div className="row">
                <div className="col-md-4">{app.reference_name_2 || '—'}</div>
                <div className="col-md-4">{app.reference_phone_2 || ''}</div>
                <div className="col-md-4">{app.reference_email_2 || ''}</div>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-header"><h5 className="mb-0">Documents</h5></div>
            <div className="card-body">
              {app.documents?.length > 0 ? app.documents.map((doc) => (
                <div key={doc.id} className="d-flex justify-content-between align-items-center border rounded p-3 mb-2">
                  <div>
                    <strong>{doc.document_type?.replace('_', ' ')}</strong>
                    <br /><small className="text-muted">{doc.file_name}</small>
                  </div>
                  <span className={`badge bg-${doc.verification_status === 'verified' ? 'success' : doc.verification_status === 'rejected' ? 'danger' : 'warning'}`}>
                    {doc.verification_status}
                  </span>
                </div>
              )) : <p className="text-muted">No documents uploaded yet.</p>}

              {role === 'renter' && app.status !== 'withdrawn' && app.status !== 'rejected' && (
                <form onSubmit={handleDocumentUpload} className="mt-3 p-3 bg-light rounded">
                  <h6>Upload Document</h6>
                  <div className="row g-2 align-items-end">
                    <div className="col-md-4">
                      <select className="form-select" value={uploadType} onChange={(e) => setUploadType(e.target.value)}>
                        <option value="government_id">Government ID</option>
                        <option value="proof_of_income">Proof of Income</option>
                        <option value="employment_letter">Employment Letter</option>
                        <option value="credit_report">Credit Report</option>
                        <option value="reference_letter">Reference Letter</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="col-md-5">
                      <input type="file" className="form-control" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setUploadFile(e.target.files[0])} />
                    </div>
                    <div className="col-md-3">
                      <button type="submit" className="btn btn-danger w-100" disabled={uploading}>
                        {uploading ? 'Uploading...' : 'Upload'}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          {viewerIsLandlord && (app.status === 'submitted' || app.status === 'under_review') && (
            <div className="card mb-4">
              <div className="card-header"><h5 className="mb-0">Update Status</h5></div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Notes</label>
                  <textarea className="form-control" rows="3" value={statusNote} onChange={(e) => setStatusNote(e.target.value)} />
                </div>
                <div className="d-grid gap-2">
                  {app.status === 'submitted' && (
                    <button className="btn btn-info" onClick={() => handleStatusUpdate('under_review')}>Mark Under Review</button>
                  )}
                  <button className="btn btn-success" onClick={() => handleStatusUpdate('approved')}>Approve</button>
                  <button className="btn btn-danger" onClick={() => handleStatusUpdate('rejected')}>Reject</button>
                </div>
              </div>
            </div>
          )}

          {viewerIsLandlord && app.status === 'approved' && (
            <div className="card mb-4">
              <div className="card-header"><h5 className="mb-0">Finalize Lease</h5></div>
              <div className="card-body">
                <form onSubmit={handleCreateLease}>
                  <div className="mb-3">
                    <label className="form-label">Confirm Monthly Rent ($)</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      value={monthlyRent} 
                      onChange={(e) => setMonthlyRent(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Create Lease Agreement</button>
                </form>
              </div>
            </div>
          )}

          {role === 'renter' && app.status === 'submitted' && (
            <div className="card mb-4">
              <div className="card-body">
                <button className="btn btn-outline-danger w-100" onClick={handleWithdraw}>Withdraw Application</button>
              </div>
            </div>
          )}

          {app.landlord_notes && (
            <div className="card mb-4">
              <div className="card-header"><h5 className="mb-0">Landlord Notes</h5></div>
              <div className="card-body">{app.landlord_notes}</div>
            </div>
          )}
          {app.rejection_reason && (
            <div className="card mb-4">
              <div className="card-header"><h5 className="mb-0">Rejection Reason</h5></div>
              <div className="card-body text-danger">{app.rejection_reason}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ApplicationDetail
