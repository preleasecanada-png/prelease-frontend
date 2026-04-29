import React, { useEffect, useState } from 'react'
import { authFetch } from '@/Helper/helper'
import { useRouter } from 'next/router'
import Link from 'next/link'

const LandlordReports = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const role = localStorage.getItem('role')?.toLowerCase()
    const isLandlord = role === 'host' || role === 'admin' || role === 'landlord'
    if (!isLandlord) {
      router.push('/')
      return
    }
    fetchReport()
  }, [])

  const fetchReport = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/dashboard/landlord-report`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await res.json()
      if (json?.status === 200) setData(json.data)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <section className="container py-5">
        <div className="text-center"><div className="spinner-border text-danger" role="status" /></div>
      </section>
    )
  }

  if (!data) {
    return (
      <section className="container py-5">
        <div className="text-center" style={{ color: '#64748b' }}>
          <h2>No report data available</h2>
        </div>
      </section>
    )
  }

  const maxRev = Math.max(...(data.monthly_revenue?.map(m => m.amount) || [0]), 1)

  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-11">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 700 }}>Landlord Reports</h1>
              <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>Property performance and financial overview</p>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="rpt-cards">
            <div className="rpt-card">
              <div className="rpt-card-icon" style={{ background: '#ecfdf5' }}>💰</div>
              <div><div className="rpt-card-val">${(data.total_earned || 0).toLocaleString()}</div><div className="rpt-card-label">Total Earned</div></div>
            </div>
            <div className="rpt-card">
              <div className="rpt-card-icon" style={{ background: '#f0f9ff' }}>🏠</div>
              <div><div className="rpt-card-val">{data.properties?.length || 0}</div><div className="rpt-card-label">Properties</div></div>
            </div>
            <div className="rpt-card">
              <div className="rpt-card-icon" style={{ background: '#fef3c7' }}>📄</div>
              <div><div className="rpt-card-val">{data.active_leases || 0} / {data.total_leases || 0}</div><div className="rpt-card-label">Active / Total Leases</div></div>
            </div>
            <div className="rpt-card">
              <div className="rpt-card-icon" style={{ background: '#fef2f2' }}>🔧</div>
              <div><div className="rpt-card-val">{data.maintenance?.open || 0}</div><div className="rpt-card-label">Open Maintenance</div></div>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="rpt-section">
            <h3 className="rpt-section-title">Monthly Revenue</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '160px' }}>
              {data.monthly_revenue?.map((m, i) => {
                const h = Math.max((m.amount / maxRev) * 130, 4)
                return (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#1e293b' }}>${m.amount}</span>
                    <div style={{ width: '100%', maxWidth: '60px', height: `${h}px`, background: 'linear-gradient(180deg, #D80621, #ff4d6d)', borderRadius: '6px 6px 0 0', transition: 'height 0.5s' }} />
                    <span style={{ fontSize: '10px', color: '#64748b' }}>{m.month}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Application Funnel + Maintenance */}
          <div className="rpt-row">
            <div className="rpt-section" style={{ flex: 1 }}>
              <h3 className="rpt-section-title">Application Funnel</h3>
              {[
                { label: 'Total Received', val: data.application_funnel?.total || 0, color: '#3b82f6', pct: 100 },
                { label: 'Pending', val: data.application_funnel?.pending || 0, color: '#f59e0b', pct: data.application_funnel?.total ? (data.application_funnel.pending / data.application_funnel.total * 100) : 0 },
                { label: 'Approved', val: data.application_funnel?.approved || 0, color: '#059669', pct: data.application_funnel?.total ? (data.application_funnel.approved / data.application_funnel.total * 100) : 0 },
                { label: 'Rejected', val: data.application_funnel?.rejected || 0, color: '#DC2626', pct: data.application_funnel?.total ? (data.application_funnel.rejected / data.application_funnel.total * 100) : 0 },
              ].map((item, i) => (
                <div key={i} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600 }}>{item.label}</span>
                    <span style={{ color: '#64748b' }}>{item.val} ({Math.round(item.pct)}%)</span>
                  </div>
                  <div style={{ height: '8px', background: '#f0f0f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${item.pct}%`, background: item.color, borderRadius: '4px', transition: 'width 0.5s' }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="rpt-section" style={{ flex: 1 }}>
              <h3 className="rpt-section-title">Maintenance Summary</h3>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                <div style={{ flex: 1, textAlign: 'center', padding: '16px', background: '#fef2f2', borderRadius: '10px' }}>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#DC2626' }}>{data.maintenance?.open || 0}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Open</div>
                </div>
                <div style={{ flex: 1, textAlign: 'center', padding: '16px', background: '#ecfdf5', borderRadius: '10px' }}>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#059669' }}>{data.maintenance?.resolved || 0}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Resolved</div>
                </div>
                <div style={{ flex: 1, textAlign: 'center', padding: '16px', background: '#f0f9ff', borderRadius: '10px' }}>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#3b82f6' }}>{data.maintenance?.total || 0}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Total</div>
                </div>
              </div>
              {data.maintenance?.total > 0 && (
                <div style={{ height: '8px', background: '#f0f0f0', borderRadius: '4px', overflow: 'hidden', display: 'flex' }}>
                  <div style={{ height: '100%', width: `${(data.maintenance.resolved / data.maintenance.total) * 100}%`, background: '#059669' }} />
                  <div style={{ height: '100%', width: `${(data.maintenance.open / data.maintenance.total) * 100}%`, background: '#DC2626' }} />
                </div>
              )}
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px', fontSize: '11px', color: '#666' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#059669', display: 'inline-block' }} /> Resolved</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#DC2626', display: 'inline-block' }} /> Open</span>
              </div>
            </div>
          </div>

          {/* Property Performance Table */}
          <div className="rpt-section">
            <h3 className="rpt-section-title">Property Performance</h3>
            {data.properties?.length > 0 ? (
              <div style={{ overflowX: 'auto' }}>
                <table className="rpt-table">
                  <thead>
                    <tr>
                      <th>Property</th>
                      <th>City</th>
                      <th>Price/mo</th>
                      <th>Bookings</th>
                      <th>Applications</th>
                      <th>Rating</th>
                      <th>Earned</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.properties.map(p => (
                      <tr key={p.id}>
                        <td style={{ fontWeight: 600 }}>{p.title || 'Untitled'}</td>
                        <td>{p.city || '—'}</td>
                        <td>${p.set_your_price}</td>
                        <td>{p.bookings_count || 0} <span style={{ color: '#999', fontSize: '11px' }}>({p.active_bookings_count || 0} active)</span></td>
                        <td>{p.app_count || 0}</td>
                        <td>
                          {p.avg_rating > 0 ? (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="#D80621" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                              {p.avg_rating} <span style={{ color: '#999', fontSize: '11px' }}>({p.review_count})</span>
                            </span>
                          ) : '—'}
                        </td>
                        <td style={{ fontWeight: 700, color: '#059669' }}>${(p.total_earned || 0).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p style={{ color: '#999', fontSize: '14px' }}>No properties listed yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default LandlordReports
