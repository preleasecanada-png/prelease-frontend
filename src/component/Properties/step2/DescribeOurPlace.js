import { imageBaseUrl, stringSplit } from '@/Helper/helper';
import React, { useState } from 'react';

const DescribeOurPlace = ({ amenities, setAllAmenties }) => {
  const [activeAmenities, setActiveAmenities] = useState([]);

  const toggleAmenity = (amenity) => {
    const exists = activeAmenities.some((item) => item.id === amenity.id);
    let updated;

    if (exists) {
      updated = activeAmenities.filter((item) => item.id !== amenity.id);
    } else {
      updated = [...activeAmenities, amenity];
    }

    setActiveAmenities(updated);
    setAllAmenties(updated);
  };

  const renderAmenities = (start, end) => {
    return (
      amenities?.slice(start, end).map((amenity, index) => {
        const isActive = activeAmenities.some((item) => item.id === amenity.id);
        return (
          <div
            key={amenity.id}
            className={`guest-favorites-btn ${isActive ? 'active' : ''}`}
            onClick={() => toggleAmenity(amenity)}
          >
            <img
              src={imageBaseUrl(amenity?.image)}
              alt={amenity.name}
              className='guest-favorites-svg'
              height="25"
              width="25"
            />
            <div className='guest-favorites-name'>{stringSplit(amenity.name)}</div>
          </div>
        );
      })
    );
  };
 

  return (
    <div className='describe-out-place'>
      <h1 className="describe-out-hea">Which of these best describes our place?</h1>
      <p className="ab-place-hea-para">You can add more amenities after you publish your listing.</p>
      <div className='describe-category'>
        <div>
          <h6 className='guest-favorite-service-hea'>What about these guest favorites?</h6>
          <div className='guest-favorites'>
            {renderAmenities(0, 20)}
          </div>
        </div>

        <div>
          <h6 className='guest-favorite-service-hea'>More guest favorites?</h6>
          <div className='guest-favorites'>
            {renderAmenities(20, 40)}
          </div>
        </div>

        <div>
          <h6 className='guest-favorite-service-hea'>Do you have any of these safety items?</h6>
          <div className='guest-favorites'>
            {renderAmenities(40, amenities.length)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescribeOurPlace;
