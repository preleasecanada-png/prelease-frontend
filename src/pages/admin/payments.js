import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const AdminPayments = () => {
  const [items, setItems] = useState([])
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [total, setTotal] = useState(0)
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('role') !== 'admin') { router.push('/'); return }
    fetchDashboard()
    fetchData()
  }, [page, statusFilter])

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/admin/payments/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data?.status === 200) setDashboard(data.data)
    } catch (err) { console.error(err) }
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const params = new URLSearchParams({ page, per_page: 15 })
      if (statusFilter !== 'all') params.append('status', statusFilter)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/admin/payments?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data?.status === 200) {
        setItems(data.data?.data || data.data || [])
        setLastPage(data.data?.last_page || 1)
        setTotal(data.data?.total || 0)
      }
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  const statusBadge = (status) => {
    const colors = { pending: '#f59e0b', completed: '#059669', confirmed: '#059669', failed: '#DC2626', refunded: '#64748b' }
    const c = colors[status] || '#64748b'
    return <span style={{ fontSize: '11px', fontWeight: '600', padding: '4px 10px', borderRadius: '20px', backgroundColor: `${c}15`, color: c, textTransform: 'capitalize' }}>{status}</span>
  }

  return (
    <div style={{ paddingTop: '110px', maxWidth: '1200px', margin: '0 auto', padding: '110px 20px 40px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Link href="/admin" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px' }}>← Dashboard</Link>
        <h1 style={{ fontSize: '24px', fontWeight: '700', margin: '4px 0 0', color: '#1e293b' }}>Payments Management</h1>
        <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: '14px' }}>{total} payments total</p>
      </div>

      {dashboard && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '24px' }}>
          <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px' }}>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Total Revenue</div>
            <div style={{ fontSize: '22px', fontWeight: '700', color: '#059669' }}>${(dashboard.total_revenue || 0).toLocaleString()}</div>
          </div>
          <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px' }}>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Commission Earned</div>
            <div style={{ fontSize: '22px', fontWeight: '700', color: '#3b82f6' }}>${(dashboard.total_commission || 0).toLocaleString()}</div>
          </div>
          <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px' }}>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Pending Payments</div>
            <div style={{ fontSize: '22px', fontWeight: '700', color: '#f59e0b' }}>{dashboard.pending_count || 0}</div>
          </div>
          <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px' }}>
            <div style={{ fontSize: '12px', color: '#64748b' }}>This Month</div>
            <div style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b' }}>${(dashboard.this_month_revenue || 0).toLocaleString()}</div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {['all', 'pending', 'completed', 'confirmed', 'failed', 'refunded'].map(s => (
          <button key={s} onClick={() => { setStatusFilter(s); setPage(1) }}
            style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #e5e7eb', cursor: 'pointer', fontSize: '13px', fontWeight: '500', backgroundColor: statusFilter === s ? '#059669' : '#fff', color: statusFilter === s ? '#fff' : '#374151', textTransform: 'capitalize' }}>
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
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#64748b', fontSize: '12px' }}>TENANT</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#64748b', fontSize: '12px' }}>LANDLORD</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', color: '#64748b', fontSize: '12px' }}>AMOUNT</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', color: '#64748b', fontSize: '12px' }}>COMMISSION</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '600', color: '#64748b', fontSize: '12px' }}>TYPE</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '600', color: '#64748b', fontSize: '12px' }}>STATUS</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#64748b', fontSize: '12px' }}>DATE</th>
                </tr>
              </thead>
              <tbody>
                {items.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 16px', color: '#64748b' }}>#{p.id}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '13px' }}>{p.renter?.first_name} {p.renter?.last_name}</div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ fontSize: '13px', color: '#475569' }}>{p.landlord?.first_name} {p.landlord?.last_name}</div>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '700', color: '#1e293b' }}>${Number(p.amount || 0).toLocaleString()}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', color: '#059669', fontWeight: '600' }}>${Number(p.platform_fee || 0).toLocaleString()}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px', color: '#64748b' }}>{p.payment_type || 'N/A'}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>{statusBadge(p.status)}</td>
                    <td style={{ padding: '12px 16px', color: '#64748b', fontSize: '13px' }}>{p.created_at ? new Date(p.created_at).toLocaleDateString('fr-CA') : 'N/A'}</td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr><td colSpan="8" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>No payments found</td></tr>
                )}
              </tbody>
            </table>
          </div>
          {lastPage > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', padding: '16px', borderTop: '1px solid #f1f5f9' }}>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #e5e7eb', backgroundColor: '#fff', cursor: page === 1 ? 'default' : 'pointer', opacity: page === 1 ? 0.5 : 1, fontSize: '13px' }}>Previous</button>
              <span style={{ padding: '8px 12px', fontSize: '13px', color: '#64748b' }}>Page {page} of {lastPage}</span>
              <button onClick={() => setPage(p => Math.min(lastPage, p + 1))} disabled={page === lastPage} style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #e5e7eb', backgroundColor: '#fff', cursor: page === lastPage ? 'default' : 'pointer', opacity: page === lastPage ? 0.5 : 1, fontSize: '13px' }}>Next</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AdminPayments
