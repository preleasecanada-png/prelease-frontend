import Link from 'next/link'
import React from 'react'

const ListingYourProperty = () => {
    return (
        <>
            <div className="payment-process-container">
                <div className='profile-session-heading'>
                    <h4><Link href="/">Home</Link> </h4> <p> <Link href="/help-center">{` > Help Center`}</Link> <Link href="/for-landlords">{` > For Landlords`}</Link> <Link href="/help-center/for-landlords/policies-safety">{` > Listing Your Property`}</Link></p>
                </div>
                <h1 className="booking-process-hea"><img src="/images/help-center/arrow.png" className='help-center-img-back' alt="" onClick={() => router.back()} /> Listing Your Property
                </h1>
                <div className="payment-process-step-header mt-5">1. Start Your Listing</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">Go to Prelease Your Home from the main menu.</li>
                    <li className="booking-process-step-item">Click on “Start Listing” and follow the prompts.</li>
                </ul>


                <div className="payment-process-step-header">2. Add Property Details</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">Select property type: Apartment, House, Condo, etc.</li>
                    <li className="booking-process-step-item">Mention number of bedrooms, bathrooms, and max guests.</li>
                    <li className="booking-process-step-item">Add amenities (Wi-Fi, Parking, Kitchen, etc.)</li>
                </ul>

                <div className="payment-process-step-header">3. Upload Photos</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">Use high-resolution images.</li>
                    <li className="booking-process-step-item">Show all major rooms, bathrooms, exterior, and views.</li>
                    <li className="booking-process-step-item">Make sure lighting is bright and clean.</li>
                </ul>
                <div className="payment-process-step-header">4. Write a Description</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">Describe what makes your space unique.</li>
                    <li className="booking-process-step-item">Include info about nearby attractions or conveniences.</li>
                </ul>


                <div className="payment-process-step-header">5. Set Pricing</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">Add nightly rate (consider location/season).</li>
                    <li className="booking-process-step-item">Enable discounts for longer stays (optional).</li>
                    <li className="booking-process-step-item">Add a cleaning fee (optional).</li>
                </ul>


                <div className="payment-process-step-header">6. Set House Rules & Availability</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">Review your listing.</li>
                    <li className="booking-process-step-item">Click <span className='font-bold'>“Publish”</span> to go live on the platform.</li>
                </ul>
                <div className="payment-process-step-header">7. Pro Tips:</div>
                <ul className="payment-process-step-content">
                    <li className="booking-process-step-item">Keep your calendar updated regularly.</li>
                    <li className="booking-process-step-item">Respond to booking requests quickly.</li>
                    <li className="booking-process-step-item">Keep descriptions and photos up-to-date for better visibility.</li>
                </ul>
            </div>
        </>
    )
}

export default ListingYourProperty
