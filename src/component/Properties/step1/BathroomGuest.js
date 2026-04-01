import React, { useState } from 'react'

const BathroomGuest = ({privateBathroom, setPrivateBathroom,dedicatedBathroom, setDedicatedBathroom,sharedBathroom, setSharedBathroom}) => {
    return (
        <>
            <div className='bathroom-main'>
                <h1 className='bathroom-hea'>What kind of bathrooms are available to guests?</h1>
                <div className='bathroom-boxs'>
                    <div className='bathroom-box'>
                        <div className='bathroom-box-detail'>
                            <h6>Private and attached</h6>
                            <p>It's connected to the guest's room and is just for them.</p>
                        </div>
                        <div>
                            <div className='d-flex align-items-center gap-4'>
                                <button className='stay-count-btn' onClick={() => setPrivateBathroom(privateBathroom - 1)} disabled={privateBathroom == 0 ? 'disabled' : ''}>-</button>
                                <p className='bathroom-count'>{privateBathroom}</p>
                                <button className='stay-count-btn' onClick={() => setPrivateBathroom(privateBathroom + 1)}>+</button>
                            </div>
                        </div>
                    </div>
                    <div className='bathroom-box'>
                        <div className='bathroom-box-detail'>
                            <h6>Dedicated</h6>
                            <p>It's private, but accessed via a shared space, like a hallway.</p>
                        </div>
                        <div>
                            <div className='d-flex align-items-center gap-4'>
                                <button className='stay-count-btn' onClick={() => setDedicatedBathroom(dedicatedBathroom - 1)} disabled={dedicatedBathroom == 0 ? 'disabled' : ''}>-</button>
                                <p className='bathroom-count'>{dedicatedBathroom}</p>
                                <button className='stay-count-btn' onClick={() => setDedicatedBathroom(dedicatedBathroom + 1)}>+</button>
                            </div>
                        </div>
                    </div>
                    <div className='bathroom-box'>
                        <div className='bathroom-box-detail'>
                            <h6>Shared</h6>
                            <p>It's shared with other people.</p>
                        </div>
                        <div>
                            <div className='d-flex align-items-center gap-4'>
                                <button className='stay-count-btn' onClick={() => setSharedBathroom(sharedBathroom - 1)} disabled={sharedBathroom == 0 ? 'disabled' : ''}>-</button>
                                <p className='bathroom-count'>{sharedBathroom}</p>
                                <button className='stay-count-btn' onClick={() => setSharedBathroom(sharedBathroom + 1)}>+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default BathroomGuest