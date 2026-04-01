import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'

const PolicySafety = () => {
    const router = useRouter();
    return (
        <>
            <div className="payment-process-container">
                <div className='profile-session-heading'>
                    <h4><Link href="/">Home</Link> </h4> <p> <Link href="/help-center">{` > Help Center`}</Link> <Link href="/for-renters">{` > For Renters`}</Link> <Link href="/help-center/for-renters/policies-safety">{` > Policies & Safety`}</Link></p>
                </div>
                <div>
                    <h1 className="payment-process-hea"><img src="/images/help-center/arrow.png" className='help-center-img-back me-2' alt="" onClick={() => router.back()} />Policies & Safety</h1>
                    <div className="payment-process-subtitle">Policies & Safety on Prelease Canada</div>
                    <p className="payment-process-description">Your safety is our priority. Explore how Prelease maintains a trustworthy community for both Renters and Landlords through clear guidelines and policies.</p>
                </div>
                <div className="payment-process-step-header-f">1: Community Guidelines</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">Respect your host and their property</li>
                    <li className="booking-process-step-item">Avoid discrimination or offensive behavior</li>
                    <li className="booking-process-step-item">No illegal activities during stay</li>
                    <li className="booking-process-step-item">Follow house rules set by the host</li>
                </ul>


                <div className="payment-process-step-header">2: Renter Safety Tips</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">Always communicate through the Prelease app</li>
                    <li className="booking-process-step-item">Avoid sharing personal financial details outside the platform</li>
                    <li className="booking-process-step-item">Use in-app messaging & support for any issues</li>
                    <li className="booking-process-step-item">Read host ratings and reviews before booking</li>
                </ul>

                <div className="payment-process-step-header">3: Reporting Issues</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">
                        <ul>
                            <li className="booking-process-step-item"><span className='font-bold'>Something wrong during stay?</span>
                                <ul>
                                    <li>Go to your trip → tap “Help” → select issue → contact support</li>
                                </ul>
                            </li>
                            <li className="booking-process-step-item"><span className='font-bold'>Feel unsafe?</span>
                                <ul>
                                    <li> Immediate option to reach emergency support (can be in design)</li>
                                </ul>
                            </li>

                            <li className="booking-process-step-item"><span className='font-bold'>Report a listing or host</span>
                                <ul>
                                    <li>  Go to {`listing > tap on “Report” > choose`} reason</li>
                                </ul>
                            </li>

                        </ul>
                    </li>
                </ul>

                <div className="payment-process-step-header">4: Important Policies</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item"><strong className='font-bold'>Cancellation Policy:</strong> Outlines how refunds are handled</li>
                    <li className="booking-process-step-item"><strong className='font-bold'>Damage Policy:</strong> You may be liable for property damages</li>
                    <li className="booking-process-step-item"><strong className='font-bold'>Non-compliance Policy:</strong> Account may be suspended if rules are violated</li>
                </ul>


            </div>
            <div className='need-help'>
                <h5 className='need-help-hea'>Need help with your booking?</h5>
                <button className='support-box-btn-red w-25'>Contact Support</button>
            </div>
        </>
    )
}

export default PolicySafety
