import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/router'

const AdminApplications = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [expandedId, setExpandedId] = useState(null)
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('role') !== 'admin') { router.push('/'); return }
    fetchData()
  }, [page, statusFilter])

  const fetchData = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const params = new URLSearchParams({ page, per_page: 15 })
      if (statusFilter !== 'all') params.append('status', statusFilter)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/admin/applications?${params}`, {
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
    const colors = { pending: '#f59e0b', approved: '#059669', rejected: '#DC2626', withdrawn: '#64748b' }
    const c = colors[status] || '#64748b'
    return <span style={{ fontSize: '11px', fontWeight: '600', padding: '4px 10px', borderRadius: '20px', backgroundColor: `${c}15`, color: c, textTransform: 'capitalize' }}>{status}</span>
  }

  return (
    <div style={{ paddingTop: '110px', maxWidth: '1200px', margin: '0 auto', padding: '110px 20px 40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <Link href="/admin" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px' }}>← Dashboard</Link>
          <h1 style={{ fontSize: '24px', fontWeight: '700', margin: '4px 0 0', color: '#1e293b' }}>Applications Management</h1>
          <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: '14px' }}>{total} applications total</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {['all', 'pending', 'approved', 'rejected', 'withdrawn'].map(s => (
          <button key={s} onClick={() => { setStatusFilter(s); setPage(1) }}
            style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #e5e7eb', cursor: 'pointer', fontSize: '13px', fontWeight: '500', backgroundColor: statusFilter === s ? '#8b5cf6' : '#fff', color: statusFilter === s ? '#fff' : '#374151', textTransform: 'capitalize' }}>
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
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#64748b', fontSize: '12px' }}>APPLICANT</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#64748b', fontSize: '12px' }}>PROPERTY</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '600', color: '#64748b', fontSize: '12px' }}>STATUS</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#64748b', fontSize: '12px' }}>DATE</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '600', color: '#64748b', fontSize: '12px' }}>DETAILS</th>
                </tr>
              </thead>
              <tbody>
                {items.map(app => (
                  <React.Fragment key={app.id}>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 16px', color: '#64748b' }}>#{app.id}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ fontWeight: '600', color: '#1e293b' }}>{app.renter?.first_name} {app.renter?.last_name}</div>
                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>{app.renter?.email}</div>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#475569' }}>{app.property?.title || `Property #${app.property_id}`}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>{statusBadge(app.status)}</td>
                      <td style={{ padding: '12px 16px', color: '#64748b', fontSize: '13px' }}>{app.created_at ? new Date(app.created_at).toLocaleDateString('fr-CA') : 'N/A'}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <button onClick={() => setExpandedId(expandedId === app.id ? null : app.id)} style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid #e5e7eb', backgroundColor: '#fff', cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: '#475569' }}>
                          {expandedId === app.id ? 'Hide' : 'View'}
                        </button>
                      </td>
                    </tr>
                    {expandedId === app.id && (
                      <tr>
                        <td colSpan="6" style={{ padding: '16px', backgroundColor: '#f8fafc' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                            <div>
                              <strong style={{ fontSize: '12px', color: '#64748b' }}>Lease Type</strong>
                              <p style={{ margin: '4px 0 0', fontSize: '14px' }}>{app.lease_type || 'N/A'}</p>
                            </div>
                            <div>
                              <strong style={{ fontSize: '12px', color: '#64748b' }}>Move-in Date</strong>
                              <p style={{ margin: '4px 0 0', fontSize: '14px' }}>{app.move_in_date || 'N/A'}</p>
                            </div>
                            <div>
                              <strong style={{ fontSize: '12px', color: '#64748b' }}>Monthly Rent</strong>
                              <p style={{ margin: '4px 0 0', fontSize: '14px' }}>${app.property?.set_your_price || 'N/A'}</p>
                            </div>
                            <div>
                              <strong style={{ fontSize: '12px', color: '#64748b' }}>Landlord</strong>
                              <p style={{ margin: '4px 0 0', fontSize: '14px' }}>{app.property?.user?.first_name} {app.property?.user?.last_name}</p>
                            </div>
                            {app.message && (
                              <div style={{ gridColumn: 'span 2' }}>
                                <strong style={{ fontSize: '12px', color: '#64748b' }}>Message</strong>
                                <p style={{ margin: '4px 0 0', fontSize: '14px' }}>{app.message}</p>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
                {items.length === 0 && (
                  <tr><td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>No applications found</td></tr>
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

export default AdminApplications
