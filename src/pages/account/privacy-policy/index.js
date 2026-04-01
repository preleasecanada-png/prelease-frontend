import Link from 'next/link'
import React from 'react'

const PrivacyPolicy = () => {
    return (
        <>
            <>
                <section className="privacy-policy-session-main-container container">
                    <div className='privacy-policy-session-heading'>
                        <h4><Link href="/account">Account</Link> </h4> <p> <Link href="/account/privacy-policy">{' > Personal Info'}</Link></p>
                    </div>
                    <div className='privacy-policy-session-row'>
                        <div>
                            <div className='privacy-policy-hea'>
                                <h1>Privacy Policy</h1>
                                <p>Last Updated: April 17, 2025</p>
                            </div>

                            <div className='privacy-policy-session-left-inside-details'>
                                <h3>1. Introduction</h3>
                                <h6>Welcome to Prelease Canada.</h6>
                                <p>Your privacy matters to us. This Privacy Policy explains how we collect, use, and protect your information when you use our platform — whether on our mobile app or website — to find rental properties across Canada.</p>
                            </div>


                            <div className='privacy-policy-session-left-inside-details'>
                                <h3>2. Information We Collect</h3>
                                <h6> We collect the following information when you use our service:</h6>
                                <ul>
                                    <li><strong>Account Details:</strong> Profile image, address, date of birth.</li>
                                    <li><strong>Rental Info:</strong> Application history, messages with landlords.</li>
                                    <li><strong>Payment Info:</strong> Credit/debit card details (processed securely via third-party providers).</li>
                                    <li>
                                        <strong>Device & Usage Data:</strong> IP address, app activity, device ID, operating system.</li>
                                </ul>
                                <p><strong>Note: </strong> All sensitive information is encrypted and handled with care.</p>
                            </div>


                            <div className='privacy-policy-session-left-inside-details'>
                                <h3>3. Who We Share Your Information With</h3>
                                <h6>We do not sell your personal data. However, we may share it with:</h6>
                                <ul>
                                    <li><strong>Landlords:</strong> For reviewing your rental applications.</li>
                                    <li><strong>Payment Processors:</strong> For secure transactions (e.g., Stripe).</li>
                                    <li><strong>Support Services:</strong> For emails, notifications, and live support tools.</li>
                                    <li><strong>Legal Authorities:</strong> Only if required by law.</li>
                                </ul>
                                <p>All partners are under strict confidentiality agreements.</p>
                            </div>


                            <div className='privacy-policy-session-left-inside-details'>
                                <h3>4. Your Rights & Choices</h3>
                                <h6>You have full control over your data:</h6>
                                <ul>
                                    <li><strong>Access:</strong> View your data from the Profile section.</li>
                                    <li><strong>Update:</strong> Edit your information anytime.</li>
                                    <li><strong>Support Services:</strong> For emails, notifications, and live support tools.</li>
                                    <li><strong>Delete:</strong> Request full account deletion by emailing <span className='text-danger font-bold'>privacy@prelease.ca</span></li>
                                    <li><strong>Opt-out:</strong> Turn off marketing emails from your Notification Settings.</li>
                                </ul>
                                <p>We respect your rights under Canada’s Personal Information Protection laws.</p>
                            </div>


                            <div className='privacy-policy-session-left-inside-details'>
                                <h3>5. Cookies & Tracking (Web Only)</h3>
                                <h6>Our website uses cookies to:</h6>

                                <p>Remember login sessions.</p>
                                <p>Save your preferred settings.</p>
                                <p>Analyze traffic for better performance.</p>

                                <p>You can manage or delete cookies anytime through your browser settings..</p>
                            </div>

                            <div className='privacy-policy-session-left-inside-details'>
                                <h3>6. Data Retention Policy</h3>
                                <h6>We keep your data only as long as needed:</h6>
                                <p>Active accounts retain data for seamless use.</p>
                                <p>Inactive accounts may be deleted after 12 months of inactivity.</p>
                                <p>Booking/payment data may be kept longer for legal reasons.</p>
                                <p>You can request deletion anytime.</p>
                            </div>

                            <div className='privacy-policy-session-left-inside-details'>
                                <h3>7. Data Retention Policy</h3>
                                <h6>We may update this Privacy Policy periodically. When we do:</h6>
                                <p>A notification will be shown in-app or via email.</p>
                                <p>The “Last Updated” date at the top will be changed.</p>
                                <p>We encourage users to review this page occasionally.</p>
                            </div>


                            <div className='privacy-policy-session-left-inside-details'>
                                <h3>8. Contact Us</h3>
                                <h6>Have any questions or concerns?</h6>
                                <p><strong>Email:</strong> privacy@prelease.ca</p>
                                <p><strong>Headquarters:</strong> Toronto, Canada</p>
                                <p><strong>Help Center:</strong> Available in your account dashboard</p>
                            </div>


                        </div>
                        <div className='privacy-policy-session-right-inside-img'>
                            <img src="/images/account/privacy-policy.webp" alt="" />
                        </div>
                    </div>

                </section>
            </>
        </>
    )
}

export default PrivacyPolicy
