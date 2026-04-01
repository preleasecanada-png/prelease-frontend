import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'

const AccountSetting = () => {
    const router = useRouter();
    return (
        <>
            <div className="payment-process-container">
                <div className='profile-session-heading'>
                    <h4><Link href="/">Home</Link> </h4> <p> <Link href="/help-center">{` > Help Center`}</Link> <Link href="/for-landlords">{` > For Landlords`}</Link> <Link href="/help-center/for-landlords/account-settings">{` > Account & Settings`}</Link></p>
                </div>
                <div className="payment-process-step-header-f mt-5"><img src="/images/help-center/arrow.png" className='help-center-img-back' alt="" onClick={() => router.back()} /> Account & Settings</div>


                <div className="payment-process-step-header">Editing Your Profile</div>

                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">Go to <span className='font-bold'>{`Account > Personal`} Info</span> to update:
                        <ul>
                            <li className="booking-process-step-item">Legal name</li>
                            <li className="booking-process-step-item">About section</li>
                            <li className="booking-process-step-item">Contact details (email, phone)</li>
                            <li className="booking-process-step-item">Profile picture</li>
                        </ul>
                    </li>
                </ul>


                <div className="payment-process-step-header">Security Settings</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">Change password under <span className='font-bold'>Login & Security</span></li>
                    <li className="booking-process-step-item">View login activity for any suspicious behavior</li>
                    <li className="booking-process-step-item">Enable two-factor authentication (if available)</li>
                </ul>

                <div className="payment-process-step-header">Social Media Connections</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">Aim to respond within <span className='font-bold'>1 hour</span> for better ratings.</li>
                    <li className="booking-process-step-item">Enable notifications so you don’t miss any messages.</li>
                </ul>

                <div className="payment-process-step-header">Guest Profiles</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">Link Google or Apple accounts for faster logins</li>
                    <li className="booking-process-step-item">Easily manage connected accounts</li>
                </ul>


                <div className="payment-process-step-header">Deleting or Deactivating Account</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">Found in <span className='font-bold'>Login & {`Security > Delete`} Account</span></li>
                    <li className="booking-process-step-item">You’ll lose access to all listings and earnings</li>
                    <li className="booking-process-step-item">Option to temporarily deactivate if needed</li>
                </ul>



                <div className="payment-process-step-header">Notification Settings</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">Control alerts for:
                        <ul>
                            <li className="booking-process-step-item">New bookings</li>
                            <li className="booking-process-step-item">Guest messages</li>
                            <li className="booking-process-step-item">Platform updates</li>
                            <li className="booking-process-step-item">Choose delivery via email and/or SMS</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default AccountSetting
