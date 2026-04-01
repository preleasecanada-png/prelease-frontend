import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'

const PaymentEarning = () => {
    const router = useRouter();
    return (
        <>
            <div className="payment-process-container">
                <div className='profile-session-heading'>
                    <h4><Link href="/">Home</Link> </h4> <p> <Link href="/help-center">{` > Help Center`}</Link> <Link href="/for-landlords">{` > For Landlords`}</Link> <Link href="/help-center/for-landlords/policies-safety">{` > Listing Your Property`}</Link></p>
                </div>
                <div className="payment-process-step-header-f mt-5"><img src="/images/help-center/arrow.png" className='help-center-img-back me-2' alt="" onClick={() => router.back()} />Payments & Earnings</div>
                <div className="payment-process-step-header mt-5">How Payments Work</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">After a guest checks in, your payout is processed within <span className='font-bold'>24 hours</span>.</li>
                    <li className="booking-process-step-item">Funds are transferred to your selected payout method.</li>
                </ul>


                <div className="payment-process-step-header">Setting Up a Payout Method</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">Go to <span className='font-bold'>Account & {`Settings > Payout`} Preferences.</span></li>
                    <li className="booking-process-step-item">Choose from supported options (Bank Transfer, PayPal, etc.).</li>
                    <li className="booking-process-step-item">Add your account details securely.</li>
                </ul>

                <div className="payment-process-step-header">Payout Schedule:</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">Payouts are released <span className='font-bold'>after check-in</span>, not on booking confirmation.</li>
                    <li className="booking-process-step-item">Holidays and weekends may slightly delay transfers depending on your bank.</li>
                </ul>

                <div className="payment-process-step-header">Viewing Earnings</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">Visit the <span className='font-bold'>“Earnings”</span> tab to:
                        <li>
                            <ul>
                                <li className="booking-process-step-item">See current and past payouts</li>
                                <li className="booking-process-step-item">Filter by date or property</li>
                                <li className="booking-process-step-item">Download statements for records</li>
                            </ul>
                        </li>
                    </li>
                </ul>


                <div className="payment-process-step-header">Service Fees</div>
                <ul className="payment-process-step-content">
                    <ul>
                        <li className="booking-process-step-item">Prelease charges a small service fee per booking (percentage based).</li>
                        <li className="booking-process-step-item">This is automatically deducted before your payout.</li>
                    </ul>
                </ul>


                <div className="payment-process-step-header">Missing or Delayed Payment</div>
                <ul className="payment-process-step-content">
                    <ul>
                        <li className="booking-process-step-item">Check payout status in <span className='font-bold'>Earnings</span>.</li>
                        <li className="booking-process-step-item">Make sure your payout method is correctly added.</li>
                        <li className="booking-process-step-item">Contact support if it’s been over 5 business days.</li>
                    </ul>
                </ul>

            </div>
        </>
    )
}

export default PaymentEarning
