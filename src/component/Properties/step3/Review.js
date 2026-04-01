import React from 'react'

const Review = () => {
    return (
        <>
            <div className='review-main'>
                <h1 className="ab-place-hea">Review your listing</h1>
                <p className="ab-place-hea-para">Here’s what we’ll show to guest. Make sure everything looks good.</p>
                <div className='review-detail'>
                    <div className='review-image-section'>
                        {/* <img src="images/fp6.webp" height="150" width="150" alt="" /> */}
                        <div className='img-area'>
                        <img src="images/gellery-2.webp" class="stand-out-right-img"/>
                        </div>
                        <div className='review-img-inside-area'>
                            <h6>tin tapaak dham dhaam</h6>
                            <p>New</p>
                        </div>
                        <p>$15 night</p>
                    </div>
                    <div className='review-right-section'>
                        <h1 className='review-what-next'>What's next?</h1>
                        <div className='review-inside-detail'>
                            <div className='review-inside-hea-or-desc'>
                                <img src="images/propertity/step2/stand-out-place.webp" height="30" width="30" alt="" />
                                <h1>Confirm a few details and publish</h1>
                            </div>
                            <p className='review-inside-hea-or-para'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero laborum neque consectetur atque repudiandae minus vel incidunt, odit quis voluptatibus. Ipsam, eaque.</p>
                        </div>

                        <div className='review-inside-detail'>
                            <div className='review-inside-hea-or-desc'>
                                <img src="images/propertity/step2/stand-out-place.webp" height="30" width="30" alt="" />
                                <h1>Set up your calendar</h1>
                            </div>
                            <p className='review-inside-hea-or-para'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero laborum neque consectetur atque repudiandae minus vel incidunt, odit quis voluptatibus. Ipsam, eaque.</p>
                        </div>
                        <div className='review-inside-detail'>
                            <div className='review-inside-hea-or-desc'>
                                <img src="images/propertity/step2/stand-out-place.webp" height="30" width="30" alt="" />
                                <h1>Adjust your settings</h1>
                            </div>
                            <p className='review-inside-hea-or-para'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero laborum neque consectetur atque repudiandae minus vel incidunt, odit quis voluptatibus. Ipsam, eaque.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Review
