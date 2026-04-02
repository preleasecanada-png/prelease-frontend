import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { memo, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { CreateApiContext } from '../../ContextApi/CreateApiContext';

const Verification = memo(() => {
    const [email, setEmail] = useState('');
    const [verified, setVerified] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const router = useRouter();
    const { locale } = useContext(CreateApiContext)

    useEffect(() => {
        const email = window.localStorage.getItem("email");
        setEmail(email);
    }, []);

    useEffect(() => {
        if (router.query.verified === 'true') {
            setVerified(true);
        }
    }, [router.query]);

    useEffect(() => {
        if (verified) {
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        router.push('/login');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [verified, router]);

    useLayoutEffect(() => {
        const token = window.localStorage.getItem("token");
        if (token) {
            router.push('/');
        }
    }, [router]);

    if (verified) {
        return (
            <section className='verif_main'>
                <div className="container">
                    <div className='verif_inner'>
                        <div className='verif_banner'>
                            <img className='banner' src="/images/main_bg.webp" alt="" />
                        </div>
                        <h2 className='verif_head' style={{ color: '#28a745' }}>Email Verified Successfully!</h2>
                        <p style={{ fontSize: '18px', marginTop: '10px' }}>Your email has been verified. You can now log in to your account.</p>
                        <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>Redirecting to login in {countdown} seconds...</p>
                        <Link href="/login" style={{ display: 'inline-block', marginTop: '20px', padding: '12px 32px', background: '#D80621', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>Go to Login</Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <>
            <section className='verif_main'>
                <div className="container">
                    <div className='verif_inner'>
                        <div className='verif_banner'>
                            <img className='icon' src="/images/mail_icon.webp" alt="" />
                            <img className='banner' src="/images/main_bg.webp" alt="" />
                        </div>
                        <h2 className='verif_head'>{locale?.verification?.great_verify_your_email}</h2>
                        <p>{locale?.verification?.we_have_sent_a_verification_email_to} {email ?? null} </p>
                        <p>{locale?.verification?.able_to_access_your_prelease_account}</p>
                        <div className='social_login verif_social'>
                            <Link href="https://gmail.com/" target='__blank'><img src="/images/gmail.webp" alt="" />{locale?.verification?.open_email}</Link>
                            <Link href="https://proton.me/" target='__blank'><img src="/images/porton.webp" alt="" />{locale?.verification?.open_proton}</Link>
                            <Link href="https://www.yahoo.com/" target='__blank'><img src="/images/yahoo.webp" alt="" />{locale?.verification?.open_yahoo}</Link>
                            <Link href="https://www.icloud.com/" target='__blank'><img src="/images/mail.webp" alt="" />{locale?.verification?.open_apple_mail}</Link>
                            <Link href="https://www.microsoft.com/" target='__blank'><img src="/images/outlook.webp" alt="" />{locale?.verification?.open_outlook}</Link>
                        </div>
                        <div className='note'>
                            {locale?.verification?.your_provider_platform_to_verify_your_email}.
                        </div>
                        <p>{locale?.verification?.check_your_spam_folder}.</p>
                    </div>
                </div>
            </section>
        </>
    )
});

Verification.displayName = 'Verification';

export default Verification
