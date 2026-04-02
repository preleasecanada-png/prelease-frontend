import React, { useEffect, useState } from 'react'
import { authFetch, imageBaseUrl } from '@/Helper/helper'
import Link from 'next/link'
import { useRouter } from 'next/router'

const AdminDashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
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

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '30px' }}>
        <StatCard label="Total Users" value={stats.total_users} icon="👥" color="#3b82f6" />
        <StatCard label="Hosts" value={stats.total_hosts} icon="🏠" color="#059669" />
        <StatCard label="Renters" value={stats.total_renters} icon="🔑" color="#8b5cf6" />
        <StatCard label="Admins" value={stats.total_admins} icon="🛡️" color="#D80621" />
        <StatCard label="Properties" value={stats.total_properties} icon="🏢" color="#f59e0b" />
        <StatCard label="Images" value={stats.total_images} icon="📷" color="#06b6d4" />
      </div>

      {/* Monthly Registrations Chart */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#1e293b' }}>Monthly Registrations</h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '160px' }}>
          {stats.monthly_users?.map((m, i) => {
            const maxCount = Math.max(...stats.monthly_users.map(x => x.count), 1)
            const height = Math.max((m.count / maxCount) * 130, 4)
            return (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{m.count}</span>
                <div style={{ width: '100%', maxWidth: '60px', height: `${height}px`, backgroundColor: '#D80621', borderRadius: '6px 6px 0 0', transition: 'height 0.5s ease' }} />
                <span style={{ fontSize: '11px', color: '#64748b' }}>{m.month}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent Users & Properties */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        {/* Recent Users */}
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

        {/* Recent Properties */}
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
  <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
    <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
      {icon}
    </div>
    <div>
      <div style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b' }}>{value}</div>
      <div style={{ fontSize: '13px', color: '#64748b' }}>{label}</div>
    </div>
  </div>
)

export default AdminDashboard
