import React, { useEffect, useState } from 'react'
import { authFetch } from '@/Helper/helper'
import Link from 'next/link'
import { useRouter } from 'next/router'

const StatCard = ({ label, value, color, icon, href }) => (
  <Link href={href || '#'} style={{ textDecoration: 'none', flex: 1, minWidth: '200px' }}>
    <div style={{
      background: '#fff', borderRadius: '16px', border: '1px solid #eee',
      padding: '24px', transition: 'box-shadow 0.2s', cursor: 'pointer',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: '13px', color: '#666', fontWeight: 500, marginBottom: '8px' }}>{label}</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: color || '#000' }}>{value ?? 0}</div>
        </div>
        <div style={{
          width: '48px', height: '48px', borderRadius: '12px',
          background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '24px',
        }}>
          {icon}
        </div>
      </div>
    </div>
  </Link>
)

const Dashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState('')
  const [userName, setUserName] = useState('')
  const router = useRouter()

  useEffect(() => {
    const r = (localStorage.getItem('role') || '').toLowerCase()
    const n = localStorage.getItem('user_name') || ''
    setRole(r)
    setUserName(n)
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await authFetch('/dashboard/stats')
      if (res?.status === 200) {
        setStats(res.data)
      }
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const isHost = role === 'host' || role === 'landlord' || role === 'admin'

  if (loading) {
    return (
      <section className="container py-5" style={{ paddingTop: '120px' }}>
        <div className="text-center py-5">
          <div className="spinner-border text-danger" role="status" />
          <p className="mt-3 text-muted">Loading dashboard...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="container" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
      {/* Welcome */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#1e293b', margin: 0 }}>
          Welcome back{userName ? `, ${userName}` : ''}
        </h1>
        <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: '15px' }}>
          {isHost ? 'Here\'s an overview of your properties and activity.' : 'Here\'s an overview of your rental activity.'}
        </p>
      </div>

      {/* Stats Grid */}
      {isHost ? (
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
          <StatCard label="Total Properties" value={stats?.total_properties} color="#D80621" icon="🏠" href="/my-properties" />
          <StatCard label="Active Leases" value={stats?.active_leases} color="#198754" icon="📄" href="/leases" />
          <StatCard label="Pending Applications" value={stats?.pending_applications} color="#f59e0b" icon="📋" href="/applications" />
          <StatCard label="Open Maintenance" value={stats?.open_maintenance} color="#dc3545" icon="🔧" href="/maintenance" />
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
          <StatCard label="Active Leases" value={stats?.active_leases} color="#198754" icon="📄" href="/leases" />
          <StatCard label="My Applications" value={stats?.my_applications} color="#0d6efd" icon="📋" href="/applications" />
          <StatCard label="Open Maintenance" value={stats?.open_maintenance} color="#dc3545" icon="🔧" href="/maintenance" />
          <StatCard label="Wishlist" value={stats?.wishlist_count} color="#D80621" icon="❤️" href="/wish-lists" />
        </div>
      )}

      {/* Revenue for hosts */}
      {isHost && stats?.total_revenue !== undefined && (
        <div style={{
          background: 'linear-gradient(135deg, #D80621 0%, #6e0311 100%)',
          borderRadius: '16px', padding: '32px', color: '#fff', marginBottom: '32px',
        }}>
          <div style={{ fontSize: '14px', fontWeight: 500, opacity: 0.8, marginBottom: '8px' }}>Total Revenue</div>
          <div style={{ fontSize: '36px', fontWeight: 800 }}>${Number(stats.total_revenue || 0).toLocaleString()}</div>
          <div style={{ fontSize: '13px', opacity: 0.7, marginTop: '4px' }}>
            From {stats?.completed_payments || 0} completed payments
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', marginBottom: '16px' }}>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {isHost ? (
            <>
              <Link href="/properties" style={quickActionStyle}>+ List New Property</Link>
              <Link href="/applications" style={quickActionStyle}>Review Applications</Link>
              <Link href="/chats" style={quickActionStyle}>Messages</Link>
              <Link href="/reports" style={quickActionStyle}>View Reports</Link>
            </>
          ) : (
            <>
              <Link href="/find-home" style={quickActionStyle}>Find a Home</Link>
              <Link href="/applications" style={quickActionStyle}>My Applications</Link>
              <Link href="/payments" style={quickActionStyle}>Payments</Link>
              <Link href="/chats" style={quickActionStyle}>Messages</Link>
            </>
          )}
        </div>
      </div>

      {/* Recent Activity placeholder */}
      <div style={{
        background: '#fff', borderRadius: '16px', border: '1px solid #eee',
        padding: '32px', textAlign: 'center', color: '#94a3b8',
      }}>
        <div style={{ fontSize: '36px', marginBottom: '12px' }}>📊</div>
        <p style={{ fontWeight: 600, color: '#64748b' }}>Activity feed coming soon</p>
        <p style={{ fontSize: '14px' }}>Your recent notifications and actions will appear here.</p>
      </div>
    </section>
  )
}

const quickActionStyle = {
  display: 'inline-flex', alignItems: 'center', gap: '6px',
  padding: '10px 20px', background: '#fff', color: '#1e293b',
  borderRadius: '10px', fontWeight: 600, fontSize: '14px',
  textDecoration: 'none', border: '1px solid #e2e8f0',
  transition: 'all 0.2s',
}

export default Dashboard
