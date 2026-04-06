import React, { useEffect, useState } from 'react'
import { authFetch, imageBaseUrl } from '@/Helper/helper'
import Link from 'next/link'
import { useRouter } from 'next/router'

const AdminDashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeChart, setActiveChart] = useState('users')
  const router = useRouter()

  useEffect(() => {
    const role = localStorage.getItem('role')
    if (role !== 'admin') {
      router.push('/')
      return
    }
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data?.status === 200) {
        setStats(data.data)
      }
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div style={{ paddingTop: '120px', textAlign: 'center' }}>
        <div className="spinner-border text-danger" role="status" />
      </div>
    )
  }

  if (!stats) {
    return (
      <div style={{ paddingTop: '120px', textAlign: 'center', color: '#64748b' }}>
        <h2>Access Denied</h2>
        <p>You do not have admin permissions.</p>
      </div>
    )
  }

  const chartData = activeChart === 'users' ? stats.monthly_users : activeChart === 'revenue' ? stats.monthly_revenue : stats.monthly_listings
  const chartKey = activeChart === 'revenue' ? 'amount' : 'count'
  const chartPrefix = activeChart === 'revenue' ? '$' : ''
  const chartColor = activeChart === 'users' ? '#D80621' : activeChart === 'revenue' ? '#059669' : '#3b82f6'

  return (
    <div style={{ paddingTop: '110px', paddingBottom: '40px', maxWidth: '1200px', margin: '0 auto', padding: '110px 20px 40px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', margin: 0, color: '#1e293b' }}>Admin Dashboard</h1>
          <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: '14px' }}>Platform overview and management</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link href="/admin/users" style={{ backgroundColor: '#D80621', color: '#fff', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', textDecoration: 'none', fontSize: '14px' }}>
            Manage Users
          </Link>
          <Link href="/admin/properties" style={{ backgroundColor: '#1e293b', color: '#fff', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', textDecoration: 'none', fontSize: '14px' }}>
            Manage Properties
          </Link>
        </div>
      </div>

      {/* Stats Cards Row 1 - Users */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '14px', marginBottom: '14px' }}>
        <StatCard label="Total Users" value={stats.total_users} icon="👥" color="#3b82f6" />
        <StatCard label="Hosts" value={stats.total_hosts} icon="🏠" color="#059669" />
        <StatCard label="Renters" value={stats.total_renters} icon="🔑" color="#8b5cf6" />
        <StatCard label="Properties" value={stats.total_properties} icon="🏢" color="#f59e0b" />
      </div>

      {/* Stats Cards Row 2 - Business */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        <StatCard label="Revenue" value={`$${(stats.total_revenue || 0).toLocaleString()}`} icon="💰" color="#059669" />
        <StatCard label="Commission" value={`$${(stats.total_commission || 0).toLocaleString()}`} icon="�" color="#06b6d4" />
        <StatCard label="Active Leases" value={stats.active_leases || 0} icon="📄" color="#8b5cf6" />
        <StatCard label="Applications" value={stats.total_applications || 0} icon="📋" color="#f59e0b" />
        <StatCard label="Open Maintenance" value={stats.open_maintenance || 0} icon="🔧" color="#DC2626" />
      </div>

      {/* Charts Section */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', margin: 0 }}>Monthly Trends</h3>
          <div style={{ display: 'flex', gap: '6px' }}>
            {[{ k: 'users', l: 'Registrations' }, { k: 'revenue', l: 'Revenue' }, { k: 'listings', l: 'Listings' }].map(t => (
              <button key={t.k} onClick={() => setActiveChart(t.k)}
                style={{ padding: '6px 14px', borderRadius: '20px', border: '1px solid', borderColor: activeChart === t.k ? '#D80621' : '#ddd', background: activeChart === t.k ? '#D80621' : '#fff', color: activeChart === t.k ? '#fff' : '#666', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                {t.l}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '160px' }}>
          {chartData?.map((m, i) => {
            const maxVal = Math.max(...chartData.map(x => x[chartKey]), 1)
            const height = Math.max((m[chartKey] / maxVal) * 130, 4)
            return (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#1e293b' }}>{chartPrefix}{m[chartKey]}</span>
                <div style={{ width: '100%', maxWidth: '60px', height: `${height}px`, backgroundColor: chartColor, borderRadius: '6px 6px 0 0', transition: 'height 0.5s ease' }} />
                <span style={{ fontSize: '10px', color: '#64748b' }}>{m.month}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Application Funnel + Top Cities */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        {/* Application Funnel */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', marginBottom: '16px' }}>Application Funnel</h3>
          {[
            { label: 'Total', value: stats.total_applications || 0, color: '#3b82f6', pct: 100 },
            { label: 'Pending', value: stats.pending_applications || 0, color: '#f59e0b', pct: stats.total_applications ? ((stats.pending_applications / stats.total_applications) * 100) : 0 },
            { label: 'Approved', value: stats.approved_applications || 0, color: '#059669', pct: stats.total_applications ? ((stats.approved_applications / stats.total_applications) * 100) : 0 },
            { label: 'Rejected', value: stats.rejected_applications || 0, color: '#DC2626', pct: stats.total_applications ? ((stats.rejected_applications / stats.total_applications) * 100) : 0 },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600 }}>{item.label}</span>
                <span style={{ color: '#64748b' }}>{item.value} ({Math.round(item.pct)}%)</span>
              </div>
              <div style={{ height: '8px', background: '#f0f0f0', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${item.pct}%`, background: item.color, borderRadius: '4px', transition: 'width 0.5s' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Top Cities */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', marginBottom: '16px' }}>Top Cities by Listings</h3>
          {stats.top_cities?.length > 0 ? stats.top_cities.map((c, i) => {
            const maxC = stats.top_cities[0]?.count || 1
            return (
              <div key={i} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600 }}>{c.city || 'Unknown'}</span>
                  <span style={{ color: '#64748b' }}>{c.count} properties</span>
                </div>
                <div style={{ height: '8px', background: '#f0f0f0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(c.count / maxC) * 100}%`, background: '#D80621', borderRadius: '4px' }} />
                </div>
              </div>
            )
          }) : <p style={{ color: '#999', fontSize: '14px' }}>No data yet</p>}
        </div>
      </div>

      {/* Recent Users & Properties */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', margin: 0 }}>Recent Users</h3>
            <Link href="/admin/users" style={{ fontSize: '13px', color: '#D80621', textDecoration: 'none', fontWeight: '500' }}>View all →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {stats.recent_users?.map(user => (
              <div key={user.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '14px', color: '#1e293b' }}>{user.first_name} {user.last_name}</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>{user.email}</div>
                </div>
                <span style={{ fontSize: '11px', fontWeight: '600', padding: '4px 10px', borderRadius: '20px', backgroundColor: user.role === 'admin' ? '#fef2f2' : user.role === 'host' ? '#ecfdf5' : '#f0f9ff', color: user.role === 'admin' ? '#D80621' : user.role === 'host' ? '#059669' : '#3b82f6' }}>
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', margin: 0 }}>Recent Properties</h3>
            <Link href="/admin/properties" style={{ fontSize: '13px', color: '#D80621', textDecoration: 'none', fontWeight: '500' }}>View all →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {stats.recent_properties?.map(prop => (
              <div key={prop.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '14px', color: '#1e293b' }}>{prop.title || 'Untitled'}</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>{prop.city}{prop.state ? `, ${prop.state}` : ''} — by {prop.user?.first_name} {prop.user?.last_name}</div>
                </div>
                <span style={{ fontWeight: '700', color: '#D80621', fontSize: '14px' }}>${prop.set_your_price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const StatCard = ({ label, value, icon, color }) => (
  <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
    <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
      {icon}
    </div>
    <div>
      <div style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b' }}>{value}</div>
      <div style={{ fontSize: '12px', color: '#64748b' }}>{label}</div>
    </div>
  </div>
)

export default AdminDashboard
