import AboutPlace from '@/component/Properties/step1/AboutPlace'
import Address from '@/component/Properties/step1/Address';
import AddressForm from '@/component/Properties/step1/AddressForm';
import BathroomGuest from '@/component/Properties/step1/BathroomGuest';
import DescribePlace from '@/component/Properties/step1/DescribePlace';
import MightThere from '@/component/Properties/step1/MightThere';
import StayPeople from '@/component/Properties/step1/StayPeople';
import Step from '@/component/Properties/step1/Step';
import DescribeOurPlace from '@/component/Properties/step2/DescribeOurPlace';
import HouseDetail from '@/component/Properties/step2/HouseDetail';
import PhotoHouse from '@/component/Properties/step2/PhotoHouse';
import PlaceStandOut from '@/component/Properties/step2/PlaceStandOut';
import Discount from '@/component/Properties/step3/Discount';
import Publish from '@/component/Properties/step3/Publish';
import Reservation from '@/component/Properties/step3/Reservation';
import Review from '@/component/Properties/step3/Review';
import SetPrice from '@/component/Properties/step3/SetPrice';
import PropertyAIGuide from '@/component/PropertyAIGuide';
import { CreateApiContext } from '@/ContextApi/CreateApiContext';
import { authFetch } from '@/Helper/helper';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react'

