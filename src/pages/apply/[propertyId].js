import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const ApplyForProperty = () => {
  const router = useRouter()
  const { propertyId } = router.query
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    employment_status: 'employed',
    employer_name: '',
    monthly_income: '',
    current_address: '',
    reason_for_moving: '',
    number_of_occupants: 1,
    has_pets: false,
    pet_details: '',
    desired_move_in: '',
    desired_lease_duration: '3_month',
    cover_letter: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    reference_name_1: '',
    reference_phone_1: '',
    reference_email_1: '',
    reference_name_2: '',
    reference_phone_2: '',
    reference_email_2: '',
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, property_id: propertyId }),
      })
      const data = await res.json()
      if (data?.status === 200) {
        toast.success('Application submitted successfully!')
        router.push(`/applications/${data.data?.id || ''}`)
      } else if (data?.errors) {
        const firstError = Object.values(data.errors)[0]
        toast.error(firstError[0])
      } else {
        toast.error(data?.message || 'Failed to submit application')
      }
    } catch (err) {
      toast.error('Something went wrong')
      console.error(err)
    }
    setLoading(false)
  }

  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <button className="btn btn-outline-dark mb-4" onClick={() => router.back()}>← Back</button>
          <h1 className="mb-2">Rental Application</h1>
          <p className="text-muted mb-4">Complete the form below to apply for this property. All fields marked with * are required.</p>

          <form onSubmit={handleSubmit}>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title mb-3">Employment & Income</h5>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">Employment Status *</label>
                    <select className="form-select" name="employment_status" value={form.employment_status} onChange={handleChange} required>
                      <option value="employed">Employed</option>
                      <option value="self_employed">Self Employed</option>
                      <option value="student">Student</option>
                      <option value="retired">Retired</option>
                      <option value="unemployed">Unemployed</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Employer Name</label>
                    <input type="text" className="form-control" name="employer_name" value={form.employer_name} onChange={handleChange} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Monthly Income *</label>
                    <input type="number" className="form-control" name="monthly_income" value={form.monthly_income} onChange={handleChange} min="0" required />
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title mb-3">Current Living Situation</h5>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label">Current Address *</label>
                    <input type="text" className="form-control" name="current_address" value={form.current_address} onChange={handleChange} required />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Reason for Moving</label>
                    <textarea className="form-control" name="reason_for_moving" value={form.reason_for_moving} onChange={handleChange} rows="2" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Number of Occupants *</label>
                    <input type="number" className="form-control" name="number_of_occupants" value={form.number_of_occupants} onChange={handleChange} min="1" required />
                  </div>
                  <div className="col-md-4">
                    <div className="form-check form-switch mt-4">
                      <input className="form-check-input" type="checkbox" name="has_pets" checked={form.has_pets} onChange={handleChange} />
                      <label className="form-check-label">I have pets</label>
                    </div>
                  </div>
                  {form.has_pets && (
                    <div className="col-md-4">
                      <label className="form-label">Pet Details</label>
                      <input type="text" className="form-control" name="pet_details" value={form.pet_details} onChange={handleChange} placeholder="Type, breed, size" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title mb-3">Lease Preferences</h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Desired Move-in Date *</label>
                    <input type="date" className="form-control" name="desired_move_in" value={form.desired_move_in} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Lease Duration *</label>
                    <select className="form-select" name="desired_lease_duration" value={form.desired_lease_duration} onChange={handleChange} required>
                      <option value="3_month">3 Months</option>
                      <option value="6_month">6 Months</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Cover Letter</label>
                    <textarea className="form-control" name="cover_letter" value={form.cover_letter} onChange={handleChange} rows="4" placeholder="Introduce yourself to the landlord..." />
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title mb-3">Emergency Contact</h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="emergency_contact_name" value={form.emergency_contact_name} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone</label>
                    <input type="text" className="form-control" name="emergency_contact_phone" value={form.emergency_contact_phone} onChange={handleChange} />
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title mb-3">References</h5>
                <div className="row g-3 mb-3">
                  <div className="col-md-4">
                    <label className="form-label">Reference 1 Name</label>
                    <input type="text" className="form-control" name="reference_name_1" value={form.reference_name_1} onChange={handleChange} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Phone</label>
                    <input type="text" className="form-control" name="reference_phone_1" value={form.reference_phone_1} onChange={handleChange} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="reference_email_1" value={form.reference_email_1} onChange={handleChange} />
                  </div>
                </div>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">Reference 2 Name</label>
                    <input type="text" className="form-control" name="reference_name_2" value={form.reference_name_2} onChange={handleChange} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Phone</label>
                    <input type="text" className="form-control" name="reference_phone_2" value={form.reference_phone_2} onChange={handleChange} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="reference_email_2" value={form.reference_email_2} onChange={handleChange} />
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex gap-3">
              <button type="submit" className="btn btn-danger px-5 py-2" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
              <button type="button" className="btn btn-outline-dark px-5 py-2" onClick={() => router.back()}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ApplyForProperty
