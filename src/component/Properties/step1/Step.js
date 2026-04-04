import React, { useEffect, useState } from 'react'

const Step = () => {
    const [visible, setVisible] = useState(false)
    useEffect(() => { setVisible(true) }, [])

    return (
        <div className="step-landing">
            {/* Hero Section */}
            <div className={`step-hero ${visible ? 'step-hero--visible' : ''}`}>
                <div className="step-hero__left">
                    <span className="step-hero__badge">Become a Host</span>
                    <h1 className="step-hero__title">
                        List your property on{' '}
                        <span className="step-hero__brand">PreLease</span>
                    </h1>
                    <p className="step-hero__subtitle">
                        Join thousands of Canadian hosts earning income by renting their space.
                        It only takes a few minutes to get started.
                    </p>
                    <div className="step-hero__stats">
                        <div className="step-hero__stat">
                            <span className="step-hero__stat-number">5,000+</span>
                            <span className="step-hero__stat-label">Active Renters</span>
                        </div>
                        <div className="step-hero__stat">
                            <span className="step-hero__stat-number">$2,400</span>
                            <span className="step-hero__stat-label">Avg Monthly Income</span>
                        </div>
                        <div className="step-hero__stat">
                            <span className="step-hero__stat-number">98%</span>
                            <span className="step-hero__stat-label">Host Satisfaction</span>
                        </div>
                    </div>
                </div>

                <div className="step-hero__right">
                    {/* Step Cards */}
                    <div className={`step-card ${visible ? 'step-card--visible' : ''}`} style={{ animationDelay: '0.2s' }}>
                        <div className="step-card__number">1</div>
                        <div className="step-card__content">
                            <h4 className="step-card__title">Tell us about your place</h4>
                            <p className="step-card__desc">Share basic info like location, type of space, and how many guests can stay.</p>
                        </div>
                        <div className="step-card__icon">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><path d="M3 9L12 2L21 9V20C21 21.1 20.1 22 19 22H5C3.9 22 3 21.1 3 20V9Z" stroke="#D80621" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="9,22 9,12 15,12 15,22" stroke="#D80621" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                    </div>

                    <div className={`step-card ${visible ? 'step-card--visible' : ''}`} style={{ animationDelay: '0.4s' }}>
                        <div className="step-card__number">2</div>
                        <div className="step-card__content">
                            <h4 className="step-card__title">Make it stand out</h4>
                            <p className="step-card__desc">Add stunning photos, a catchy title, and a compelling description.</p>
                        </div>
                        <div className="step-card__icon">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="#D80621" strokeWidth="2"/><circle cx="8.5" cy="8.5" r="1.5" fill="#D80621"/><path d="M21 15L16 10L5 21" stroke="#D80621" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                    </div>

                    <div className={`step-card ${visible ? 'step-card--visible' : ''}`} style={{ animationDelay: '0.6s' }}>
                        <div className="step-card__number">3</div>
                        <div className="step-card__content">
                            <h4 className="step-card__title">Set your price & publish</h4>
                            <p className="step-card__desc">Choose your pricing, review details, and go live in minutes.</p>
                        </div>
                        <div className="step-card__icon">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><path d="M22 11.08V12C21.9988 14.15 21.2891 16.24 19.9865 17.95C18.6838 19.66 16.8565 20.89 14.7872 21.44C12.7179 21.99 10.5258 21.83 8.55713 21.0C6.58842 20.17 4.9469 18.71 3.87207 16.85C2.79724 14.99 2.34698 12.83 2.58538 10.69C2.82378 8.55 3.73862 6.55 5.19263 4.97C6.64663 3.4 8.56 2.33 10.6681 1.93C12.7761 1.52 14.965 1.8 16.89 2.72" stroke="#D80621" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="22,4 12,14.01 9,11.01" stroke="#D80621" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Step
