import React, { useState } from 'react'

const Discount = ({
    newListingPromotion, setNewListingPromotion,
    newListingPromotionValue, setNewListingPromotionValue,
    monthlyDiscount, setMonthlyDiscount,
    monthlyDiscountValue, setMonthlyDiscountValue,
    yearlyDiscount, setYearlyDiscount,
    yearlyDiscountValue, setYearlyDiscountValue
}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className='discount-main'>
                <h1 className="discount-hea">Add discounts</h1>
                <p className="ab-place-hea-para">Help your place stand out to get booked faster and earn your first reviews.</p>
                <div className='discount-btns'>
                    <div className={`discount-btn ${newListingPromotion ? 'active' : ''}`} onClick={() => setNewListingPromotion(!newListingPromotion)}>
                        <div>
                            <h5>New listing promotion</h5>
                            <p>Offer a discount off your first 3 bookings</p>
                        </div>
                        <div className='discount-persant'>
                            <input
                                type="number"
                                min={0}
                                max={100}
                                value={newListingPromotionValue}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (val === '') { setNewListingPromotionValue(''); return; }
                                    const num = Math.max(0, Math.min(100, parseInt(val) || 0));
                                    setNewListingPromotionValue(num);
                                }}
                                onClick={(e) => e.stopPropagation()}
                                style={{ width: '50px', border: 'none', background: 'transparent', textAlign: 'right', fontWeight: 'bold' }}
                            />%
                        </div>
                    </div>
                    <div className={`discount-btn ${monthlyDiscount ? 'active' : ''}`} onClick={() => setMonthlyDiscount(!monthlyDiscount)}>
                        <div>
                            <h5>Monthly discount</h5>
                            <p>For stays of 28 nights or more</p>
                        </div>
                        <div className='discount-persant'>
                            <input
                                type="number"
                                min={0}
                                max={100}
                                value={monthlyDiscountValue}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (val === '') { setMonthlyDiscountValue(''); return; }
                                    const num = Math.max(0, Math.min(100, parseInt(val) || 0));
                                    setMonthlyDiscountValue(num);
                                }}
                                onClick={(e) => e.stopPropagation()}
                                style={{ width: '50px', border: 'none', background: 'transparent', textAlign: 'right', fontWeight: 'bold' }}
                            />%
                        </div>
                    </div>
                    <div className={`discount-btn ${yearlyDiscount ? 'active' : ''}`} onClick={() => setYearlyDiscount(!yearlyDiscount)}>
                        <div>
                            <h5>Yearly discount</h5>
                            <p>For stays of 365 nights or more</p>
                        </div>
                        <div className='discount-persant'>
                            <input
                                type="number"
                                min={0}
                                max={100}
                                value={yearlyDiscountValue}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (val === '') { setYearlyDiscountValue(''); return; }
                                    const num = Math.max(0, Math.min(100, parseInt(val) || 0));
                                    setYearlyDiscountValue(num);
                                }}
                                onClick={(e) => e.stopPropagation()}
                                style={{ width: '50px', border: 'none', background: 'transparent', textAlign: 'right', fontWeight: 'bold' }}
                            />%
                        </div>
                    </div>
                </div>
                <p className='discount-about-pricing'>Only one discount will be applied per stay. <span className='discount-learn-more' onClick={handleShow}>Learn more</span></p>
            </div>

            {show && (
                <>
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1040,
                    }}></div>
                    <div className="modal" show={show} onHide={handleClose} style={{ 'display': 'block' }}>
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content border-1-5">
                                <div className="modal-header d-flex justify-content-center position-relative">
                                    <button type="button" className="btn-close position-absolute start-0 ms-3" onClick={handleClose} aria-label="Close"></button>
                                    <h1 className="modal-title more-about-pricing-heading">Discounts</h1>
                                </div>

                                <div className="modal-body more-about-pricing">
                                    <p>You choose your discount, and you can change it at any time.</p>
                                    <p>Suggested discounts are based on the average for listings with discounts in your area (or the global average if not enough listings with discounts are in your area). Weekly discounts are for stays of 7 nights or more. Monthly discounts are for stays of 28 nights or more.</p>
                                    <p>Visit the Discounts section of our Help Center to learn more.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Discount
