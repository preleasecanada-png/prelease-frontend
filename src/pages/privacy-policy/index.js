import React from 'react';
import Head from 'next/head';

const PrivacyPolicy = () => {
    return (
        <>
            <Head>
                <title>Privacy Policy | Prelease Canada</title>
            </Head>
            <div className="container" style={{ padding: '60px 20px', maxWidth: '900px', margin: '0 auto', lineHeight: '1.6' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#333' }}>Privacy Policy</h1>
                <p style={{ color: '#666', marginBottom: '40px' }}>Last updated: May 13, 2026</p>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#222' }}>1. Introduction</h2>
                    <p style={{ marginBottom: '15px' }}>
                        Welcome to Prelease Canada ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website preleasecanada.ca and use our mobile application (the "App").
                    </p>
                    <p>
                        By accessing or using our services, you agree to the collection and use of your information in accordance with this Privacy Policy.
                    </p>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#222' }}>2. Information We Collect</h2>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#444' }}>A. Personal Information You Provide to Us</h3>
                    <p style={{ marginBottom: '15px' }}>
                        We collect personal information that you voluntarily provide to us when you register on the App, express an interest in obtaining information about us or our products and services, when you participate in activities on the App, or otherwise when you contact us. This includes:
                    </p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '15px' }}>
                        <li><strong>Account Details:</strong> Name, email address, phone number, password, and profile picture.</li>
                        <li><strong>Rental Information:</strong> Rental applications, lease agreements, payment information, maintenance requests, and renter preferences.</li>
                        <li><strong>Communication:</strong> Messages sent via our platform between landlords and tenants.</li>
                    </ul>

                    <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#444' }}>B. Information Automatically Collected</h3>
                    <p style={{ marginBottom: '15px' }}>
                        We automatically collect certain information when you visit, use, or navigate the App. This information does not reveal your specific identity but may include device and usage information, such as your IP address, browser and device characteristics, operating system, and information about how and when you use our App.
                    </p>

                    <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#444' }}>C. Third-Party Services and Permissions</h3>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                        <li><strong>Social Login:</strong> If you choose to link, create, or log in to your account with a third-party service (such as Google or Facebook), we collect the information you authorized them to share with us (e.g., your name, email, and profile picture).</li>
                        <li><strong>Camera and Photos:</strong> We may request access to your device's camera and photo gallery to allow you to upload profile pictures, property images, and documents for rental applications.</li>
                        <li><strong>AI Assistant:</strong> Our AI assistant may process the chat messages you send to provide property recommendations and assistance. This chat history is securely stored to improve your experience.</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#222' }}>3. How We Use Your Information</h2>
                    <p style={{ marginBottom: '15px' }}>We use personal information collected via our App for a variety of business purposes described below:</p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                        <li>To facilitate account creation and logon process.</li>
                        <li>To manage rental applications, leases, and payments.</li>
                        <li>To enable user-to-user communications (e.g., landlord-tenant chats).</li>
                        <li>To provide AI-driven property recommendations and support.</li>
                        <li>To send administrative information to you, such as updates to our terms, conditions, and policies.</li>
                        <li>To protect our Services, including fraud monitoring and prevention.</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#222' }}>4. Sharing Your Information</h2>
                    <p style={{ marginBottom: '15px' }}>
                        We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. For instance:
                    </p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                        <li><strong>Other Users:</strong> When you apply for a property, relevant details are shared with the landlord.</li>
                        <li><strong>Service Providers:</strong> We may share data with third-party vendors (e.g., payment processors like Stripe, AI APIs like Groq, cloud storage like AWS) who perform services for us.</li>
                        <li><strong>Legal Requirements:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#222' }}>5. Data Security and Retention</h2>
                    <p style={{ marginBottom: '15px' }}>
                        We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Policy, unless a longer retention period is required or permitted by law.
                    </p>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#222' }}>6. Your Privacy Rights and Account Deletion</h2>
                    <p style={{ marginBottom: '15px' }}>
                        Depending on your location, you may have the right to request access to the personal information we collect from you, change that information, or delete it in some circumstances.
                    </p>
                    <p style={{ marginBottom: '15px', fontWeight: 'bold' }}>
                        Requesting Account Deletion:
                    </p>
                    <p>
                        You can request the deletion of your account and associated personal data at any time by contacting us at our support email or via the App's support ticket system. Upon request, we will delete or anonymize your personal data, barring any data we are legally required to retain.
                    </p>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#222' }}>7. Updates to This Policy</h2>
                    <p>
                        We may update this privacy policy from time to time. The updated version will be indicated by an updated "Last updated" date and the updated version will be effective as soon as it is accessible. We encourage you to review this privacy policy frequently to be informed of how we are protecting your information.
                    </p>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#222' }}>8. Contact Us</h2>
                    <p>
                        If you have questions or comments about this policy, you may email us at <strong>privacy@preleasecanada.ca</strong> or contact us by mail at:
                    </p>
                    <address style={{ marginTop: '10px', fontStyle: 'normal', color: '#555' }}>
                        Prelease Canada<br />
                        Montreal, Quebec<br />
                        Canada
                    </address>
                </section>
            </div>
        </>
    );
};

export default PrivacyPolicy;
