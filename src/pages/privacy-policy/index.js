import React from 'react'

const PrivacyPolicy = () => {
    return (
        <>
            <div className='nighborhood-support-section'>
                <div className='nighborhood-support-child-left-section'>
                    <h6>Legal terms</h6>
                    <h2>Your privacy choices</h2>
                    <h5>Opt out of selling, sharing and targeted advertising</h5>
                    <p>Airbnb does not sell personal information to third parties: we’re not a data broker and we don’t put personal information on the open market. However, we may share personal information with certain third parties to do targeted advertising or data analytics, which under California and certain other state privacy laws could be characterized as “selling,” “sharing,” or “targeted advertising”.</p>
                    <br />
                    <p>If you're a US user and want to opt out of such data sharing, you can do so by pressing the button below.</p>
                    <button className='btn privacy-policy-btn'>I want to opt out</button>
                    <p>You can read more about how we use your personal information in our Privacy Policy.</p>
                </div>
            </div>
        </>
    )
}

export default PrivacyPolicy
