import { CreateApiContext } from '@/ContextApi/CreateApiContext';
import Link from 'next/link';
import Stat from '@/component/stat';
import React, { useContext } from 'react'


const AboutUs = () => {
    const { locale } = useContext(CreateApiContext);
  return (
      <>
        <section className='main_top_section'>
              <div className='container top_container'>
                <p className='main-page-name'>About Us</p>
                <h2 className='main-heading'>Helping Newcomers Find Home in Canada</h2>
              </div>  
        </section>

        {/* Mission Section */}
        <section className='about-us-first-section'>
            <img src="images/about-bg.webp" alt="" className='about-bg' />
              <div className='custom_container about-us-first-container'>

                  <div className='about-left-details'>
                    <div className='d-flex about-left-heading'>
                          <h3 style={{ color: '#D80621' }}>Our</h3>
                          <p>Mission & Story</p>
                    </div>
                    <p>Prelease Canada was built with a simple goal: to make the rental experience seamless, transparent, and secure for immigrants arriving in Canada. We understand the challenges of finding a home in a new country — the uncertainty, the unfamiliar processes, and the need for trust. Our platform bridges that gap by connecting verified landlords with verified tenants through a modern, digital-first experience.</p>

                    <div className='d-flex about-details-info'>
                          <div className='about-details-info-item'>
                                <img src="/images/human-icon.webp" alt="" />
                                <span>24/7 Dedicated Support</span>
                          </div>
                          <div className='about-details-info-item'>
                                <img src="/images/search-icon.webp" alt="" />
                                <span>Verified Properties Only</span>
                          </div>
                    </div>
                      
                    <Link href="/find-home" className='button' style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                      Browse Properties <img src="/images/Arrow.svg" alt="" />
                    </Link>
                  </div>
                  <div className='about-left-image'><img src="images/about-us-detail.webp" alt="" /></div>
                  
              </div>
        </section>

        {/* Values Section */}
        <section style={{ padding: '70px 0', background: '#fff' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#D80621' }}>Our Values</span>
              <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#0a0a0a', marginTop: '8px', letterSpacing: '-0.3px' }}>
                What We Stand For
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '28px', maxWidth: '1000px', margin: '0 auto' }}>
              {[
                { icon: '🛡️', title: 'Trust & Security', desc: 'Every property and user is verified. Secure payments and digital lease agreements protect all parties.' },
                { icon: '🌍', title: 'Inclusivity', desc: 'We welcome everyone — immigrants, students, families, and professionals from all backgrounds.' },
                { icon: '⚡', title: 'Simplicity', desc: 'From search to signing, our platform is designed to make every step fast and intuitive.' },
                { icon: '🤝', title: 'Community', desc: 'We build lasting relationships between landlords and tenants for a better rental ecosystem.' },
              ].map((value, i) => (
                <div key={i} style={{
                  textAlign: 'center', padding: '32px 24px',
                  borderRadius: '20px', background: '#fafafa',
                  border: '1px solid #f1f5f9',
                  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.06)'; e.currentTarget.style.borderColor = '#D80621'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#f1f5f9'; }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>{value.icon}</div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0a0a0a', marginBottom: '8px' }}>{value.title}</h3>
                  <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section style={{ padding: '70px 0', background: '#fafafa' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#D80621' }}>For Everyone</span>
              <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#0a0a0a', marginTop: '8px', letterSpacing: '-0.3px' }}>
                Built for Renters & Landlords
              </h2>
            </div>
            <div className="row g-4" style={{ maxWidth: '900px', margin: '0 auto' }}>
              <div className="col-md-6">
                <div style={{
                  background: '#fff', borderRadius: '20px', padding: '32px',
                  border: '1px solid #f1f5f9', height: '100%',
                }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0a0a0a', marginBottom: '16px' }}>🏠 For Renters</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {['Browse verified properties across Canada', 'Apply to multiple listings online', 'Sign leases digitally', 'Pay rent securely through the platform', 'Access 24/7 support'].map((item, i) => (
                      <li key={i} style={{ fontSize: '14px', color: '#475569', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: '#D80621', fontWeight: 700 }}>✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-md-6">
                <div style={{
                  background: '#fff', borderRadius: '20px', padding: '32px',
                  border: '1px solid #f1f5f9', height: '100%',
                }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0a0a0a', marginBottom: '16px' }}>🔑 For Landlords</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {['List properties with photo galleries', 'Receive and screen applications', 'Generate digital lease agreements', 'Collect payments automatically', 'Built-in rental insurance'].map((item, i) => (
                      <li key={i} style={{ fontSize: '14px', color: '#475569', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: '#D80621', fontWeight: 700 }}>✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <Stat />

        {/* CTA */}
        <section style={{
          padding: '70px 2rem',
          background: 'linear-gradient(135deg, #D80621 0%, #6e0311 100%)',
          textAlign: 'center',
        }}>
          <div className="container">
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
              Ready to get started?
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', maxWidth: '480px', margin: '0 auto 28px', lineHeight: 1.7 }}>
              Join thousands of Canadians and newcomers who trust Prelease for their rental needs.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/find-home" style={{
                display: 'inline-flex', padding: '13px 28px', background: '#fff', color: '#D80621',
                borderRadius: '50px', fontWeight: 700, fontSize: '15px', textDecoration: 'none', border: 'none',
              }}>
                Find a Home
              </Link>
              <Link href="/prelease-your-home" style={{
                display: 'inline-flex', padding: '13px 28px', background: 'transparent', color: '#fff',
                borderRadius: '50px', fontWeight: 700, fontSize: '15px', textDecoration: 'none',
                border: '2px solid rgba(255,255,255,0.4)',
              }}>
                List Your Property
              </Link>
            </div>
          </div>
        </section>
      </>
  )
}

export default AboutUs
