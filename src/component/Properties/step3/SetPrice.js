import React, { useState } from 'react';

const SetPrice = ({ price, setPrice, guestServiceFee }) => {
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleBlur = () => {
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setEditing(false);
    }
  };

  return (
    <>
      <div className='set-price-main'>
        <h1 className="set-price-hea">Now, set your price</h1>
        <p className='set-price-para'>You can change anytime.</p>

        <div className='set-price'>
          {editing ? (
            <input
              type="number"
              value={price}
              onChange={handlePriceChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              autoFocus
              className="form-control"
              style={{
                width: '200px', fontSize: '32px',
                color: '#000',
                fontSize: '180px',
                fontWeight: '600'
              }}
            />
          ) : (
            <h1 onClick={handleEditClick} style={{ cursor: 'pointer' }}>${price}</h1>
          )}

          <div className="dropdown d-flex">
            <p>Guest price before taxes</p>
            <div className='mx-2' data-bs-toggle="dropdown" aria-expanded="false">
              <p>${parseInt(price) + parseInt(guestServiceFee)}
                <svg xmlns="http://www.w3.org/2000/svg" className='mx-2' width="25" height="25" viewBox="0 0 121 66" fill="none">
                  <path d="M1.8 1.1C0.7 1.7 0 3.3 0 5.3C0 8.2 3 11.5 28.8 37.3C50.6 59.1 58.2 66 60 66C61.8 66 69.4 59.1 91.2 37.3C121.4 7.1 122.5 5.7 118.4 1.6C114.9 -2 113.1 -0.600001 86.3 26.2L60 52.5L33.7 26.2C16.7 9.2 6.8 -9.83477e-07 5.5 -9.83477e-07C4.4 -9.83477e-07 2.7 0.499999 1.8 1.1Z" fill="#151515" />
                </svg>
              </p>
            </div>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">
                <div className='d-flex justify-content-between'>
                  <div>Base price</div> <div>${price}</div>
                </div>
              </a></li>
              <li><a className="dropdown-item" href="#">
                <div className='d-flex justify-content-between'>
                  <div>Guest service fee</div> <div>${guestServiceFee}</div>
                </div>
              </a></li>
              <hr />
              <li><a className="dropdown-item" href="#">
                <div className='d-flex justify-content-between'>
                  <div>Guest price before taxes</div> <div>${parseInt(price) + parseInt(guestServiceFee)}</div>
                </div>
              </a></li>
            </ul>
          </div>
        </div>

        <div className='set-price-about-pricing' onClick={handleShow}>
          Learn more about pricing.
        </div>
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
          <div className="modal" style={{ display: 'block' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content border-1-5">
                <div className="modal-header d-flex justify-content-center position-relative">
                  <button type="button" className="btn-close position-absolute start-0 ms-3" onClick={handleClose} aria-label="Close"></button>
                  <h1 className="modal-title more-about-pricing-heading">More about pricing</h1>
                </div>
                <div className="modal-body more-about-pricing">
                  <p>You choose your price, and you can change it anytime. Bookings aren't guaranteed.</p>
                  <h6>Per month price</h6>
                  <p>The suggested price is based on factors like your listing's location and amenities, as well as guest demand and similar listings.</p>
                  <h6>Per month price</h6>
                  <p>When you're setting a price and a price breakdown is shown, the guest service fee and/or taxes, if applicable, may vary depending on booked trip details (like the length of stay or number of guests).</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SetPrice;
