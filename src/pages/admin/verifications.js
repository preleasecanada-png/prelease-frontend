import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/router'

const AdminVerifications = () => {
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/admin/verifications?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data?.status === 200) setItems(data.data?.data || data.data || [])
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/admin/verifications/${id}/status`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      const data = await res.json()
      if (data?.status === 200) {
        toast.success(`Verification ${status}`)
        setItems(prev => prev.map(v => v.id === id ? { ...v, status } : v))
      } else {
        toast.error('Failed to update')
      }
    } catch (err) { toast.error('Something went wrong') }
  }

  const statusBadge = (status) => {
    const colors = { pending: '#f59e0b', approved: '#059669', rejected: '#DC2626' }
    const c = colors[status] || '#64748b'
    return <span style={{ fontSize: '11px', fontWeight: '600', padding: '4px 10px', borderRadius: '20px', backgroundColor: `${c}15`, color: c, textTransform: 'capitalize' }}>{status}</span>
  }

  return (
    <div style={{ paddingTop: '110px', maxWidth: '1200px', margin: '0 auto', padding: '110px 20px 40px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Link href="/admin" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px' }}>← Dashboard</Link>
        <h1 style={{ fontSize: '24px', fontWeight: '700', margin: '4px 0 0', color: '#1e293b' }}>User Verifications</h1>
        <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: '14px' }}>{items.length} verifications</p>
      </div>

      <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {['all', 'pending', 'approved', 'rejected'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #e5e7eb', cursor: 'pointer', fontSize: '13px', fontWeight: '500', backgroundColor: statusFilter === s ? '#06b6d4' : '#fff', color: statusFilter === s ? '#fff' : '#374151', textTransform: 'capitalize' }}>
            {s}
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
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#64748b', fontSize: '12px' }}>USER</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#64748b', fontSize: '12px' }}>TYPE</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#64748b', fontSize: '12px' }}>DOCUMENT</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '600', color: '#64748b', fontSize: '12px' }}>STATUS</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#64748b', fontSize: '12px' }}>DATE</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '600', color: '#64748b', fontSize: '12px' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {items.map(v => (
                  <tr key={v.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 16px', color: '#64748b' }}>#{v.id}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '13px' }}>{v.user?.first_name} {v.user?.last_name}</div>
                      <div style={{ fontSize: '12px', color: '#94a3b8' }}>{v.user?.email}</div>
                    </td>
                    <td style={{ padding: '12px 16px', color: '#475569', fontSize: '13px', textTransform: 'capitalize' }}>{v.verification_type || 'N/A'}</td>
                    <td style={{ padding: '12px 16px', color: '#475569', fontSize: '13px', textTransform: 'capitalize' }}>{v.document_type || 'N/A'}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>{statusBadge(v.status)}</td>
                    <td style={{ padding: '12px 16px', color: '#64748b', fontSize: '13px' }}>{v.created_at ? new Date(v.created_at).toLocaleDateString('fr-CA') : 'N/A'}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      {v.status === 'pending' ? (
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                          <button onClick={() => updateStatus(v.id, 'approved')} style={{ padding: '5px 12px', borderRadius: '6px', border: 'none', backgroundColor: '#059669', color: '#fff', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>Approve</button>
                          <button onClick={() => updateStatus(v.id, 'rejected')} style={{ padding: '5px 12px', borderRadius: '6px', border: '1px solid #DC2626', backgroundColor: '#fff', color: '#DC2626', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>Reject</button>
                        </div>
                      ) : (
                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr><td colSpan="7" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>No verifications found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminVerifications
