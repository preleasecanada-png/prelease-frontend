import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'

const TripManagment = () => {
    const router = useRouter();
    return (
        <>

            <div className="payment-process-container">
                <div className='profile-session-heading'>
                    <h4><Link href="/">Home</Link> </h4> <p> <Link href="/help-center">{` > Help Center`}</Link> <Link href="/trip-managment">{` > Trips Managment`}</Link> <Link href="/help-center/for-renters/booking-process">{` > Booking Process`}</Link></p>
                </div>
                <div>
                    <h1 className="payment-process-hea"><img src="/images/help-center/arrow.png" className='help-center-img-back' alt="" onClick={() => router.back()} />Trip Management</h1>
                    <div className="payment-process-subtitle">Managing Your Trips on Prelease Canada</div>
                    <p className="payment-process-description">Once your booking is confirmed, you can manage everything from your upcoming trip — view stay details, cancel if needed, or connect with your host directly.</p>
                </div>
                <div className="payment-process-step-header">1. Go to “Bookings” Tab</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">Tap on the <span className="highlighted-text">Bookings tab</span> in the bottom navigation</li>
                    <li className="booking-process-step-item">You'll see your <span className="highlighted-text">Upcoming Trips</span> listed with:</li>
                    <li className="booking-process-step-item">Property name & image</li>
                    <li className="booking-process-step-item">Dates of stay</li>
                    <li className="booking-process-step-item">Location</li>
                </ul>

                <div className="payment-process-step-header">2. Tap on a Trip Card</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">View full trip details:</li>
                    <li className="booking-process-step-item">Check-in / Check-out Dates</li>
                    <li className="booking-process-step-item">Hotel Location</li>
                    <li className="booking-process-step-item">Cancelling Booking</li>
                    <li className="booking-process-step-item">Host Call</li>
                    <li className="booking-process-step-item">Host Message</li>
                </ul>

                <div className="payment-process-step-header">2: Canceling a Booking</div>
                <ul className="payment-process-step-content">
                    <div className="payment-process-step-header">1. Tap “Cancel Booking”</div>
                    <li className="booking-process-step-item">Found within trip details</li>
                    <li className="booking-process-step-item">You’ll see a confirmation popup showing:</li>
                    <li className="booking-process-step-item">Refund eligibility</li>
                    <li className="booking-process-step-item">Any cancellation fee</li>
                </ul>


                <div className="payment-process-step-header">2. Confirm Cancellation</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">Once confirmed, refund (if eligible) will be processed</li>
                    <li className="booking-process-step-item">Your trip moves to “Cancelled Trips” section (if added in design)</li>
                </ul>
            </div>
            <div className='need-help'>
                <h5 className='need-help-hea'>Need help with your booking?</h5>
                <button className='support-box-btn-red w-25'>Contact Support</button>
            </div>
        </>
    )
}

export default TripManagment
