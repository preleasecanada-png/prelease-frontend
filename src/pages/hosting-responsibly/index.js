import React from 'react'

const HostingResponsibly = () => {
    return (
        <section style={{ maxWidth: 900, margin: '40px auto 80px', padding: '0 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
                <h1 style={{ fontSize: 40, fontWeight: 700, marginBottom: 12 }}>Host responsibly</h1>
                <p style={{ color: '#6a6a6a', fontSize: 17 }}>
                    A guide to becoming a successful and responsible landlord on Prelease Canada.
                </p>
            </div>

            <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>1. Know your local laws</h2>
                <p style={{ color: '#444', lineHeight: 1.7 }}>
                    Each Canadian province has its own residential tenancy legislation (e.g. the <em>Residential Tenancies Act</em>). Make sure you understand your obligations regarding security deposits, lease agreements, maintenance, entry rights, and rent increases before listing your property.
                </p>
            </div>

            <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>2. Provide a safe home</h2>
                <ul style={{ color: '#444', lineHeight: 1.8, paddingLeft: 22 }}>
                    <li>Install functioning smoke and carbon-monoxide detectors on every floor.</li>
                    <li>Keep a working fire extinguisher in the kitchen.</li>
                    <li>Ensure electrical, plumbing, and heating systems are in good condition.</li>
                    <li>Provide secure locks on all exterior doors and windows.</li>
                </ul>
            </div>

            <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>3. Treat every applicant fairly</h2>
                <p style={{ color: '#444', lineHeight: 1.7 }}>
                    Prelease Canada has a strict non-discrimination policy. You must not refuse an application based on race, colour, religion, gender, sexual orientation, family status, disability, or any other protected ground. Base your decisions on objective criteria such as credit, income, and references.
                </p>
            </div>

            <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>4. Communicate clearly</h2>
                <p style={{ color: '#444', lineHeight: 1.7 }}>
                    Answer messages quickly, be honest about the property, and set realistic expectations. Providing photos, floor plans, and accurate descriptions helps tenants make informed decisions and reduces disputes.
                </p>
            </div>

            <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>5. Protect your property</h2>
                <p style={{ color: '#444', lineHeight: 1.7 }}>
                    Consider subscribing to <a href="/insurance" style={{ color: '#FF385C' }}>Pre-Cover</a>, our optional protection plan that covers property damage and unpaid rent. Always conduct an initial and final inspection with your tenant and keep signed documentation of the property's condition.
                </p>
            </div>

            <div style={{ textAlign: 'center', marginTop: 60, padding: 40, background: '#F7F7F7', borderRadius: 16 }}>
                <h3 style={{ fontSize: 22, marginBottom: 8 }}>Ready to become a landlord?</h3>
                <p style={{ color: '#6a6a6a', marginBottom: 16 }}>List your property on Prelease Canada today.</p>
                <a href="/prelease-your-home" style={{ display: 'inline-block', background: '#FF385C', color: '#fff', padding: '12px 28px', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>
                    List my property
                </a>
            </div>
        </section>
    )
}

export default HostingResponsibly
