'use client';
import Testemonials from '@/component/Testemonials';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { memo, useContext, useEffect, useState, useRef } from 'react'
import { CreateApiContext } from '../../ContextApi/CreateApiContext';
import { imageBaseUrl } from '../../Helper/helper';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import ChatPopup from '../chats-popup';
import DateRangePicker from '@/component/calender';
import Rating from '@/component/rating';
import toast from 'react-hot-toast';
import Pusher from "pusher-js";
import { ChatContext } from '@/ContextApi/ChatContext';

const PropertyDetail = memo(() => {
    const [showReserverButton, setshowReserverButton] = useState(false)

    useEffect(() => {
        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
        });

        const channel = pusher.subscribe("simple-alert");
        channel.bind("alert-event", function (data) {
            alert(data.message);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, []);


    const [adultCount, setAdultCount] = useState(0);
    const [childCount, setChildCount] = useState(0);
    const [infrontCount, setInfrontCount] = useState(0);
    const [petsCount, setPetsCount] = useState(0);
    const { fetchPlaceDetail, placeDetail } = useContext(CreateApiContext);
    const router = useRouter();
    const { index } = router.query;
    const [startDate, setStartDate] = useState('');
    const [endtDate, setEndtDate] = useState('');
    const [tenure, setTenure] = useState('3');
    const [minDate, setMinDate] = useState('');

    const [showSlider, setShowSlider] = useState(false);
    const [startIndex, setStartIndex] = useState(0);
    // chat popup state
    const [showChatModal, setShowChatModal] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [isTruncated, setIsTruncated] = useState(false);
    const descriptionRef = useRef(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [propertyReviews, setPropertyReviews] = useState([]);
    const [reviewStats, setReviewStats] = useState(null);

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    useEffect(() => {
        if (placeDetail?.id) {
            fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/reviews/property/${placeDetail.id}`)
                .then(res => res.json())
                .then(data => {
                    if (data?.status === 200) {
                        setPropertyReviews(data.data?.data || []);
                        setReviewStats(data.stats || null);
                    }
                })
                .catch(err => console.error('Failed to fetch reviews:', err));
        }
    }, [placeDetail?.id]);

    const images = placeDetail?.property_images?.map((img) => ({
        original: imageBaseUrl(img?.original),
        thumbnail: imageBaseUrl(img?.original)
    })) || [];

    const openSlider = (index) => {
        setStartIndex(index);
        setShowSlider(true);
        document.body.style.overflow = 'hidden';
    };

    const closeSlider = () => {
        setShowSlider(false);
        document.body.style.overflow = 'auto';
    };

    // useEffect(() => {
    //     fetchPlaceDetail(router?.query?.index);
    // }, [router]);
    useEffect(() => {
        if (index && index.length >= 2) {
            const slug = index[0];
            const id = index[1];

            fetchPlaceDetail(slug, id);
        }
    }, [index]);


    useEffect(() => {
        if (placeDetail?.length > 0) {
            setAdultCount(placeDetail?.adulats_min);
            setChildCount(placeDetail?.children_min);
            setPetsCount(placeDetail?.pets_min);
            setInfrontCount(placeDetail?.infant_min);
        }
        if (placeDetail?.bookings && placeDetail?.bookings.length > 0) {
            setAdultCount(placeDetail?.bookings[0]?.adult_count);
            setChildCount(placeDetail?.bookings[0]?.child_count);
            setPetsCount(placeDetail?.bookings[0]?.pets_count);
            setInfrontCount(placeDetail?.bookings[0]?.infront_count);
            setStartDate(placeDetail?.bookings[0]?.move_in_date);
            setEndtDate(placeDetail?.bookings[0]?.move_out_date);
        }
    }, [placeDetail]);

    useEffect(() => {
        const today = new Date();
        const todayFormatted = today.toISOString().split('T')[0];
        setMinDate(todayFormatted);
    }, []);

    // Check if description is truncated
    useEffect(() => {
        if (descriptionRef.current) {
            const element = descriptionRef.current;
            const lineHeight = parseInt(window.getComputedStyle(element).lineHeight);
            const maxLines = 8;
            const maxHeight = lineHeight * maxLines;
            const isTrunc = element.scrollHeight > maxHeight;
            setIsTruncated(isTrunc);
        }
    }, [placeDetail]);

    console.log(placeDetail, 'placeDetail');

    const [reservationRequested, setReservationRequested] = useState(false);

    const { sendMessage, addSystemMessage } = useContext(ChatContext);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const totalGuests = adultCount + childCount;

        if (!isLoggedIn) {
            toast.error("Please log in to proceed with booking.");
            return;
        }

        if (!startDate) {
            toast.error("Please select a start date.");
            return;
        }

        if (totalGuests <= 0) {
            toast.error("Please select at least one guest.");
            return;
        }

        setShowChatModal(true);

        if (!reservationRequested) {
            try {
                const token = localStorage.getItem('token');
                const form = new FormData();
                form.append('property_id', placeDetail.id);
                form.append('start_date', startDate);
                form.append('tenure', tenure);
                form.append('guests', totalGuests);
                form.append('adult_count', adultCount);
                form.append('child_count', childCount);
                form.append('pets_count', petsCount);
                form.append('infront_count', infrontCount);
                form.append('landlord_id', placeDetail?.user_id);

                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/reserve`, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${token}` },
                    body: form,
                });
            } catch (err) {
                toast.error('Network error');
                console.error(err);
            }
        }
    };
    console.log('property details', placeDetail);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userId = localStorage.getItem('user_id');
            if (userId && placeDetail?.user_id && Number(userId) === Number(placeDetail?.user_id)) {
                setshowReserverButton(true);
            } else {
                setshowReserverButton(false);
            }
        }
    }, [placeDetail]);
    return (
        <>
            {placeDetail && placeDetail ?
                (
                    <>
                        <section className="gallery_sec">
                            <div className="container">
                                <div className='Share_row'>
                                    <div className='hosted_head'>
                                        Hosted by <strong>{placeDetail?.user?.first_name}</strong>
                                    </div>

                                    <div className='share_btn_Area'>
                                        <button>
                                            <img src="/images/share.webp" alt="" />
                                            Share
                                        </button>
                                        <button>
                                            <img src="/images/heart.webp" alt="" />
                                            Wishlist
                                        </button>
                                    </div>
                                </div>
                                <div className='gallery_grid'>
                                    {placeDetail?.property_images?.map((property_image, index) => (
                                        <div className='prev_gallery' key={index}>
                                            <img src={imageBaseUrl(property_image?.original)} alt="" onClick={() => openSlider(index)} />
                                            {index === placeDetail.property_images.length - 1 && (
                                                // <div className='Last_count'>
                                                <div className='Last_count' onClick={() => openSlider(index)}>
                                                    +{placeDetail?.property_images?.length}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {showSlider && (
                            <div className="fullscreen-slider">
                                <button className="close-button" onClick={closeSlider}>×</button>
                                <ImageGallery
                                    items={images}
                                    startIndex={startIndex}
                                    showThumbnails={true}
                                    showFullscreenButton={false}
                                    showPlayButton={false}
                                    showNav={true}
                                    onSlide={() => window.dispatchEvent(new Event('resize'))}
                                />
                            </div>
                        )}

                        <section className="">
                            <div className="container">
                                <div className="sc-1swkyy4-0 dgnQJW">
                                    <div className="sc-1xlrhy1-4 fiWGsl dzinaz-0 lkZcbQ">
                                        <h1 className="blog_title">{placeDetail?.title}</h1>
                                        <div className="Keyword_area">
                                            <img src="/images/location.webp" alt="" />
                                            <p>{placeDetail?.address}</p>
                                        </div>
                                        <div className="Keyword_area">
                                            <img src="/images/star.webp" alt="" />
                                            <p><b>{reviewStats?.avg_rating || '0'} • {reviewStats?.total_reviews || 0} Review{reviewStats?.total_reviews !== 1 ? 's' : ''}</b></p>
                                        </div>
                                        <div className='fhgjr'>
                                            {placeDetail?.bath_room != '' ?
                                                <div className='fhgjr_box'>
                                                    <img src="/images/bedroom.webp" alt="" />
                                                    {placeDetail?.how_many_bathroom} Bedrooms
                                                </div>
                                                : ''}
                                            {placeDetail?.bath_room != '' ?
                                                <div className='fhgjr_box'>
                                                    <img src="/images/bathroom.webp" alt="" />
                                                    {placeDetail?.how_many_bedrooms} Bathrooms
                                                </div>
                                                : ''}
                                            {placeDetail?.pets_max != '' ?
                                                <div className='fhgjr_box'>
                                                    <img src="/images/pet.webp" alt="" />
                                                    {placeDetail?.how_many_guests} Pets allowed
                                                </div>
                                                : ''}
                                        </div>
                                        <div className="sc-1hh5wos-3 hLYWfh mb-5">
                                            <h2 className="sc-1i8u282-0 bNSQXg custom-h2 discription-h2">Your Perfect Stay Away from home</h2>

                                            <p ref={descriptionRef} className={`blog_para property_description property_description_transition ${!expanded ? 'desc_clamp' : ''}`} dangerouslySetInnerHTML={{ __html: placeDetail?.description }}></p>

                                            {isTruncated && (
                                                <button className="desc_toggle_btn" onClick={() => setExpanded(!expanded)}>
                                                    {expanded ? "Show Less" : "Show More"}
                                                </button>
                                            )}
                                        </div>
                                        <hr />
                                        <div className="sc-1hh5wos-3 hLYWfh">
                                            <h2 className="sc-1i8u282-0 bNSQXg custom-h2">Offered Amenities</h2>

                                            <div className='feature_area'>
                                                {placeDetail?.amenities?.map((amenitie, amen) => (
                                                    <div className='feature_box' key={amen}>
                                                        <img src={imageBaseUrl(amenitie?.image)} alt={amenitie?.name} />
                                                        <span>
                                                            {amenitie?.name}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <hr />
                                        <div className="sc-1hh5wos-3 hLYWfh">
                                            {(() => {
                                                const getEndDate = (startStr, months) => {
                                                    if (!startStr) return null;
                                                    const date = new Date(startStr);
                                                    date.setMonth(date.getMonth() + parseInt(months));
                                                    return date;
                                                };
                                                const calculatedEndDate = startDate ? getEndDate(startDate, tenure) : null;
                                                const dateRangeStart = startDate ? new Date(startDate) : null;
                                                return <DateRangePicker externalStartDate={dateRangeStart} externalEndDate={calculatedEndDate} />;
                                            })()}
                                        </div>
                                    </div>

                                    <div className="sc-180k3r6-0 ealdZV mt-4">
                                        <form className="sc-1ggiumt-2 epCsUQ " onSubmit={handleFormSubmit}>
                                            <div className='check_inheade'>
                                                <h2>${startDate ? parseInt(placeDetail?.set_your_price) * parseInt(tenure) : placeDetail?.set_your_price} <span>{startDate ? `for ${tenure} months` : "for 1 month"}</span></h2>
                                            </div>
                                            <div className="sc-1ggiumt-14 djkHAa">
                                                <div className="sc-1swkyy4-0 dZfxew">
                                                    <div className="sc-1swkyy4-0 dZfxew sc-1ggiumt-48 kvWTeD">
                                                        <div className="dzinaz-0 dHLwtA sc-1ggiumt-10 ilFAJv">
                                                            <div className="sc-1qkryqb-0 ipHomM DateRangePickerWrapper">
                                                                <span className="sc-1qkryqb-5 buUMyK DatePickerPlaceHolder"></span>
                                                                <div className="sc-1qkryqb-13 yKLaK">
                                                                    <div className="sc-1qkryqb-14 jYpWby DateRangePickerDatesContainer">
                                                                        <div className="sc-1b4rtiv-1 jHEFMS InputStartDate">
                                                                            <span className="sc-1b4rtiv-3 OwsRV labelCheck">
                                                                                <div className="sc-1b4rtiv-4 iDyayu">MOVE IN</div>
                                                                                <div className="sc-1b4rtiv-6 dJubSq">
                                                                                    <label htmlFor="datepicker">
                                                                                        <input type="date" id='startDate' placeholder="Add Date" autocomplete="off" value={startDate} min={minDate} onChange={(e) => setStartDate(e.target.value)} />
                                                                                    </label>
                                                                                </div>
                                                                            </span>
                                                                        </div>

                                                                        <div className="sc-1b4rtiv-8 jiqpmd seperatorLeft"></div>

                                                                        <div className="sc-1b4rtiv-1 jHEFMS InputEndDate">
                                                                            <span className="sc-1b4rtiv-3 OwsRV labelCheck">
                                                                                <div className="sc-1b4rtiv-4 iDyayu">MOVE OUT DURATION</div>
                                                                                <div className="sc-1b4rtiv-6 dJubSq">
                                                                                    <select
                                                                                        value={tenure}
                                                                                        onChange={(e) => setTenure(e.target.value)}
                                                                                        className="tenure-select"
                                                                                        style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', cursor: 'pointer', appearance: 'auto' }}
                                                                                    >
                                                                                        <option value="3">3 Months</option>
                                                                                        <option value="6">6 Months</option>
                                                                                        <option value="12">12 Months</option>
                                                                                    </select>
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <i className="sc-1i8u282-0 kZKbSl caret"></i>
                                                            </div>
                                                        </div>
                                                        <div className="dzinaz-0 dHLwtA sc-1ggiumt-45 rJAgT">
                                                            <div className="accordion" id="accordionExample">
                                                                <div className="accordion-item">
                                                                    <h2 className="accordion-header" id="headingTwo">
                                                                        <button className="accordion-button collapsed bg-transparent shadow-none text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                                            <div>
                                                                                <div className="sc-1b4rtiv-4 iDyayu">GUESTS</div>
                                                                                <div className='det_count'>
                                                                                    {(adultCount > 0 || childCount > 0 || infrontCount > 0 || petsCount > 0) ?
                                                                                        `${adultCount + childCount} guest${(adultCount + childCount) !== 1 ? 's' : ''}, ${infrontCount} infant${infrontCount !== 1 ? 's' : ''}, ${petsCount} pet${petsCount !== 1 ? 's' : ''}`
                                                                                        :
                                                                                        "0 Guests"
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </button>
                                                                    </h2>
                                                                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                                        <div className="accordion-body pt-0">
                                                                            <div className="g6e6z5i atm_l8_14br1z3 dir dir-ltr">

                                                                                {/* {placeDetail?.adulats_max && placeDetail?.adulats_min != null ? */}
                                                                                <div className="pt-2 cnhxj7b atm_7l_dezgoh atm_9s_1txwivl atm_h_1h6ojuz atm_fc_1yb4nlp atm_be_1g80g66 atm_cx_19bvopo atm_lb_1drp7u0 atm_ll_2p0wge atm_40_1f9jazd_1i0dyc0 atm_jb_p2n4d6__oggzyc atm_lb_1crvktv__oggzyc dir dir-ltr">
                                                                                    <section>
                                                                                        <div className="tjx911r atm_7l_dezgoh atm_cs_10d11i2 atm_9s_1aaaxdl atm_lc_idpfg4 t1676ied atm_c8_2x1prs atm_g3_1jbyh58 atm_fr_11a07z3 dir dir-ltr">
                                                                                            <h1 id="searchFlow-title-label-adults" tabIndex="-1" className="hpipapi atm_7l_1kw7nm4 atm_c8_1x4eueo atm_cs_1kw7nm4 atm_g3_1kw7nm4 atm_gi_idpfg4 atm_l8_idpfg4 atm_kd_idpfg4_pfnrn2 dir dir-ltr">
                                                                                                Adults
                                                                                            </h1>
                                                                                        </div>

                                                                                        <div className="s12mgzio atm_cs_6adqpa atm_ld_evh4rp atm_7l_1admnp8 sxeujms atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_ld_evh4rp__oggzyc dir dir-ltr">
                                                                                            Ages 13 or above
                                                                                        </div>
                                                                                    </section>

                                                                                    <div className="caex243 atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1yb4nlp atm_vy_e2f67q atm_e2_1vi7ecw atm_7l_jt7fhx atm_cs_6adqpa atm_c8_2x1prs atm_g3_1jbyh58 atm_fr_11a07z3 atm_bx_48h72j dir dir-ltr">
                                                                                        <button onClick={() => adultCount > 1 && setAdultCount(adultCount - 1)} className={`${adultCount <= 1 ? 'disabled' : ''} bv4zwx4 atm_ax_idpfg4 atm_bb_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_r3_1h6ojuz atm_rd_glywfm atm_3f_97hwo atm_bx_1kw7nm4 atm_tl_1gw4zv3 atm_vy_1vi7ecw atm_e2_1vi7ecw atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1h6ojuz atm_7l_1he744i atm_4b_1en9qhd atm_26_1qwqy05 atm_5j_1ssbidh atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_7l_jt7fhx_1vpy06o_uv4tnr atm_4b_1qnzqti_1vpy06o_uv4tnr atm_26_1qwqy05_1vpy06o_uv4tnr atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_7l_jt7fhx_1w3cfyq atm_4b_1qnzqti_1w3cfyq atm_26_1qwqy05_1w3cfyq atm_70_1txm9bj_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_7l_jt7fhx_pfnrn2_1oszvuo atm_4b_1qnzqti_pfnrn2_1oszvuo atm_26_1qwqy05_pfnrn2_1oszvuo atm_70_1txm9bj_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_7l_1vvgs7l_1o5j5ji atm_4b_1vvgs7l_1o5j5ji atm_26_1qwqy05_1o5j5ji dir dir-ltr`} type="button" disabled="" tabIndex="-1" aria-label="decrease value" aria-describedby="searchFlow-title-label-adults" data-testid="stepper-adults-decrease-button">
                                                                                            <span className="i98ho2o atm_e2_qslrf5 atm_vy_qslrf5 atm_l8_14y27yu dir dir-ltr">
                                                                                                <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}><path d="m.75 6.75h10.5v-1.5h-10.5z"></path></svg>
                                                                                            </span>
                                                                                        </button>
                                                                                        <div className="vqatjzs atm_mk_h2mmj6 atm_7l_1kw7nm4 atm_bx_1kw7nm4 atm_c8_1kw7nm4 atm_g3_1kw7nm4 dir dir-ltr">
                                                                                            <span aria-hidden="true" data-testid="stepper-adults-value">
                                                                                                {console.log('checkadult Count', adultCount)}
                                                                                                {adultCount}
                                                                                            </span>
                                                                                            <span className="vlastcb atm_fq_idpfg4 atm_3f_idpfg4 atm_7h_hxbz6r atm_7i_ysn8ba atm_e2_t94yts atm_ks_zryt35 atm_l8_idpfg4 atm_mk_stnw88 atm_vv_1q9ccgz atm_vy_t94yts dir dir-ltr">
                                                                                                {adultCount} Adults
                                                                                            </span>
                                                                                        </div>

                                                                                        <button type='button' onClick={() => (adultCount + childCount < placeDetail?.how_many_guests) && setAdultCount(adultCount + 1)} className={`${adultCount + childCount >= placeDetail?.how_many_guests ? 'disabled' : ''} bv4zwx4 atm_ax_idpfg4 atm_bb_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_r3_1h6ojuz atm_rd_glywfm atm_3f_97hwo atm_bx_1kw7nm4 atm_tl_1gw4zv3 atm_vy_1vi7ecw atm_e2_1vi7ecw atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1h6ojuz atm_7l_1he744i atm_4b_1en9qhd atm_26_1qwqy05 atm_5j_1ssbidh atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_7l_jt7fhx_1vpy06o_uv4tnr atm_4b_1qnzqti_1vpy06o_uv4tnr atm_26_1qwqy05_1vpy06o_uv4tnr atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_7l_jt7fhx_1w3cfyq atm_4b_1qnzqti_1w3cfyq atm_26_1qwqy05_1w3cfyq atm_70_1txm9bj_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_7l_jt7fhx_pfnrn2_1oszvuo atm_4b_1qnzqti_pfnrn2_1oszvuo atm_26_1qwqy05_pfnrn2_1oszvuo atm_70_1txm9bj_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_7l_1vvgs7l_1o5j5ji atm_4b_1vvgs7l_1o5j5ji atm_26_1qwqy05_1o5j5ji dir dir-ltr" type="button" aria-label="increase value" aria-describedby="searchFlow-title-label-adults" data-testid="stepper-adults-increase-button`}>
                                                                                            <span className="i98ho2o atm_e2_qslrf5 atm_vy_qslrf5 atm_l8_14y27yu dir dir-ltr">
                                                                                                <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}><path d="m6.75.75v4.5h4.5v1.5h-4.5v4.5h-1.5v-4.5h-4.5v-1.5h4.5v-4.5z"></path></svg>
                                                                                            </span>
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                                {/* : null} */}

                                                                                {/* {placeDetail?.children_max && placeDetail?.children_min != null ? */}
                                                                                <div className="cnhxj7b atm_7l_dezgoh atm_9s_1txwivl atm_h_1h6ojuz atm_fc_1yb4nlp atm_be_1g80g66 atm_cx_19bvopo atm_lb_1drp7u0 atm_ll_2p0wge atm_40_1f9jazd_1i0dyc0 atm_jb_p2n4d6__oggzyc atm_lb_1crvktv__oggzyc dir dir-ltr">
                                                                                    <section>
                                                                                        <div className="tjx911r atm_7l_dezgoh atm_cs_10d11i2 atm_9s_1aaaxdl atm_lc_idpfg4 t1676ied atm_c8_2x1prs atm_g3_1jbyh58 atm_fr_11a07z3 dir dir-ltr">
                                                                                            <h1 id="searchFlow-title-label-children" tabIndex="-1" className="hpipapi atm_7l_1kw7nm4 atm_c8_1x4eueo atm_cs_1kw7nm4 atm_g3_1kw7nm4 atm_gi_idpfg4 atm_l8_idpfg4 atm_kd_idpfg4_pfnrn2 dir dir-ltr">
                                                                                                Children
                                                                                            </h1>
                                                                                        </div>

                                                                                        <div className="s12mgzio atm_cs_6adqpa atm_ld_evh4rp atm_7l_1admnp8 sxeujms atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_ld_evh4rp__oggzyc dir dir-ltr">
                                                                                            Ages 2 – 12
                                                                                        </div>
                                                                                    </section>
                                                                                    <div className="caex243 atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1yb4nlp atm_vy_e2f67q atm_e2_1vi7ecw atm_7l_jt7fhx atm_cs_6adqpa atm_c8_2x1prs atm_g3_1jbyh58 atm_fr_11a07z3 atm_bx_48h72j dir dir-ltr">
                                                                                        <button onClick={() => childCount > 0 && setChildCount(childCount - 1)} className={`${childCount <= 0 ? 'disabled' : ''} bv4zwx4 atm_ax_idpfg4 atm_bb_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_r3_1h6ojuz atm_rd_glywfm atm_3f_97hwo atm_bx_1kw7nm4 atm_tl_1gw4zv3 atm_vy_1vi7ecw atm_e2_1vi7ecw atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1h6ojuz atm_7l_1he744i atm_4b_1en9qhd atm_26_1qwqy05 atm_5j_1ssbidh atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_7l_jt7fhx_1vpy06o_uv4tnr atm_4b_1qnzqti_1vpy06o_uv4tnr atm_26_1qwqy05_1vpy06o_uv4tnr atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_7l_jt7fhx_1w3cfyq atm_4b_1qnzqti_1w3cfyq atm_26_1qwqy05_1w3cfyq atm_70_1txm9bj_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_7l_jt7fhx_pfnrn2_1oszvuo atm_4b_1qnzqti_pfnrn2_1oszvuo atm_26_1qwqy05_pfnrn2_1oszvuo atm_70_1txm9bj_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_7l_1vvgs7l_1o5j5ji atm_4b_1vvgs7l_1o5j5ji atm_26_1qwqy05_1o5j5ji dir dir-ltr`} type="button" disabled="" tabIndex="-1" aria-label="decrease value" aria-describedby="searchFlow-title-label-adults" data-testid="stepper-adults-decrease-button">
                                                                                            <span className="i98ho2o atm_e2_qslrf5 atm_vy_qslrf5 atm_l8_14y27yu dir dir-ltr">
                                                                                                <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}><path d="m.75 6.75h10.5v-1.5h-10.5z"></path></svg>
                                                                                            </span>
                                                                                        </button>
                                                                                        <div className="vqatjzs atm_mk_h2mmj6 atm_7l_1kw7nm4 atm_bx_1kw7nm4 atm_c8_1kw7nm4 atm_g3_1kw7nm4 dir dir-ltr">
                                                                                            <span aria-hidden="true" data-testid="stepper-adults-value">
                                                                                                {childCount}
                                                                                            </span>
                                                                                            <span className="vlastcb atm_fq_idpfg4 atm_3f_idpfg4 atm_7h_hxbz6r atm_7i_ysn8ba atm_e2_t94yts atm_ks_zryt35 atm_l8_idpfg4 atm_mk_stnw88 atm_vv_1q9ccgz atm_vy_t94yts dir dir-ltr">
                                                                                                {childCount} Adults
                                                                                            </span>
                                                                                        </div>
                                                                                        <button onClick={() => (adultCount + childCount < placeDetail?.how_many_guests) && setChildCount(childCount + 1)} className={`${adultCount + childCount >= placeDetail?.how_many_guests ? 'disabled' : ''} bv4zwx4 atm_ax_idpfg4 atm_bb_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_r3_1h6ojuz atm_rd_glywfm atm_3f_97hwo atm_bx_1kw7nm4 atm_tl_1gw4zv3 atm_vy_1vi7ecw atm_e2_1vi7ecw atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1h6ojuz atm_7l_1he744i atm_4b_1en9qhd atm_26_1qwqy05 atm_5j_1ssbidh atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_7l_jt7fhx_1vpy06o_uv4tnr atm_4b_1qnzqti_1vpy06o_uv4tnr atm_26_1qwqy05_1vpy06o_uv4tnr atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_7l_jt7fhx_1w3cfyq atm_4b_1qnzqti_1w3cfyq atm_26_1qwqy05_1w3cfyq atm_70_1txm9bj_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_7l_jt7fhx_pfnrn2_1oszvuo atm_4b_1qnzqti_pfnrn2_1oszvuo atm_26_1qwqy05_pfnrn2_1oszvuo atm_70_1txm9bj_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_7l_1vvgs7l_1o5j5ji atm_4b_1vvgs7l_1o5j5ji atm_26_1qwqy05_1o5j5ji dir dir-ltr`} type="button" aria-label="increase value" aria-describedby="searchFlow-title-label-adults" data-testid="stepper-adults-increase-button">
                                                                                            <span className="i98ho2o atm_e2_qslrf5 atm_vy_qslrf5 atm_l8_14y27yu dir dir-ltr">
                                                                                                <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}><path d="m6.75.75v4.5h4.5v1.5h-4.5v4.5h-1.5v-4.5h-4.5v-1.5h4.5v-4.5z"></path></svg>
                                                                                            </span>
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                                {/* : null} */}

                                                                                {/* {placeDetail?.infant_max && placeDetail?.infant_min != null ? */}
                                                                                <div className="cnhxj7b atm_7l_dezgoh atm_9s_1txwivl atm_h_1h6ojuz atm_fc_1yb4nlp atm_be_1g80g66 atm_cx_19bvopo atm_lb_1drp7u0 atm_ll_2p0wge atm_40_1f9jazd_1i0dyc0 atm_jb_p2n4d6__oggzyc atm_lb_1crvktv__oggzyc dir dir-ltr" data-testid="search-block-filter-stepper-row-infants">
                                                                                    <section>
                                                                                        <div className="tjx911r atm_7l_dezgoh atm_cs_10d11i2 atm_9s_1aaaxdl atm_lc_idpfg4 t1676ied atm_c8_2x1prs atm_g3_1jbyh58 atm_fr_11a07z3 dir dir-ltr">
                                                                                            <h1 id="searchFlow-title-label-infants" tabIndex="-1" className="hpipapi atm_7l_1kw7nm4 atm_c8_1x4eueo atm_cs_1kw7nm4 atm_g3_1kw7nm4 atm_gi_idpfg4 atm_l8_idpfg4 atm_kd_idpfg4_pfnrn2 dir dir-ltr" elementtiming="LCP-target">Infants</h1>
                                                                                        </div>
                                                                                        <div className="s12mgzio atm_cs_6adqpa atm_ld_evh4rp atm_7l_1admnp8 sxeujms atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_ld_evh4rp__oggzyc dir dir-ltr">
                                                                                            Under 2
                                                                                        </div>
                                                                                    </section>
                                                                                    <div className="caex243 atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1yb4nlp atm_vy_e2f67q atm_e2_1vi7ecw atm_7l_jt7fhx atm_cs_6adqpa atm_c8_2x1prs atm_g3_1jbyh58 atm_fr_11a07z3 atm_bx_48h72j dir dir-ltr">
                                                                                        <button onClick={() => infrontCount > 0 && setInfrontCount(infrontCount - 1)} className={`${infrontCount <= 0 ? 'disabled' : ''} bv4zwx4 atm_ax_idpfg4 atm_bb_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_r3_1h6ojuz atm_rd_glywfm atm_3f_97hwo atm_bx_1kw7nm4 atm_tl_1gw4zv3 atm_vy_1vi7ecw atm_e2_1vi7ecw atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1h6ojuz atm_7l_1he744i atm_4b_1en9qhd atm_26_1qwqy05 atm_5j_1ssbidh atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_7l_jt7fhx_1vpy06o_uv4tnr atm_4b_1qnzqti_1vpy06o_uv4tnr atm_26_1qwqy05_1vpy06o_uv4tnr atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_7l_jt7fhx_1w3cfyq atm_4b_1qnzqti_1w3cfyq atm_26_1qwqy05_1w3cfyq atm_70_1txm9bj_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_7l_jt7fhx_pfnrn2_1oszvuo atm_4b_1qnzqti_pfnrn2_1oszvuo atm_26_1qwqy05_pfnrn2_1oszvuo atm_70_1txm9bj_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_7l_1vvgs7l_1o5j5ji atm_4b_1vvgs7l_1o5j5ji atm_26_1qwqy05_1o5j5ji dir dir-ltr`} type="button" disabled="" tabIndex="-1" aria-label="decrease value" aria-describedby="searchFlow-title-label-adults" data-testid="stepper-adults-decrease-button">
                                                                                            <span className="i98ho2o atm_e2_qslrf5 atm_vy_qslrf5 atm_l8_14y27yu dir dir-ltr">
                                                                                                <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}><path d="m.75 6.75h10.5v-1.5h-10.5z"></path></svg>
                                                                                            </span>
                                                                                        </button>

                                                                                        <div className="vqatjzs atm_mk_h2mmj6 atm_7l_1kw7nm4 atm_bx_1kw7nm4 atm_c8_1kw7nm4 atm_g3_1kw7nm4 dir dir-ltr">
                                                                                            <span aria-hidden="true" data-testid="stepper-adults-value">
                                                                                                {infrontCount}
                                                                                            </span>
                                                                                            <span className="vlastcb atm_fq_idpfg4 atm_3f_idpfg4 atm_7h_hxbz6r atm_7i_ysn8ba atm_e2_t94yts atm_ks_zryt35 atm_l8_idpfg4 atm_mk_stnw88 atm_vv_1q9ccgz atm_vy_t94yts dir dir-ltr">
                                                                                                {infrontCount} Adults
                                                                                            </span>
                                                                                        </div>

                                                                                        <button onClick={() => setInfrontCount(infrontCount + 1)} className={`${infrontCount >= placeDetail?.infant_max ? 'disabled' : ''} bv4zwx4 atm_ax_idpfg4 atm_bb_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_r3_1h6ojuz atm_rd_glywfm atm_3f_97hwo atm_bx_1kw7nm4 atm_tl_1gw4zv3 atm_vy_1vi7ecw atm_e2_1vi7ecw atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1h6ojuz atm_7l_1he744i atm_4b_1en9qhd atm_26_1qwqy05 atm_5j_1ssbidh atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_7l_jt7fhx_1vpy06o_uv4tnr atm_4b_1qnzqti_1vpy06o_uv4tnr atm_26_1qwqy05_1vpy06o_uv4tnr atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_7l_jt7fhx_1w3cfyq atm_4b_1qnzqti_1w3cfyq atm_26_1qwqy05_1w3cfyq atm_70_1txm9bj_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_7l_jt7fhx_pfnrn2_1oszvuo atm_4b_1qnzqti_pfnrn2_1oszvuo atm_26_1qwqy05_pfnrn2_1oszvuo atm_70_1txm9bj_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_7l_1vvgs7l_1o5j5ji atm_4b_1vvgs7l_1o5j5ji atm_26_1qwqy05_1o5j5ji dir dir-ltr`} type="button" aria-label="increase value" aria-describedby="searchFlow-title-label-adults" data-testid="stepper-adults-increase-button">
                                                                                            <span className="i98ho2o atm_e2_qslrf5 atm_vy_qslrf5 atm_l8_14y27yu dir dir-ltr">
                                                                                                <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}><path d="m6.75.75v4.5h4.5v1.5h-4.5v4.5h-1.5v-4.5h-4.5v-1.5h4.5v-4.5z"></path></svg>
                                                                                            </span>
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                                {/* : null} */}

                                                                                {/* {placeDetail?.pets_max && placeDetail?.pets_min != null ? */}
                                                                                <div className="cnhxj7b atm_7l_dezgoh atm_9s_1txwivl atm_h_1h6ojuz atm_fc_1yb4nlp atm_be_1g80g66 atm_cx_19bvopo atm_lb_1drp7u0 atm_ll_2p0wge atm_40_1f9jazd_1i0dyc0 atm_jb_p2n4d6__oggzyc atm_lb_1crvktv__oggzyc dir dir-ltr">
                                                                                    <section>
                                                                                        <div className="tjx911r atm_7l_dezgoh atm_cs_10d11i2 atm_9s_1aaaxdl atm_lc_idpfg4 t1676ied atm_c8_2x1prs atm_g3_1jbyh58 atm_fr_11a07z3 dir dir-ltr">
                                                                                            <h1 id="searchFlow-title-label-pets" tabIndex="-1" className="hpipapi atm_7l_1kw7nm4 atm_c8_1x4eueo atm_cs_1kw7nm4 atm_g3_1kw7nm4 atm_gi_idpfg4 atm_l8_idpfg4 atm_kd_idpfg4_pfnrn2 dir dir-ltr" elementtiming="LCP-target">
                                                                                                Pets
                                                                                            </h1>
                                                                                        </div>
                                                                                        <div className="s12mgzio atm_cs_6adqpa atm_ld_evh4rp atm_7l_1admnp8 sxeujms atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_ld_evh4rp__oggzyc dir dir-ltr">
                                                                                            <Link href='#!' type="button" className="_11su815w l1ovpqvx atm_1he2i46_1k8pnbi_10saat9 atm_yxpdqi_1pv6nv4_10saat9 atm_1a0hdzc_w1h1e8_10saat9 atm_2bu6ew_929bqk_10saat9 atm_12oyo1u_73u7pn_10saat9 atm_fiaz40_1etamxe_10saat9 dir dir-ltr">
                                                                                                Bringing a service animal?
                                                                                            </Link>
                                                                                        </div>
                                                                                    </section>
                                                                                    <div className="caex243 atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1yb4nlp atm_vy_e2f67q atm_e2_1vi7ecw atm_7l_jt7fhx atm_cs_6adqpa atm_c8_2x1prs atm_g3_1jbyh58 atm_fr_11a07z3 atm_bx_48h72j dir dir-ltr">
                                                                                        <button onClick={() => petsCount > 0 && setPetsCount(petsCount - 1)} className={`${petsCount <= 0 ? 'disabled' : ''} bv4zwx4 atm_ax_idpfg4 atm_bb_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_r3_1h6ojuz atm_rd_glywfm atm_3f_97hwo atm_bx_1kw7nm4 atm_tl_1gw4zv3 atm_vy_1vi7ecw atm_e2_1vi7ecw atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1h6ojuz atm_7l_1he744i atm_4b_1en9qhd atm_26_1qwqy05 atm_5j_1ssbidh atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_7l_jt7fhx_1vpy06o_uv4tnr atm_4b_1qnzqti_1vpy06o_uv4tnr atm_26_1qwqy05_1vpy06o_uv4tnr atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_7l_jt7fhx_1w3cfyq atm_4b_1qnzqti_1w3cfyq atm_26_1qwqy05_1w3cfyq atm_70_1txm9bj_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_7l_jt7fhx_pfnrn2_1oszvuo atm_4b_1qnzqti_pfnrn2_1oszvuo atm_26_1qwqy05_pfnrn2_1oszvuo atm_70_1txm9bj_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_7l_1vvgs7l_1o5j5ji atm_4b_1vvgs7l_1o5j5ji atm_26_1qwqy05_1o5j5ji dir dir-ltr`} type="button" disabled="" tabIndex="-1" aria-label="decrease value" aria-describedby="searchFlow-title-label-adults" data-testid="stepper-adults-decrease-button">
                                                                                            <span className="i98ho2o atm_e2_qslrf5 atm_vy_qslrf5 atm_l8_14y27yu dir dir-ltr">
                                                                                                <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}><path d="m.75 6.75h10.5v-1.5h-10.5z"></path></svg>
                                                                                            </span>
                                                                                        </button>
                                                                                        <div className="vqatjzs atm_mk_h2mmj6 atm_7l_1kw7nm4 atm_bx_1kw7nm4 atm_c8_1kw7nm4 atm_g3_1kw7nm4 dir dir-ltr">
                                                                                            <span aria-hidden="true" data-testid="stepper-adults-value">
                                                                                                {petsCount}
                                                                                            </span>
                                                                                            <span className="vlastcb atm_fq_idpfg4 atm_3f_idpfg4 atm_7h_hxbz6r atm_7i_ysn8ba atm_e2_t94yts atm_ks_zryt35 atm_l8_idpfg4 atm_mk_stnw88 atm_vv_1q9ccgz atm_vy_t94yts dir dir-ltr">
                                                                                                {petsCount} Adults
                                                                                            </span>
                                                                                        </div>
                                                                                        <button onClick={() => setPetsCount(petsCount + 1)} className={`${petsCount >= placeDetail?.pets_max ? 'disabled' : ''} bv4zwx4 atm_ax_idpfg4 atm_bb_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_r3_1h6ojuz atm_rd_glywfm atm_3f_97hwo atm_bx_1kw7nm4 atm_tl_1gw4zv3 atm_vy_1vi7ecw atm_e2_1vi7ecw atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1h6ojuz atm_7l_1he744i atm_4b_1en9qhd atm_26_1qwqy05 atm_5j_1ssbidh atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_7l_jt7fhx_1vpy06o_uv4tnr atm_4b_1qnzqti_1vpy06o_uv4tnr atm_26_1qwqy05_1vpy06o_uv4tnr atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_7l_jt7fhx_1w3cfyq atm_4b_1qnzqti_1w3cfyq atm_26_1qwqy05_1w3cfyq atm_70_1txm9bj_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_7l_jt7fhx_pfnrn2_1oszvuo atm_4b_1qnzqti_pfnrn2_1oszvuo atm_26_1qwqy05_pfnrn2_1oszvuo atm_70_1txm9bj_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_7l_1vvgs7l_1o5j5ji atm_4b_1vvgs7l_1o5j5ji atm_26_1qwqy05_1o5j5ji dir dir-ltr`} type="button" aria-label="increase value" aria-describedby="searchFlow-title-label-adults" data-testid="stepper-adults-increase-button">
                                                                                            <span className="i98ho2o atm_e2_qslrf5 atm_vy_qslrf5 atm_l8_14y27yu dir dir-ltr">
                                                                                                <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}><path d="m6.75.75v4.5h4.5v1.5h-4.5v4.5h-1.5v-4.5h-4.5v-1.5h4.5v-4.5z"></path></svg>
                                                                                            </span>
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                                {/* : null} */}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="propertyBookActionSection">
                                                <div className="rl9oqx-0 bPqYRi">
                                                    <button type="submit" disabled={showReserverButton} className="sc-1i8u282-0 sc-gzVnrw evBpSJ" _css="border-radius:,0.375rem,;background-color:,function(e){return e.theme.colors.heartRed},;font-family:,function(e){return e.theme.colors.primary},;text-transform:uppercase;letter-spacing:,0.0875rem,;line-height:,0.8125rem,;min-height:,3.5rem,;font-weight:,function(e){return e.theme.fonts.semiBoldWeight},;width:100%;font-size:,0.875rem,;border-color:,function(e){return e.theme.colors.heartRed},;,function(e){return e.disabled&amp;&amp;&quot;\n    background-color: &quot;.concat(e.theme.colors.alto,&quot;;\n    border-color: &quot;).concat(e.theme.colors.alto,&quot;;\n    pointer-events: none;\n    color: &quot;).concat(e.theme.colors.primaryText,&quot;;\n  &quot;)},:hover{background-color:,function(e){return e.theme.colors.burntUmber},;border-color:,function(e){return e.theme.colors.burntUmber},;}">
                                                        <span className="sc-1c7wpmw-0 joHSzY">Reserve Now</span>
                                                    </button>
                                                    {!showReserverButton && (
                                                        <Link href={`/apply/${placeDetail?.id}`} style={{ display: 'block', marginTop: '12px', textAlign: 'center', padding: '14px', borderRadius: '6px', border: '2px solid #D80621', color: '#D80621', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.0875rem', fontSize: '0.875rem', textDecoration: 'none', transition: 'all 0.2s' }}>
                                                            Apply to Rent
                                                        </Link>
                                                    )}

                                                    {/* <button type="submit" className="sc-1i8u282-0 sc-gzVnrw evBpSJ" _css="border-radius:,0.375rem,;background-color:,function(e){return e.theme.colors.heartRed},;font-family:,function(e){return e.theme.colors.primary},;text-transform:uppercase;letter-spacing:,0.0875rem,;line-height:,0.8125rem,;min-height:,3.5rem,;font-weight:,function(e){return e.theme.fonts.semiBoldWeight},;width:100%;font-size:,0.875rem,;border-color:,function(e){return e.theme.colors.heartRed},;,function(e){return e.disabled&amp;&amp;&quot;\n    background-color: &quot;.concat(e.theme.colors.alto,&quot;;\n    border-color: &quot;).concat(e.theme.colors.alto,&quot;;\n    pointer-events: none;\n    color: &quot;).concat(e.theme.colors.primaryText,&quot;;\n  &quot;)},:hover{background-color:,function(e){return e.theme.colors.burntUmber},;border-color:,function(e){return e.theme.colors.burntUmber},;}">
                                                        <Link href='#'>
                                                            <span className="sc-1c7wpmw-0 joHSzY">Reserve Now</span>
                                                        </Link>
                                                    </button> */}
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                {/* <div className="sc-1hh5wos-3 hLYWfh">
                                    <h2 className="sc-1i8u282-0 bNSQXg custom-h2"><small>⭐</small> 4.93  •  28 Review</h2>

                                    <div className='rev_row'>
                                        <div className='rev_ctc'>
                                            <h4>Over all ratings</h4>
                                            <div className="chart">
                                                <div className="rate-box">
                                                    <span className="value">5</span>
                                                    <div className="progress-bar">
                                                        <span className="progress" style={{ width: '90%' }}></span>
                                                    </div>
                                                </div>
                                                <div className="rate-box">
                                                    <span className="value">4</span>
                                                    <div className="progress-bar"><span className="progress" style={{ width: '20%' }}></span></div>
                                                </div>
                                                <div className="rate-box">
                                                    <span className="value">3</span>
                                                    <div className="progress-bar"><span className="progress"></span></div>
                                                </div>
                                                <div className="rate-box">
                                                    <span className="value">2</span>
                                                    <div className="progress-bar"><span className="progress"></span></div>
                                                </div>
                                                <div className="rate-box">
                                                    <span className="value">1</span>
                                                    <div className="progress-bar"><span className="progress"></span></div>
                                                </div>
                                            </div>
                                        </div>

                                        <span className='vr'></span>

                                        <div className='rev_ctc'>
                                            <h4>Cleanliness</h4>
                                            <span>4.9</span>
                                            <img src="/images/spray.png" alt="" />
                                        </div>

                                        <span className='vr'></span>

                                        <div className='rev_ctc'>
                                            <h4>Accuracy</h4>
                                            <span>4.9</span>
                                            <img src="/images/check-mark.png" alt="" />
                                        </div>

                                        <span className='vr'></span>

                                        <div className='rev_ctc'>
                                            <h4>Check-in</h4>
                                            <span>4.8</span>
                                            <img src="/images/key.png" alt="" />
                                        </div>

                                        <span className='vr'></span>

                                        <div className='rev_ctc'>
                                            <h4>Communication</h4>
                                            <span>4.9</span>
                                            <img src="/images/chat.png" alt="" />
                                        </div>

                                        <span className='vr'></span>

                                        <div className='rev_ctc'>
                                            <h4>Location</h4>
                                            <span>4.7</span>
                                            <img src="/images/map_loc.png" alt="" />
                                        </div>

                                        <span className='vr'></span>

                                        <div className='rev_ctc'>
                                            <h4>Value</h4>
                                            <span>4.6</span>
                                            <img src="/images/tag.png" alt="" />
                                        </div>
                                    </div>
                                </div> */}

                            </div>
                        </section>
                    </>
                )
                : <h1>No Record found</h1>}

            {(showChatModal && isLoggedIn) && (
                <div className="chat-popup-overlay" onClick={() => setShowChatModal(false)}>
                    <div className="chat-popup" onClick={e => e.stopPropagation()}>
                        <button className="chat-close-btn" onClick={() => setShowChatModal(false)}>×</button>
                        <ChatPopup setShowChatModal={setShowChatModal} placeDetail={placeDetail} />
                    </div>
                </div>
            )}

            <div className='custom_container detail_rating'>
                <Rating />
            </div>
            <div className="container" style={{ marginBottom: '32px' }}>
                <h2 className="sc-1i8u282-0 bNSQXg custom-h2">
                    Reviews {reviewStats?.total_reviews > 0 && <span style={{ fontSize: '16px', fontWeight: 400, color: '#666' }}>({reviewStats.total_reviews})</span>}
                </h2>

                {reviewStats?.total_reviews > 0 && (
                    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '24px', padding: '16px', background: '#fafafa', borderRadius: '12px' }}>
                        {[
                            { label: 'Overall', val: reviewStats?.avg_rating },
                            { label: 'Cleanliness', val: reviewStats?.avg_cleanliness },
                            { label: 'Communication', val: reviewStats?.avg_communication },
                            { label: 'Value', val: reviewStats?.avg_value },
                            { label: 'Location', val: reviewStats?.avg_location },
                        ].filter(s => s.val).map(s => (
                            <div key={s.label} style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '20px', fontWeight: 700, color: '#D80621' }}>{s.val}</div>
                                <div style={{ fontSize: '12px', color: '#666' }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                )}

                {propertyReviews.length > 0 ? (
                    <div className="row g-4">
                        {propertyReviews.map(review => (
                            <div key={review.id} className="col-md-6">
                                <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '12px', padding: '20px', height: '100%' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{
                                                width: '36px', height: '36px', borderRadius: '50%',
                                                background: 'linear-gradient(135deg, #D80621, #6e0311)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                color: '#fff', fontWeight: 700, fontSize: '14px',
                                            }}>
                                                {(review.reviewer?.first_name?.[0] || 'U').toUpperCase()}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 600, fontSize: '14px' }}>{review.reviewer?.first_name} {review.reviewer?.last_name?.[0]}.</div>
                                                <div style={{ fontSize: '12px', color: '#999' }}>{new Date(review.created_at).toLocaleDateString('en-CA', { year: 'numeric', month: 'short' })}</div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '2px' }}>
                                            {[1,2,3,4,5].map(s => (
                                                <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={s <= review.rating ? '#D80621' : 'none'} stroke={s <= review.rating ? '#D80621' : '#ccc'} strokeWidth="2">
                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                    {review.comment && <p style={{ fontSize: '14px', color: '#333', lineHeight: 1.6, margin: 0 }}>{review.comment}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p style={{ color: '#999', fontSize: '14px' }}>No reviews yet for this property.</p>
                )}
            </div>

            {/* <div className='custom_container detail_location'>
                <h2>Where you’ll be</h2>
                <p>Toronto, Ontario, Canada</p>
            </div> */}

            <>
                <div className="custom_container host-section-wrapper">
                    {/* ── LEFT: Host Card (sticky) ── */}
                    <div className="host-card">
                        {/* Top: Avatar + Name */}
                        <div className="host-card-top">
                            <div className="host-avatar-wrap">
                                <img
                                    src="https://i.pravatar.cc/150?img=47"
                                    alt="Riya James"
                                />
                                <div className="host-verified">
                                    <svg viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </div>
                            </div>
                            <div>
                                <p className="host-name">Riya James</p>
                                <p className="host-label">Host</p>
                            </div>
                        </div>

                        <div className="card-divider" />

                        {/* Stats */}
                        <div className="host-stats">
                            <div className="host-stat">
                                <span className="host-stat-value">343</span>
                                <span className="host-stat-label">Reviews</span>
                            </div>
                            <div className="host-stat">
                                <span className="host-stat-value">4.19</span>
                                <span className="host-stat-label">Rating</span>
                            </div>
                            <div className="host-stat">
                                <span className="host-stat-value">6 Mos</span>
                                <span className="host-stat-label">Hosting</span>
                            </div>
                        </div>

                        <div className="card-divider" />

                        {/* Host Details */}
                        <div className="host-details">
                            <p className="host-details-title">Host details</p>

                            <div className="host-detail-row">
                                <div className='host-detail-row-dot'></div>
                                <span>Response rate: 100%</span>
                            </div>

                            <div className="host-detail-row">
                                <div className='host-detail-row-dot'></div>
                                <span>Responds within an hour</span>
                            </div>
                        </div>

                        <div className="card-divider" />

                        {/* Button */}
                        <div className="host-card-footer">
                            <button className="btn-message">Message Host</button>
                        </div>
                    </div>

                    {/* ── RIGHT: Things to Know Card ── */}
                    <div className="things-card">

                        <div className="things-header">
                            <h2>Things to know</h2>
                        </div>


                        <div className="right-card-divider" />

                        <div className="things-body">

                            {/* Cancellation policy */}
                            <div className="things-col">
                                <div className="things-icon">
                                    <img src="/images/chat/cancellation-policy.svg" alt="" />
                                </div>
                                <p className="things-col-title">Cancellation policy</p>
                                <p className="things-col-body">
                                    This reservation is non-refundable.<br />
                                    Review this host&apos;s full policy for details.
                                </p>
                                <button className="learn-more">Learn More</button>
                            </div>

                            {/* House rules */}
                            <div className="things-col">
                                <div className="things-icon">
                                    <img src="/images/chat/house-rules.svg" alt="" />
                                </div>
                                <p className="things-col-title">House rules</p>
                                <p className="things-col-body">
                                    Check-in after 3:00 PM<br />
                                    Checkout before 11:00 AM<br />
                                    4 guests maximum
                                </p>
                                <button className="learn-more">Learn More</button>
                            </div>

                            {/* Safety & property */}
                            <div className="things-col">
                                <div className="things-icon">
                                    <img src="/images/chat/safety-property.svg" alt="" />
                                </div>
                                <p className="things-col-title">Safety &amp; property</p>
                                <p className="things-col-body">
                                    Exterior security cameras on property<br />
                                    Carbon monoxide detector not required<br />
                                    Smoke alarm
                                </p>
                                <button className="learn-more">Learn More</button>
                            </div>

                        </div>
                    </div>

                </div>
            </>

        </>
    )
});

PropertyDetail.displayName = 'PropertyDetail';

export default PropertyDetail;
