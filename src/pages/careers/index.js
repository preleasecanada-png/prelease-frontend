import React from 'react'

const Careers = () => {
    return (
        <section style={{ maxWidth: 900, margin: '40px auto 80px', padding: '0 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
                <h1 style={{ fontSize: 40, fontWeight: 700, marginBottom: 12 }}>Careers at Prelease Canada</h1>
                <p style={{ color: '#6a6a6a', fontSize: 17 }}>
                    Help us reshape the rental experience across Canada.
                </p>
            </div>

            <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>Who we are</h2>
                <p style={{ color: '#444', lineHeight: 1.7 }}>
                    Prelease Canada is a fast-growing Canadian PropTech company on a mission to connect renters and landlords in the simplest, most transparent way possible. We are building a modern platform, a world-class AI assistant, and a community of trust.
                </p>
            </div>

            <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>Why join us?</h2>
                <ul style={{ color: '#444', lineHeight: 1.8, paddingLeft: 22 }}>
                    <li>Meaningful work that impacts thousands of Canadians looking for a home.</li>
                    <li>100% remote-friendly culture with flexible hours.</li>
                    <li>Competitive salary, health benefits, and equity options.</li>
                    <li>Learning budget and career-growth opportunities.</li>
                    <li>A small but passionate team where your voice truly matters.</li>
                </ul>
            </div>

            <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>Open positions</h2>
                <div style={{ padding: 28, border: '1px dashed #e0e0e0', borderRadius: 12, textAlign: 'center', color: '#6a6a6a' }}>
                    <p style={{ marginBottom: 12, fontSize: 16 }}>We don’t have any open positions at the moment.</p>
                    <p>But we are always looking for exceptional talent. Send your resume to <a href="mailto:careers@preleasecanada.ca" style={{ color: '#FF385C' }}>careers@preleasecanada.ca</a> and we’ll keep you in mind.</p>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: 60, padding: 40, background: '#F7F7F7', borderRadius: 16 }}>
                <h3 style={{ fontSize: 22, marginBottom: 8 }}>Questions about working at Prelease?</h3>
                <p style={{ color: '#6a6a6a', marginBottom: 16 }}>Reach out to our team — we’d love to hear from you.</p>
                <a href="/contact" style={{ display: 'inline-block', background: '#FF385C', color: '#fff', padding: '12px 28px', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>
                    Contact us
                </a>
            </div>
        </section>
    )
}

export default Careers
