import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/router'

const AdminUserDetail = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (localStorage.getItem('role') !== 'admin') { router.push('/'); return }
    if (id) fetchUser()
  }, [id])

  const fetchUser = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data?.status === 200) setUser(data.data)
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  const changeRole = async (newRole) => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/admin/users/${id}/role`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      })
      const data = await res.json()
      if (data?.status === 200) {
        toast.success(`Role updated to ${newRole}`)
        setUser(prev => ({ ...prev, role: newRole }))
      }
    } catch (err) { toast.error('Failed to update role') }
  }

  const deleteUser = async () => {
    if (!confirm(`Delete ${user?.email}? This will also delete all their data.`)) return
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/admin/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data?.status === 200) {
        toast.success('User deleted')
        router.push('/admin/users')
      }
    } catch (err) { toast.error('Failed to delete') }
  }

  if (loading) return <div style={{ paddingTop: '120px', textAlign: 'center' }}><div className="spinner-border text-danger" role="status" /></div>
  if (!user) return <div style={{ paddingTop: '120px', textAlign: 'center', color: '#64748b' }}><h2>User not found</h2></div>

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'properties', label: `Properties (${user.properties?.length || 0})` },
    { key: 'applications', label: `Applications (${user.applications?.length || 0})` },
    { key: 'leases', label: `Leases (${user.leases?.length || 0})` },
    { key: 'payments', label: `Payments (${user.payments?.length || 0})` },
  ]

  const statusBadge = (status, type) => {
    const colors = {
      active: '#059669', pending: '#f59e0b', approved: '#059669', rejected: '#DC2626',
      completed: '#059669', confirmed: '#059669', failed: '#DC2626', terminated: '#DC2626',
      pending_signature: '#f59e0b', withdrawn: '#64748b', expired: '#64748b',
    }
    const c = colors[status] || '#64748b'
    return <span style={{ fontSize: '11px', fontWeight: '600', padding: '3px 8px', borderRadius: '20px', backgroundColor: `${c}15`, color: c, textTransform: 'capitalize' }}>{status?.replace(/_/g, ' ')}</span>
  }

  return (
    <div style={{ paddingTop: '110px', maxWidth: '1200px', margin: '0 auto', padding: '110px 20px 40px' }}>
      <Link href="/admin/users" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px' }}>← Back to Users</Link>

      {/* User Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '16px', marginBottom: '30px', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#D80621', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '24px', fontWeight: '700', flexShrink: 0 }}>
            {user.first_name?.charAt(0)?.toUpperCase()}{user.last_name?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '700', margin: 0, color: '#1e293b' }}>{user.first_name} {user.last_name}</h1>
            <p style={{ color: '#64748b', margin: '2px 0', fontSize: '14px' }}>{user.email}</p>
            <p style={{ color: '#94a3b8', margin: '2px 0', fontSize: '13px' }}>Joined {user.created_at ? new Date(user.created_at).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <select value={user.role} onChange={(e) => changeRole(e.target.value)} style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
            <option value="host">Host</option>
            <option value="renter">Renter</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={deleteUser} style={{ padding: '8px 18px', borderRadius: '8px', border: '1px solid #DC2626', color: '#DC2626', backgroundColor: '#fff', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}>Delete User</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', borderBottom: '2px solid #f1f5f9', flexWrap: 'wrap' }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            style={{ padding: '10px 20px', border: 'none', borderBottom: activeTab === t.key ? '3px solid #D80621' : '3px solid transparent', background: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: activeTab === t.key ? '700' : '500', color: activeTab === t.key ? '#D80621' : '#64748b', transition: 'all 0.2s' }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          <InfoCard label="User ID" value={`#${user.id}`} />
          <InfoCard label="Role" value={user.role} />
          <InfoCard label="Email" value={user.email} />
          <InfoCard label="Phone" value={user.phone || 'N/A'} />
          <InfoCard label="Date of Birth" value={user.date_of_birth || 'N/A'} />
          <InfoCard label="Properties" value={user.properties?.length || 0} />
          <InfoCard label="Applications" value={user.applications?.length || 0} />
          <InfoCard label="Leases" value={user.leases?.length || 0} />
          <InfoCard label="Total Payments" value={`$${(user.payments || []).reduce((s, p) => s + Number(p.amount || 0), 0).toLocaleString()}`} />
          <InfoCard label="Verification" value={user.verification_status || 'Not verified'} />
        </div>
      )}

      {activeTab === 'properties' && (
        <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
                <th style={thStyle}>ID</th><th style={thStyle}>TITLE</th><th style={thStyle}>CITY</th><th style={{...thStyle, textAlign: 'right'}}>PRICE</th><th style={thStyle}>DATE</th>
              </tr>
            </thead>
            <tbody>
              {(user.properties || []).map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={tdStyle}>#{p.id}</td>
                  <td style={{ ...tdStyle, fontWeight: '600', color: '#1e293b' }}>{p.title || 'Untitled'}</td>
                  <td style={tdStyle}>{p.city || 'N/A'}</td>
                  <td style={{ ...tdStyle, textAlign: 'right', fontWeight: '700', color: '#D80621' }}>${p.set_your_price}/mo</td>
                  <td style={{ ...tdStyle, color: '#64748b', fontSize: '13px' }}>{p.created_at ? new Date(p.created_at).toLocaleDateString('fr-CA') : 'N/A'}</td>
                </tr>
              ))}
              {(user.properties || []).length === 0 && <tr><td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>No properties</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'applications' && (
        <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
                <th style={thStyle}>ID</th><th style={thStyle}>PROPERTY</th><th style={thStyle}>LEASE TYPE</th><th style={{...thStyle, textAlign: 'center'}}>STATUS</th><th style={thStyle}>DATE</th>
              </tr>
            </thead>
            <tbody>
              {(user.applications || []).map(a => (
                <tr key={a.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={tdStyle}>#{a.id}</td>
                  <td style={{ ...tdStyle, fontWeight: '600', color: '#1e293b' }}>{a.property?.title || `#${a.property_id}`}</td>
                  <td style={tdStyle}>{a.lease_type || 'N/A'}</td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>{statusBadge(a.status)}</td>
                  <td style={{ ...tdStyle, color: '#64748b', fontSize: '13px' }}>{a.created_at ? new Date(a.created_at).toLocaleDateString('fr-CA') : 'N/A'}</td>
                </tr>
              ))}
              {(user.applications || []).length === 0 && <tr><td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>No applications</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'leases' && (
        <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
                <th style={thStyle}>ID</th><th style={thStyle}>PROPERTY</th><th style={{...thStyle, textAlign: 'right'}}>RENT</th><th style={thStyle}>PERIOD</th><th style={{...thStyle, textAlign: 'center'}}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {(user.leases || []).map(l => (
                <tr key={l.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={tdStyle}>#{l.id}</td>
                  <td style={{ ...tdStyle, fontWeight: '600', color: '#1e293b' }}>{l.property?.title || `#${l.property_id}`}</td>
                  <td style={{ ...tdStyle, textAlign: 'right', fontWeight: '700' }}>${Number(l.monthly_rent || 0).toLocaleString()}/mo</td>
                  <td style={{ ...tdStyle, fontSize: '13px', color: '#64748b' }}>{l.start_date} → {l.end_date}</td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>{statusBadge(l.status)}</td>
                </tr>
              ))}
              {(user.leases || []).length === 0 && <tr><td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>No leases</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'payments' && (
        <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
                <th style={thStyle}>ID</th><th style={thStyle}>TYPE</th><th style={{...thStyle, textAlign: 'right'}}>AMOUNT</th><th style={{...thStyle, textAlign: 'center'}}>STATUS</th><th style={thStyle}>DATE</th>
              </tr>
            </thead>
            <tbody>
              {(user.payments || []).map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={tdStyle}>#{p.id}</td>
                  <td style={{ ...tdStyle, textTransform: 'capitalize' }}>{p.payment_type || 'N/A'}</td>
                  <td style={{ ...tdStyle, textAlign: 'right', fontWeight: '700', color: '#059669' }}>${Number(p.amount || 0).toLocaleString()}</td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>{statusBadge(p.status)}</td>
                  <td style={{ ...tdStyle, color: '#64748b', fontSize: '13px' }}>{p.created_at ? new Date(p.created_at).toLocaleDateString('fr-CA') : 'N/A'}</td>
                </tr>
              ))}
              {(user.payments || []).length === 0 && <tr><td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>No payments</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

const thStyle = { padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }
const tdStyle = { padding: '12px 16px', color: '#475569' }

const InfoCard = ({ label, value }) => (
  <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px' }}>
    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>{label}</div>
    <div style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', textTransform: 'capitalize' }}>{value}</div>
  </div>
)

export default AdminUserDetail
