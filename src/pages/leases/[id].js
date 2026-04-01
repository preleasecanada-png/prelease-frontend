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

  return (
    <section className="container py-5">
      <button className="btn btn-outline-dark mb-4" onClick={() => router.back()}>← Back</button>
      <div className="row">
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Lease Agreement</h4>
              <span className={`badge bg-${lease.status === 'active' ? 'success' : 'warning'}`}>
                {lease.status?.replace(/_/g, ' ').toUpperCase()}
              </span>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-6"><strong>Property:</strong> {lease.property?.title}</div>
                <div className="col-md-6"><strong>Lease Type:</strong> {lease.lease_type?.replace('_', ' ')}</div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6"><strong>Start:</strong> {new Date(lease.start_date).toLocaleDateString()}</div>
                <div className="col-md-6"><strong>End:</strong> {new Date(lease.end_date).toLocaleDateString()}</div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6"><strong>Renter:</strong> {lease.renter?.first_name} {lease.renter?.last_name}</div>
                <div className="col-md-6"><strong>Landlord:</strong> {lease.landlord?.first_name} {lease.landlord?.last_name}</div>
              </div>
              <hr />
              <h5>Payment Breakdown</h5>
              <table className="table">
                <tbody>
                  <tr><td>Monthly Rent</td><td className="text-end">${Number(lease.monthly_rent).toLocaleString()}</td></tr>
                  <tr><td>Total Rent</td><td className="text-end">${Number(lease.total_rent).toLocaleString()}</td></tr>
                  <tr><td>Support Fee ($100/mo)</td><td className="text-end">${Number(lease.support_fee).toLocaleString()}</td></tr>
                  <tr><td>Commission (5%)</td><td className="text-end">${Number(lease.commission_fee).toLocaleString()}</td></tr>
                  <tr><td>Insurance Fee</td><td className="text-end">${Number(lease.insurance_fee).toLocaleString()}</td></tr>
                  <tr className="fw-bold"><td>Total Payable</td><td className="text-end">${Number(lease.total_payable).toLocaleString()}</td></tr>
                </tbody>
              </table>
              {lease.special_conditions && (
                <div className="mb-3"><strong>Special Conditions:</strong><p>{lease.special_conditions}</p></div>
              )}
              {lease.terms && (
                <div className="mb-3">
                  <strong>Terms:</strong>
                  <pre className="bg-light p-3 rounded mt-2" style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{lease.terms}</pre>
                </div>
              )}
              <div className="row">
                <div className="col-md-6">
                  <strong>Renter Signed:</strong> {lease.renter_signed_at ? new Date(lease.renter_signed_at).toLocaleString() : 'Not yet'}
                </div>
                <div className="col-md-6">
                  <strong>Landlord Signed:</strong> {lease.landlord_signed_at ? new Date(lease.landlord_signed_at).toLocaleString() : 'Not yet'}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          {canSign && (
            <div className="card mb-4">
              <div className="card-body">
                <h5>Sign Lease</h5>
                <p className="text-muted">By signing, you agree to the terms outlined in this lease agreement.</p>
                <button className="btn btn-success w-100" onClick={handleSign}>Sign Lease Agreement</button>
              </div>
            </div>
          )}
          {lease.status === 'active' && (
            <>
              <div className="card mb-4">
                <div className="card-body">
                  <Link href={`/payments?lease_id=${lease.id}`} className="btn btn-danger w-100">Make Payment</Link>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <button className="btn btn-outline-danger w-100" onClick={handleTerminate}>Terminate Lease</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default LeaseDetail
