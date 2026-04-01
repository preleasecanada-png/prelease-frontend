import React from 'react';

const Reservation = ({ reservationType, setReservationType }) => {
    const tabActive = (e, type) => {
        e.preventDefault();
        setReservationType(type);
    };

    return (
        <div className='reservation-main'>
            <div>
                <h1 className="reservation-hea">Decide how you’ll confirm reservations</h1>
                <div className='reservation-btns'>
                    <div>
                        <div
                            className={`reservation-btn ${reservationType === 'approve' ? 'active' : ''}`}
                            onClick={(e) => tabActive(e, 'approve')}
                        >
                            <h6>Approve or decline requests</h6>
                            <p>Approve or decline requests</p>
                        </div>
                    </div>
                    <div>
                        <div
                            className={`reservation-btn ${reservationType === 'instant' ? 'active' : ''}`}
                            onClick={(e) => tabActive(e, 'instant')}
                        >
                            <h6>Use instant book</h6>
                            <p>Guests can book automatically.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reservation;
