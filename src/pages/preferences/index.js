import React, { useEffect, useState } from 'react'
import { authFetch } from '@/Helper/helper'
import { EnhancedCard, AnimatedButton, LoadingSkeleton, AnimatedSection } from '@/components'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

const Preferences = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [preferences, setPreferences] = useState({
    preferred_city: '',
    budget_min: '',
    budget_max: '',
    min_bedrooms: '',
    min_bathrooms: '',
    property_type: '',
    pets_allowed: false,
    preferred_move_in: '',
    lease_duration: '3_month',
    max_guests: '',
  })

  useEffect(() => {
    fetchPreferences()
  }, [])

  const fetchPreferences = async () => {
    try {
      const res = await authFetch('/preferences')
      if (res?.status === 200 && res?.data) {
        setPreferences(prev => ({ ...prev, ...res.data }))
      }
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/preferences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(preferences),
      })
      const data = await res.json()
      if (data?.status === 200) {
        toast.success('Preferences saved successfully!')
      } else if (data?.errors) {
        const firstError = Object.values(data.errors)[0]
        toast.error(firstError[0])
      } else {
        toast.error(data?.message || 'Failed to save preferences')
      }
    } catch (err) {
      toast.error('Something went wrong')
      console.error(err)
    }
    setSaving(false)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setPreferences(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  if (loading) {
    return (
      <section className="container py-5">
        <div className="text-center">
          <LoadingSkeleton lines={3} height={40} />
        </div>
      </section>
    )
  }

  return (
    <section className="container py-5 section-spacing">
      <AnimatedSection animation="fadeInUp" delay={100}>
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-gradient mb-3">Renter Preferences</h1>
          <p className="lead text-muted">Customize your rental preferences to find the perfect home</p>
        </div>
      </AnimatedSection>

      <AnimatedSection animation="fadeInUp" delay={200}>
        <EnhancedCard className="p-4">
          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Preferred City</label>
                <input 
                  type="text" 
                  className="form-control form-control-enhanced" 
                  name="preferred_city"
                  value={preferences.preferred_city} 
                  onChange={handleChange}
                  placeholder="e.g. Toronto"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Max Guests</label>
                <input 
                  type="number" 
                  className="form-control form-control-enhanced" 
                  name="max_guests"
                  value={preferences.max_guests} 
                  onChange={handleChange}
                  placeholder="e.g. 4"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Minimum Budget</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0">$</span>
                  <input 
                    type="number" 
                    className="form-control form-control-enhanced" 
                    name="budget_min"
                    value={preferences.budget_min} 
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Maximum Budget</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0">$</span>
                  <input 
                    type="number" 
                    className="form-control form-control-enhanced" 
                    name="budget_max"
                    value={preferences.budget_max} 
                    onChange={handleChange}
                    placeholder="5000"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Minimum Bedrooms</label>
                <select 
                  className="form-select form-control-enhanced" 
                  name="min_bedrooms"
                  value={preferences.min_bedrooms} 
                  onChange={handleChange}
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Minimum Bathrooms</label>
                <select 
                  className="form-select form-control-enhanced" 
                  name="min_bathrooms"
                  value={preferences.min_bathrooms} 
                  onChange={handleChange}
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Preferred Property Type</label>
                <select 
                  className="form-select form-control-enhanced" 
                  name="property_type"
                  value={preferences.property_type} 
                  onChange={handleChange}
                >
                  <option value="">Any</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="condo">Condo</option>
                  <option value="townhouse">Townhouse</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Preferred Move-in Date</label>
                <input 
                  type="date" 
                  className="form-control form-control-enhanced" 
                  name="preferred_move_in"
                  value={preferences.preferred_move_in} 
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Lease Duration</label>
                <select 
                  className="form-select form-control-enhanced" 
                  name="lease_duration"
                  value={preferences.lease_duration} 
                  onChange={handleChange}
                >
                  <option value="3_month">3 Months</option>
                  <option value="6_month">6 Months</option>
                </select>
              </div>
            </div>

            <div className="row g-4 mt-4">
              <div className="col-12">
                <h5 className="mb-4 fw-bold">Amenities & Requirements</h5>
              </div>
              <div className="col-md-6">
                <div className="form-check form-switch">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    name="pets_allowed"
                    checked={preferences.pets_allowed} 
                    onChange={handleChange}
                  />
                  <label className="form-check-label fw-semibold">
                    Pets Allowed
                  </label>
                </div>
              </div>
            </div>

            <div className="d-flex gap-3 justify-content-end mt-5">
              <AnimatedButton 
                variant="outline" 
                type="button"
                onClick={() => router.push('/properties')}
              >
                Search Properties
              </AnimatedButton>
              <AnimatedButton 
                variant="primary" 
                type="submit"
                loading={saving}
              >
                {saving ? 'Saving...' : 'Save Preferences'}
              </AnimatedButton>
            </div>
          </form>
        </EnhancedCard>
      </AnimatedSection>
    </section>
  )
}

export default Preferences
