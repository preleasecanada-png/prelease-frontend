import React from 'react'

const CommunityForum = () => {
    const topics = [
        { title: 'Getting started on Prelease', count: 125, desc: 'New to Prelease Canada? Ask your first questions and get help from the community.' },
        { title: 'Landlord tips & tricks', count: 342, desc: 'Share best practices for listing, pricing, and managing tenants.' },
        { title: 'Tenant advice', count: 287, desc: 'Find advice on applying, negotiating, and settling into your new home.' },
        { title: 'Legal & taxes', count: 94, desc: 'Understand Canadian rental laws, taxes, and landlord obligations.' },
        { title: 'Regional discussions', count: 211, desc: 'Talk about the rental market in your city — Toronto, Montréal, Vancouver, Calgary and more.' },
        { title: 'Product feedback', count: 58, desc: 'Help us improve Prelease Canada — share your ideas and feature requests.' },
    ]

    return (
        <section style={{ maxWidth: 1100, margin: '40px auto 80px', padding: '0 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
                <h1 style={{ fontSize: 40, fontWeight: 700, marginBottom: 12 }}>Community Forum</h1>
                <p style={{ color: '#6a6a6a', fontSize: 17 }}>
                    Connect with thousands of Canadian renters and landlords. Share experiences, ask questions, get answers.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
                {topics.map((t, i) => (
                    <div
                        key={i}
                        style={{
                            padding: 24,
                            border: '1px solid #e0e0e0',
                            borderRadius: 16,
                            background: '#fff',
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                            <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>{t.title}</h3>
                            <span style={{ fontSize: 12, background: '#FFF2F4', color: '#FF385C', padding: '4px 10px', borderRadius: 999 }}>{t.count} posts</span>
                        </div>
                        <p style={{ color: '#6a6a6a', fontSize: 14, lineHeight: 1.5 }}>{t.desc}</p>
                    </div>
                ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: 60, padding: 40, background: '#F7F7F7', borderRadius: 16 }}>
                <h3 style={{ fontSize: 22, marginBottom: 8 }}>Our forum is launching soon!</h3>
                <p style={{ color: '#6a6a6a', marginBottom: 16 }}>
                    We are building a community space where renters and landlords can share and learn. In the meantime, you can reach out to our support team.
                </p>
                <a href="/contact" style={{ display: 'inline-block', background: '#FF385C', color: '#fff', padding: '12px 28px', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>
                    Contact support
                </a>
            </div>
        </section>
    )
}

export default CommunityForum
