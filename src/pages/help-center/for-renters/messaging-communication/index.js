import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'

const MessagingCommunication = () => {
  const router = useRouter();
  return (
    <>
      <div className="payment-process-container">
        <div className='profile-session-heading'>
          <h4><Link href="/">Home</Link> </h4> <p> <Link href="/help-center">{` > Help Center`}</Link> <Link href="/for-renters">{` > For Renters`}</Link> <Link href="/help-center/for-renters/messaging-communication">{` > Messaging & Communication`}</Link></p>
        </div>
        <div>
          <h1 className="payment-process-hea"><img src="/images/help-center/arrow.png" className='help-center-img-back me-2' alt="" onClick={() => router.back()} />Messaging & Communication</h1>
          <div className="payment-process-subtitle">Messaging & Communication on Prelease Canada</div>
          <p className="payment-process-description">Stay connected with your host through our in-app messaging. Ask questions, clarify stay details, or share arrival info — all from your trip tab.</p>
        </div>
        <div className="payment-process-step-header">1. Go to “Bookings” Tab</div>
        <ul className="payment-process-step-content">
          <li className="booking-process-step-item">Tap on the <span className="highlighted-text">Bookings tab</span> in the bottom navigation</li>
          <li className="booking-process-step-item">You'll see your <span className="highlighted-text">Upcoming Trips</span> listed with:</li>
          <li className="booking-process-step-item">Property name & image</li>
          <li className="booking-process-step-item">Dates of stay</li>
          <li className="booking-process-step-item">Location</li>
        </ul>


        <div className="payment-process-step-header">Accessing Messages</div>

        <div className="payment-process-step-header">1. From Trip Details</div>
        <ul className="payment-process-step-content">
          <li className="booking-process-step-item">Go to {`Bookings > Upcoming`} Trip</li>
          <li className="booking-process-step-item">Tap on “Message Host” button</li>
        </ul>

        <div className="payment-process-step-header">2: Chat Interface Overview</div>
        <ul className="payment-process-step-content">
          <div className="payment-process-step-header">Looks like a normal chat box (text-only)</div>
          <li className="booking-process-step-item">Messages are real-time (if internet is active)</li>
          <li className="booking-process-step-item">You can:</li>
          <li>
            <ul>
              <li className="booking-process-step-item">Ask about check-in/out time</li>
              <li className="booking-process-step-item">Confirm directions</li>
              <li className="booking-process-step-item">Request special arrangements (e.g., early check-in)</li>
            </ul>
          </li>
        </ul>


        <div className="payment-process-step-header">3: Communication Guidelines</div>
        <ul className="payment-process-step-content">
          <li className="booking-process-step-item">Be respectful and polite</li>
          <li className="booking-process-step-item">Never share personal financial details</li>
          <li className="booking-process-step-item">Avoid discussing offline payments</li>
          <li className="booking-process-step-item">If host doesn't respond, contact Prelease support</li>
        </ul>
      </div>
      <div className='need-help'>
        <h5 className='need-help-hea'>Need help with your booking?</h5>
        <button className='support-box-btn-red w-25'>Contact Support</button>
      </div>
    </>
  )
}

export default MessagingCommunication
