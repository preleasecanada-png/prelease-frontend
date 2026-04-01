import React, { useState } from 'react'

const CheckOut = () => {
    const [tabName, setTabName] = useState("");
    const handleCardChecked = (e, tabName) => {
        e.preventDefault();
        setTabName(tabName)
    }
    return (
        <>
            <div class="payment-checkout-section">
                <div class="payment-checkout-left">
                    <div class="payment-checkout-title">Saved Card</div>
                    <div class="payment-checkout-card-list">

                        <label class={`payment-checkout-card  ${tabName == 'paypal-payment' ? 'selected' : ''}`}>
                            <div class="payment-checkout-card-info" onClick={(e) => handleCardChecked(e, "paypal-payment")}>
                                <div class="payment-checkout-card-logo">
                                    <img src="https://img.icons8.com/color/48/000000/paypal.png" />
                                </div>
                                <div class="payment-checkout-card-details">
                                    <div><strong>Paypal ending in 1234</strong></div>
                                    <div>Expiry 09/2024</div>
                                </div>
                            </div>
                            <input type="radio" name="payment"
                                onClick={(e) => handleCardChecked(e, "paypal-payment")} class="payment-checkout-radio" />
                        </label>

                        <label class={`payment-checkout-card ${tabName == "mastercard-ending" ? 'selected' : ''}`} onClick={(e) => handleCardChecked(e, "mastercard-ending")} >
                            <div class="payment-checkout-card-info">
                                <div class="payment-checkout-card-logo">
                                    <img src="https://img.icons8.com/color/48/000000/mastercard.png" />
                                </div>
                                <div class="payment-checkout-card-details">
                                    <div><strong>Mastercard ending in 1234</strong></div>
                                    <div>Expiry 09/2024</div>
                                </div>
                            </div>
                            <input type="radio" name="payment"
                                onClick={(e) => handleCardChecked(e, "mastercard-ending")} class="payment-checkout-radio" checked />
                        </label>

                        <label onClick={(e) => handleCardChecked(e, "visa-ending")} class={`payment-checkout-card  ${tabName == 'visa-ending' ? 'selected' : ''}`}>
                            <div class="payment-checkout-card-info">
                                <div class="payment-checkout-card-logo">
                                    <img src="https://img.icons8.com/color/48/000000/visa.png" />
                                </div>
                                <div class="payment-checkout-card-details">
                                    <div><strong>Visa ending in 1234</strong></div>
                                    <div>Expiry 09/2024</div>
                                </div>
                            </div>
                            <input type="radio" name="payment" onClick={(e) => handleCardChecked(e, "visa-ending")} class="payment-checkout-radio" />
                        </label>

                        <div class={`payment-checkout-add-card   ${tabName == "add-new-payment" ? 'selected' : ''}`}
                            onClick={(e) => handleCardChecked(e, "add-new-payment")}
                        >
                            <img src="https://img.icons8.com/ios-glyphs/30/fa314a/plus-math.png" width="18" />
                            <span>Add New Payment</span>
                        </div>
                    </div>

                    <div class="payment-checkout-info-box">
                        <div class="payment-checkout-info-title">Cancellation policy</div>
                        <div class="payment-checkout-info-text">Free cancellation before Nov 30.</div>
                        <div class="payment-checkout-info-text">After that, the reservation is non-refundable. <span class="payment-checkout-info-link">Learn more</span></div>
                    </div>

                    <div class="payment-checkout-info-box">
                        <div class="payment-checkout-info-title">Ground rules</div>
                        <div class="payment-checkout-info-text">We ask every guest to remember a few simple things about what makes a great guest.</div>
                        <ul class="payment-checkout-list">
                            <li>Follow the house rules</li>
                            <li>Treat your Host’s home like your own</li>
                        </ul>
                    </div>
                </div>


                <div class="payment-checkout-right">
                    <div className='your-stay-image'>
                        <img src="/images/payment-checkout-card.webp" />
                    </div>
                    <h3>Your Stay Summary</h3>
                    <p><span className='stay-summary-left'>Check-In</span><span className='stay-summary-right'>Fri, Dec 01</span></p>
                    <p><span className='stay-summary-left'>Check-Out</span><span className='stay-summary-right'>Tue, Dec 05</span></p>
                    <p><span className='stay-summary-left'>Guests</span><span className='stay-summary-right'>04</span></p>

                    <div class="payment-checkout-breakdown">
                        <h3>Pricing Breakdown</h3>
                        <p><span className='stay-summary-left'>$30 X 1 night</span><span className='stay-summary-right'>$30</span></p>
                        <p><span className='stay-summary-left'>Cleaning Fee</span><span className='stay-summary-right'>$10</span></p>
                        <p><span className='stay-summary-left'>PreLease Service Fee</span><span className='stay-summary-right'>$5</span></p>
                        <p><strong className='stay-summary-left'>Total before taxes</strong><strong className='stay-summary-right'>$45</strong></p>
                    </div>

                    <button class="payment-checkout-btn">Confirm & Pay <span>$165</span></button>
                </div>
            </div>
        </>
    )
}

export default CheckOut