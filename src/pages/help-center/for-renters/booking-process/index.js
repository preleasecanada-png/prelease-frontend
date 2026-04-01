import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const BookingProcess = () => {
    const router = useRouter();
    return (
        <>
            <div className="booking-process-container mt-5">
                <div className='profile-session-heading'>
                    <h4><Link href="/">Home</Link> </h4> <p> <Link href="/help-center">{` > Help Center`}</Link> <Link href="/help-center">{` > For Renters`}</Link> <Link href="/help-center/for-renters/payment-refund">{` > Payment & Refund`}</Link></p>
                </div>
                <div className="booking-process-content">
                    <div className="booking-process-steps">
                        <div>
                            <h1 className="booking-process-hea"><img src="/images/help-center/arrow.png" className='help-center-img-back' alt="" onClick={() => router.back()} /> Booking Process</h1>
                            <div className="booking-process-subtitle">Booking a Stay on Pinehome Canada</div>
                            <p className="booking-process-description">
                                Booking your next stay is easy and simple. Follow these simple steps to search, select, and confirm your vacation home in Canada.
                            </p>
                        </div>
                        <div className="booking-process-step">
                            <div className="booking-process-step-header">1. Search Your Destination</div>
                            <ul className="booking-process-step-content">
                                <li className="booking-process-step-item">Go to the <Link href='/' className='font-bold'>Home Page</Link></li>
                                <li className="booking-process-step-item">Enter a city or province in Canada (e.g., Toronto, Vancouver)</li>
                                <li className="booking-process-step-item">Choose <span className='font-bold'>check-in / check-out dates</span></li>
                                <li className="booking-process-step-item">Select number of guests</li>
                                <li className="booking-process-step-item">Tip On <span className='font-bold'> Search</span></li>
                            </ul>
                        </div>

                        <div className="booking-process-step">
                            <div className="booking-process-step-header">2. Explore Listings</div>
                            <ul className="booking-process-step-content">
                                <li className="booking-process-step-item">Browse through property cards</li>
                                <li className="booking-process-step-item">Click any card to open <span className='font-bold'>property details</span></li>
                                <li className="booking-process-step-item">View images, description, price per night, and host info</li>
                            </ul>
                        </div>

                        <div className="booking-process-step">
                            <div className="booking-process-step-header">3. Choose a Property</div>
                            <ul className="booking-process-step-content">
                                <li className="booking-process-step-item">Tap <span className='font-bold'>"Book Now"</span> on your preferred listing</li>
                                <li className="booking-process-step-item">Review booking details (dates, guests, price breakdown)</li>
                            </ul>
                        </div>

                        <div className="booking-process-step">
                            <div className="booking-process-step-header">4. Provide Booking Info</div>
                            <ul className="booking-process-step-content">
                                <li className="booking-process-step-item">If not logged in, enter <span className='font-bold'>email</span></li>
                                <li className="booking-process-step-item">Fill in any required details (guests count, special notes)</li>
                            </ul>
                        </div>

                        <div className="booking-process-step">
                            <div className="booking-process-step-header">5. Payment</div>
                            <ul className="booking-process-step-content">
                                <li className="booking-process-step-item">Review cancellation policy</li>
                                <li className="booking-process-step-item">Choose your <span className='font-bold'>payment method</span></li>
                                <li className="booking-process-tip">Tap <span className='font-bold'>"Confirm Booking"</span></li>
                            </ul>
                        </div>

                        <div className="booking-process-step">
                            <div className="booking-process-step-header">6. Booking Confirmation</div>
                            <ul className="booking-process-step-content">
                                <li className="booking-process-step-item">You'll see a confirmation screen</li>
                                <li className="booking-process-step-item">Go to <Link href='#' className='font-bold'>{`"Bookings > Upcoming Trips"`}</Link> to view i
                                    <li className="booking-process-step-item">You can: <span className='font-bold'>View Location, Cancel Booking, Call Host,</span> or <span className='font-bold'>Message Host</span></li></li>
                            </ul>
                        </div>
                    </div>

                    <div className="booking-process-support-2">
                        <h3 className='booking-looking-for'>Can’t find what you’re looking for?</h3>
                        <p className='f-size'>Our support team is ready to help you with any questions or issues you might have.</p>
                        <button className="support-box-btn-red">Contact Support Team</button>
                        <Link href="/chats">
                            <button className="support-box-btn-outline">Live Chat</button>
                        </Link>
                        <p>Typical response time: Within 2 hours</p>
                        <div className="support-hours">
                            <div>Support hours: <span>9AM - 8PM ET</span></div>
                            <div>Response time: <span>Within 24 hours</span></div>
                            <div>Saturday: <span>9:00 AM - 5:00 PM ET</span></div>
                            <div className='border-bottom-support-box'>Sunday: <span>10:00 AM - 4:00 PM ET</span></div>
                            <div className='emergency-hea'>Emergency Support</div>
                            <div>Available 24/7 for urgent issues</div>
                        </div>
                    </div>
                </div>
                <div className='need-help'>
                    <h5 className='need-help-hea'>Need help with your booking?</h5>
                    <button className='support-box-btn-red w-25'>Contact Support</button>
                </div>
            </div>
        </>
    )
}

export default BookingProcess