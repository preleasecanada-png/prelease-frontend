import React, { useEffect, useState } from 'react'
import { imageBaseUrl } from '@/Helper/helper'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/router'

const AdminProperties = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [total, setTotal] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const role = localStorage.getItem('role')
    if (role !== 'admin') {
      router.push('/')
      return
    }
    fetchProperties()
  }, [page])

  const fetchProperties = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const params = new URLSearchParams({ page, per_page: 15 })
      if (search) params.append('search', search)

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/admin/properties?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data?.status === 200) {
        setProperties(data.data.data || [])
        setLastPage(data.data.last_page || 1)
        setTotal(data.data.total || 0)
      }
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1)
    fetchProperties()
  }

  const deleteProperty = async (id, title) => {
    if (!confirm(`Delete "${title || 'Untitled'}"? This cannot be undone.`)) return
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/admin/properties/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data?.status === 200) {
        toast.success('Property deleted')
        setProperties(prev => prev.filter(p => p.id !== id))
        setTotal(prev => prev - 1)
      } else {
        toast.error('Failed to delete')
      }
    } catch (err) {
      toast.error('Something went wrong')
    }
  }

  return (
    <div style={{ paddingTop: '110px', paddingBottom: '40px', maxWidth: '1200px', margin: '0 auto', padding: '110px 20px 40px' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Link href="/admin" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px' }}>← Dashboard</Link>
        <h1 style={{ fontSize: '24px', fontWeight: '700', margin: '8px 0 0', color: '#1e293b' }}>Property Management</h1>
        <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: '14px' }}>{total} properties total</p>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', marginBottom: '20px', maxWidth: '500px' }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, city..."
          style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '14px', outline: 'none' }}
        />
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#1e293b', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>
          Search
        </button>
      </form>

      {/* Properties Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div className="spinner-border text-danger" role="status" />
        </div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
            {properties.map(property => (
              <div key={property.id} style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
                {/* Image */}
                <div style={{ height: '180px', backgroundColor: '#f3f4f6', position: 'relative' }}>
                  {property.property_images?.length > 0 ? (
                    <img
                      src={imageBaseUrl(property.property_images[0]?.original)}
                      alt={property.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF' }}>No photos</div>
                  )}
                  <div style={{ position: 'absolute', top: '8px', right: '8px', backgroundColor: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: '11px', padding: '3px 8px', borderRadius: '6px' }}>
                    ID: {property.id}
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: '14px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: '600', margin: '0 0 4px', color: '#1e293b' }}>{property.title || 'Untitled'}</h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 6px' }}>
                    {[property.city, property.state].filter(Boolean).join(', ') || 'No location'}
                  </p>
                  <div style={{ display: 'flex', gap: '10px', fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>
                    <span>🛏️ {property.how_many_bedrooms || 0}</span>
                    <span>🛁 {property.how_many_bathroom || 0}</span>
                    <span>👥 {property.how_many_guests || 0}</span>
                    <span>📷 {property.property_images?.length || 0}</span>
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#D80621', marginBottom: '8px' }}>
                    ${property.set_your_price || 0}<span style={{ fontSize: '12px', fontWeight: '400', color: '#64748b' }}>/month</span>
                  </div>

                  {/* Owner */}
                  <div style={{ fontSize: '12px', color: '#64748b', padding: '8px 0', borderTop: '1px solid #f1f5f9', marginBottom: '10px' }}>
                    Owner: <strong>{property.user?.first_name} {property.user?.last_name}</strong> ({property.user?.email})
                    <span style={{ marginLeft: '6px', fontSize: '10px', fontWeight: '600', padding: '2px 6px', borderRadius: '10px', backgroundColor: property.user?.role === 'host' ? '#ecfdf5' : '#f0f9ff', color: property.user?.role === 'host' ? '#059669' : '#3b82f6' }}>
                      {property.user?.role}
                    </span>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Link href={`/property-detail/${property.slug || 'property'}/${property.id}`} style={{ flex: 1, textAlign: 'center', padding: '8px', borderRadius: '6px', border: '1px solid #e5e7eb', color: '#374151', textDecoration: 'none', fontSize: '12px', fontWeight: '600' }}>
                      View
                    </Link>
                    <button onClick={() => deleteProperty(property.id, property.title)} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #DC2626', color: '#DC2626', backgroundColor: '#fff', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {properties.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>No properties found</div>
          )}

          {/* Pagination */}
          {lastPage > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', padding: '24px 0' }}>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #e5e7eb', backgroundColor: '#fff', cursor: page === 1 ? 'default' : 'pointer', opacity: page === 1 ? 0.5 : 1, fontSize: '13px' }}>Previous</button>
              <span style={{ padding: '8px 12px', fontSize: '13px', color: '#64748b' }}>Page {page} of {lastPage}</span>
              <button onClick={() => setPage(p => Math.min(lastPage, p + 1))} disabled={page === lastPage} style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #e5e7eb', backgroundColor: '#fff', cursor: page === lastPage ? 'default' : 'pointer', opacity: page === lastPage ? 0.5 : 1, fontSize: '13px' }}>Next</button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default AdminProperties
