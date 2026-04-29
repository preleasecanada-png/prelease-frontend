import React, { memo, useCallback, useState } from 'react';
import Slider from 'react-slick';
import Link from 'next/link';
import { authFetch, imageBaseUrl } from '../Helper/helper';
import toast from 'react-hot-toast';

const PlaceCard = memo((props) => {
    const settings = {
        dots: true,
        arrows: true,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: false,
    };


    const handleWishList = useCallback((e, property_id) => {
        e.preventDefault();
        let user_id = window.localStorage.getItem('user_id');
        createWishList(user_id, property_id);
    }, []);

    const createWishList = async (user_id, property_id) => {
        const formData = new FormData();
        formData.append('property_id', property_id);
        formData.append('user_id', user_id);
        try {
            const response = await authFetch(`/property/wish-list-create`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData,
            });
            if (response.status == 200) {
                toast.success(response.message);
            } else {
                toast.error(response.message || 'Something went wrong');
            }
        } catch (error) {
            toast.error('Server error. Please try again later.');
            console.error('Wishlist error:', error);
        }
    };

    return (
        <>
            {props?.loader ? (
                <>
                    <div className="place_skeleton-card">
                        <div className="place-card-img skeleton">
                        </div>
                        <p className="place-card-intro skeleton">
                        </p>
                    </div>
                    <div className="place_skeleton-card">
                        <div className="place-card-img skeleton">
                        </div>
                        <p className="place-card-intro skeleton">
                        </p>
                    </div>
                    <div className="place_skeleton-card">
                        <div className="place-card-img skeleton">
                        </div>
                        <p className="place-card-intro skeleton">
                        </p>
                    </div>
                    <div className="place_skeleton-card">
                        <div className="place-card-img skeleton">
                        </div>
                        <p className="place-card-intro skeleton">
                        </p>
                    </div>
                    <div className="place_skeleton-card">
                        <div className="place-card-img skeleton">
                        </div>
                        <p className="place-card-intro skeleton">
                        </p>
                    </div>
                    <div className="place_skeleton-card">
                        <div className="place-card-img skeleton">
                        </div>
                        <p className="place-card-intro skeleton">
                        </p>
                    </div>
                </>
            ) : ((props?.properties || props?.places)?.length > 0 ? (props?.properties || props?.places)?.map((place, index) => (
                <div key={place?.id || index} className="card_div lxq01kf atm_9s_1txwivl atm_am_kyuy1d atm_ar_d67k9l l1tup9az atm_1p4glcj_1bp4okc dir dir-ltr">
                        <div className="c14dgvke atm_5j_kdyw2j atm_ks_15vqwwr  atm_mk_h2mmj6 ">
                            <div className="cnjlbcx atm_1qvjjpw_glywfm atm_1hykvs1_n7od8j atm_ej6m29_kb7nvz  atm_9s_11p5wf0 atm_dx_1orwtfw ">
                                <div className="c18vjgz6 atm_d2_12hkhw9 atm_gp_i0jujp atm_go_165lr55 atm_gy_unm2jc atm_gx_fm7pfe atm_mh_1slnvwa atm_mj_1bomifl atm_wq_1f25d1o dir dir-ltr">
                                    <div className="o1hrhshc atm_26_1blqqxs o1q97y5m atm_9s_1txwivl atm_am_kb7nvz atm_au_1bp4okc atm_tk_idpfg4 atm_fq_idpfg4 atm_n3_idpfg4 atm_6i_idpfg4 atm_ks_15vqwwr atm_l8_9yxej atm_mj_glywfm atm_mk_stnw88 atm_am_mu6cqg_13ayz6n dir dir-ltr">
                                        <div className="tsz9f4o atm_9s_11p5wf0 atm_dd_8tjzot atm_dz_fbbpjf dir dir-ltr">
                                            <div className="t1p13dzz atm_fg_1y6m0gg dir dir-ltr"></div>
                                            <div className="ts9x1g6 atm_9s_1txwivl atm_fg_esu3gu atm_gz_19bvopo_1q27gxn dir dir-ltr">
                                                <button type="button" onClick={(e) => handleWishList(e, place?.id)} className="l1ovpqvx atm_1he2i46_1k8pnbi_10saat9 atm_yxpdqi_1pv6nv4_10saat9 atm_1a0hdzc_w1h1e8_10saat9 atm_2bu6ew_929bqk_10saat9 atm_12oyo1u_73u7pn_10saat9 atm_fiaz40_1etamxe_10saat9 cz6qhuf atm_1s_glywfm atm_5j_1ssbidh atm_9j_tlke0l atm_tl_1gw4zv3 atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1h6ojuz atm_l8_idpfg4 atm_gi_idpfg4 atm_7l_jt7fhx atm_kd_glywfm atm_vy_1vi7ecw atm_e2_1vi7ecw atm_kd_glywfm_1w3cfyq atm_3f_glywfm_e4a3ld atm_l8_idpfg4_e4a3ld atm_gi_idpfg4_e4a3ld atm_3f_glywfm_1r4qscq atm_kd_glywfm_6y7yyg atm_kd_glywfm_pfnrn2_1oszvuo atm_l8_idpfg4_1icshfk_1oszvuo atm_gi_idpfg4_1icshfk_1oszvuo atm_3f_glywfm_b5gff8_1oszvuo atm_kd_glywfm_2by9w9_1oszvuo atm_k4_1piyxwk_1o5j5ji atm_9j_13gfvf7_1o5j5ji atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_4b_1qnzqti_1w3cfyq atm_26_1qwqy05_1w3cfyq atm_7l_jt7fhx_1w3cfyq atm_70_5ilard_1w3cfyq atm_tr_m1zi52_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_4b_1qnzqti_pfnrn2_1oszvuo atm_26_1qwqy05_pfnrn2_1oszvuo atm_7l_jt7fhx_pfnrn2_1oszvuo atm_70_5ilard_pfnrn2_1oszvuo atm_tr_m1zi52_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_4b_muzi1o_1nos8r_uv4tnr atm_2d_1qwqy05_1nos8r_uv4tnr atm_7l_177r58q_1nos8r_uv4tnr atm_70_12rfm42_1nos8r_uv4tnr atm_tr_m1zi52_1nos8r_uv4tnr atm_4b_1k0ymf0_4fughm_uv4tnr atm_2d_1qwqy05_4fughm_uv4tnr atm_7l_9vytuy_4fughm_uv4tnr atm_70_glywfm_4fughm_uv4tnr atm_tr_1h7a3po_4fughm_uv4tnr atm_4b_muzi1o_csw3t1 atm_7l_177r58q_csw3t1 atm_70_glywfm_csw3t1 atm_4b_1k0ymf0_1o5j5ji atm_2d_1qwqy05_1o5j5ji atm_7l_9vytuy_1o5j5ji atm_70_glywfm_1o5j5ji atm_tr_1h7a3po_1o5j5ji cqj1vnx atm_mj_1wugsn5 atm_3f_glywfm atm_mk_h2mmj6 atm_26_hnb3id atm_70_1si461l atm_20_112yz0h atm_uc_1mnuevs atm_mk_stnw88_vmtskl atm_tk_grho7r_vmtskl atm_fq_idpfg4_vmtskl atm_n3_idpfg4_vmtskl atm_6i_idpfg4_vmtskl atm_5j_1ssbidh_vmtskl atm_3f_1uw5ze2_vmtskl atm_26_119y5nj_vmtskl atm_hr_7lhu8g_vmtskl atm_i8_1p67fjf_vmtskl atm_92_1yyfdc7_vmtskl atm_tr_idn7q2_csw3t1 atm_2d_1vvqmr9_csw3t1 dir dir-ltr">
                                                    <span className="isqgmsg dir dir-ltr">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentColor', strokeWidth: '3', overflow: 'visible' }}> <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" fill="#000" /></svg>
                                                        <div className="o1xt2xft atm_e2_fyhuej atm_mk_stnw88 atm_n3_zqz0qm atm_tk_zqz0qm atm_vy_fyhuej atm_wq_1mrwo0b atm_9s_glywfm__dl5xaa dir dir-ltr"></div>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="atm_1w_12kg1i__4c1lm5">
                                    <Slider {...settings}>
                                        {place?.property_images?.map((property_image, index) => (
                                            <div key={index}>
                                                <div>
                                                    <div>
                                                        <img
                                                            src={imageBaseUrl(property_image?.original)}
                                                            alt={`Slide ${index + 1}`}
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover', aspectRatio: '1/1', borderRadius: '15px' }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                            </div>
                        </div>
                        <Link href={`/property-detail/${place?.slug || 'property'}/${place?.id}`} className="place_card_title">
                            <h2>{place?.title}</h2>
                            <p>Hosted by {place?.user?.first_name}</p>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                                <span>$ {place?.set_your_price} per guest</span>
                                {place?.avg_rating && (
                                    <span className="place-card-rating">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#D80621" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                        {place.avg_rating}
                                        <span style={{ fontWeight: 400, color: '#666', fontSize: '12px' }}>({place.review_count})</span>
                                    </span>
                                )}
                            </div>
                        </Link>
                    </div >
            )) : <h1>No Record found</h1>)
            }
        </>
    );
});

PlaceCard.displayName = 'PlaceCard';

export default PlaceCard;
