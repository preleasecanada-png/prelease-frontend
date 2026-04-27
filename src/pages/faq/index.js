import React, { useState } from 'react'

const faqs = [
    {
        category: 'Getting Started',
        items: [
            { q: 'What is Prelease Canada?', a: 'Prelease Canada is a trusted platform that connects renters and landlords across Canada. We help tenants find verified rental properties and allow landlords to manage their listings, applications, leases, and payments all in one place.' },
            { q: 'How do I create an account?', a: 'Click on "Sign up" at the top right of the homepage. You can register as a tenant (renter) or as a landlord using your email address or Google account.' },
            { q: 'Is Prelease Canada free to use?', a: 'Creating an account, searching listings, and applying for properties is completely free for tenants. Landlords only pay a small fee when they successfully lease their property through our platform.' },
        ],
    },
    {
        category: 'For Renters',
        items: [
            { q: 'How do I search for a rental property?', a: 'Use the search bar on the homepage to find properties by city, neighborhood, price range, number of bedrooms, or specific amenities. You can also save your favourite listings to your wishlist.' },
            { q: 'How do I apply for a property?', a: 'Once you find a property you like, click "Apply now" on the property details page. You will need to complete your profile, upload the required documents (ID, proof of income, references), and submit your application directly to the landlord.' },
            { q: 'How do I pay my rent?', a: 'Once your lease is active, go to the "Payments" section of your account. You can pay your rent securely by credit card or bank transfer. All transactions are encrypted and protected.' },
            { q: 'Can I cancel my application?', a: 'Yes. You can cancel an application at any time as long as it has not been officially accepted by the landlord. Go to "My applications" in your account.' },
        ],
    },
    {
        category: 'For Landlords',
        items: [
            { q: 'How do I list my property?', a: 'Click on "Prelease your home" from the top navigation. Follow the step-by-step wizard to add photos, describe your property, set your rent, and publish your listing.' },
            { q: 'How are tenants screened?', a: 'Prelease Canada allows you to request identity verification, proof of income, credit reports, and employment references from applicants. You remain in full control of who you accept.' },
            { q: 'When do I receive rental payments?', a: 'Payments are transferred directly to your bank account within 2–3 business days after the tenant pays. You can track all transactions in the "Payments" dashboard.' },
            { q: 'Is there insurance coverage?', a: 'Yes, we offer "Pre-Cover" — a protection plan for landlords that covers damage and missed payments. Visit our Insurance page to learn more.' },
        ],
    },
    {
        category: 'Safety & Security',
        items: [
            { q: 'How does Prelease verify users?', a: 'We require ID verification for both tenants and landlords. We also use secure document uploads, encrypted messaging, and fraud-detection tools to keep the platform safe.' },
            { q: 'What should I do if I encounter a suspicious listing or user?', a: 'Please report it immediately through the "Report" button on the listing or profile, or contact our support team via the Help Center. We investigate every report.' },
            { q: 'Is my payment information secure?', a: 'Absolutely. All payments are processed through PCI-compliant providers with end-to-end encryption. Prelease Canada never stores your full card information.' },
        ],
    },
    {
        category: 'Account & Support',
        items: [
            { q: 'How do I change my password?', a: 'Go to "Account settings" > "Security" and click "Change password". If you forgot your password, use "Forgot password" on the login page.' },
            { q: 'How do I delete my account?', a: 'Go to "Account settings" and scroll to the bottom to find the "Delete my account" option. Please note: active leases and unpaid balances must be resolved first.' },
            { q: 'How do I contact customer support?', a: 'You can reach our support team 24/7 through the Help Center, or by emailing info@preleasecanada.ca.' },
        ],
    },
]

const FAQ = () => {
    const [openKey, setOpenKey] = useState(null)

    const toggle = (key) => {
        setOpenKey(openKey === key ? null : key)
    }

    return (
        <section style={{ maxWidth: 900, margin: '40px auto 80px', padding: '0 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
                <h1 style={{ fontSize: 40, fontWeight: 700, marginBottom: 12 }}>Frequently Asked Questions</h1>
                <p style={{ color: '#6a6a6a', fontSize: 17 }}>
                    Find quick answers to the most common questions about Prelease Canada.
                </p>
            </div>

            {faqs.map((section, sIdx) => (
                <div key={sIdx} style={{ marginBottom: 40 }}>
                    <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, borderBottom: '1px solid #e0e0e0', paddingBottom: 8 }}>
                        {section.category}
                    </h2>
                    {section.items.map((item, iIdx) => {
                        const key = `${sIdx}-${iIdx}`
                        const open = openKey === key
                        return (
                            <div
                                key={key}
                                style={{
                                    border: '1px solid #e0e0e0',
                                    borderRadius: 12,
                                    marginBottom: 12,
                                    overflow: 'hidden',
                                    background: '#fff',
                                }}
                            >
                                <button
                                    onClick={() => toggle(key)}
                                    style={{
                                        width: '100%',
                                        textAlign: 'left',
                                        padding: '18px 20px',
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: 16,
                                        fontWeight: 600,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <span>{item.q}</span>
                                    <span style={{ fontSize: 22, color: '#FF385C', marginLeft: 12 }}>{open ? '−' : '+'}</span>
                                </button>
                                {open && (
                                    <div style={{ padding: '0 20px 18px', color: '#444', lineHeight: 1.6 }}>
                                        {item.a}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            ))}

            <div style={{ textAlign: 'center', marginTop: 60, padding: 40, background: '#F7F7F7', borderRadius: 16 }}>
                <h3 style={{ fontSize: 22, marginBottom: 8 }}>Still have questions?</h3>
                <p style={{ color: '#6a6a6a', marginBottom: 16 }}>Our support team is here to help you 24/7.</p>
                <a href="/contact" style={{ display: 'inline-block', background: '#FF385C', color: '#fff', padding: '12px 28px', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>
                    Contact support
                </a>
            </div>
        </section>
    )
}

export default FAQ
