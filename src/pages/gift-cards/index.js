import React from 'react'

const GiftCard = () => {
    return (
        <>
            <section className='gift-card-section'>
                <h1>PreLease gift cards</h1>
                <p>Looks like gift cards aren't available in your region yet, but we're working on it!</p>
                <div className='gift-card-images'>
                    <div className='gift-card-img-1'>
                        <img src="/images/gellery-2.webp" alt="" />
                    </div>
                    <div className='gift-card-img-2'>
                        <img src="/images/gellery-4.webp" alt="" />
                    </div>
                </div>
            </section>
        </>
    )
}

export default GiftCard