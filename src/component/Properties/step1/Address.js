import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react';
import { FaLocationDot } from "react-icons/fa6";

const Address = () => {
    const defaultProps = {
        center: {
            lat: 59.99835602,
            lng: 30.01502627
        },
        zoom: 11
    };
    return (
        <>
            <div className='address-main'>
                <h1 className='ab-place-hea'>Confirm your address</h1>
                <p className='address-para'>Your address is only shared with guests after they've made a reservation.</p>
                <div className='address-map'>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyBU4TuBlqUpLp3rA4qpAjLWcmnWgW2K878" }}
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}>
                    </GoogleMapReact>
                </div>
                <div className='search-location'>
                    {/* <div className='form-location'> */}
                        <svg xmlns="http://www.w3.org/2000/svg" className='location-icon' width="29" height="33" viewBox="0 0 29 33" fill="none">
                            <path d="M14.5 0C18.3456 0 22.0338 1.49005 24.753 4.14235C27.4723 6.79465 29 10.3919 29 14.1429C29 19.998 24.4244 26.1329 15.4667 32.6857C15.1878 32.8897 14.8486 33 14.5 33C14.1514 33 13.8122 32.8897 13.5333 32.6857C4.57555 26.1329 0 19.998 0 14.1429C0 10.3919 1.52767 6.79465 4.24695 4.14235C6.96623 1.49005 10.6544 0 14.5 0ZM14.5 9.42857C13.2181 9.42857 11.9887 9.92525 11.0823 10.8094C10.1759 11.6935 9.66667 12.8926 9.66667 14.1429C9.66667 15.3932 10.1759 16.5923 11.0823 17.4764C11.9887 18.3605 13.2181 18.8571 14.5 18.8571C15.7819 18.8571 17.0113 18.3605 17.9177 17.4764C18.8241 16.5923 19.3333 15.3932 19.3333 14.1429C19.3333 12.8926 18.8241 11.6935 17.9177 10.8094C17.0113 9.92525 15.7819 9.42857 14.5 9.42857Z" fill="black" />
                        </svg>
                        <input type="text" className='form-control' placeholder='Enter Location' />
                    {/* </div> */}
                </div>
            </div>
        </>
    )
}

export default Address
// import React, { useContext, useRef, useState } from 'react';
// import GoogleMapReact from 'google-map-react';
// import { CreateApiContext } from '@/ContextApi/CreateApiContext';

// const LocationPin = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="36" height="36"
//     viewBox="0 0 29 33"
//     fill="none"
//     style={{ transform: 'translate(-50%, -100%)' }}
//   >
//     <path
//       d="M14.5 0C18.3456 0 22.0338 1.49005 24.753 4.14235C27.4723 6.79465 29 10.3919 29 14.1429C29 19.998 24.4244 26.1329 15.4667 32.6857C15.1878 32.8897 14.8486 33 14.5 33C14.1514 33 13.8122 32.8897 13.5333 32.6857C4.57555 26.1329 0 19.998 0 14.1429C0 10.3919 1.52767 6.79465 4.24695 4.14235C6.96623 1.49005 10.6544 0 14.5 0ZM14.5 9.42857C13.2181 9.42857 11.9887 9.92525 11.0823 10.8094C10.1759 11.6935 9.66667 12.8926 9.66667 14.1429C9.66667 15.3932 10.1759 16.5923 11.0823 17.4764C11.9887 18.3605 13.2181 18.8571 14.5 18.8571C15.7819 18.8571 17.0113 18.3605 17.9177 17.4764C18.8241 16.5923 19.3333 15.3932 19.3333 14.1429C19.3333 12.8926 18.8241 11.6935 17.9177 10.8094C17.0113 9.92525 15.7819 9.42857 14.5 9.42857Z"
//       fill="#FF385C"
//     />
//   </svg>
// );

// const Address = () => {
//   const { addressData, setAddressData } = useContext(CreateApiContext);

//   const inputRef        = useRef(null);
//   const autocompleteRef = useRef(null);

//   const [mapCenter, setMapCenter] = useState({
//     lat: addressData.lat || 24.8607,
//     lng: addressData.lng || 67.0011,
//   });
//   const [markerPos, setMarkerPos] = useState(
//     addressData.lat ? { lat: addressData.lat, lng: addressData.lng } : null
//   );

