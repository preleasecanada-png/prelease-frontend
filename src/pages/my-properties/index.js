import React, { useEffect, useState } from 'react'
import { authFetch, imageBaseUrl } from '@/Helper/helper'
import toast from 'react-hot-toast'
import Link from 'next/link'

const MyProperties = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [newImages, setNewImages] = useState([])
  const [deletingImageId, setDeletingImageId] = useState(null)
  const [savingId, setSavingId] = useState(null)

  // Upload a single file directly to S3 via a presigned URL so we never hit the
  // 10 MB API Gateway payload limit (matches the create flow in /properties).
  const uploadFileToS3 = async (file, prefix) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_HOST
    const token = localStorage.getItem('token')
    const presignRes = await fetch(`${baseUrl}/s3/presign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        filename: file.name || 'upload.bin',
        content_type: file.type || 'application/octet-stream',
        size: file.size,
        prefix,
      }),
    })
    if (!presignRes.ok) throw new Error(`Could not get upload URL (${presignRes.status})`)
    const presignJson = await presignRes.json()
    const uploadUrl = presignJson?.data?.upload_url
    const s3Key = presignJson?.data?.s3_key
    if (!uploadUrl || !s3Key) throw new Error('Invalid presign response')

    const putRes = await fetch(uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': file.type || 'application/octet-stream' },
      body: file,
    })
    if (!putRes.ok) throw new Error(`S3 upload failed (${putRes.status})`)
    return s3Key
  }

  useEffect(() => {
    fetchMyProperties()
  }, [])

  const fetchMyProperties = async () => {
    try {
      const data = await authFetch('/property/my-properties')
      if (data?.status === 200) {
        setProperties(data.data || [])
      }
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const startEdit = (property) => {
    setEditingId(property.id)
    setNewImages([])
    setEditForm({
      title: property.title || '',
      description: property.description || '',
      set_your_price: property.set_your_price || '',
      how_many_guests: property.how_many_guests || 0,
      how_many_bedrooms: property.how_many_bedrooms || 0,
      how_many_bathroom: property.how_many_bathroom || 0,
      city: property.city || '',
      state: property.state || '',
    })
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditForm(prev => ({ ...prev, [name]: value }))
  }

  const deleteImage = async (imageId) => {
    setDeletingImageId(imageId)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/property/image/${imageId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data?.status === 200) {
        toast.success('Image deleted')
        setProperties(prev => prev.map(p => ({
          ...p,
          property_images: p.property_images?.filter(img => img.id !== imageId)
        })))
      } else {
        toast.error('Failed to delete image')
      }
    } catch (err) {
      toast.error('Something went wrong')
    }
    setDeletingImageId(null)
  }

  const compressImage = (file, maxWidth = 1200, quality = 0.7) => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          let width = img.width
          let height = img.height
          if (width > maxWidth) {
            height = (height * maxWidth) / width
            width = maxWidth
          }
          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, width, height)
          canvas.toBlob((blob) => {
            resolve(new File([blob], file.name, { type: 'image/jpeg' }))
          }, 'image/jpeg', quality)
        }
        img.src = e.target.result
      }
      reader.readAsDataURL(file)
    })
  }

  const handleNewImages = (e) => {
    const files = Array.from(e.target.files)
    setNewImages(prev => [...prev, ...files])
  }

  const removeNewImage = (index) => {
    setNewImages(prev => prev.filter((_, i) => i !== index))
  }

  const saveEdit = async (id) => {
    setSavingId(id)
    try {
      const token = localStorage.getItem('token')
      const payload = { ...editForm }

      // Pre-upload any newly added photos directly to S3 so we never send a
      // big multipart body through API Gateway (avoids 413 Payload Too Large).
      if (newImages.length > 0) {
        const compressedFiles = await Promise.all(newImages.map((f) => compressImage(f)))
        const imageKeys = await Promise.all(
          compressedFiles.map((file) => uploadFileToS3(file, 'images/place_gallery_images'))
        )
        payload.property_image_keys = imageKeys
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/property/${id}/update`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (data?.status === 200) {
        toast.success('Property updated!')
        setEditingId(null)
        setNewImages([])
        fetchMyProperties()
      } else {
        toast.error(data?.error || data?.message || 'Failed to update')
      }
    } catch (err) {
      console.error('Update error:', err)
      toast.error(err?.message ? `Update failed: ${err.message}` : 'Something went wrong')
    } finally {
      setSavingId(null)
    }
  }

  const deleteProperty = async (id) => {
    if (!confirm('Are you sure you want to delete this property? This action cannot be undone.')) return
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/property/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data?.status === 200) {
        toast.success('Property deleted')
        setProperties(prev => prev.filter(p => p.id !== id))
      } else {
        toast.error('Failed to delete')
      }
    } catch (err) {
      toast.error('Something went wrong')
    }
  }

  if (loading) {
    return (
      <section className="container py-5" style={{ paddingTop: '120px' }}>
        <div className="text-center">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="container py-5" style={{ paddingTop: '120px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 style={{ fontSize: '28px', fontWeight: '700' }}>My Properties</h1>
        <Link href="/properties" style={{ backgroundColor: '#D80621', color: '#fff', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', textDecoration: 'none', fontSize: '14px' }}>
          + Add Property
        </Link>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-5">
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏠</div>
          <h5 className="text-muted">No properties listed yet</h5>
          <p className="text-muted mb-4">Start by adding your first property</p>
          <Link href="/properties" style={{ backgroundColor: '#D80621', color: '#fff', padding: '12px 24px', borderRadius: '8px', fontWeight: '600', textDecoration: 'none' }}>
            Create Listing
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {properties.map(property => (
            <div key={property.id} className="col-md-6 col-lg-4">
              <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#fff', height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Image */}
                <div style={{ height: '200px', backgroundColor: '#f3f4f6', position: 'relative' }}>
                  {property.property_images?.length > 0 ? (
                    <img
                      src={imageBaseUrl(property.property_images[0]?.original)}
                      alt={property.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF', fontSize: '14px' }}>
                      No photos
                    </div>
                  )}
                  <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '6px' }}>
                    <span style={{ backgroundColor: '#059669', color: '#fff', fontSize: '11px', padding: '4px 8px', borderRadius: '6px', fontWeight: '600' }}>
                      {property.property_images?.length || 0} photos
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {editingId === property.id ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {/* Existing Images */}
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block' }}>Current Images</label>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {property.property_images?.map(img => (
                            <div key={img.id} style={{ position: 'relative', width: '70px', height: '70px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                              <img src={imageBaseUrl(img.original)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              <button
                                onClick={() => deleteImage(img.id)}
                                disabled={deletingImageId === img.id}
                                style={{ position: 'absolute', top: '2px', right: '2px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'rgba(220,38,38,0.9)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '12px', lineHeight: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
                              >
                                {deletingImageId === img.id ? '...' : '✕'}
                              </button>
                            </div>
                          ))}
                          {property.property_images?.length === 0 && <span style={{ fontSize: '12px', color: '#9CA3AF' }}>No images</span>}
                        </div>
                      </div>
                      {/* New Images */}
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block' }}>Add Images</label>
                        <input type="file" accept="image/*" multiple onChange={handleNewImages} style={{ fontSize: '12px' }} />
                        {newImages.length > 0 && (
                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                            {newImages.map((file, i) => (
                              <div key={i} style={{ position: 'relative', width: '60px', height: '60px', borderRadius: '6px', overflow: 'hidden', border: '2px solid #059669' }}>
                                <img src={URL.createObjectURL(file)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <button onClick={() => removeNewImage(i)} style={{ position: 'absolute', top: '1px', right: '1px', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '10px', lineHeight: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>✕</button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <input className="form-control form-control-sm" name="title" value={editForm.title} onChange={handleEditChange} placeholder="Title" />
                      <div className="row g-2">
                        <div className="col-6">
                          <input className="form-control form-control-sm" name="set_your_price" value={editForm.set_your_price} onChange={handleEditChange} placeholder="Price" type="number" />
                        </div>
                        <div className="col-6">
                          <input className="form-control form-control-sm" name="city" value={editForm.city} onChange={handleEditChange} placeholder="City" />
                        </div>
                      </div>
                      <div className="row g-2">
                        <div className="col-4">
                          <input className="form-control form-control-sm" name="how_many_guests" value={editForm.how_many_guests} onChange={handleEditChange} placeholder="Guests" type="number" />
                        </div>
                        <div className="col-4">
                          <input className="form-control form-control-sm" name="how_many_bedrooms" value={editForm.how_many_bedrooms} onChange={handleEditChange} placeholder="Beds" type="number" />
                        </div>
                        <div className="col-4">
                          <input className="form-control form-control-sm" name="how_many_bathroom" value={editForm.how_many_bathroom} onChange={handleEditChange} placeholder="Baths" type="number" />
                        </div>
                      </div>
                      <textarea className="form-control form-control-sm" name="description" value={editForm.description} onChange={handleEditChange} rows="2" placeholder="Description" />
                      <div className="d-flex gap-2">
                        <button
                          onClick={() => saveEdit(property.id)}
                          disabled={savingId === property.id}
                          style={{ flex: 1, backgroundColor: '#059669', color: '#fff', border: 'none', padding: '8px', borderRadius: '6px', fontWeight: '600', cursor: savingId === property.id ? 'not-allowed' : 'pointer', fontSize: '13px', opacity: savingId === property.id ? 0.6 : 1 }}
                        >
                          {savingId === property.id ? (newImages.length > 0 ? `Uploading ${newImages.length}...` : 'Saving...') : 'Save'}
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          disabled={savingId === property.id}
                          style={{ flex: 1, backgroundColor: '#6B7280', color: '#fff', border: 'none', padding: '8px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h6 style={{ fontWeight: '600', fontSize: '16px', marginBottom: '4px' }}>{property.title || 'Untitled'}</h6>
                      <p style={{ color: '#6B7280', fontSize: '13px', margin: '0 0 8px' }}>
                        {[property.city, property.state, property.country].filter(Boolean).join(', ') || 'No location'}
                      </p>
                      <div style={{ display: 'flex', gap: '12px', fontSize: '13px', color: '#6B7280', marginBottom: '8px' }}>
                        <span>🛏️ {property.how_many_bedrooms || 0} beds</span>
                        <span>🛁 {property.how_many_bathroom || 0} baths</span>
                        <span>👥 {property.how_many_guests || 0} guests</span>
                      </div>
                      <div style={{ marginTop: 'auto' }}>
                        <div style={{ fontSize: '20px', fontWeight: '700', color: '#D80621', marginBottom: '12px' }}>
                          ${property.set_your_price || 0}<span style={{ fontSize: '14px', fontWeight: '400', color: '#6B7280' }}>/month</span>
                        </div>
                        <div className="d-flex gap-2">
                          <Link href={`/property-detail/${property.slug || 'property'}/${property.id}`} style={{ flex: 1, textAlign: 'center', padding: '8px', borderRadius: '6px', border: '1px solid #e5e7eb', color: '#374151', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}>
                            View
                          </Link>
                          <button onClick={() => startEdit(property)} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #2563EB', color: '#2563EB', backgroundColor: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>
                            Edit
                          </button>
                          <button onClick={() => deleteProperty(property.id)} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #DC2626', color: '#DC2626', backgroundColor: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>
                            Delete
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default MyProperties
