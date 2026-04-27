import React from 'react'

const CancellationOptions = () => {
    return (
        <section style={{ maxWidth: 900, margin: '40px auto 80px', padding: '0 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
                <h1 style={{ fontSize: 40, fontWeight: 700, marginBottom: 12 }}>Cancellation options</h1>
                <p style={{ color: '#6a6a6a', fontSize: 17 }}>
                    Understand how cancellations work for renters and landlords on Prelease Canada.
                </p>
            </div>

            <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>For Renters</h2>
                <p style={{ color: '#444', lineHeight: 1.7, marginBottom: 16 }}>
                    You may cancel a rental application at any time <strong>before</strong> it is officially accepted by the landlord. Simply go to <em>My applications</em> in your account and click <em>Cancel application</em>. No fees will be charged.
                </p>
                <p style={{ color: '#444', lineHeight: 1.7 }}>
                    Once a lease agreement is signed, cancellations are subject to the terms outlined in your signed lease. Standard lease-break notice periods and provincial tenancy laws apply.
                </p>
            </div>

            <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>For Landlords</h2>
                <p style={{ color: '#444', lineHeight: 1.7, marginBottom: 16 }}>
                    Landlords can reject or withdraw a pending application at any time before signing the lease, free of charge. After a lease is signed, termination must follow the Canadian provincial tenancy regulations applicable to the rental location.
                </p>
                <p style={{ color: '#444', lineHeight: 1.7 }}>
                    You can unpublish or delete your listing at any moment from <em>My properties</em> without affecting any existing active leases.
                </p>
            </div>

            <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>Refund policy</h2>
                <ul style={{ color: '#444', lineHeight: 1.8, paddingLeft: 22 }}>
                    <li>Application fees (if any) are fully refundable before the landlord reviews the application.</li>
                    <li>Deposit refunds are processed within 5 business days after the lease end-date, minus any amounts owed under the lease.</li>
                    <li>Platform fees paid by landlords are refundable if a listing is removed before any tenant interaction.</li>
                </ul>
            </div>

            <div style={{ textAlign: 'center', marginTop: 60, padding: 40, background: '#F7F7F7', borderRadius: 16 }}>
                <h3 style={{ fontSize: 22, marginBottom: 8 }}>Need help with a cancellation?</h3>
                <p style={{ color: '#6a6a6a', marginBottom: 16 }}>Our support team can guide you through every step.</p>
                <a href="/contact" style={{ display: 'inline-block', background: '#FF385C', color: '#fff', padding: '12px 28px', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>
                    Contact support
                </a>
            </div>
        </section>
    )
}

export default CancellationOptions
