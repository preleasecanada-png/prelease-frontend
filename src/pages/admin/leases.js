import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const AdminLeases = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/leases?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data?.status === 200) {
        setItems(data.data || [])
      }
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  const statusBadge = (status) => {
    const colors = { active: '#059669', pending_signature: '#f59e0b', pending_landlord: '#f59e0b', pending_renter: '#3b82f6', terminated: '#DC2626', expired: '#64748b' }
    const c = colors[status] || '#64748b'
    return <span style={{ fontSize: '11px', fontWeight: '600', padding: '4px 10px', borderRadius: '20px', backgroundColor: `${c}15`, color: c, textTransform: 'capitalize' }}>{status?.replace(/_/g, ' ')}</span>
  }

  return (
    <div style={{ paddingTop: '110px', maxWidth: '1200px', margin: '0 auto', padding: '110px 20px 40px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Link href="/admin" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px' }}>← Dashboard</Link>
        <h1 style={{ fontSize: '24px', fontWeight: '700', margin: '4px 0 0', color: '#1e293b' }}>Leases Management</h1>
        <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: '14px' }}>{items.length} leases total</p>
      </div>

      <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {['all', 'active', 'pending_signature', 'terminated', 'expired'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #e5e7eb', cursor: 'pointer', fontSize: '13px', fontWeight: '500', backgroundColor: statusFilter === s ? '#3b82f6' : '#fff', color: statusFilter === s ? '#fff' : '#374151', textTransform: 'capitalize' }}>
            {s.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}><div className="spinner-border text-danger" role="status" /></div>
      ) : (
        <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#64748b', fontSize: '12px' }}>ID</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#64748b', fontSize: '12px' }}>PROPERTY</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#64748b', fontSize: '12px' }}>TENANT</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#64748b', fontSize: '12px' }}>LANDLORD</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', color: '#64748b', fontSize: '12px' }}>RENT</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#64748b', fontSize: '12px' }}>PERIOD</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '600', color: '#64748b', fontSize: '12px' }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {items.map(l => (
                  <tr key={l.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 16px', color: '#64748b' }}>#{l.id}</td>
                    <td style={{ padding: '12px 16px', fontWeight: '600', color: '#1e293b', fontSize: '13px' }}>{l.property?.title || `#${l.property_id}`}</td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#475569' }}>{l.renter?.first_name} {l.renter?.last_name}</td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#475569' }}>{l.landlord?.first_name} {l.landlord?.last_name}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '700', color: '#1e293b' }}>${Number(l.monthly_rent || 0).toLocaleString()}/mo</td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#64748b' }}>{l.start_date} → {l.end_date}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>{statusBadge(l.status)}</td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr><td colSpan="7" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>No leases found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminLeases
