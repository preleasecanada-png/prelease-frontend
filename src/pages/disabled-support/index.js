import React from 'react'

const DisabledSupport = () => {
    return (
        <section style={{ maxWidth: 900, margin: '40px auto 80px', padding: '0 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
                <h1 style={{ fontSize: 40, fontWeight: 700, marginBottom: 12 }}>Accessibility & Disability support</h1>
                <p style={{ color: '#6a6a6a', fontSize: 17 }}>
                    At Prelease Canada, we are committed to making housing accessible for everyone.
                </p>
            </div>

            <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>Accessibility features on listings</h2>
                <p style={{ color: '#444', lineHeight: 1.7 }}>
                    Landlords can indicate accessibility features directly on their listings — including step-free entrances, elevators, wheelchair-accessible bathrooms, wide doorways, grab bars, visual alarms, and accessible parking. Use the filters on our search page to find properties that match your specific needs.
                </p>
            </div>

            <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>Website accessibility</h2>
                <p style={{ color: '#444', lineHeight: 1.7 }}>
                    Our site is built to meet <strong>WCAG 2.1 AA</strong> standards. We continuously improve keyboard navigation, screen-reader compatibility, colour contrast, and text-resizing support. If you experience any difficulty using our website, please let us know.
                </p>
            </div>

            <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>Your rights</h2>
                <p style={{ color: '#444', lineHeight: 1.7 }}>
                    Under the Canadian Human Rights Act and provincial human rights codes, discrimination based on disability is prohibited. Landlords must reasonably accommodate the needs of tenants with disabilities, up to the point of undue hardship. Learn more on our <a href="/anti-discrimination" style={{ color: '#FF385C' }}>Anti-discrimination</a> page.
                </p>
            </div>

            <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>Dedicated support</h2>
                <p style={{ color: '#444', lineHeight: 1.7 }}>
                    If you or someone you know needs help finding an accessible rental or would like to request a reasonable accommodation, our dedicated accessibility support team can assist you. Contact us through the button below — we respond within 24 hours.
                </p>
            </div>

            <div style={{ textAlign: 'center', marginTop: 60, padding: 40, background: '#F7F7F7', borderRadius: 16 }}>
                <h3 style={{ fontSize: 22, marginBottom: 8 }}>Need accessibility assistance?</h3>
                <p style={{ color: '#6a6a6a', marginBottom: 16 }}>Our team is here to help you every step of the way.</p>
                <a href="/contact" style={{ display: 'inline-block', background: '#FF385C', color: '#fff', padding: '12px 28px', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>
                    Contact support
                </a>
            </div>
        </section>
    )
}

export default DisabledSupport
