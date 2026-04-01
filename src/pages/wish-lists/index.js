import { CreateApiContext } from '@/ContextApi/CreateApiContext';
import { authFetch, imageBaseUrl } from '@/Helper/helper';
import Link from 'next/link';
import React, { useContext, useEffect } from 'react'
import toast from 'react-hot-toast';
import Slider from 'react-slick';

const WishList = () => {
    const { fetchWishLists, wishLists, loader } = useContext(CreateApiContext);
    const settings = {
        dots: true,
        arrows: true,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: false,
    };

    useEffect(() => {
        if (wishLists) fetchWishLists();
    }, []);


    const handleWishListDelete = (e, id) => {
        e.preventDefault();
        deleteWishList(id);
        var btn = e.target;
        var cardBody = btn.parentElement
        var card = cardBody.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        card.parentElement.removeChild(card);
    }

    const deleteWishList = async (id) => {
        const formData = new FormData();
        formData.append('id', id);
        const response = await authFetch(`/property/wish-list-delete`, {
            method: 'POST',
            body: formData,
        });
        if (response.status == 200) {
            toast.success('Your wish lists deleted successfully!');
        }
    }
    return (
        <>
            <section className='main_area_content dest_sec'>
                <div className='content_area'>
                    <section className='section-two'>
                        <div className="cd56ld atm_1l7p0i1_lepw20 atm_1298uvg_idpfg4 atm_mk_h2mmj6 atm_fb_1cl4t0h atm_1ngntrb_1y44olf atm_lcucu6_1tcgj5g atm_lcucu6_1ylpe5n__oggzyc atm_1efm4uq_1fwxnve__oggzyc atm_1efm4uq_grho7r_hpb1k1_oggzyc atm_lcucu6_1ylpe5n__qky54b atm_lcucu6_u29brm__jx8car cb80sj1 atm_kt_glywfm dir dir-ltr">
                            <div className="f12t1m0s atm_j3_1371zjx atm_gw_1wugsn5 atm_lj_ke7zzc atm_li_ke7zzc atm_8w_wetwqu atm_vy_1osqo2v atm_gp_1ixj6vq f10v78d0 atm_go_dnsvzo dir dir-ltr">
                                <div className="gsgwcjk atm_1d13e1y_p5ox87 atm_yrukzc_1od0ugv atm_10yczz8_kb7nvz atm_10yczz8_cs5v99__1ldigyt atm_10yczz8_11wpgbn__1v156lz atm_10yczz8_egatvm__qky54b atm_10yczz8_qfx8er__1xolj55 atm_10yczz8_ouytup__w5e62l g14v8520 atm_9s_11p5wf0 atm_d5_j5tqy atm_d7_1ymvx20 atm_dl_1mvrszh atm_dz_hxz02 dir dir-ltr">
                                    {loader && loader ? (
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
                                    ) : (wishLists?.length > 0 ? wishLists?.map((wishlist, index) => (
                                        <>
                                            <div key={index} className="card_div lxq01kf atm_9s_1txwivl atm_am_kyuy1d atm_ar_d67k9l l1tup9az atm_1p4glcj_1bp4okc dir dir-ltr">
                                                <div className="c14dgvke atm_5j_kdyw2j atm_ks_15vqwwr  atm_mk_h2mmj6 ">
                                                    <div className="cnjlbcx atm_1qvjjpw_glywfm atm_1hykvs1_n7od8j atm_ej6m29_kb7nvz  atm_9s_11p5wf0 atm_dx_1orwtfw ">
                                                        <div className="c18vjgz6 atm_d2_12hkhw9 atm_gp_i0jujp atm_go_165lr55 atm_gy_unm2jc atm_gx_fm7pfe atm_mh_1slnvwa atm_mj_1bomifl atm_wq_1f25d1o dir dir-ltr">
                                                            <div className="o1hrhshc atm_26_1blqqxs o1q97y5m atm_9s_1txwivl atm_am_kb7nvz atm_au_1bp4okc atm_tk_idpfg4 atm_fq_idpfg4 atm_n3_idpfg4 atm_6i_idpfg4 atm_ks_15vqwwr atm_l8_9yxej atm_mj_glywfm atm_mk_stnw88 atm_am_mu6cqg_13ayz6n dir dir-ltr">
                                                                <div className="tsz9f4o atm_9s_11p5wf0 atm_dd_8tjzot atm_dz_fbbpjf dir dir-ltr">
                                                                    <div className="t1p13dzz atm_fg_1y6m0gg dir dir-ltr"></div>
                                                                    <div className="ts9x1g6 atm_9s_1txwivl atm_fg_esu3gu atm_gz_19bvopo_1q27gxn dir dir-ltr">
                                                                        <button type="button" onClick={(e) => handleWishListDelete(e, wishlist?.id)} className="l1ovpqvx atm_1he2i46_1k8pnbi_10saat9 atm_yxpdqi_1pv6nv4_10saat9 atm_1a0hdzc_w1h1e8_10saat9 atm_2bu6ew_929bqk_10saat9 atm_12oyo1u_73u7pn_10saat9 atm_fiaz40_1etamxe_10saat9 cz6qhuf atm_1s_glywfm atm_5j_1ssbidh atm_9j_tlke0l atm_tl_1gw4zv3 atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1h6ojuz atm_l8_idpfg4 atm_gi_idpfg4 atm_7l_jt7fhx atm_kd_glywfm atm_vy_1vi7ecw atm_e2_1vi7ecw atm_kd_glywfm_1w3cfyq atm_3f_glywfm_e4a3ld atm_l8_idpfg4_e4a3ld atm_gi_idpfg4_e4a3ld atm_3f_glywfm_1r4qscq atm_kd_glywfm_6y7yyg atm_kd_glywfm_pfnrn2_1oszvuo atm_l8_idpfg4_1icshfk_1oszvuo atm_gi_idpfg4_1icshfk_1oszvuo atm_3f_glywfm_b5gff8_1oszvuo atm_kd_glywfm_2by9w9_1oszvuo atm_k4_1piyxwk_1o5j5ji atm_9j_13gfvf7_1o5j5ji atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_4b_1qnzqti_1w3cfyq atm_26_1qwqy05_1w3cfyq atm_7l_jt7fhx_1w3cfyq atm_70_5ilard_1w3cfyq atm_tr_m1zi52_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_4b_1qnzqti_pfnrn2_1oszvuo atm_26_1qwqy05_pfnrn2_1oszvuo atm_7l_jt7fhx_pfnrn2_1oszvuo atm_70_5ilard_pfnrn2_1oszvuo atm_tr_m1zi52_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_4b_muzi1o_1nos8r_uv4tnr atm_2d_1qwqy05_1nos8r_uv4tnr atm_7l_177r58q_1nos8r_uv4tnr atm_70_12rfm42_1nos8r_uv4tnr atm_tr_m1zi52_1nos8r_uv4tnr atm_4b_1k0ymf0_4fughm_uv4tnr atm_2d_1qwqy05_4fughm_uv4tnr atm_7l_9vytuy_4fughm_uv4tnr atm_70_glywfm_4fughm_uv4tnr atm_tr_1h7a3po_4fughm_uv4tnr atm_4b_muzi1o_csw3t1 atm_7l_177r58q_csw3t1 atm_70_glywfm_csw3t1 atm_4b_1k0ymf0_1o5j5ji atm_2d_1qwqy05_1o5j5ji atm_7l_9vytuy_1o5j5ji atm_70_glywfm_1o5j5ji atm_tr_1h7a3po_1o5j5ji cqj1vnx atm_mj_1wugsn5 atm_3f_glywfm atm_mk_h2mmj6 atm_26_hnb3id atm_70_1si461l atm_20_112yz0h atm_uc_1mnuevs atm_mk_stnw88_vmtskl atm_tk_grho7r_vmtskl atm_fq_idpfg4_vmtskl atm_n3_idpfg4_vmtskl atm_6i_idpfg4_vmtskl atm_5j_1ssbidh_vmtskl atm_3f_1uw5ze2_vmtskl atm_26_119y5nj_vmtskl atm_hr_7lhu8g_vmtskl atm_i8_1p67fjf_vmtskl atm_92_1yyfdc7_vmtskl atm_tr_idn7q2_csw3t1 atm_2d_1vvqmr9_csw3t1 dir dir-ltr">
                                                                            <span className="isqgmsg dir dir-ltr">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentColor', strokeWidth: '3', overflow: 'visible' }}>
                                                                                    <path d="M2.60738 22.1492C2.92431 22.4662 3.43815 22.4662 3.75507 22.1492L11.3615 14.5428L18.968 22.1492C19.2849 22.4662 19.7988 22.4662 20.1157 22.1492L22.1492 20.1157C22.4662 19.7988 22.4662 19.2849 22.1492 18.968L14.5428 11.3615L22.1492 3.75508C22.4662 3.43815 22.4662 2.92431 22.1492 2.60739L20.1157 0.573845C19.7988 0.256919 19.2849 0.256919 18.968 0.573844L11.3615 8.18031L3.75507 0.573845C3.43815 0.256919 2.92431 0.256919 2.60739 0.573845L0.573845 2.60739C0.256919 2.92431 0.256919 3.43815 0.573844 3.75508L8.18031 11.3615L0.573845 18.968C0.256919 19.2849 0.256919 19.7988 0.573844 20.1157L2.60738 22.1492Z" fill="black" />
                                                                                </svg>
                                                                                <div className="o1xt2xft atm_e2_fyhuej atm_mk_stnw88 atm_n3_zqz0qm atm_tk_zqz0qm atm_vy_fyhuej atm_wq_1mrwo0b atm_9s_glywfm__dl5xaa dir dir-ltr"></div>
                                                                            </span>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="atm_1w_12kg1i__4c1lm5">
                                                            <Slider {...settings}>
                                                                {wishlist?.property?.property_images?.map((property_image, index) => (
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
                                                <Link href={`/property-detail/${wishlist?.property?.slug}`} className="place_card_title">
                                                    <h2>{wishlist?.property?.name}</h2>
                                                    <p>Hosted by {wishlist?.property?.user?.first_name}</p>
                                                    <span>$ {wishlist?.property?.set_your_price} per guest</span>
                                                </Link>
                                            </div >
                                        </>
                                    )) : <h1>No Record found</h1>)
                                    }
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </>
    )
}

export default WishList
