import React from 'react'

const ReportNeighBorhoodConcern = () => {
    return (
        <>
            <div className='nighborhood-support-section'>
                <div className='nighborhood-support-child-left-section'>
                    <h6>How-to</h6>
                    <h2>Neighborhood Support</h2>
                    <p>You can report a party, noise complaint, or neighborhood concern here.</p>
                    <p>For help with a reservation, hosting, or your account, contact Airbnb Support—our Neighborhood Support team is only available to help with concerns related to home sharing in your community.</p>
                    <div className='for-emerengy-area'>
                        <p>
                            <strong>For emergencies</strong>: If you feel unsafe or are concerned about your or someone else's well-being, please contact local emergency services immediately.</p>
                    </div>
                    <h4> Urgent neighborhood situations</h4>
                    <p>Reach out to Neighborhood Support if there’s a party or disturbance happening nearby.</p>
                    <button className='btn report-concern-btn'> Request a call</button>
                    <h4>Other neighborhood concerns</h4>
                    <p>Send us a message using the button below. Our team will investigate and follow up via email.</p>
                    <button className='btn report-concern-btn'>Report a concern</button>
                </div>
                <div className='nighborhood-support-child-right-section'>
                    <h3>Need to get in touch?</h3>
                    <p>We’ll start with some questions and get you to the right place.</p>
                    <button className='btn report-concern-btn'>Contact Us</button>
                    <p>You can also give us feedback.</p>
                </div>
            </div>
        </>
    )
}

export default ReportNeighBorhoodConcern
