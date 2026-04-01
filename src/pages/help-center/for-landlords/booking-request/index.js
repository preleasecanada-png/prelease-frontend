import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const BookingRequest = () => {
    const router = useRouter();
    return (
        <>
            <div className="payment-process-container">
                <div className='profile-session-heading'>
                    <h4><Link href="/">Home</Link> </h4> <p> <Link href="/help-center">{` > Help Center`}</Link> <Link href="/for-landlords">{` > For Landlords`}</Link> <Link href="/help-center/for-landlords/policies-safety">{` > Listing Your Property`}</Link></p>
                </div>
                <div className="payment-process-step-header-f mt-5"><img src="/images/help-center/arrow.png" className='help-center-img-back me-2' alt="" onClick={() => router.back()} />Managing Bookings</div>
                <div className="payment-process-step-header mt-5">Receiving Booking Requests</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">You’ll be notified via email and app when someone books your property.</li>
                    <li className="booking-process-step-item">Booking requests will show:
                        <ul>
                            <li className="booking-process-step-item">Guest details</li>
                            <li className="booking-process-step-item">Check-in/check-out dates</li>
                            <li className="booking-process-step-item">Number of guests</li>
                            <li className="booking-process-step-item">Special notes (if any)</li>
                        </ul>
                    </li>
                </ul>


                <div className="payment-process-step-header">Accepting or Declining Bookings</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">Review guest profile and message (if sent).</li>
                    <li className="booking-process-step-item">Choose <span className='font-bold'>Accept</span> to confirm or <span className='font-bold'>Decline</span> (with a reason).</li>
                    <li className="booking-process-step-item">Guests will be notified of your response instantly.</li>
                </ul>

                <div className="payment-process-step-header">Calendar Management</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">Sync your calendar with other platforms (optional).</li>
                    <li className="booking-process-step-item">Block unavailable dates to avoid double-bookings.</li>
                    <li className="booking-process-step-item">Keep availability updated to maintain visibility.</li>
                </ul>

                <div className="payment-process-step-header">Booking Modifications:</div>
                <ul className="payment-process-step-content">
                    <ul>
                        <li className="booking-process-step-item">Guests can request changes (dates, guest count).</li>
                        <li className="booking-process-step-item">You’ll get a prompt to approve or deny the change.</li>
                    </ul>
                </ul>


                <div className="payment-process-step-header">Cancellations</div>
                <ul className="payment-process-step-content">
                    <ul>
                        <li className="booking-process-step-item">You can cancel only under valid conditions (e.g., emergencies).</li>
                        <li className="booking-process-step-item">Cancellation policy will apply based on what you selected.</li>
                        <li className="booking-process-step-item">Guests will be notified and refunded accordingly.</li>
                    </ul>
                </ul>


                <div className="payment-process-step-header">Tips for Smooth Booking Management:</div>
                <ul className="payment-process-step-content">
                    <ul>
                        <li className="booking-process-step-item">Keep communication friendly and prompt.</li>
                        <li className="booking-process-step-item">Ensure calendar accuracy to avoid issues.</li>
                        <li className="booking-process-step-item">Set clear expectations in your listing to reduce confusion.</li>
                    </ul>
                </ul>

            </div>
        </>
    )
}

export default BookingRequest
