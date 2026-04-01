import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'

const AccountSetting = () => {
    const router = useRouter();
    return (
        <>
            <div className="payment-process-container">
                <div className='profile-session-heading'>
                    <h4><Link href="/">Home</Link> </h4> <p> <Link href="/help-center">{` > Help Center`}</Link> <Link href="/for-renters">{` > For Renters`}</Link> <Link href="/help-center/for-renters/account-settings">{` > Account & Settings`}</Link></p>
                </div>
                <div>
                    <h1 className="payment-process-hea"><img src="/images/help-center/arrow.png" className='help-center-img-back me-2' alt="" onClick={() => router.back()} />Account & Settings</h1>
                    <div className="payment-process-subtitle">Managing Your Account on Prelease Canada</div>
                    <p className="payment-process-description">Stay in control of your profile — update your info, adjust security settings, or manage your notifications easily within your account section.</p>
                </div>
                <div className="payment-process-step-header-f">1: Updating Personal Info</div>
                <div className="payment-process-step-header">1: Updating Personal Info</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">Where to go:</li>
                    <li className="booking-process-step-item">{`Profile > Personal`} Info</li>
                    <li className="booking-process-step-item">You can update:</li>
                    <li>
                        <ul>
                            <li className="booking-process-step-item">Legal name</li>
                            <li className="booking-process-step-item">About you</li>
                            <li className="booking-process-step-item">Gender</li>
                            <li className="booking-process-step-item">Date of birth</li>
                            <li className="booking-process-step-item">Phone number</li>
                            <li className="booking-process-step-item">Email address</li>

                        </ul>
                    </li>
                </ul>


                <div className="payment-process-step-header">2: Login & Security</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">Where to go:</li>
                    <li className="booking-process-step-item">{`Profile > Login`} & Security</li>
                    <li className="booking-process-step-item">You can:</li>
                    <li className="booking-process-step-item">
                        <ul>
                            <li className="booking-process-step-item">View login activity</li>
                            <li className="booking-process-step-item">Connect or disconnect social accounts</li>
                            <li className="booking-process-step-item">Delete your account permanently (with confirmation step)</li>
                        </ul>
                    </li>
                </ul>

                <div className="payment-process-step-header">3: Notifications</div>
                <ul className="payment-process-step-content">
                    <div className="payment-process-step-header">Where to go:</div>
                    <li className="booking-process-step-item">{`Profile > Login`} & Security</li>
                    <li className="booking-process-step-item">
                        <ul>
                            <li className="booking-process-step-item">Toggle on/off for:</li>
                            <li className="booking-process-step-item">Travel Tips & Offers (Email/SMS)</li>
                            <li className="booking-process-step-item">Prelease Updates (Email/SMS)</li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div className='need-help'>
                <h5 className='need-help-hea'>Need help with your booking?</h5>
                <button className='support-box-btn-red w-25'>Contact Support</button>
            </div>
        </>
    )
}

export default AccountSetting
