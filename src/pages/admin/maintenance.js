import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/router'

const AdminMaintenance = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [expandedId, setExpandedId] = useState(null)
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('role') !== 'admin') { router.push('/'); return }
    fetchData()
  }, [statusFilter])

  const fetchData = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const params = new URLSearchParams()
      if (statusFilter !== 'all') params.append('status', statusFilter)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/maintenance?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data?.status === 200) setItems(data.data || [])
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/maintenance/${id}/status`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      const data = await res.json()
      if (data?.status === 200) {
        toast.success(`Status updated to ${status}`)
        setItems(prev => prev.map(m => m.id === id ? { ...m, status } : m))
      } else { toast.error('Failed to update') }
    } catch (err) { toast.error('Something went wrong') }
  }

  const statusBadge = (status) => {
    const colors = { pending: '#f59e0b', in_progress: '#3b82f6', completed: '#059669', cancelled: '#DC2626' }
    const c = colors[status] || '#64748b'
    return <span style={{ fontSize: '11px', fontWeight: '600', padding: '4px 10px', borderRadius: '20px', backgroundColor: `${c}15`, color: c, textTransform: 'capitalize' }}>{status?.replace(/_/g, ' ')}</span>
  }

  const priorityBadge = (p) => {
    const colors = { low: '#64748b', medium: '#f59e0b', high: '#DC2626', urgent: '#7c3aed' }
    const c = colors[p] || '#64748b'
    return <span style={{ fontSize: '11px', fontWeight: '600', padding: '4px 10px', borderRadius: '20px', backgroundColor: `${c}15`, color: c, textTransform: 'capitalize' }}>{p || 'normal'}</span>
  }

  return (
    <div style={{ paddingTop: '110px', maxWidth: '1200px', margin: '0 auto', padding: '110px 20px 40px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Link href="/admin" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px' }}>← Dashboard</Link>
        <h1 style={{ fontSize: '24px', fontWeight: '700', margin: '4px 0 0', color: '#1e293b' }}>Maintenance Requests</h1>
        <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: '14px' }}>{items.length} requests</p>
      </div>

      <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {['all', 'pending', 'in_progress', 'completed', 'cancelled'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #e5e7eb', cursor: 'pointer', fontSize: '13px', fontWeight: '500', backgroundColor: statusFilter === s ? '#DC2626' : '#fff', color: statusFilter === s ? '#fff' : '#374151', textTransform: 'capitalize' }}>
            {s.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}><div className="spinner-border text-danger" role="status" /></div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {items.map(m => (
            <div key={m.id} style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
              <div onClick={() => setExpandedId(expandedId === m.id ? null : m.id)} style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                <div>
                  <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '15px' }}>{m.title || `Request #${m.id}`}</div>
                  <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
                    {m.user?.first_name} {m.user?.last_name} — {m.property?.title || `Property #${m.property_id}`}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {priorityBadge(m.priority)}
                  {statusBadge(m.status)}
                  <span style={{ fontSize: '18px', color: '#ccc' }}>{expandedId === m.id ? '▲' : '▼'}</span>
                </div>
              </div>
              {expandedId === m.id && (
                <div style={{ padding: '0 20px 20px', borderTop: '1px solid #f1f5f9' }}>
                  <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', margin: '12px 0', fontSize: '14px', color: '#333', lineHeight: '1.6' }}>
                    {m.description || 'No description provided.'}
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {['pending', 'in_progress', 'completed', 'cancelled'].map(s => (
                      <button key={s} onClick={() => updateStatus(m.id, s)} disabled={m.status === s}
                        style={{ padding: '8px 16px', borderRadius: '8px', border: m.status === s ? 'none' : '1px solid #e5e7eb', backgroundColor: m.status === s ? '#1e293b' : '#fff', color: m.status === s ? '#fff' : '#374151', cursor: m.status === s ? 'default' : 'pointer', fontSize: '13px', fontWeight: '600', opacity: m.status === s ? 0.7 : 1, textTransform: 'capitalize' }}>
                        {s.replace(/_/g, ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          {items.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px', background: '#f9f9f9', borderRadius: '16px', color: '#999' }}>No maintenance requests found</div>
          )}
        </div>
      )}
    </div>
  )
}

export default AdminMaintenance
