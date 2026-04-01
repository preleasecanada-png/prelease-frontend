import React, { useEffect, useState } from 'react'
import { authFetch } from '@/Helper/helper'
import toast from 'react-hot-toast'
import Link from 'next/link'

const Notifications = () => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      const data = await authFetch('/notifications')
      if (data?.status === 200) {
        setNotifications(data.data?.data || [])
        setUnreadCount(data.unread_count || 0)
      }
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('token')
      await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/notifications/${id}/read`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, is_read: true } : n)
      )
      setUnreadCount(prev => Math.max(0, prev - 1))
    } catch (err) {
      console.error(err)
    }
  }

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem('token')
      await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/notifications/mark-all-read`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })))
      setUnreadCount(0)
      toast.success('All notifications marked as read')
    } catch (err) {
      console.error(err)
    }
  }

  const deleteNotification = async (id) => {
    try {
      const token = localStorage.getItem('token')
      await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/notifications/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      setNotifications(prev => prev.filter(n => n.id !== id))
      toast.success('Notification deleted')
    } catch (err) {
      console.error(err)
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'application': return '📋'
      case 'lease': return '📝'
      case 'payment': return '💳'
      case 'maintenance': return '🔧'
      case 'system': return '⚙️'
      default: return '🔔'
    }
  }

  const getTypeBadgeColor = (type) => {
    switch (type) {
      case 'application': return '#2563EB'
      case 'lease': return '#059669'
      case 'payment': return '#D97706'
      case 'maintenance': return '#DC2626'
      case 'system': return '#6B7280'
      default: return '#D80621'
    }
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diff = now - date
    const mins = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)
    if (mins < 1) return 'Just now'
    if (mins < 60) return `${mins}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
  }

  if (loading) {
    return (
      <section className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="mb-1" style={{ fontSize: '28px', fontWeight: '700' }}>Notifications</h1>
              {unreadCount > 0 && (
                <span style={{ color: '#D80621', fontSize: '14px', fontWeight: '600' }}>
                  {unreadCount} unread
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                style={{ background: 'none', border: '2px solid #D80621', color: '#D80621', padding: '8px 16px', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}
              >
                Mark all as read
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="text-center py-5">
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔔</div>
              <h5 className="text-muted">No notifications yet</h5>
              <p className="text-muted">You'll be notified about important updates here</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {notifications.map(notification => (
                <div
                  key={notification.id}
                  onClick={() => !notification.is_read && markAsRead(notification.id)}
                  style={{
                    padding: '16px 20px',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    backgroundColor: notification.is_read ? '#fff' : '#FEF2F2',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative',
                  }}
                >
                  <div className="d-flex align-items-start gap-3">
                    <div style={{ fontSize: '24px', flexShrink: 0 }}>
                      {getTypeIcon(notification.type)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 style={{ marginBottom: '4px', fontWeight: notification.is_read ? '500' : '700', fontSize: '15px' }}>
                            {notification.title}
                          </h6>
                          <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '12px', color: '#fff', backgroundColor: getTypeBadgeColor(notification.type) }}>
                            {notification.type}
                          </span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span style={{ fontSize: '12px', color: '#9CA3AF', whiteSpace: 'nowrap' }}>
                            {formatDate(notification.created_at)}
                          </span>
                          {!notification.is_read && (
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#D80621', flexShrink: 0 }} />
                          )}
                        </div>
                      </div>
                      <p style={{ margin: '8px 0 0', color: '#6B7280', fontSize: '14px', lineHeight: '1.5' }}>
                        {notification.message}
                      </p>
                      {notification.link && (
                        <Link href={notification.link} style={{ color: '#D80621', fontSize: '13px', fontWeight: '600', textDecoration: 'none', marginTop: '6px', display: 'inline-block' }}>
                          View details →
                        </Link>
                      )}
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteNotification(notification.id); }}
                      style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', fontSize: '18px', padding: '0', lineHeight: '1' }}
                      title="Delete"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Notifications
