import React, { useState } from 'react';
import Head from 'next/head';
import toast, { Toaster } from 'react-hot-toast';

const DeleteAccount = () => {
    const [email, setEmail] = useState('');
    const [reason, setReason] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error('Please enter your email address.');
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/delete-account-request`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, reason }),
            });
            const data = await res.json();
            if (res.ok) {
                setSubmitted(true);
            } else {
                toast.error(data?.message || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            toast.error('Network error. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>Delete Account | Prelease Canada</title>
            </Head>
            <Toaster />
            <div style={{ padding: '60px 20px', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '10px', color: '#333' }}>Delete Your Account & Data</h1>
                <p style={{ color: '#666', marginBottom: '30px' }}>
                    We respect your right to privacy. If you would like to permanently delete your Prelease Canada account and all associated data, please submit a request below. This action is irreversible.
                </p>

                {submitted ? (
                    <div style={{
                        padding: '30px',
                        backgroundColor: '#f0fdf4',
                        border: '1px solid #bbf7d0',
                        borderRadius: '8px',
                        textAlign: 'center',
                    }}>
                        <h2 style={{ color: '#166534', marginBottom: '10px' }}>Request Submitted</h2>
                        <p style={{ color: '#15803d' }}>
                            We have received your account deletion request. Your data will be permanently deleted within 30 days. You will receive a confirmation email at <strong>{email}</strong>.
                        </p>
                    </div>
                ) : (
                    <>
                        <div style={{
                            padding: '20px',
                            backgroundColor: '#fef2f2',
                            border: '1px solid #fecaca',
                            borderRadius: '8px',
                            marginBottom: '25px',
                        }}>
                            <strong style={{ color: '#991b1b' }}>What will be deleted:</strong>
                            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px', color: '#7f1d1d' }}>
                                <li>Your account and profile information</li>
                                <li>Your rental applications</li>
                                <li>Your chat messages</li>
                                <li>Your saved properties and wish lists</li>
                                <li>Your reviews and preferences</li>
                                <li>All uploaded documents and photos</li>
                            </ul>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#333' }}>
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter the email associated with your account"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '6px',
                                        fontSize: '1rem',
                                        boxSizing: 'border-box',
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#333' }}>
                                    Reason (optional)
                                </label>
                                <textarea
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    placeholder="Let us know why you are leaving (optional)"
                                    rows={4}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '6px',
                                        fontSize: '1rem',
                                        boxSizing: 'border-box',
                                        resize: 'vertical',
                                    }}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: '14px',
                                    backgroundColor: '#D80621',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '6px',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    opacity: loading ? 0.7 : 1,
                                }}
                            >
                                {loading ? 'Submitting...' : 'Request Account Deletion'}
                            </button>
                        </form>
                    </>
                )}

                <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '10px', color: '#333' }}>Need help?</h3>
                    <p style={{ color: '#666' }}>
                        If you have any questions about data deletion, contact us at{' '}
                        <a href="mailto:preleasecanada@gmail.com" style={{ color: '#D80621' }}>
                            preleasecanada@gmail.com
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
};

export default DeleteAccount;