//   // ✅ Google Maps + Places dono load hone ke BAAD callback fire hota hai
//   const handleGoogleApiLoaded = ({ maps }) => {
//     if (!inputRef.current) return;

//     autocompleteRef.current = new maps.places.Autocomplete(inputRef.current, {
//       types: ['address'],
//       fields: ['formatted_address', 'address_components', 'geometry'],
//     });

//     autocompleteRef.current.addListener('place_changed', () => {
//       const place = autocompleteRef.current.getPlace();
//       if (!place?.geometry?.location) return;

//       const lat = place.geometry.location.lat();
//       const lng = place.geometry.location.lng();

//       let country = '', city = '', province = '', postal = '';
//       let streetNumber = '', route = '';

//       place.address_components.forEach((c) => {
//         if (c.types.includes('street_number'))                             streetNumber = c.long_name;
//         if (c.types.includes('route'))                                     route        = c.long_name;
//         if (c.types.includes('locality'))                                  city         = c.long_name;
//         else if (c.types.includes('administrative_area_level_2') && !city) city         = c.long_name;
//         if (c.types.includes('administrative_area_level_1'))               province     = c.long_name;
//         if (c.types.includes('postal_code'))                               postal       = c.long_name;
//         if (c.types.includes('country'))                                   country      = c.long_name;
//       });

//       const street  = [streetNumber, route].filter(Boolean).join(' ');
//       const address = place.formatted_address;

//       setAddressData((prev) => ({
//         ...prev,
//         country, address, street,
//         city, province, postal,
//         lat, lng,
//       }));

//       setMapCenter({ lat, lng });
//       setMarkerPos({ lat, lng });
//     });
//   };

//   return (
//     <div className='address-main'>
//       <h1 className='ab-place-hea'>Confirm your address</h1>
//       <p className='address-para'>
//         Your address is only shared with guests after they've made a reservation.
//       </p>

//       <div className='search-location'>
//         <svg xmlns="http://www.w3.org/2000/svg" className='location-icon' width="29" height="33" viewBox="0 0 29 33" fill="none">
//           <path d="M14.5 0C18.3456 0 22.0338 1.49005 24.753 4.14235C27.4723 6.79465 29 10.3919 29 14.1429C29 19.998 24.4244 26.1329 15.4667 32.6857C15.1878 32.8897 14.8486 33 14.5 33C14.1514 33 13.8122 32.8897 13.5333 32.6857C4.57555 26.1329 0 19.998 0 14.1429C0 10.3919 1.52767 6.79465 4.24695 4.14235C6.96623 1.49005 10.6544 0 14.5 0ZM14.5 9.42857C13.2181 9.42857 11.9887 9.92525 11.0823 10.8094C10.1759 11.6935 9.66667 12.8926 9.66667 14.1429C9.66667 15.3932 10.1759 16.5923 11.0823 17.4764C11.9887 18.3605 13.2181 18.8571 14.5 18.8571C15.7819 18.8571 17.0113 18.3605 17.9177 17.4764C18.8241 16.5923 19.3333 15.3932 19.3333 14.1429C19.3333 12.8926 18.8241 11.6935 17.9177 10.8094C17.0113 9.92525 15.7819 9.42857 14.5 9.42857Z" fill="black"/>
//         </svg>
//         <input
//           ref={inputRef}
//           type="text"
//           className='form-control'
//           placeholder='Enter Location'
//           defaultValue={addressData.address}
//         />
//       </div>

//       <div className='address-map'>
//         <GoogleMapReact
//           bootstrapURLKeys={{
//             key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
//             libraries: 'places',              // ✅ places library
//           }}
//           center={mapCenter}
//           zoom={markerPos ? 14 : 11}
//           yesIWantToUseGoogleMapApiInternals  // ✅ zaroor chahiye
//           onGoogleApiLoaded={handleGoogleApiLoaded}
//         >
//           {markerPos && <LocationPin lat={markerPos.lat} lng={markerPos.lng} />}
//         </GoogleMapReact>
//       </div>
//     </div>
//   );
// };

// export default Address;