const Property = () => {
  const { fetchAmenities, amenities, fetchCountries, countries } = useContext(CreateApiContext);
  const [step, setStep] = useState(1);
  const route = useRouter();
  const [DescribePlaceName, setDescribePlaceName] = useState('');
  const [guests, setGuests] = useState(0);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [privateBathroom, setPrivateBathroom] = useState(0);
  const [dedicatedBathroom, setDedicatedBathroom] = useState(0);
  const [sharedBathroom, setSharedBathroom] = useState(0);
  const [petsAllowed, setPetsAllowed] = useState(false);
  const [mightThere, setMightThere] = useState('');
  const [AllAmenities, setAllAmenties] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [tourVideo, setTourVideo] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(19);
  const [reservationType, setReservationType] = useState('approve');
  const [guestServiceFee, setGuestServiceFee] = useState(3);
  const [discount1Month, setDiscount1Month] = useState(true);
  const [discount1MonthValue, setDiscount1MonthValue] = useState(10);
  const [discount3Month, setDiscount3Month] = useState(true);
  const [discount3MonthValue, setDiscount3MonthValue] = useState(20);
  const [discount6Month, setDiscount6Month] = useState(true);
  const [discount6MonthValue, setDiscount6MonthValue] = useState(30);

  const [addressData, setAddressData] = useState({
    country: '',
    address: '',
    street: '',
    apt: '',
    city: '',
    province: '',
    postal: '',
  });
  const [showSpecificLocation, setShowSpecificLocation] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const errorsRef = useRef(null);

  const getStepValidation = (s) => {
    switch (s) {
      case 3:
        if (!DescribePlaceName) return ['Please select a property type.'];
        break;
      case 5: {
        const errs = [];
        if (!addressData.country) errs.push('Please select a city.');
        if (!addressData.address) errs.push('Address is required.');
        if (!addressData.street) errs.push('Street is required.');
        if (!addressData.city) errs.push('City / town is required.');
        return errs;
      }
      case 6: {
        const errs = [];
        if (guests < 1) errs.push('At least 1 guest is required.');
        if (bedrooms < 1) errs.push('At least 1 bedroom is required.');
        if (bathrooms < 1) errs.push('At least 1 bathroom is required.');
        return errs;
      }
      case 10:
        if (AllAmenities.length === 0) return ['Please select at least 1 amenity.'];
        break;
      case 11:
        if (uploadedImages.length === 0) return ['Please upload at least 1 photo.'];
        break;
      case 12: {
        const errs = [];
        if (!title.trim()) errs.push('Title is required.');
        if (!description.trim()) errs.push('Description is required.');
        return errs;
      }
      case 15:
        if (price < 1) return ['Price must be at least $1.'];
        break;
      default:
        break;
    }
    return [];
  };

  const isStepValid = (s) => getStepValidation(s).length === 0;

  useEffect(() => {
    if (amenities?.length == 0) fetchAmenities();
  }, []);

  useEffect(() => {
    if (countries?.length === 0) fetchCountries();
  }, []);

  const handleNext = () => {
    const errors = getStepValidation(step);
    if (errors.length > 0) {
      setValidationErrors(errors);
      setTimeout(() => errorsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
      return;
    }
    setValidationErrors([]);
    setStep(step + 1);
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    const btnText = e?.target?.textContent || '';
    if (btnText === 'Exit') {
      route.push('/');
      return;
    }
    const allErrors = [];
    if (!title.trim()) allErrors.push('Title is required.');
    if (!description.trim()) allErrors.push('Description is required.');
    if (!DescribePlaceName) allErrors.push('Property type is required.');
    if (!addressData.country) allErrors.push('Please select a city.');
    if (!addressData.city) allErrors.push('City / town is required.');
    if (guests < 1) allErrors.push('At least 1 guest is required.');
    if (bedrooms < 1) allErrors.push('At least 1 bedroom is required.');
    if (bathrooms < 1) allErrors.push('At least 1 bathroom is required.');
    if (AllAmenities.length === 0) allErrors.push('At least 1 amenity is required.');
    if (uploadedImages.length === 0) allErrors.push('At least 1 photo is required.');
    if (price < 1) allErrors.push('Price must be at least $1.');
    if (allErrors.length > 0) {
      setValidationErrors(allErrors);
      setTimeout(() => errorsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
      return;
    }
    setValidationErrors([]);
    setSubmitting(true);
    const formData = new FormData();
    let user_id = window.localStorage.getItem('user_id');
    formData.append('title', title);
    formData.append('description', description);
    formData.append('describe_your_place', DescribePlaceName);
    formData.append('how_many_guests', guests);
    formData.append('how_many_bedrooms', bedrooms);
    formData.append('how_many_bathroom', bathrooms);
    formData.append('bathroom_avaiable_private_and_attached', privateBathroom);
    formData.append('bathroom_avaiable_dedicated', dedicatedBathroom);
    formData.append('bathroom_avaiable_shared', sharedBathroom);
    formData.append('who_else_there', mightThere);
    formData.append('pets_allowed', petsAllowed ? 1 : 0);
    formData.append('set_your_price', price);
    formData.append('user_id', user_id);
    formData.append('reservation_type', reservationType);
    formData.append('guest_service_fee', guestServiceFee);
    formData.append('discount_1_month', discount1Month ? 1 : 0);
    formData.append('discount_1_month_value', discount1MonthValue);
    formData.append('discount_3_month', discount3Month ? 1 : 0);
    formData.append('discount_3_month_value', discount3MonthValue);
    formData.append('discount_6_month', discount6Month ? 1 : 0);
    formData.append('discount_6_month_value', discount6MonthValue);

    formData.append('country', addressData.country);
    formData.append('address', addressData.address);
    formData.append('street', addressData.street);
    formData.append('apt', addressData.apt);
    formData.append('city', addressData.city);
    formData.append('province', addressData.province);
    formData.append('postal', addressData.postal);
    AllAmenities.forEach((amenity, index) => {
      formData.append(`amenities[${index}][id]`, amenity.id);
    });
    uploadedImages.forEach((imageObj, index) => {
      formData.append(`property_images[]`, imageObj.file);
    });
    if (tourVideo?.file) {
      formData.append('tour_video', tourVideo.file);
    }
    try {
      const response = await authFetch(`/property/create`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.status == 200) {
        alert('Property created successfully!');
        route.push('/');
      } else if (response.status == 422 && data?.errors) {
        const serverErrors = Object.values(data.errors).flat();
        setValidationErrors(serverErrors);
        setTimeout(() => errorsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
      } else {
        setValidationErrors([data?.message || 'Something went wrong. Please try again.']);
      }
    } catch (error) {
      console.error('Create listing error:', error);
      setValidationErrors([`Network error: ${error.message}. Please check your connection and try again.`]);
    } finally {
      setSubmitting(false);
    }
  };

  const getButtonText = () => {
    if (step === 1) return 'Get Started';
    if (step >= 17) return 'Create Listing';
    return 'Next';
  };

  return (
    <>
      <div className='propertiry-parent'>
        <div className='properity-header'>
          <Link href='/'>
            <img className='pro-logo' src="/images/fav.png" alt="" />
          </Link>
          <div>
            <button className='pro-exit-btn' type='submit' onClick={handleSubmit}>{step == 1 ? 'Exit' : 'Save & exit'}</button>
          </div>
        </div>
        <div className='propertity-main'>
          {step === 1 && <Step />}
          {step === 2 && <AboutPlace />}
          {step === 3 && <DescribePlace DescribePlaceName={DescribePlaceName} setDescribePlaceName={setDescribePlaceName} />}
          {step === 4 && <Address />}
          {step === 5 && <AddressForm addressData={addressData} setAddressData={setAddressData} showSpecificLocation={showSpecificLocation} setShowSpecificLocation={setShowSpecificLocation} countries={countries} />}
          {step === 6 && <StayPeople guests={guests} setGuests={setGuests} bedrooms={bedrooms} setBedrooms={setBedrooms} bathrooms={bathrooms} setBathrooms={setBathrooms} petsAllowed={petsAllowed} setPetsAllowed={setPetsAllowed} />}
          {step === 7 && <BathroomGuest privateBathroom={privateBathroom} setPrivateBathroom={setPrivateBathroom} dedicatedBathroom={dedicatedBathroom} setDedicatedBathroom={setDedicatedBathroom} sharedBathroom={sharedBathroom} setSharedBathroom={setSharedBathroom} />}
          {step === 8 && <MightThere mightThere={mightThere} setMightThere={setMightThere} />}
          {step === 9 && <PlaceStandOut />}
          {step === 10 && <DescribeOurPlace amenities={amenities} setAllAmenties={setAllAmenties} />}
          {step === 11 && <PhotoHouse uploadedImages={uploadedImages} setUploadedImages={setUploadedImages} tourVideo={tourVideo} setTourVideo={setTourVideo} />}
          {step === 12 && <HouseDetail title={title} setTitle={setTitle} description={description} setDescription={setDescription} />}
          {step === 13 && <Publish />}
          {step === 14 && <Reservation reservationType={reservationType} setReservationType={setReservationType} />}
          {step === 15 && <SetPrice setPrice={setPrice} price={price} guestServiceFee={guestServiceFee} />}
          {step === 16 && <Discount
            discount1Month={discount1Month} setDiscount1Month={setDiscount1Month}
            discount1MonthValue={discount1MonthValue} setDiscount1MonthValue={setDiscount1MonthValue}
            discount3Month={discount3Month} setDiscount3Month={setDiscount3Month}
            discount3MonthValue={discount3MonthValue} setDiscount3MonthValue={setDiscount3MonthValue}
            discount6Month={discount6Month} setDiscount6Month={setDiscount6Month}
            discount6MonthValue={discount6MonthValue} setDiscount6MonthValue={setDiscount6MonthValue}
          />}
          {step === 17 && <Review />}
        </div>
        <div>
          <div className='bottom-step-line'>
            <div className='bootom-steps'>
              {[...Array(7)].map((_, index) => (
                <span key={index} className={step >= index + 1 ? 'active' : ''}></span>
              ))}
            </div>
            <div className='bootom-steps'>
              {[...Array(4)].map((_, index) => {
                const currentIndex = index + 7;
                return (
                  <span key={index} className={step >= currentIndex + 1 ? 'active' : ''}></span>
                )
              })}
            </div>
            <div className='bootom-steps'>
              {[...Array(5)].map((_, index) => {
                const currentIndex = index + 11;
                return (
                  <span key={index} className={step >= currentIndex + 1 ? 'active' : ''}></span>
                )
              })}
            </div>
            <button
              className='get-started-btn'
              onClick={step >= 17 ? handleSubmit : handleNext}
              disabled={submitting}
              style={submitting ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
            >
              {submitting ? 'Creating...' : getButtonText()}
            </button>
          </div>
          {validationErrors.length > 0 && (
            <div className='property-validation-errors' ref={errorsRef}>
              {validationErrors.map((err, i) => (
                <div key={i} className='property-validation-error'>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D80621" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                  {err}
                </div>
              ))}
            </div>
          )}
          {step != 1 ? <div onClick={() => { setValidationErrors([]); setStep(step - 1); }} className="propertity-back-btn">Back</div> : ''}
        </div>
      </div>
      <PropertyAIGuide currentStep={step} />
    </>
  )
};

export default Property

// import AboutPlace from '@/component/Properties/step1/AboutPlace';
// import Address from '@/component/Properties/step1/Address';
// import AddressForm from '@/component/Properties/step1/AddressForm';
// import BathroomGuest from '@/component/Properties/step1/BathroomGuest';
// import DescribePlace from '@/component/Properties/step1/DescribePlace';
// import MightThere from '@/component/Properties/step1/MightThere';
// import StayPeople from '@/component/Properties/step1/StayPeople';
// import Step from '@/component/Properties/step1/Step';
// import DescribeOurPlace from '@/component/Properties/step2/DescribeOurPlace';
// import HouseDetail from '@/component/Properties/step2/HouseDetail';
// import PhotoHouse from '@/component/Properties/step2/PhotoHouse';
// import PlaceStandOut from '@/component/Properties/step2/PlaceStandOut';
// import Discount from '@/component/Properties/step3/Discount';
// import Publish from '@/component/Properties/step3/Publish';
// import Reservation from '@/component/Properties/step3/Reservation';
// import Review from '@/component/Properties/step3/Review';
// import SetPrice from '@/component/Properties/step3/SetPrice';
// import { CreateApiContext } from '@/ContextApi/CreateApiContext';
// import { authFetch } from '@/Helper/helper';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import React, { useContext, useEffect, useState } from 'react';

// const Property = () => {
//   // ✅ addressData ab context se aa raha hai — yahan local state nahi chahiye
//   const { fetchAmenities, amenities, fetchCountries, countries, addressData } = useContext(CreateApiContext);

//   const [step, setStep] = useState(1);
//   const route = useRouter();

//   const [DescribePlaceName, setDescribePlaceName] = useState('');
//   const [guests, setGuests]                       = useState(0);
//   const [bedrooms, setBedrooms]                   = useState(0);
//   const [bathrooms, setBathrooms]                 = useState(0);
//   const [privateBathroom, setPrivateBathroom]     = useState(0);
//   const [dedicatedBathroom, setDedicatedBathroom] = useState(0);
//   const [sharedBathroom, setSharedBathroom]       = useState(0);
//   const [mightThere, setMightThere]               = useState('');
//   const [AllAmenities, setAllAmenties]             = useState([]);
//   const [uploadedImages, setUploadedImages]       = useState([]);
//   const [title, setTitle]                         = useState('');
//   const [description, setDescription]             = useState('');
//   const [price, setPrice]                         = useState(19);
//   const [showSpecificLocation, setShowSpecificLocation] = useState(false);

//   useEffect(() => { if (amenities?.length === 0) fetchAmenities(); }, []);
//   useEffect(() => { if (countries?.length === 0) fetchCountries(); }, []);

//   const handleSubmit = async (e) => {
//     if (e.target.textContent === 'Exit') { route.push('/'); return; }

//     const formData = new FormData();
//     const user_id = window.localStorage.getItem('user_id');

//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('describe_your_place', DescribePlaceName);
//     formData.append('how_many_guests', guests);
//     formData.append('how_many_bedrooms', bedrooms);
//     formData.append('how_many_bathroom', bathrooms);
//     formData.append('bathroom_avaiable_private_and_attached', privateBathroom);
//     formData.append('bathroom_avaiable_dedicated', dedicatedBathroom);
//     formData.append('bathroom_avaiable_shared', sharedBathroom);
//     formData.append('who_else_there', mightThere);
//     formData.append('set_your_price', price);
//     formData.append('user_id', user_id);

//     // ✅ Context se addressData use kar rahe hain
//     formData.append('country', addressData.country);
//     formData.append('address', addressData.address);
//     formData.append('street', addressData.street);
//     formData.append('apt', addressData.apt);
//     formData.append('city', addressData.city);
//     formData.append('province', addressData.province);
//     formData.append('postal', addressData.postal);

//     AllAmenities.forEach((amenity, index) => {
//       formData.append(`amenities[${index}][id]`, amenity.id);
//     });
//     uploadedImages.forEach((imageObj) => {
//       formData.append('property_images[]', imageObj.file);
//     });

//     try {
//       const response = await authFetch('/property/create', { method: 'POST', body: formData });
//       if (response.status === 200) route.push('/');
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const getButtonText = () => {
//     if (step === 1)   return 'Get Started';
//     if (step >= 17)   return 'Create Listing';
//     return 'Next';
//   };

//   // Step 5 ka Next button tab hi enable ho jab zaroori fields bhare hon
//   const isNextDisabled =
//     (step === 3 && !DescribePlaceName) ||
//     (step === 5 && (!addressData.country || !addressData.address || !addressData.street || !addressData.city));

//   return (
//     <div className='propertiry-parent'>
//       {/* Header */}
//       <div className='properity-header'>
//         <Link href='/'>
//           <img className='pro-logo' src="/images/fav.png" alt="" />
//         </Link>
//         <button className='pro-exit-btn' type='button' onClick={handleSubmit}>
//           {step === 1 ? 'Exit' : 'Save & exit'}
//         </button>
//       </div>

//       {/* Step Content */}
//       <div className='propertity-main'>
//         {step === 1  && <Step />}
//         {step === 2  && <AboutPlace />}
//         {step === 3  && <DescribePlace DescribePlaceName={DescribePlaceName} setDescribePlaceName={setDescribePlaceName} />}
//         {step === 4  && <Address />}
//         {step === 5  && <AddressForm showSpecificLocation={showSpecificLocation} setShowSpecificLocation={setShowSpecificLocation} />}
//         {step === 6  && <StayPeople guests={guests} setGuests={setGuests} bedrooms={bedrooms} setBedrooms={setBedrooms} bathrooms={bathrooms} setBathrooms={setBathrooms} />}
//         {step === 7  && <BathroomGuest privateBathroom={privateBathroom} setPrivateBathroom={setPrivateBathroom} dedicatedBathroom={dedicatedBathroom} setDedicatedBathroom={setDedicatedBathroom} sharedBathroom={sharedBathroom} setSharedBathroom={setSharedBathroom} />}
//         {step === 8  && <MightThere mightThere={mightThere} setMightThere={setMightThere} />}
//         {step === 9  && <PlaceStandOut />}
//         {step === 10 && <DescribeOurPlace amenities={amenities} setAllAmenties={setAllAmenties} />}
//         {step === 11 && <PhotoHouse uploadedImages={uploadedImages} setUploadedImages={setUploadedImages} />}
//         {step === 12 && <HouseDetail title={title} setTitle={setTitle} description={description} setDescription={setDescription} />}
//         {step === 13 && <Publish />}
//         {step === 14 && <Reservation />}
//         {step === 15 && <SetPrice setPrice={setPrice} price={price} />}
//         {step === 16 && <Discount />}
//         {step === 17 && <Review />}
//       </div>

//       {/* Bottom Navigation */}
//       <div>
//         <div className='bottom-step-line'>
//           <div className='bootom-steps'>
//             {[...Array(7)].map((_, i) => (
//               <span key={i} className={step >= i + 1 ? 'active' : ''} />
//             ))}
//           </div>
//           <div className='bootom-steps'>
//             {[...Array(4)].map((_, i) => (
//               <span key={i} className={step >= i + 8 ? 'active' : ''} />
//             ))}
//           </div>
//           <div className='bootom-steps'>
//             {[...Array(5)].map((_, i) => (
//               <span key={i} className={step >= i + 12 ? 'active' : ''} />
//             ))}
//           </div>
//           <button
//             className='get-started-btn'
//             onClick={step >= 17 ? handleSubmit : () => setStep(step + 1)}
//             disabled={isNextDisabled}
//           >
//             {getButtonText()}
//           </button>
//         </div>
//         {step !== 1 && (
//           <div onClick={() => setStep(step - 1)} className="propertity-back-btn">Back</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Property;