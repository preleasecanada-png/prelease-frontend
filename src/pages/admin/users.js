import React, { useEffect, useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/router'

const AdminUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [total, setTotal] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const role = localStorage.getItem('role')
    if (role !== 'admin') {
      router.push('/')
      return
    }
    fetchUsers()
  }, [page, roleFilter])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const params = new URLSearchParams({ page, per_page: 15 })
      if (roleFilter !== 'all') params.append('role', roleFilter)
      if (search) params.append('search', search)

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/admin/users?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data?.status === 200) {
        setUsers(data.data.data || [])
        setLastPage(data.data.last_page || 1)
        setTotal(data.data.total || 0)
      }
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1)
    fetchUsers()
  }

  const changeRole = async (userId, newRole) => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/admin/users/${userId}/role`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
      })
      const data = await res.json()
      if (data?.status === 200) {
        toast.success(`Role updated to ${newRole}`)
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u))
      } else {
        toast.error(data?.error || 'Failed to update role')
      }
    } catch (err) {
      toast.error('Something went wrong')
    }
  }

  const deleteUser = async (userId, email) => {
    if (!confirm(`Are you sure you want to delete ${email}? This will also delete all their properties.`)) return
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data?.status === 200) {
        toast.success('User deleted')
        setUsers(prev => prev.filter(u => u.id !== userId))
        setTotal(prev => prev - 1)
      } else {
        toast.error(data?.error || 'Failed to delete')
      }
    } catch (err) {
      toast.error('Something went wrong')
    }
  }

  const roleBadge = (role) => {
    const styles = {
      admin: { bg: '#fef2f2', color: '#D80621' },
      host: { bg: '#ecfdf5', color: '#059669' },
      renter: { bg: '#f0f9ff', color: '#3b82f6' },
    }
    const s = styles[role] || styles.renter
    return (
      <span style={{ fontSize: '11px', fontWeight: '600', padding: '4px 10px', borderRadius: '20px', backgroundColor: s.bg, color: s.color, textTransform: 'capitalize' }}>
        {role}
      </span>
    )
  }

  return (
    <div style={{ paddingTop: '110px', paddingBottom: '40px', maxWidth: '1200px', margin: '0 auto', padding: '110px 20px 40px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <Link href="/admin" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px' }}>← Dashboard</Link>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', margin: 0, color: '#1e293b' }}>User Management</h1>
          <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: '14px' }}>{total} users total</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', flex: 1, minWidth: '250px' }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '14px', outline: 'none' }}
          />
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#1e293b', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>
            Search
          </button>
        </form>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['all', 'host', 'renter', 'admin'].map(r => (
            <button
              key={r}
              onClick={() => { setRoleFilter(r); setPage(1) }}
              style={{
                padding: '8px 16px', borderRadius: '20px', border: '1px solid #e5e7eb', cursor: 'pointer', fontSize: '13px', fontWeight: '500',
                backgroundColor: roleFilter === r ? '#D80621' : '#fff',
                color: roleFilter === r ? '#fff' : '#374151',
                textTransform: 'capitalize',
              }}
            >
              {r === 'all' ? 'All' : r + 's'}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div className="spinner-border text-danger" role="status" />
        </div>
      ) : (
        <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>User</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>Email</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '600', color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>Role</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>Joined</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '600', color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ fontWeight: '600', color: '#1e293b' }}>{user.first_name} {user.last_name}</div>
                      <div style={{ fontSize: '12px', color: '#94a3b8' }}>ID: {user.id}</div>
                    </td>
                    <td style={{ padding: '12px 16px', color: '#475569' }}>{user.email}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      <select
                        value={user.role}
                        onChange={(e) => changeRole(user.id, e.target.value)}
                        style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #e5e7eb', fontSize: '13px', cursor: 'pointer', fontWeight: '500' }}
                      >
                        <option value="host">Host</option>
                        <option value="renter">Renter</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td style={{ padding: '12px 16px', color: '#64748b', fontSize: '13px' }}>
                      {user.created_at ? new Date(user.created_at).toLocaleDateString('fr-CA') : 'N/A'}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                        <Link href={`/admin/users/${user.id}`} style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid #3b82f6', color: '#3b82f6', backgroundColor: '#fff', fontSize: '12px', fontWeight: '600', textDecoration: 'none' }}>
                          Details
                        </Link>
                        <button
                          onClick={() => deleteUser(user.id, user.email)}
                          style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid #DC2626', color: '#DC2626', backgroundColor: '#fff', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {lastPage > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', padding: '16px', borderTop: '1px solid #f1f5f9' }}>
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #e5e7eb', backgroundColor: '#fff', cursor: page === 1 ? 'default' : 'pointer', opacity: page === 1 ? 0.5 : 1, fontSize: '13px' }}
              >
                Previous
              </button>
              <span style={{ padding: '8px 12px', fontSize: '13px', color: '#64748b' }}>
                Page {page} of {lastPage}
              </span>
              <button
                onClick={() => setPage(p => Math.min(lastPage, p + 1))}
                disabled={page === lastPage}
                style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #e5e7eb', backgroundColor: '#fff', cursor: page === lastPage ? 'default' : 'pointer', opacity: page === lastPage ? 0.5 : 1, fontSize: '13px' }}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AdminUsers
