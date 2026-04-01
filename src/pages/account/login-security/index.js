import { CreateApiContext } from '@/ContextApi/CreateApiContext';
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'

const LoginSecurity = () => {
    const { users, fetchUsersLists } = useContext(CreateApiContext);
    const [host, setHost] = useState({});
    useEffect(() => {
        if (users?.length == 0) fetchUsersLists();
    }, []);

    useEffect(() => {
        const user_id = window?.localStorage?.getItem('user_id');
        if (users?.length > 0) {
            const host = users?.find(item => item?.id == user_id);
            setHost(host);
        }
    }, [users]);
    return (
        <>
            <section className="login-security-session-main-container container">
                <div className='profile-session-heading'>
                    <h4><Link href="/account">Account</Link> </h4> <p> <Link href="/account/login-security">{' > Login & Security'}</Link></p>
                </div>
                <div className='login-security-session-row'>
                    <div className='login-security-session-left-container'>
                        <h1>Login</h1>
                        <div className='login-security-session-left-about-you'>
                            <div className='login-security-session-left-inside-det'>
                                <h3>Password</h3>
                                <p>Last updated 21 hours ago</p>
                            </div>
                        </div>
                        <div className='login-security-session-left-about-you'>
                            <div className='login-security-session-left-inside-det'>
                                <h1 className='contact-info-hea'>Social Accounts</h1>
                                <h3>Google</h3>
                                <p>{host?.google_id != null ? 'Connected' : 'DisConnected'}</p>
                            </div>
                            <span className='disconnect'>{host?.google_id != null ? 'DisConnected' : 'Connected'}</span>
                        </div>

                        <div className='login-security-session-left-about-you mt-5'>
                            <div className='login-security-session-left-inside-det'>
                                <h3>Account</h3>
                                <p>Deactivate Your Account</p>
                            </div>
                            <span className='disconnect'>Deactivate</span>
                        </div>
                    </div>
                    <div className='login-security-session-right-container'>
                        <img src="/images/account/profile-img-2.webp" alt="" />
                        <h4>Keep your account safe and secure</h4>
                        <p>Manage your login and security settings to keep your account protected. We never share your login data with anyone.</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LoginSecurity
