import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react';

const AddressForm = ({ addressData, setAddressData, showSpecificLocation, setShowSpecificLocation , countries}) => {
    const defaultProps = {
        center: {
            lat: 59.99835602,
            lng: 30.01502627
        },
        zoom: 11
    };

    const [focused, setFocused] = useState({});

    const handleChange = (e) => {
        setAddressData({ ...addressData, [e.target.name]: e.target.value });
    };

    const handleFocus = (name) => {
        setFocused(prev => ({ ...prev, [name]: true }));
    };

    const handleBlur = (name) => {
        setFocused(prev => ({ ...prev, [name]: false }));
    };

    // label upar jayega agar focused ho ya value ho
    const isFloating = (name) => focused[name] || addressData[name] !== '';

    return (
        <>
            <div className='address-main'>
                <h1 className='ab-place-hea'>Confirm your address</h1>
                <p className='address-para'>Your address is only shared with guests after they've made a reservation.</p>

                {/* Form */}
                <div className="wrapper">
                    <div className="group">
                        <div className="field field-select">
                            <label className={`label ${addressData.country ? 'labelFloating' : ''}`}>
                                Country / region
                            </label>
                            <select
                                className="input"
                                name="country"
                                value={addressData.country}
                                onChange={handleChange}
                                onFocus={() => handleFocus('country')}
                                onBlur={() => handleBlur('country')}
                            >
                                <option value=""></option>
                                {countries && countries.map((c) => (
                                    <option key={c.code} value={`${c.name} - ${c.code.toUpperCase()}`}>
                                        {c.name} - {c.code.toUpperCase()}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="group">
                        <div className="field">
                            <label className={`label ${isFloating('address') ? 'labelFloating' : ''}`}>
                                Address
                            </label>
                            <input
                                className="input"
                                name="address"
                                value={addressData.address}
                                onChange={handleChange}
                                onFocus={() => handleFocus('address')}
                                onBlur={() => handleBlur('address')}
                            />
                        </div>
                        <div className="divider" />
                        <div className="field">
                            <label className={`label ${isFloating('street') ? 'labelFloating' : ''}`}>
                                Street
                            </label>
                            <input
                                className="input"
                                name="street"
                                value={addressData.street}
                                onChange={handleChange}
                                onFocus={() => handleFocus('street')}
                                onBlur={() => handleBlur('street')}
                            />
                        </div>
                        <div className="divider" />
                        <div className="field">
                            <label className={`label ${isFloating('apt') ? 'labelFloating' : ''}`}>
                                Apt, floor, bldg (if applicable)
                            </label>
                            <input
                                className="input"
                                name="apt"
                                value={addressData.apt}
                                onChange={handleChange}
                                onFocus={() => handleFocus('apt')}
                                onBlur={() => handleBlur('apt')}
                            />
                        </div>
                        <div className="divider" />
                        <div className="field">
                            <label className={`label ${isFloating('city') ? 'labelFloating' : ''}`}>
                                City / town / village
                            </label>
                            <input
                                className="input"
                                name="city"
                                value={addressData.city}
                                onChange={handleChange}
                                onFocus={() => handleFocus('city')}
                                onBlur={() => handleBlur('city')}
                            />
                        </div>
                        <div className="divider" />
                        <div className="field">
                            <label className={`label ${isFloating('province') ? 'labelFloating' : ''}`}>
                                Province / state / territory (if applicable)
                            </label>
                            <input
                                className="input"
                                name="province"
                                value={addressData.province}
                                onChange={handleChange}
                                onFocus={() => handleFocus('province')}
                                onBlur={() => handleBlur('province')}
                            />
                        </div>
                        <div className="divider" />
                        <div className="field">
                            <label className={`label ${isFloating('postal') ? 'labelFloating' : ''}`}>
                                Postal code (if applicable)
                            </label>
                            <input
                                className="input"
                                name="postal"
                                value={addressData.postal}
                                onChange={handleChange}
                                onFocus={() => handleFocus('postal')}
                                onBlur={() => handleBlur('postal')}
                            />
                        </div>
                    </div>
                </div>

                <div className="show-location">
                    <div className="show-location-left">
                        <h3 className="show-location-title">Show your specific location</h3>
                        <p className="show-location-desc">
                            Make it clear to guests where your place is located. We'll only share your address after
                            they've made a reservation.{' '}
                            <a href="#" className="show-location-link">Learn more</a>
                        </p>
                    </div>
                    <div
                        className={`toggle ${showSpecificLocation ? 'toggle-on' : ''}`}
                        onClick={() => setShowSpecificLocation(!showSpecificLocation)}
                        role="switch"
                        aria-checked={showSpecificLocation}
                    >
                        <div className="toggle-thumb" />
                    </div>
                </div>

                <div className='address-map'>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyBU4TuBlqUpLp3rA4qpAjLWcmnWgW2K878" }}
                        defaultCenter={defaultProps.center}
                        // defaultZoom={defaultProps.zoom}
                        zoom={showSpecificLocation ? 13 : 11}
                    >
                    </GoogleMapReact>
                </div>
            </div>
        </>
    )
}

export default AddressForm

// import React, { useContext, useState } from 'react';
// import GoogleMapReact from 'google-map-react';
// import { CreateApiContext } from '@/ContextApi/CreateApiContext';

// const AddressForm = ({ showSpecificLocation, setShowSpecificLocation }) => {
//   // ✅ Context se addressData lo — Step 4 ne pehle se fill kar diya hoga
//   const { addressData, setAddressData, countries } = useContext(CreateApiContext);

//   const [focused, setFocused] = useState({});

//   const handleChange = (e) => {
//     setAddressData({ ...addressData, [e.target.name]: e.target.value });
//   };

//   const handleFocus = (name) => setFocused((prev) => ({ ...prev, [name]: true }));
//   const handleBlur  = (name) => setFocused((prev) => ({ ...prev, [name]: false }));

//   // Label float karo agar focused ho ya value ho
//   const isFloating = (name) => focused[name] || !!addressData[name];

//   // Map center
//   const mapCenter = {
//     lat: addressData.lat || 24.8607,
//     lng: addressData.lng || 67.0011,
//   };

//   return (
//     <div className='address-main'>
//       <h1 className='ab-place-hea'>Confirm your address</h1>
//       <p className='address-para'>
//         Your address is only shared with guests after they've made a reservation.
//       </p>

//       {/* ─── Form ─────────────────────────────────────────────────────── */}
//       <div className="wrapper">

//         {/* Country */}
//         <div className="group">
//           <div className="field field-select">
//             <label className={`label ${isFloating('country') ? 'labelFloating' : ''}`}>
//               Country / region
//             </label>
//             <select
//               className="input"
//               name="country"
//               value={addressData.country}
//               onChange={handleChange}
//               onFocus={() => handleFocus('country')}
//               onBlur={() => handleBlur('country')}
//             >
//               <option value=""></option>
//               {countries && countries.map((c) => (
//                 <option key={c.code} value={`${c.name} - ${c.code.toUpperCase()}`}>
//                   {c.name} - {c.code.toUpperCase()}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Address, Street, Apt, City, Province, Postal */}
//         <div className="group">
//           {[
//             { name: 'address',  label: 'Address' },
//             { name: 'street',   label: 'Street' },
//             { name: 'apt',      label: 'Apt, floor, bldg (if applicable)' },
//             { name: 'city',     label: 'City / town / village' },
//             { name: 'province', label: 'Province / state / territory (if applicable)' },
//             { name: 'postal',   label: 'Postal code (if applicable)' },
//           ].map(({ name, label }, i, arr) => (
//             <React.Fragment key={name}>
//               <div className="field">
//                 <label className={`label ${isFloating(name) ? 'labelFloating' : ''}`}>
//                   {label}
//                 </label>
//                 <input
//                   className="input"
//                   name={name}
//                   value={addressData[name] || ''}
//                   onChange={handleChange}
//                   onFocus={() => handleFocus(name)}
//                   onBlur={() => handleBlur(name)}
//                 />
//               </div>
//               {i < arr.length - 1 && <div className="divider" />}
//             </React.Fragment>
//           ))}
//         </div>
//       </div>

//       {/* ─── Toggle ────────────────────────────────────────────────────── */}
//       <div className="show-location">
//         <div className="show-location-left">
//           <h3 className="show-location-title">Show your specific location</h3>
//           <p className="show-location-desc">
//             Make it clear to guests where your place is located. We'll only share your address
//             after they've made a reservation.{' '}
//             <a href="#" className="show-location-link">Learn more</a>
//           </p>
//         </div>
//         <div
//           className={`toggle ${showSpecificLocation ? 'toggle-on' : ''}`}
//           onClick={() => setShowSpecificLocation(!showSpecificLocation)}
//           role="switch"
//           aria-checked={showSpecificLocation}
//         >
//           <div className="toggle-thumb" />
//         </div>
//       </div>

//       {/* ─── Map ───────────────────────────────────────────────────────── */}
//       <div className='address-map'>
//         <GoogleMapReact
//           bootstrapURLKeys={{
//             key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
//             libraries: 'places',
//           }}
//           center={mapCenter}
//           zoom={showSpecificLocation ? 15 : 12}
//         >
//           {/* Location selected hai to pin dikhao */}
//           {addressData.lat && (
//             <LocationPin lat={addressData.lat} lng={addressData.lng} />
//           )}
//         </GoogleMapReact>
//       </div>
//     </div>
//   );
// };

// // Simple pin marker
// const LocationPin = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="36"
//     height="36"
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

// export default AddressForm;