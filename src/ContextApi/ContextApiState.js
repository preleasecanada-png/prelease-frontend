import React, { useState, useEffect } from 'react'
import { CreateApiContext } from './CreateApiContext'
import locales from '../locales';
import { authFetch } from '@/Helper/helper';

const RTL_LANGUAGES = ['ar'];

const ContextApiState = (props) => {
    const [locale, setLocale] = useState(locales.en);

    useEffect(() => {
        const savedLang = localStorage.getItem('language');
        if (savedLang && locales[savedLang]) {
            setLocale(locales[savedLang]);
            document.documentElement.dir = RTL_LANGUAGES.includes(savedLang) ? 'rtl' : 'ltr';
            document.documentElement.lang = savedLang;
        }
    }, []);

    const handleSetLocale = (newLocale) => {
        setLocale(newLocale);
        const langKey = Object.keys(locales).find(k => locales[k] === newLocale);
        if (langKey) {
            document.documentElement.dir = RTL_LANGUAGES.includes(langKey) ? 'rtl' : 'ltr';
            document.documentElement.lang = langKey;
        }
    };
    const [loader, setLoader] = useState(false);
    const [propertiesLoading, setPropertiesLoading] = useState(false);
    const [destinations, setDestinations] = useState([]);
    const [placeDetail, setPlaceDetail] = useState({});
    const [hostVerification, setHostVerification] = useState({});
    const [hostReviewStats, setHostReviewStats] = useState({});
    const [bookedDates, setBookedDates] = useState([]);
    const [amenities, setAmenities] = useState([]);
    const [properties, setProperties] = useState([]);
    const [wishLists, setWishLists] = useState([]);
    const [users, setUsers] = useState([]);
    const [countries, setCountries] = useState([]);

    const [addressData, setAddressData] = useState({
        country: '',
        address: '',
        street: '',
        apt: '',
        city: '',
        province: '',
        postal: '',
        lat: null,
        lng: null,
    });

    const fetchDestination = async (slug) => {
        setLoader(true);
        try {
            const response = await authFetch(`/destination-place/${slug}`)
            setLoader(false);
            if (response?.status === 200) {
                setDestinations(response?.destinationPlace?.places);
            } else {
                console.error("API Error:", response);
            }
        } catch (error) {
            setLoader(false);
            console.error("Fetch error:", error);
        }
    }


    const fetchPlaceDetail = async (slug, id) => {
        setLoader(true);
        try {
            const response = await authFetch(`/property-detail/${slug}/${id}`);
            setLoader(false);
            if (response?.status === 200) {
                setPlaceDetail(response?.placeDetail);
                setHostVerification(response?.host_verification || {});
                setHostReviewStats(response?.host_review_stats || {});
                setBookedDates(response?.booked_dates || []);
            } else {
                console.error("API Error:", response);
            }
        } catch (error) {
            setLoader(false);
            console.error("Fetch error:", error);
        }
    }

    const fetchAmenities = async () => {
        setLoader(true);
        try {
            const response = await authFetch(`/amenities`);
            setLoader(false);
            if (response?.status === 200) {
                setAmenities(response?.data);
            } else {
                console.error("API Error:", response);
            }
        } catch (error) {
            setLoader(false);
            console.error("Fetch error:", error);
        }
    }


    // const fetchProperties = async () => {
    //     setLoader(true);
    //     try {
    //         fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/property/lists`)
    //             .then((response) => response.json())
    //             .then((response) => {
    //                 setLoader(false);
    //                 if (response?.status == 200) {
    //                     setProperties(response?.data);
    //                 } else {
    //                     setLoader(false);
    //                     console.error('API Error:', response);
    //                 }
    //             })
    //             .catch((err) => {
    //                 setLoader(false);
    //                 console.error('API Fetch Error:', err);
    //             });

    //     } catch (error) {
    //         setLoader(false);
    //         console.error(error);
    //     }
    // }
    const fetchProperties = async (filters = {}) => {
        setPropertiesLoading(true);
        setLoader(true);

        try {
            const query = new URLSearchParams(filters).toString();

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_API_HOST}/property/lists?${query}`
            );

            const data = await response.json();

            if (data.status === 200) {
                setProperties(data.data);
            } else {
                console.error("API Error", data);
            }
        } catch (error) {
            console.error("Fetch Error", error);
        }

        setPropertiesLoading(false);
        setLoader(false);
    };


    const fetchWishLists = async () => {
        setLoader(true);
        try {
            const response = await authFetch(`/property/wish-lists`);
            setLoader(false);
            if (response?.status === 200) {
                setWishLists(response?.data);
            } else {
                console.error("API Error:", response);
            }
        } catch (error) {
            setLoader(false);
            console.error("Fetch error:", error);
        }
    }

    const fetchUsersLists = async () => {
        setLoader(true);
        try {
            const response = await authFetch(`/users`);
            setLoader(false);
            if (response?.status === 200) {
                setUsers(response?.data);
            } else {
                console.error("API Error:", response);
            }
        } catch (error) {
            setLoader(false);
            console.error("Fetch error:", error);
        }
    };

    const fetchCountries = async () => {
        setLoader(true);
        try {
            const response = await authFetch(`/property/countries`);
            setLoader(false);
            if (response?.status === 200) {
                setCountries(response?.data);
            } else {
                console.error("API Error:", response);
            }
        } catch (error) {
            setLoader(false);
            console.error("Fetch error:", error);
        }
    };

    return (
        <>
            <CreateApiContext.Provider value={{ loader, setLoader, propertiesLoading, locale, setLocale: handleSetLocale, fetchDestination, destinations, fetchPlaceDetail, placeDetail, hostVerification, hostReviewStats, bookedDates, fetchAmenities, amenities, properties, fetchProperties, fetchWishLists, wishLists, fetchUsersLists, users, fetchCountries, countries, addressData, setAddressData, }}>
                {props.children}
            </CreateApiContext.Provider>
        </>
    )
}

export default ContextApiState
