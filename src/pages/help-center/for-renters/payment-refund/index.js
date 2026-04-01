import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'

const PaymentRefund = () => {
    const router = useRouter();
    return (
        <>
            <div className="payment-process-container">
                <div className='profile-session-heading'>
                    <h4><Link href="/">Home</Link> </h4> <p> <Link href="/help-center">{` > Help Center`}</Link> <Link href="/help-center">{` > For Renters`}</Link> <Link href="/help-center/for-renters/booking-process">{` > Booking Process`}</Link></p>
                </div>
                <div>
                    <h1 className="payment-process-hea"><img src="/images/help-center/arrow.png" className='help-center-img-back' alt="" onClick={() => router.back()} />  1. Payments Process</h1>
                    <div className="payment-process-subtitle">Understanding Payments & Refunds on Pinehome Canada</div>
                    <p className="payment-process-description">Learn how payments work on Pinehome Canada — from how you're charged to when you're eligible for a refund. Everything is fast, secure, and transparent.</p>
                </div>
                <div className="payment-process-step-header">1. Booking Confirmation Charges</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">You are charged <span className="highlighted-text">only when you confirm a booking</span></li>
                    <li className="booking-process-step-item">You'll see a <span className="highlighted-text">price breakdown</span> before making payment:</li>
                    <li className="booking-process-step-item">Property cost</li>
                    <li className="booking-process-step-item">Taxes</li>
                    <li className="booking-process-step-item">Platform service fee (if any)</li>
                </ul>

                <div className="payment-process-step-header">2. Accepted Payment Methods</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">Credit & Debit Cards (Visa, MasterCard, etc.)</li>
                    <li className="booking-process-step-item">Pinehome does not support Cash or Offline payments</li>
                </ul>

                <li className="payment-process-step-header">3. Secure Checkout</li>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">All payments are processed via secure gateways</li>
                    <li className="booking-process-step-item">Your card details are never shared with hosts</li>
                </ul>

                <div className="payment-process-step-header">2. Refund Policy</div>

                <div className="payment-process-step-header">1. When Can You Get a Refund?</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">If you <span className='font-bold'>cancel a booking</span> within the allowed cancellation window</li>
                    <li className="booking-process-step-item">If a host cancels the stay</li>
                    <li className="booking-process-step-item">If you face service issues upon arrival (property mismatched, unsafe, etc.)</li>
                </ul>

                <div className="payment-process-step-header">2. How Are Refunds Processed?</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">Refund is initiated within <span className="highlighted-text">24-48 hours</span></li>
                    <li className="booking-process-step-item">You'll receive it in your <span className="highlighted-text">original payment method</span></li>
                    <li className="booking-process-step-item">Full or partial refund depends on host's cancellation policy</li>
                </ul>

                <div className="payment-process-step-header">3. Cancellation Window</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">Each listing shows the cancellation policy:</li>
                    <li className="booking-process-step-item">Flexible</li>
                    <li className="booking-process-step-item">Moderate</li>
                    <li className="booking-process-step-item">Strict</li>
                </ul>
            </div>
            <div className='need-help'>
                <h5 className='need-help-hea'>Need help with your booking?</h5>
                <button className='support-box-btn-red w-25'>Contact Support</button>
            </div>
        </>
    )
}

export default PaymentRefund
