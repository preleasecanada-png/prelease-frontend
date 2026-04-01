import React, { useState, useContext } from 'react';
import { CreateApiContext } from '@/ContextApi/CreateApiContext';
import Link from 'next/link';
import toast from 'react-hot-toast';

const Contact = () => {
  const { locale } = useContext(CreateApiContext);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    setSending(true);
    // Simulate sending — replace with actual API call when backend endpoint is ready
    setTimeout(() => {
      toast.success('Message sent successfully! We will get back to you soon.');
      setForm({ name: '', email: '', subject: '', message: '' });
      setSending(false);
    }, 1200);
  };

  return (
    <>
      <section className="main_top_section">
        <div className="container top_container">
          <p className="main-page-name">Contact Us</p>
          <h2 className="main-heading">Get In Touch With Our Team</h2>
        </div>
      </section>

      <section style={{ padding: '60px 0 80px' }}>
        <div className="container">
          <div className="row g-5">
            {/* Contact Info */}
            <div className="col-lg-5">
              <div style={{ marginBottom: '40px' }}>
                <span style={{
                  fontSize: '13px', fontWeight: 700, letterSpacing: '3px',
                  textTransform: 'uppercase', color: '#D80621',
                }}>Reach Out</span>
                <h3 style={{
                  fontSize: '30px', fontWeight: 800, color: '#0a0a0a',
                  marginTop: '8px', letterSpacing: '-0.3px',
                }}>We&apos;d love to hear from you</h3>
                <p style={{ color: '#64748b', fontSize: '15px', lineHeight: 1.7, marginTop: '12px' }}>
                  Whether you have a question about our platform, need help with your listing, or want to partner with us — our team is ready to help.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '14px',
                    background: 'rgba(216,6,33,0.08)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D80621" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0a0a0a', margin: '0 0 4px' }}>Office Address</h4>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
                      Toronto, Ontario, Canada
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '14px',
                    background: 'rgba(216,6,33,0.08)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D80621" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0a0a0a', margin: '0 0 4px' }}>Email</h4>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
                      support@preleasecanada.com
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '14px',
                    background: 'rgba(216,6,33,0.08)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D80621" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0a0a0a', margin: '0 0 4px' }}>Phone</h4>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
                      +1 (800) 555-RENT
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '14px',
                    background: 'rgba(216,6,33,0.08)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D80621" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0a0a0a', margin: '0 0 4px' }}>Business Hours</h4>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
                      Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                      Saturday: 10:00 AM - 4:00 PM EST
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-lg-7">
              <div style={{
                background: '#fff', borderRadius: '20px', padding: '40px',
                border: '1px solid #f1f5f9',
                boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
              }}>
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label style={{ fontSize: '14px', fontWeight: 600, color: '#0a0a0a', marginBottom: '6px', display: 'block' }}>
                        Full Name <span style={{ color: '#D80621' }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        style={{
                          width: '100%', padding: '12px 16px', borderRadius: '12px',
                          border: '1.5px solid #e2e8f0', fontSize: '14px', color: '#1e293b',
                          outline: 'none', transition: 'border-color 0.3s ease',
                        }}
                        onFocus={e => e.target.style.borderColor = '#D80621'}
                        onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                      />
                    </div>
                    <div className="col-md-6">
                      <label style={{ fontSize: '14px', fontWeight: 600, color: '#0a0a0a', marginBottom: '6px', display: 'block' }}>
                        Email <span style={{ color: '#D80621' }}>*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        style={{
                          width: '100%', padding: '12px 16px', borderRadius: '12px',
                          border: '1.5px solid #e2e8f0', fontSize: '14px', color: '#1e293b',
                          outline: 'none', transition: 'border-color 0.3s ease',
                        }}
                        onFocus={e => e.target.style.borderColor = '#D80621'}
                        onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                      />
                    </div>
                    <div className="col-12">
                      <label style={{ fontSize: '14px', fontWeight: 600, color: '#0a0a0a', marginBottom: '6px', display: 'block' }}>
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        style={{
                          width: '100%', padding: '12px 16px', borderRadius: '12px',
                          border: '1.5px solid #e2e8f0', fontSize: '14px', color: '#1e293b',
                          outline: 'none', transition: 'border-color 0.3s ease',
                        }}
                        onFocus={e => e.target.style.borderColor = '#D80621'}
                        onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                      />
                    </div>
                    <div className="col-12">
                      <label style={{ fontSize: '14px', fontWeight: 600, color: '#0a0a0a', marginBottom: '6px', display: 'block' }}>
                        Message <span style={{ color: '#D80621' }}>*</span>
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your inquiry..."
                        required
                        rows={5}
                        style={{
                          width: '100%', padding: '12px 16px', borderRadius: '12px',
                          border: '1.5px solid #e2e8f0', fontSize: '14px', color: '#1e293b',
                          outline: 'none', transition: 'border-color 0.3s ease',
                          resize: 'vertical', fontFamily: 'inherit',
                        }}
                        onFocus={e => e.target.style.borderColor = '#D80621'}
                        onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                      />
                    </div>
                    <div className="col-12" style={{ marginTop: '8px' }}>
                      <button
                        type="submit"
                        disabled={sending}
                        style={{
                          width: '100%', padding: '14px', borderRadius: '50px',
                          background: 'linear-gradient(135deg, #D80621, #ff4d6d)',
                          color: '#fff', border: 'none', fontSize: '15px',
                          fontWeight: 700, cursor: sending ? 'not-allowed' : 'pointer',
                          opacity: sending ? 0.7 : 1,
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {sending ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Section */}
      <section style={{ padding: '60px 0', background: '#fafafa' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#D80621' }}>FAQ</span>
            <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#0a0a0a', marginTop: '8px' }}>Frequently Asked Questions</h3>
          </div>
          <div className="row g-4" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {[
              { q: 'How do I list my property on Prelease Canada?', a: 'Click "PreLease your home" in the navigation menu, sign up as a host, and follow the step-by-step property listing wizard to add your property details, photos, and pricing.' },
              { q: 'Is the platform free for renters?', a: 'Yes! Browsing properties, submitting applications, and communicating with landlords is completely free for renters.' },
              { q: 'How does the application process work?', a: 'Find a property you like, click "Apply", fill in the application form with your details and documents, and submit. The landlord will review and respond through the platform.' },
              { q: 'Is my payment information secure?', a: 'Absolutely. All payments are processed through secure, encrypted channels. We never store your full payment details on our servers.' },
            ].map((item, i) => (
              <div key={i} className="col-12">
                <details style={{
                  background: '#fff', borderRadius: '14px', padding: '20px 24px',
                  border: '1px solid #f1f5f9', cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}>
                  <summary style={{
                    fontSize: '15px', fontWeight: 700, color: '#0a0a0a',
                    listStyle: 'none', display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    {item.q}
                    <span style={{ fontSize: '20px', color: '#D80621', marginLeft: '12px' }}>+</span>
                  </summary>
                  <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.7, marginTop: '12px', marginBottom: 0 }}>
                    {item.a}
                  </p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
