import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/router'

const AdminSupport = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState(null)
  const [replyText, setReplyText] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('role') !== 'admin') { router.push('/'); return }
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/admin/support`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data?.status === 200) setItems(data.data?.data || data.data || [])
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  const handleReply = async (ticketId) => {
    if (!replyText.trim()) return
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/admin/support/${ticketId}/respond`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ response: replyText }),
      })
      const data = await res.json()
      if (data?.status === 200) {
        toast.success('Reply sent')
        setReplyText('')
        fetchData()
      } else {
        toast.error('Failed to send reply')
      }
    } catch (err) { toast.error('Something went wrong') }
  }

  const priorityBadge = (priority) => {
    const colors = { low: '#64748b', medium: '#f59e0b', high: '#DC2626', urgent: '#7c3aed' }
    const c = colors[priority] || '#64748b'
    return <span style={{ fontSize: '11px', fontWeight: '600', padding: '4px 10px', borderRadius: '20px', backgroundColor: `${c}15`, color: c, textTransform: 'capitalize' }}>{priority || 'normal'}</span>
  }

  return (
    <div style={{ paddingTop: '110px', maxWidth: '1200px', margin: '0 auto', padding: '110px 20px 40px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Link href="/admin" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px' }}>← Dashboard</Link>
        <h1 style={{ fontSize: '24px', fontWeight: '700', margin: '4px 0 0', color: '#1e293b' }}>Support Tickets</h1>
        <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: '14px' }}>{items.length} tickets</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}><div className="spinner-border text-danger" role="status" /></div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {items.map(t => (
            <div key={t.id} style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
              <div onClick={() => setExpandedId(expandedId === t.id ? null : t.id)} style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                <div>
                  <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '15px' }}>{t.subject}</div>
                  <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
                    {t.user?.first_name} {t.user?.last_name} — {t.created_at ? new Date(t.created_at).toLocaleDateString('fr-CA') : ''}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {priorityBadge(t.priority)}
                  <span style={{ fontSize: '11px', fontWeight: '600', padding: '4px 10px', borderRadius: '20px', backgroundColor: t.status === 'open' ? '#fef2f2' : t.status === 'resolved' ? '#ecfdf5' : '#f0f9ff', color: t.status === 'open' ? '#DC2626' : t.status === 'resolved' ? '#059669' : '#3b82f6', textTransform: 'capitalize' }}>{t.status}</span>
                  <span style={{ fontSize: '18px', color: '#ccc' }}>{expandedId === t.id ? '▲' : '▼'}</span>
                </div>
              </div>
              {expandedId === t.id && (
                <div style={{ padding: '0 20px 20px', borderTop: '1px solid #f1f5f9' }}>
                  <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', margin: '12px 0', fontSize: '14px', color: '#333', lineHeight: '1.6' }}>{t.message}</div>
                  {t.admin_response && (
                    <div style={{ padding: '16px', background: '#ecfdf5', borderRadius: '8px', marginBottom: '12px', fontSize: '14px', color: '#059669', borderLeft: '3px solid #059669' }}>
                      <strong>Admin response:</strong> {t.admin_response}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input type="text" value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Write a reply..." style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '14px', outline: 'none' }} />
                    <button onClick={() => handleReply(t.id)} style={{ padding: '10px 20px', backgroundColor: '#059669', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>Reply</button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {items.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px', background: '#f9f9f9', borderRadius: '16px', color: '#999' }}>No support tickets found</div>
          )}
        </div>
      )}
    </div>
  )
}

export default AdminSupport
