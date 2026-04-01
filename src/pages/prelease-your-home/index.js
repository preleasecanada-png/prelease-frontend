import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { EnhancedCard, AnimatedButton, AnimatedSection, StatCard, FeatureCard } from '@/components'

const PreleaseYourHome = () => {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [role, setRole] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userRole = localStorage.getItem('role')
    setIsLoggedIn(!!token)
    setRole(userRole || '')
  }, [])

  const handleGetStarted = () => {
    if (!isLoggedIn) {
      router.push('/login')
    } else {
      router.push('/properties')
    }
  }

  const steps = [
    {
      number: '01',
      title: 'Create Your Listing',
      description: 'Describe your property type, location, number of rooms, and amenities. Upload beautiful photos to attract potential renters.'
    },
    {
      number: '02',
      title: 'Set Your Terms',
      description: 'Choose your monthly rent, lease duration, move-in date, and house rules. You have full control over your listing.'
    },
    {
      number: '03',
      title: 'Review Applications',
      description: 'Receive rental applications from verified renters. Review their profiles, income verification, and references before accepting.'
    },
    {
      number: '04',
      title: 'Sign & Collect',
      description: 'Sign the lease digitally and start collecting rent securely through our platform. We handle the payment processing for you.'
    }
  ]

  const benefits = [
    {
      icon: <div className="display-4">🔒</div>,
      title: 'Verified Renters',
      description: 'All renters go through identity, income, and background verification before they can apply.'
    },
    {
      icon: <div className="display-4">💰</div>,
      title: 'Secure Payments',
      description: 'Rent is collected automatically and deposited directly into your bank account every month.'
    },
    {
      icon: <div className="display-4">📋</div>,
      title: 'Digital Leases',
      description: 'Generate and sign lease agreements digitally. Legally binding and stored securely in the cloud.'
    },
    {
      icon: <div className="display-4">🛡️</div>,
      title: 'Landlord Protection',
      description: 'Our PreCover program protects you against property damage and missed rent payments.'
    },
    {
      icon: <div className="display-4">📊</div>,
      title: 'Smart Dashboard',
      description: 'Track your properties, applications, payments, and lease statuses all from one centralized dashboard.'
    },
    {
      icon: <div className="display-4">🤝</div>,
      title: 'Dedicated Support',
      description: '24/7 support team ready to help you with any questions or issues related to your rental properties.'
    }
  ]

  const faqs = [
    {
      question: 'How much does it cost to list my property?',
      answer: 'Listing your property on Prelease Canada is completely free. We only charge a small commission fee when a lease is signed.'
    },
    {
      question: 'How long does it take to find a renter?',
      answer: 'Most properties receive their first application within 48 hours. On average, landlords find a qualified renter within 2 weeks.'
    },
    {
      question: 'What documents do I need?',
      answer: 'You will need proof of property ownership, a government-issued ID, and property photos. Additional documents may be required depending on your province.'
    },
    {
      question: 'Can I screen renters before accepting?',
      answer: 'Absolutely. You can review each applicant\'s profile, verification status, income proof, rental history, and references before making a decision.'
    },
    {
      question: 'How are payments handled?',
      answer: 'Renters pay through our secure platform via credit card, debit card, bank transfer, or e-transfer. Funds are deposited to your account within 2-3 business days.'
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="position-relative overflow-hidden" style={{
        background: '#fff',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="position-absolute w-100 h-100" style={{ zIndex: 0 }}>
          <div className="position-absolute" style={{
            width: '600px', height: '600px', borderRadius: '50%',
            background: 'radial-gradient(#d8062251, 20%, #a180e929, #ffffff00)',
            top: '-200px', right: '-100px'
          }} />
          <div className="position-absolute" style={{
            width: '400px', height: '400px', borderRadius: '50%',
            background: 'radial-gradient(#d8062230, 20%, #a180e915, #ffffff00)',
            bottom: '-100px', left: '-50px'
          }} />
        </div>

        <div className="container position-relative py-5" style={{ zIndex: 1 }}>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <AnimatedSection animation="fadeInUp" delay={100}>
                <span className="fw-bold fs-6 mb-4 d-inline-block" style={{ color: '#6e0311' }}>
                  For Landlords & Property Owners
                </span>
                <h1 className="fw-bold mb-4" style={{ fontSize: '3.5rem', lineHeight: 1.1 }}>
                  <span className="mainp" style={{ display: 'inline' }}>
                    <span style={{
                      background: 'linear-gradient(81deg, #D80621 0%, #000 62%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      PreLease Your Home
                    </span>
                  </span>
                  <br />
                  <span style={{ color: '#000' }}>With Confidence</span>
                </h1>
                <p className="lead mb-5" style={{ color: '#000', fontWeight: 500 }}>
                  List your property on Canada's fastest-growing rental platform.
                  Find verified renters, sign leases digitally, and collect rent securely — all in one place.
                </p>
                <div className="d-flex gap-3 flex-wrap">
                  <button className="button" onClick={handleGetStarted} style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    background: 'linear-gradient(#191919, #2b2b2b)',
                    borderRadius: '50px', padding: '1rem 2rem',
                    color: '#fff', fontSize: '16px', fontWeight: 500,
                    border: 'none', cursor: 'pointer'
                  }}>
                    {isLoggedIn ? 'List Your Property' : 'Get Started Free'}
                    <img src="/images/Arrow.svg" alt="" />
                  </button>
                  <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    background: 'transparent',
                    borderRadius: '50px', padding: '1rem 2rem',
                    color: '#D80621', fontSize: '16px', fontWeight: 600,
                    border: '2px solid #D80621', cursor: 'pointer'
                  }}>
                    How It Works
                  </button>
                </div>
              </AnimatedSection>
            </div>
            <div className="col-lg-6 mt-5 mt-lg-0">
              <AnimatedSection animation="fadeInUp" delay={300}>
                <div className="row g-3">
                  <div className="col-6">
                    <StatCard title="Active Landlords" value="2,500+" color="primary" />
                  </div>
                  <div className="col-6">
                    <StatCard title="Properties Listed" value="8,000+" color="success" />
                  </div>
                  <div className="col-6">
                    <StatCard title="Avg. Days to Rent" value="12" color="warning" />
                  </div>
                  <div className="col-6">
                    <StatCard title="Renter Satisfaction" value="98%" color="info" />
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-5" style={{ background: '#fff' }}>
        <div className="container">
          <AnimatedSection animation="fadeInUp" delay={100}>
            <div className="text-center mb-5">
              <h2 className="fw-bold mb-3" style={{ fontSize: '45px', fontWeight: 200, color: '#000' }}>
                <strong>How</strong> It Works
              </h2>
              <p className="lead" style={{ color: '#000000be' }}>List your property in 4 simple steps</p>
            </div>
          </AnimatedSection>

          <div className="row g-4">
            {steps.map((step, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <AnimatedSection animation="fadeInUp" delay={200 + index * 100}>
                  <EnhancedCard className="h-100 p-4 text-center position-relative overflow-hidden">
                    <div className="position-absolute top-0 start-0 w-100" style={{
                      height: '4px',
                      background: `linear-gradient(90deg, #D80621 ${(index + 1) * 25}%, transparent ${(index + 1) * 25}%)`
                    }} />
                    <div className="display-4 fw-bold mb-3" style={{
                      background: 'linear-gradient(81deg, #D80621 0%, #000 62%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      {step.number}
                    </div>
                    <h5 className="fw-bold mb-3" style={{ color: '#000' }}>{step.title}</h5>
                    <p className="mb-0" style={{ color: '#000000be' }}>{step.description}</p>
                  </EnhancedCard>
                </AnimatedSection>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-5" style={{ background: '#fafafa' }}>
        <div className="container">
          <AnimatedSection animation="fadeInUp" delay={100}>
            <div className="text-center mb-5">
              <h2 className="fw-bold mb-3" style={{ fontSize: '45px', fontWeight: 200, color: '#000' }}>
                <strong>Why Landlords</strong> Choose Us
              </h2>
              <p className="lead" style={{ color: '#000000be' }}>Everything you need to manage your rental properties</p>
            </div>
          </AnimatedSection>

          <div className="row g-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <AnimatedSection animation="fadeInUp" delay={200 + index * 100}>
                  <FeatureCard
                    icon={benefit.icon}
                    title={benefit.title}
                    description={benefit.description}
                  />
                </AnimatedSection>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earnings Calculator */}
      <section className="py-5" style={{ background: '#fff' }}>
        <div className="container">
          <AnimatedSection animation="fadeInUp" delay={100}>
            <div className="text-center mb-5">
              <h2 className="fw-bold mb-3" style={{ fontSize: '45px', fontWeight: 200, color: '#000' }}>
                <strong>Estimate</strong> Your Earnings
              </h2>
              <p className="lead" style={{ color: '#000000be' }}>See how much you could earn by listing your property</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={200}>
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <EarningsCalculator />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-5" style={{ background: '#fafafa' }}>
        <div className="container">
          <AnimatedSection animation="fadeInUp" delay={100}>
            <div className="text-center mb-5">
              <h2 className="fw-bold mb-3" style={{ fontSize: '45px', fontWeight: 200, color: '#000' }}>
                <strong>Frequently Asked</strong> Questions
              </h2>
              <p className="lead" style={{ color: '#000000be' }}>Got questions? We have answers.</p>
            </div>
          </AnimatedSection>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              {faqs.map((faq, index) => (
                <AnimatedSection key={index} animation="fadeInUp" delay={200 + index * 80}>
                  <FAQItem question={faq.question} answer={faq.answer} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="position-relative overflow-hidden py-5" style={{ background: '#fff' }}>
        <div className="position-absolute w-100 h-100" style={{ zIndex: 0 }}>
          <div className="position-absolute" style={{
            width: '500px', height: '500px', borderRadius: '50%',
            background: 'radial-gradient(#d8062230, 20%, #a180e915, #ffffff00)',
            top: '-150px', left: '50%', transform: 'translateX(-50%)'
          }} />
        </div>
        <div className="container position-relative" style={{ zIndex: 1 }}>
          <AnimatedSection animation="fadeInUp" delay={100}>
            <div className="text-center py-5">
              <h2 className="fw-bold mb-4" style={{ fontSize: '45px', color: '#000' }}>
                <strong>Ready to List</strong> Your Property?
              </h2>
              <p className="lead mb-5" style={{ color: '#000000be' }}>
                Join thousands of landlords who trust Prelease Canada to find quality renters.
              </p>
              <button className="button" onClick={handleGetStarted} style={{
                display: 'inline-flex', alignItems: 'center', gap: '1rem',
                background: 'linear-gradient(#191919, #2b2b2b)',
                borderRadius: '50px', padding: '1.3rem 2rem',
                color: '#fff', fontSize: '16px', fontWeight: 500,
                border: 'none', cursor: 'pointer'
              }}>
                {isLoggedIn ? 'List Your Property Now' : 'Create Your Free Account'}
                <img src="/images/Arrow.svg" alt="" />
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}

const EarningsCalculator = () => {
  const [rent, setRent] = useState(1500)
  const [units, setUnits] = useState(1)
  const commissionRate = 0.05
  const monthlyEarnings = rent * units * (1 - commissionRate)
  const yearlyEarnings = monthlyEarnings * 12

  return (
    <EnhancedCard className="p-5">
      <div className="row g-4 align-items-center">
        <div className="col-md-6">
          <div className="mb-4">
            <label className="form-label fw-bold mb-2" style={{ color: '#000' }}>Monthly Rent per Unit</label>
            <div className="d-flex align-items-center gap-3">
              <span className="fs-4 fw-bold" style={{
                background: 'linear-gradient(81deg, #D80621 0%, #000 62%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>${rent.toLocaleString()}</span>
            </div>
            <input
              type="range"
              className="form-range mt-2"
              min="500"
              max="10000"
              step="100"
              value={rent}
              onChange={(e) => setRent(Number(e.target.value))}
              style={{ accentColor: '#D80621' }}
            />
            <div className="d-flex justify-content-between small" style={{ color: '#000000be' }}>
              <span>$500</span>
              <span>$10,000</span>
            </div>
          </div>
          <div>
            <label className="form-label fw-bold mb-2" style={{ color: '#000' }}>Number of Units</label>
            <div className="d-flex align-items-center gap-3">
              <span className="fs-4 fw-bold" style={{
                background: 'linear-gradient(81deg, #D80621 0%, #000 62%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>{units}</span>
            </div>
            <input
              type="range"
              className="form-range mt-2"
              min="1"
              max="20"
              step="1"
              value={units}
              onChange={(e) => setUnits(Number(e.target.value))}
              style={{ accentColor: '#D80621' }}
            />
            <div className="d-flex justify-content-between small" style={{ color: '#000000be' }}>
              <span>1</span>
              <span>20</span>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="text-center p-4 rounded-4" style={{
            background: 'radial-gradient(#d8062210, #a180e908, #ffffff00)',
            border: '1px solid rgba(216,6,33,0.1)'
          }}>
            <p className="mb-1" style={{ color: '#000000be' }}>Estimated Monthly Earnings</p>
            <h2 className="display-4 fw-bold mb-3" style={{
              background: 'linear-gradient(81deg, #D80621 0%, #000 62%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              ${monthlyEarnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </h2>
            <p className="mb-1" style={{ color: '#000000be' }}>Estimated Yearly Earnings</p>
            <h4 className="fw-bold" style={{ color: '#6e0311' }}>
              ${yearlyEarnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </h4>
            <p className="small mt-3 mb-0" style={{ color: '#000000be' }}>
              After {(commissionRate * 100)}% platform fee
            </p>
          </div>
        </div>
      </div>
    </EnhancedCard>
  )
}

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false)

  return (
    <EnhancedCard className="mb-3 p-0 overflow-hidden" style={{ cursor: 'pointer' }} onClick={() => setOpen(!open)}>
      <div className="p-4 d-flex justify-content-between align-items-center">
        <h6 className="fw-bold mb-0" style={{ color: '#000' }}>{question}</h6>
        <span className="fs-4" style={{
          transition: 'transform 0.3s ease',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          color: '#D80621'
        }}>+</span>
      </div>
      <div style={{
        maxHeight: open ? '200px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.3s ease, padding 0.3s ease'
      }}>
        <div className="px-4 pb-4">
          <p className="mb-0" style={{ color: '#000000be' }}>{answer}</p>
        </div>
      </div>
    </EnhancedCard>
  )
}

export default PreleaseYourHome
