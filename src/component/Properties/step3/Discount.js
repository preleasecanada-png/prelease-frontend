import React, { useState } from 'react'

const Discount = ({
    discount1Month, setDiscount1Month,
    discount1MonthValue, setDiscount1MonthValue,
    discount3Month, setDiscount3Month,
    discount3MonthValue, setDiscount3MonthValue,
    discount6Month, setDiscount6Month,
    discount6MonthValue, setDiscount6MonthValue
}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const discounts = [
        {
            label: '1 Month',
            description: 'Discount for leases of 1 month',
            active: discount1Month,
            toggle: () => setDiscount1Month(!discount1Month),
            value: discount1MonthValue,
            setValue: setDiscount1MonthValue,
        },
        {
            label: '3 Months',
            description: 'Discount for leases of 3 months',
            active: discount3Month,
            toggle: () => setDiscount3Month(!discount3Month),
            value: discount3MonthValue,
            setValue: setDiscount3MonthValue,
        },
        {
            label: '6 Months',
            description: 'Discount for leases of 6 months',
            active: discount6Month,
            toggle: () => setDiscount6Month(!discount6Month),
            value: discount6MonthValue,
            setValue: setDiscount6MonthValue,
        },
    ];

    return (
        <>
            <div className='discount-main'>
                <h1 className="discount-hea">Add discounts</h1>
                <p className="ab-place-hea-para">Offer discounts based on lease duration to attract more tenants.</p>
                <div className='discount-btns'>
                    {discounts.map((d, i) => (
                        <div key={i} className={`discount-btn ${d.active ? 'active' : ''}`} onClick={d.toggle}>
                            <div>
                                <h5>{d.label}</h5>
                                <p>{d.description}</p>
                            </div>
                            <div className='discount-persant'>
                                <input
                                    type="number"
                                    min={0}
                                    max={100}
                                    value={d.value}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if (val === '') { d.setValue(''); return; }
                                        const num = Math.max(0, Math.min(100, parseInt(val) || 0));
                                        d.setValue(num);
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                    style={{ width: '50px', border: 'none', background: 'transparent', textAlign: 'right', fontWeight: 'bold' }}
                                />%
                            </div>
                        </div>
                    ))}
                </div>
                <p className='discount-about-pricing'>The highest applicable discount will be applied based on the lease duration. <span className='discount-learn-more' onClick={handleShow}>Learn more</span></p>
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
                                    <p>You choose your discount for each lease duration, and you can change it at any time.</p>
                                    <p>Discounts are applied based on the length of the lease:</p>
                                    <ul>
                                        <li><strong>1 month:</strong> A small discount to encourage short-term tenants.</li>
                                        <li><strong>3 months:</strong> A moderate discount for medium-term leases.</li>
                                        <li><strong>6 months:</strong> The best discount for long-term tenants.</li>
                                    </ul>
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
