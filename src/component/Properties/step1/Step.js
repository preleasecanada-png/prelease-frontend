import React from 'react'

const Step = () => {
    return (
        <>
            <div className="mb-5 mt-5 pro-step">
                <div className='step-wid-1'>
                    <h2 className='ab-place-hea'>Easy 3 steps to get started on
                        <span className='mx-2 preleas-hea'>
                            <img src="/images/half_leaf.png" alt="" />
                            PreLease
                        </span>
                    </h2>
                </div>

                <div className='step-wid-2'>
                    <div className="step">
                        <div className='step-inside'>
                            <h5 className='step-right-hea'>1. Tell us about your place</h5>
                            <p className='text-wrap step-para'>Share some basic info, like where it is and how many guests can stay.</p>
                        </div>
                        <div className="step-icon">
                            <img src="/images/propertity/step1/step1/home.webp" alt="" />
                        </div>
                    </div>

                    <div className="step">
                        <div className='step-inside'>
                            <h5 className='step-right-hea'>2. Make it stand out</h5>
                            <p className='text-wrap step-para'>Add 5 or more photos plus a title and description - we'll help you out.</p>
                        </div>
                        <div className="step-icon">
                            <img src="/images/propertity/step1/step1/stand-out.webp" alt="" />
                        </div>
                    </div>
                    <div className="step">
                        <div className='step-inside'>
                            <h5 className='step-right-hea'>3. Finish up and publish</h5>
                            <p className='text-wrap step-para'>Choose a starting price, verify a few details, then publish your listing.</p>
                        </div>
                        <div className="step-icon"><img src="/images/propertity/step1/step1/publish.webp" alt="" /></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Step
