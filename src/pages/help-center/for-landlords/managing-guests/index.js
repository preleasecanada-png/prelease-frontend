import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const ManagingGuest = () => {
    const router = useRouter();
    return (
        <>
            <div className="payment-process-container">
                <div className='profile-session-heading'>
                    <h4><Link href="/">Home</Link> </h4> <p> <Link href="/help-center">{` > Help Center`}</Link> <Link href="/for-landlords">{` > For Landlords`}</Link> <Link href="/help-center/for-landlords/policies-safety">{` > Listing Your Property`}</Link></p>
                </div>
                <div className="payment-process-step-header-f mt-5"><img src="/images/help-center/arrow.png" className='help-center-img-back' alt="" onClick={() => router.back()} />Managing Guests & Communication</div>
                <div className="payment-process-step-header mt-5">Messaging Guests</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">Use in-app messaging to:
                        <ul>
                            <li className="booking-process-step-item">Answer questions</li>
                            <li className="booking-process-step-item">Share arrival instructions</li>
                            <li className="booking-process-step-item">Confirm check-in/check-out times</li>
                        </ul>
                    </li>
                    <li className="booking-process-step-item">Keep all communication on Prelease for safety.</li>
                </ul>


                <div className="payment-process-step-header">Contact Options</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">Guests can call or message you after booking is confirmed.</li>
                    <li className="booking-process-step-item">Make sure your contact info is up to date.</li>
                </ul>

                <div className="payment-process-step-header">Response Time</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">Aim to respond within 1 hour for better ratings.</li>
                    <li className="booking-process-step-item">Enable notifications so you don’t miss any messages.</li>
                </ul>
                <div className="payment-process-step-header">Guest Profiles</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">View renter’s profile before accepting bookings:
                        <ul>
                            <li className="booking-process-step-item">Past reviews</li>
                            <li className="booking-process-step-item">Verification info (if any)</li>
                            <li className="booking-process-step-item">Message history</li>
                        </ul>
                    </li>
                </ul>


                <div className="payment-process-step-header">Handling Issues</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">If a guest behaves inappropriately or violates rules:
                        <ul>
                            <li className="booking-process-step-item">Document the incident</li>
                            <li className="booking-process-step-item">Report via the Help Center</li>
                            <li className="booking-process-step-item">Contact Prelease support if urgent</li>
                        </ul>
                    </li>
                </ul>

            </div>
        </>
    )
}

export default ManagingGuest
