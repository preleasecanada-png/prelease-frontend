import Testemonials from '@/component/Testemonials';
import Link from 'next/link';
import React, { useState } from 'react'

const Room = () => {
    const [adultCount, setAdultCount] = useState(0);
    const [childCount, setChildCount] = useState(0);
    const [infrontCount, setInfrontCount] = useState(0);
    const [petsCount, setPetsCount] = useState(0);
  return (
    <>
        <section className="gallery_sec">
            <div className="container">
                <div className='Share_row'>
                    <div className='hosted_head'>
                        Hosted by <strong>Jubilee</strong>
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
                    <div className='prev_gallery'>
                        <img src="/images/gellery-1.webp" alt="" />
                    </div>
                    <div className='prev_gallery'>
                        <img src="/images/gellery-2.webp" alt="" />
                    </div>
                    <div className='prev_gallery'>
                        <img src="/images/gellery-3.webp" alt="" />
                    </div>
                    <div className='prev_gallery'>
                        <img src="/images/gellery-4.webp" alt="" />
                    </div>
                    <div className='prev_gallery'>
                        <div className='Last_count'>+12</div>
                        <img src="/images/gellery-5.webp" alt="" />
                    </div>
                </div>
            </div>
        </section>

        <section className="">
            <div className="container">
                <div className="sc-1swkyy4-0 dgnQJW">
                    <div className="sc-1xlrhy1-4 fiWGsl dzinaz-0 lkZcbQ">
                        <h1 className="blog_title">Samesun Toronto</h1>
                        <div className="Keyword_area">
                            <img src="/images/location.webp" alt="" />
                            <p>1240 Rue Drummond, Montréal, QC H3G 1V7, Canada</p>
                        </div>
                        <div className="Keyword_area">
                            <img src="/images/star.webp" alt="" />
                            <p><b>4.93  •  28 Review</b></p>
                        </div>
                        <div className='fhgjr'>
                            <div className='fhgjr_box'>
                                <img src="/images/bedroom.webp" alt="" />
                                3 Bedrooms
                            </div>
                            <div className='fhgjr_box'>
                                <img src="/images/bathroom.webp" alt="" />
                                2 Bathrooms
                            </div>
                            <div className='fhgjr_box'>
                                <img src="/images/pet.webp" alt="" />
                                0 Pets allowed
                            </div>
                        </div>
                        <div className="sc-1hh5wos-3 hLYWfh mb-5">
                            <h2 className="sc-1i8u282-0 bNSQXg custom-h2">Your Perfect Stay Away from home</h2>
                            <p className="blog_para">
                                {`
                                Located in Montreal's business district, only moments from the Bell Center event venue, Best Western Plus Montreal Downtown features free WiFi. A fitness center is on site.  A cable TV and a work desk are offered in each room at this hotel. A coffee machine is also included.  Guests can enjoy a variety of menu items for breakfast and lunch at the on-site Chez Cora restaurant. Guests can also enjoy the on-site bar.  Hotel Europa -Best Western Plus Montreal Downtown is about 10 minutes' walk from the Montreal Fine Arts Museum. The Noter-Dame Basilica is 2 minutes' drive away.
                                Couples in particular like the location – they rated it 9.1 for a two-person trip.
                                `}
                            </p>
                        </div>
                        <hr />
                        <div className="sc-1hh5wos-3 hLYWfh">
                            <h2 className="sc-1i8u282-0 bNSQXg custom-h2">Offered Amenities</h2>
                            <div className='feature_area'>
                                <div className='feature_box'>
                                    <img src="/images/Kitchen.webp" alt="" />
                                    <span>
                                        Kitchen
                                    </span>
                                </div>
                                <div className='feature_box'>
                                    <img src="/images/Television.webp" alt="" />
                                    <span>
                                        Television with Netflix
                                    </span>
                                </div>
                                <div className='feature_box'>
                                    <img src="/images/conditioner.webp" alt="" />
                                    <span>
                                        Air conditioner
                                    </span>
                                </div>
                                <div className='feature_box'>
                                    <img src="/images/Wi-Fi.webp" alt="" />
                                    <span>
                                        Free Wi-Fi
                                    </span>
                                </div>
                                <div className='feature_box'>
                                    <img src="/images/Washer.webp" alt="" />
                                    <span>
                                        Washer
                                    </span>
                                </div>
                                <div className='feature_box'>
                                    <img src="/images/Kitchen.webp" alt="" />
                                    <span>
                                        Balcony or patio
                                    </span>
                                </div>
                            </div>
                            <h2 className="sc-1i8u282-0 bNSQXg custom-h2 semi_head">Safety and Hygiene</h2>
                            <div className='feature_area'>
                                <div className='feature_box'>
                                    <img src="/images/cleaning.webp" alt="" />
                                    <span>
                                        Daily cleaning
                                    </span>
                                </div>
                                <div className='feature_box'>
                                    <img src="/images/extinguisher.webp" alt="" />
                                    <span>
                                        Fire extinguisher
                                    </span>
                                </div>
                                <div className='feature_box'>
                                    <img src="/images/Disinfections.webp" alt="" />
                                    <span>
                                        Disinfections and sterilization
                                    </span>
                                </div>
                                <div className='feature_box'>
                                    <img src="/images/Smoke.webp" alt="" />
                                    <span>
                                        Smoke detectors
                                    </span>
                                </div>
                            </div>

                            <button className='showAll_feat'>Show All</button>
                        </div>
                    </div>
            
                    <div className="sc-180k3r6-0 ealdZV mt-4">
                        <form className="sc-1ggiumt-2 epCsUQ ">
                            <div className='check_inheade'>
                                <h2>Add dates for prices</h2>
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
                                                        <div className="sc-1b4rtiv-4 iDyayu">Select date</div>
                                                        <div className="sc-1b4rtiv-6 dJubSq">
                                                            <label htmlFor="datepicker">
                                                                <input type="date" id="datepickerS" placeholder="Add Date" autocomplete="off"/>
                                                            </label>	
                                                        </div>
                                                    </span>
                                                </div>

                                                <div className="sc-1b4rtiv-8 jiqpmd seperatorLeft"></div>

                                                <div className="sc-1b4rtiv-1 jHEFMS InputEndDate">
                                                    <span className="sc-1b4rtiv-3 OwsRV labelCheck">
                                                        <div className="sc-1b4rtiv-4 iDyayu">Select date</div>
                                                        <div className="sc-1b4rtiv-6 dJubSq">
                                                            <label htmlFor="datepicker">
                                                                <input type="date" id="datepickerS" placeholder="Add Date" autocomplete="off"/>
                                                            </label>	
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
                                                                    <button onClick={() => setAdultCount(adultCount - 1)} className={`${adultCount <= 0 ? 'disabled' : ''} bv4zwx4 atm_ax_idpfg4 atm_bb_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_r3_1h6ojuz atm_rd_glywfm atm_3f_97hwo atm_bx_1kw7nm4 atm_tl_1gw4zv3 atm_vy_1vi7ecw atm_e2_1vi7ecw atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1h6ojuz atm_7l_1he744i atm_4b_1en9qhd atm_26_1qwqy05 atm_5j_1ssbidh atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_7l_jt7fhx_1vpy06o_uv4tnr atm_4b_1qnzqti_1vpy06o_uv4tnr atm_26_1qwqy05_1vpy06o_uv4tnr atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_7l_jt7fhx_1w3cfyq atm_4b_1qnzqti_1w3cfyq atm_26_1qwqy05_1w3cfyq atm_70_1txm9bj_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_7l_jt7fhx_pfnrn2_1oszvuo atm_4b_1qnzqti_pfnrn2_1oszvuo atm_26_1qwqy05_pfnrn2_1oszvuo atm_70_1txm9bj_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_7l_1vvgs7l_1o5j5ji atm_4b_1vvgs7l_1o5j5ji atm_26_1qwqy05_1o5j5ji dir dir-ltr`} type="button" disabled="" tabIndex="-1" aria-label="decrease value" aria-describedby="searchFlow-title-label-adults" data-testid="stepper-adults-decrease-button">
                                                                    <span className="i98ho2o atm_e2_qslrf5 atm_vy_qslrf5 atm_l8_14y27yu dir dir-ltr">
                                                                        <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}><path d="m.75 6.75h10.5v-1.5h-10.5z"></path></svg>
                                                                    </span>
                                                                    </button>

                                                                    <div className="vqatjzs atm_mk_h2mmj6 atm_7l_1kw7nm4 atm_bx_1kw7nm4 atm_c8_1kw7nm4 atm_g3_1kw7nm4 dir dir-ltr">
                                                                    <span aria-hidden="true" data-testid="stepper-adults-value">
                                                                        {adultCount}
                                                                    </span>
                                                                    <span className="vlastcb atm_fq_idpfg4 atm_3f_idpfg4 atm_7h_hxbz6r atm_7i_ysn8ba atm_e2_t94yts atm_ks_zryt35 atm_l8_idpfg4 atm_mk_stnw88 atm_vv_1q9ccgz atm_vy_t94yts dir dir-ltr">
                                                                        {adultCount} Adults
                                                                    </span>
                                                                    </div>

                                                                    <button onClick={() => setAdultCount(adultCount + 1)} className="bv4zwx4 atm_ax_idpfg4 atm_bb_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_r3_1h6ojuz atm_rd_glywfm atm_3f_97hwo atm_bx_1kw7nm4 atm_tl_1gw4zv3 atm_vy_1vi7ecw atm_e2_1vi7ecw atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1h6ojuz atm_7l_1he744i atm_4b_1en9qhd atm_26_1qwqy05 atm_5j_1ssbidh atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_7l_jt7fhx_1vpy06o_uv4tnr atm_4b_1qnzqti_1vpy06o_uv4tnr atm_26_1qwqy05_1vpy06o_uv4tnr atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_7l_jt7fhx_1w3cfyq atm_4b_1qnzqti_1w3cfyq atm_26_1qwqy05_1w3cfyq atm_70_1txm9bj_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_7l_jt7fhx_pfnrn2_1oszvuo atm_4b_1qnzqti_pfnrn2_1oszvuo atm_26_1qwqy05_pfnrn2_1oszvuo atm_70_1txm9bj_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_7l_1vvgs7l_1o5j5ji atm_4b_1vvgs7l_1o5j5ji atm_26_1qwqy05_1o5j5ji dir dir-ltr" type="button" aria-label="increase value" aria-describedby="searchFlow-title-label-adults" data-testid="stepper-adults-increase-button">
                                                                    <span className="i98ho2o atm_e2_qslrf5 atm_vy_qslrf5 atm_l8_14y27yu dir dir-ltr">
                                                                        <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}><path d="m6.75.75v4.5h4.5v1.5h-4.5v4.5h-1.5v-4.5h-4.5v-1.5h4.5v-4.5z"></path></svg>
                                                                    </span>
                                                                    </button>
                                                                </div>
                                                                </div>

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
                                                                    <button onClick={() => setChildCount(childCount - 1)} className={`${childCount <= 0 ? 'disabled' : ''} bv4zwx4 atm_ax_idpfg4 atm_bb_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_r3_1h6ojuz atm_rd_glywfm atm_3f_97hwo atm_bx_1kw7nm4 atm_tl_1gw4zv3 atm_vy_1vi7ecw atm_e2_1vi7ecw atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1h6ojuz atm_7l_1he744i atm_4b_1en9qhd atm_26_1qwqy05 atm_5j_1ssbidh atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_7l_jt7fhx_1vpy06o_uv4tnr atm_4b_1qnzqti_1vpy06o_uv4tnr atm_26_1qwqy05_1vpy06o_uv4tnr atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_7l_jt7fhx_1w3cfyq atm_4b_1qnzqti_1w3cfyq atm_26_1qwqy05_1w3cfyq atm_70_1txm9bj_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_7l_jt7fhx_pfnrn2_1oszvuo atm_4b_1qnzqti_pfnrn2_1oszvuo atm_26_1qwqy05_pfnrn2_1oszvuo atm_70_1txm9bj_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_7l_1vvgs7l_1o5j5ji atm_4b_1vvgs7l_1o5j5ji atm_26_1qwqy05_1o5j5ji dir dir-ltr`} type="button" disabled="" tabIndex="-1" aria-label="decrease value" aria-describedby="searchFlow-title-label-adults" data-testid="stepper-adults-decrease-button">
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

                                                                    <button onClick={() => setChildCount(childCount + 1)} className="bv4zwx4 atm_ax_idpfg4 atm_bb_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_r3_1h6ojuz atm_rd_glywfm atm_3f_97hwo atm_bx_1kw7nm4 atm_tl_1gw4zv3 atm_vy_1vi7ecw atm_e2_1vi7ecw atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1h6ojuz atm_7l_1he744i atm_4b_1en9qhd atm_26_1qwqy05 atm_5j_1ssbidh atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_7l_jt7fhx_1vpy06o_uv4tnr atm_4b_1qnzqti_1vpy06o_uv4tnr atm_26_1qwqy05_1vpy06o_uv4tnr atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_7l_jt7fhx_1w3cfyq atm_4b_1qnzqti_1w3cfyq atm_26_1qwqy05_1w3cfyq atm_70_1txm9bj_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_7l_jt7fhx_pfnrn2_1oszvuo atm_4b_1qnzqti_pfnrn2_1oszvuo atm_26_1qwqy05_pfnrn2_1oszvuo atm_70_1txm9bj_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_7l_1vvgs7l_1o5j5ji atm_4b_1vvgs7l_1o5j5ji atm_26_1qwqy05_1o5j5ji dir dir-ltr" type="button" aria-label="increase value" aria-describedby="searchFlow-title-label-adults" data-testid="stepper-adults-increase-button">
                                                                    <span className="i98ho2o atm_e2_qslrf5 atm_vy_qslrf5 atm_l8_14y27yu dir dir-ltr">
                                                                        <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}><path d="m6.75.75v4.5h4.5v1.5h-4.5v4.5h-1.5v-4.5h-4.5v-1.5h4.5v-4.5z"></path></svg>
                                                                    </span>
                                                                    </button>
                                                                </div>

                                                                </div>

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
                                                                    <button onClick={() => setInfrontCount(infrontCount - 1)} className={`${infrontCount <= 0 ? 'disabled' : ''} bv4zwx4 atm_ax_idpfg4 atm_bb_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_r3_1h6ojuz atm_rd_glywfm atm_3f_97hwo atm_bx_1kw7nm4 atm_tl_1gw4zv3 atm_vy_1vi7ecw atm_e2_1vi7ecw atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1h6ojuz atm_7l_1he744i atm_4b_1en9qhd atm_26_1qwqy05 atm_5j_1ssbidh atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_7l_jt7fhx_1vpy06o_uv4tnr atm_4b_1qnzqti_1vpy06o_uv4tnr atm_26_1qwqy05_1vpy06o_uv4tnr atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_7l_jt7fhx_1w3cfyq atm_4b_1qnzqti_1w3cfyq atm_26_1qwqy05_1w3cfyq atm_70_1txm9bj_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_7l_jt7fhx_pfnrn2_1oszvuo atm_4b_1qnzqti_pfnrn2_1oszvuo atm_26_1qwqy05_pfnrn2_1oszvuo atm_70_1txm9bj_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_7l_1vvgs7l_1o5j5ji atm_4b_1vvgs7l_1o5j5ji atm_26_1qwqy05_1o5j5ji dir dir-ltr`} type="button" disabled="" tabIndex="-1" aria-label="decrease value" aria-describedby="searchFlow-title-label-adults" data-testid="stepper-adults-decrease-button">
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

                                                                    <button onClick={() => setInfrontCount(infrontCount + 1)} className="bv4zwx4 atm_ax_idpfg4 atm_bb_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_r3_1h6ojuz atm_rd_glywfm atm_3f_97hwo atm_bx_1kw7nm4 atm_tl_1gw4zv3 atm_vy_1vi7ecw atm_e2_1vi7ecw atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1h6ojuz atm_7l_1he744i atm_4b_1en9qhd atm_26_1qwqy05 atm_5j_1ssbidh atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_7l_jt7fhx_1vpy06o_uv4tnr atm_4b_1qnzqti_1vpy06o_uv4tnr atm_26_1qwqy05_1vpy06o_uv4tnr atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_7l_jt7fhx_1w3cfyq atm_4b_1qnzqti_1w3cfyq atm_26_1qwqy05_1w3cfyq atm_70_1txm9bj_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_7l_jt7fhx_pfnrn2_1oszvuo atm_4b_1qnzqti_pfnrn2_1oszvuo atm_26_1qwqy05_pfnrn2_1oszvuo atm_70_1txm9bj_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_7l_1vvgs7l_1o5j5ji atm_4b_1vvgs7l_1o5j5ji atm_26_1qwqy05_1o5j5ji dir dir-ltr" type="button" aria-label="increase value" aria-describedby="searchFlow-title-label-adults" data-testid="stepper-adults-increase-button">
                                                                    <span className="i98ho2o atm_e2_qslrf5 atm_vy_qslrf5 atm_l8_14y27yu dir dir-ltr">
                                                                        <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}><path d="m6.75.75v4.5h4.5v1.5h-4.5v4.5h-1.5v-4.5h-4.5v-1.5h4.5v-4.5z"></path></svg>
                                                                    </span>
                                                                    </button>
                                                                </div>

                                                                </div>

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
                                                                    <button onClick={() => setPetsCount(petsCount - 1)} className={`${petsCount <= 0 ? 'disabled' : ''} bv4zwx4 atm_ax_idpfg4 atm_bb_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_r3_1h6ojuz atm_rd_glywfm atm_3f_97hwo atm_bx_1kw7nm4 atm_tl_1gw4zv3 atm_vy_1vi7ecw atm_e2_1vi7ecw atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1h6ojuz atm_7l_1he744i atm_4b_1en9qhd atm_26_1qwqy05 atm_5j_1ssbidh atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_7l_jt7fhx_1vpy06o_uv4tnr atm_4b_1qnzqti_1vpy06o_uv4tnr atm_26_1qwqy05_1vpy06o_uv4tnr atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_7l_jt7fhx_1w3cfyq atm_4b_1qnzqti_1w3cfyq atm_26_1qwqy05_1w3cfyq atm_70_1txm9bj_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_7l_jt7fhx_pfnrn2_1oszvuo atm_4b_1qnzqti_pfnrn2_1oszvuo atm_26_1qwqy05_pfnrn2_1oszvuo atm_70_1txm9bj_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_7l_1vvgs7l_1o5j5ji atm_4b_1vvgs7l_1o5j5ji atm_26_1qwqy05_1o5j5ji dir dir-ltr`} type="button" disabled="" tabIndex="-1" aria-label="decrease value" aria-describedby="searchFlow-title-label-adults" data-testid="stepper-adults-decrease-button">
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

                                                                    <button onClick={() => setPetsCount(petsCount + 1)} className="bv4zwx4 atm_ax_idpfg4 atm_bb_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_r3_1h6ojuz atm_rd_glywfm atm_3f_97hwo atm_bx_1kw7nm4 atm_tl_1gw4zv3 atm_vy_1vi7ecw atm_e2_1vi7ecw atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1h6ojuz atm_7l_1he744i atm_4b_1en9qhd atm_26_1qwqy05 atm_5j_1ssbidh atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_7l_jt7fhx_1vpy06o_uv4tnr atm_4b_1qnzqti_1vpy06o_uv4tnr atm_26_1qwqy05_1vpy06o_uv4tnr atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_7l_jt7fhx_1w3cfyq atm_4b_1qnzqti_1w3cfyq atm_26_1qwqy05_1w3cfyq atm_70_1txm9bj_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_7l_jt7fhx_pfnrn2_1oszvuo atm_4b_1qnzqti_pfnrn2_1oszvuo atm_26_1qwqy05_pfnrn2_1oszvuo atm_70_1txm9bj_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_7l_1vvgs7l_1o5j5ji atm_4b_1vvgs7l_1o5j5ji atm_26_1qwqy05_1o5j5ji dir dir-ltr" type="button" aria-label="increase value" aria-describedby="searchFlow-title-label-adults" data-testid="stepper-adults-increase-button">
                                                                    <span className="i98ho2o atm_e2_qslrf5 atm_vy_qslrf5 atm_l8_14y27yu dir dir-ltr">
                                                                        <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}><path d="m6.75.75v4.5h4.5v1.5h-4.5v4.5h-1.5v-4.5h-4.5v-1.5h4.5v-4.5z"></path></svg>
                                                                    </span>
                                                                    </button>
                                                                </div>
                                                                </div>

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
                                    <button type="submit" className="sc-1i8u282-0 sc-gzVnrw evBpSJ"_css="border-radius:,0.375rem,;background-color:,function(e){return e.theme.colors.heartRed},;font-family:,function(e){return e.theme.colors.primary},;text-transform:uppercase;letter-spacing:,0.0875rem,;line-height:,0.8125rem,;min-height:,3.5rem,;font-weight:,function(e){return e.theme.fonts.semiBoldWeight},;width:100%;font-size:,0.875rem,;border-color:,function(e){return e.theme.colors.heartRed},;,function(e){return e.disabled&amp;&amp;&quot;\n    background-color: &quot;.concat(e.theme.colors.alto,&quot;;\n    border-color: &quot;).concat(e.theme.colors.alto,&quot;;\n    pointer-events: none;\n    color: &quot;).concat(e.theme.colors.primaryText,&quot;;\n  &quot;)},:hover{background-color:,function(e){return e.theme.colors.burntUmber},;border-color:,function(e){return e.theme.colors.burntUmber},;}">
                                        <span className="sc-1c7wpmw-0 joHSzY">Check Availability</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                
                <hr className='mt-5'/>

                <div className="sc-1hh5wos-3 hLYWfh">
                    <h2 className="sc-1i8u282-0 bNSQXg custom-h2"><small>⭐</small> 4.93  •  28 Review</h2>
                    
                    <div className='rev_row'>
                        <div className='rev_ctc'>
                            <h4>Over all ratings</h4>
                            <div className="chart">
                                <div className="rate-box">
                                    <span className="value">5</span>
                                    <div className="progress-bar">
                                        <span className="progress" style={{width:'90%'}}></span>
                                    </div>
                                </div>
                                <div className="rate-box">
                                    <span className="value">4</span>
                                    <div className="progress-bar"><span className="progress" style={{width:'20%'}}></span></div>
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
                </div>

                <h2 className="sc-1i8u282-0 bNSQXg custom-h2">Reviews</h2>
            </div>
        </section>
        
        <Testemonials/>


    </>
  )
}

export default Room;
