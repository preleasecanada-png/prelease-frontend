import React, { useState } from 'react'

const StayPeople = ({ guests, setGuests, bedrooms, setBedrooms, bathrooms, setBathrooms, petsAllowed, setPetsAllowed }) => {
    return (
        <>
            <div className='stay-main'>
                <h1 className='stay-heading'>Let's start with the basics</h1>
                <p className='stay-here-hea'>How many people can stay here?</p>
                <div className='stay-peoples'>
                    <div className='stay-people-box'>
                        <div>
                            <p>Guests</p>
                        </div>
                        <div className='d-flex align-items-center gap-3'>
                            <button className='stay-count-btn' disabled={guests == 0 ? 'disabled' : ''} onClick={() => setGuests(guests - 1)}>-</button>
                            <p>{guests}</p>
                            <button className='stay-count-btn' onClick={() => setGuests(guests + 1)}>+</button>
                        </div>
                    </div>
                    <div className='stay-people-box'>
                        <div>
                            <p>Bedrooms</p>
                        </div>
                        <div className='d-flex align-items-center gap-3'>
                            <button className='stay-count-btn' onClick={() => setBedrooms(bedrooms - 1)} disabled={bedrooms == 0 ? 'disabled' : ''}>-</button>
                            <p>{bedrooms}</p>
                            <button className='stay-count-btn' onClick={() => setBedrooms(bedrooms + 1)}>+</button>
                        </div>
                    </div>
                    <div className='stay-people-box'>
                        <div>
                            <p>Bathroom</p>
                        </div>
                        <div className='d-flex align-items-center gap-3'>
                            <button className='stay-count-btn' onClick={() => setBathrooms(bathrooms - 1)} disabled={bathrooms == 0 ? 'disabled' : ''}>-</button>
                            <p>{bathrooms}</p>
                            <button className='stay-count-btn' onClick={() => setBathrooms(bathrooms + 1)}>+</button>
                        </div>
                    </div>
                    <div className='stay-people-box'>
                        <div>
                            <p>Pets allowed</p>
                            <span style={{ fontSize: '13px', color: '#717171' }}>Are pets welcome in your place?</span>
                        </div>
                        <div className='d-flex align-items-center gap-3'>
                            <div
                                className={`toggle ${petsAllowed ? 'active' : ''}`}
                                role="switch"
                                aria-checked={petsAllowed}
                                onClick={() => setPetsAllowed(!petsAllowed)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="toggle-thumb"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StayPeople