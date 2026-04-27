import React from 'react'

const HostingResources = () => {
    const resources = [
        { title: 'Getting started as a landlord', desc: 'Learn how to create your first listing, price it correctly, and attract qualified tenants.', link: '/prelease-your-home' },
        { title: 'Tenant screening best practices', desc: 'Discover how to evaluate applications, run credit checks, and verify references while respecting applicants’ rights.', link: '/hosting-responsibly' },
        { title: 'Lease agreement guide', desc: 'Everything you need to know about creating a legally compliant Canadian lease agreement.', link: '/help-center' },
        { title: 'Canadian provincial tenancy laws', desc: 'A summary of the main rules in Ontario, Quebec, British Columbia, Alberta, and other provinces.', link: '/hosting-responsibly' },
        { title: 'Handling maintenance requests', desc: 'Best practices for responding to repair requests and managing contractors.', link: '/help-center' },
        { title: 'Protecting your property', desc: 'Find out how Pre-Cover insurance can protect you from damages and missed payments.', link: '/insurance' },
    ]

    return (
        <section style={{ maxWidth: 1100, margin: '40px auto 80px', padding: '0 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
                <h1 style={{ fontSize: 40, fontWeight: 700, marginBottom: 12 }}>Hosting resources</h1>
                <p style={{ color: '#6a6a6a', fontSize: 17 }}>
                    Everything you need to become a confident and successful landlord on Prelease Canada.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
                {resources.map((r, i) => (
                    <a
                        key={i}
                        href={r.link}
                        style={{
                            display: 'block',
                            padding: 24,
                            border: '1px solid #e0e0e0',
                            borderRadius: 16,
                            textDecoration: 'none',
                            color: '#222',
                            background: '#fff',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.08)')}
                        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
                    >
                        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{r.title}</h3>
                        <p style={{ color: '#6a6a6a', fontSize: 14, lineHeight: 1.5 }}>{r.desc}</p>
                        <div style={{ marginTop: 16, color: '#FF385C', fontWeight: 600 }}>Read more →</div>
                    </a>
                ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: 60, padding: 40, background: '#F7F7F7', borderRadius: 16 }}>
                <h3 style={{ fontSize: 22, marginBottom: 8 }}>Ready to list your property?</h3>
                <p style={{ color: '#6a6a6a', marginBottom: 16 }}>Start earning from your rental in just a few minutes.</p>
                <a href="/prelease-your-home" style={{ display: 'inline-block', background: '#FF385C', color: '#fff', padding: '12px 28px', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>
                    Prelease your home
                </a>
            </div>
        </section>
    )
}

export default HostingResources
