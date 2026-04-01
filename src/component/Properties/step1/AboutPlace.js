import React from 'react'

const AboutPlace = () => {
    return (
        <>
            <div className="mb-5 mt-5 pro-step">
                <div className='step-wid-1'>
                    <span className='place-step1'>Step 1</span>
                    <h2 className='ab-place-hea'>Tell us about your place</h2>
                    <p className='place-desc'>In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room. Then let us know the location and how many guests can stay.</p>
                </div>

                <div className='step-wid-2'>
                    <div className='about-place-right-images'>
                        <img src="/images/propertity/step1/step2/center.png" alt="" />
                        <div className='left-top-1'>
                            <img src="/images/propertity/step1/step2/left-top-1.png" alt="" />
                        </div>
                        <div className='right-top-1'>
                            <img src="/images/propertity/step1/step2/right-top-1.png" alt="" />
                        </div>
                        <div className='right-bottom-2'>
                            <img src="/images/propertity/step1/step2/right-bottom-2.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutPlace
