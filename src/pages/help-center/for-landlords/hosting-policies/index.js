import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'

const HostingPolicy = () => {
    const router = useRouter();
    return (
        <>
            <div className="payment-process-container">
                <div className='profile-session-heading'>
                    <h4><Link href="/">Home</Link> </h4> <p> <Link href="/help-center">{` > Help Center`}</Link> <Link href="/for-landlords">{` > For Landlords`}</Link> <Link href="/help-center/for-landlords/hosting-policies">{` > Hosting Policies`}</Link></p>
                </div>
                <h1 className="booking-process-hea"><img src="/images/help-center/arrow.png" className='help-center-img-back' alt="" onClick={() => router.back()} /> Hosting Policies</h1>
                <div className="payment-process-step-header mt-5">Setting House Rules</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">Clearly define:
                        <ul>
                            <li className="booking-process-step-item">Check-in/check-out timings</li>
                            <li className="booking-process-step-item">Quiet hours</li>
                            <li className="booking-process-step-item">Smoking/pet policies</li>
                            <li className="booking-process-step-item">Guest limits</li>
                        </ul>
                    </li>
                    <li className="booking-process-step-item">Guests must agree to these before booking.</li>
                </ul>


                <div className="payment-process-step-header">Cancellation Policies</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">Choose your cancellation policy while listing:
                        <ul>
                            <li className="booking-process-step-item"><span className='font-bold'>Flexible –</span> Full refund up to 24 hours before</li>
                            <li className="booking-process-step-item"><span className='font-bold'>Moderate –</span> Full refund 5 days before</li>
                            <li className="booking-process-step-item"><span className='font-bold'>Strict –</span> Partial refund, conditions apply</li>

                        </ul>
                    </li>
                    <li className="booking-process-step-item">Policy is shown on your listing page.</li>
                </ul>

                <div className="payment-process-step-header">Cleanliness Standards</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">Maintain basic hygiene and cleanliness.</li>
                    <li className="booking-process-step-item">Optional: Hire cleaning services between stays.</li>
                </ul>

                <div className="payment-process-step-header">Host Protection</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">Prelease may provide limited damage protection (platform-specific).</li>
                    <li className="booking-process-step-item">Guests are responsible for major damages under their booking.</li>
                </ul>


                <div className="payment-process-step-header">Policy Violations</div>
                <ul className="payment-process-step-content">
                    <ul>
                        <li className="booking-process-step-item">If guests break rules, you can report them.</li>
                        <li className="booking-process-step-item">Repeated violations from either side can lead to account review or suspension.</li>
                    </ul>
                </ul>
            </div>
        </>
    )
}

export default HostingPolicy
