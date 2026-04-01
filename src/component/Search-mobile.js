// import Link from 'next/link';
// import React, { useState } from 'react';
// import { addMonths, format, isBefore, startOfDay, isEqual, subMonths } from "date-fns";

// const SearchMobile = () => {
//     // destionation state 
//     const [selectedDestination, setSelectedDestination] = useState('');

//     // guest range state
//     const [adultCount, setAdultCount] = useState(0);
//     const [childCount, setChildCount] = useState(0);
//     const [infrontCount, setInfrontCount] = useState(0);
//     const [petsCount, setPetsCount] = useState(0);

//     // date range state
//     const [currentMonth, setCurrentMonth] = useState(new Date());
//     const [dateRange, setDates] = useState({
//         start_date: '',
//         end_date: ''
//     })

//     // destination code 
//     const handleDestinationSelect = (name) => {
//         setSelectedDestination(name);
//     };
//     const Countries = [
//         {
//             name: 'I’m flexible',
//             image: 'flex.jpg',
//         },
//         {
//             name: 'Canada',
//             image: 'canada.webp',
//         },
//         {
//             name: 'United Arab Emirates',
//             image: 'arab.jpg',
//         },
//         {
//             name: 'Europe',
//             image: 'europe.jpg',
//         },
//         {
//             name: 'Africa',
//             image: 'flex.jpg',
//         },
//         {
//             name: 'United Kingdom',
//             image: 'u-king.jpg',
//         },
//         {
//             name: 'Asia',
//             image: 'flex.jpg',
//         },
//         {
//             name: 'United States',
//             image: 'u-state.jpg',
//         }
//     ];

//     // date range code 
//     const onDateChange = (dates) => {
//         setDates(dates);
//     }
//     const handleDateClick = (date) => {
//         const selectedDate = startOfDay(date);

//         if (!dateRange.start_date || (dateRange.start_date && dateRange.end_date)) {
//             onDateChange({ start_date: selectedDate, end_date: undefined });
//         } else if (isBefore(selectedDate, new Date(dateRange.start_date))) {
//             onDateChange({ start_date: selectedDate, end_date: undefined });
//         } else {
//             onDateChange({ ...dateRange, end_date: selectedDate });
//         }
//     };
//     const renderCalendar = (month) => {
//         const today = startOfDay(new Date());
//         const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
//         const firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
//         const days = [];

//         for (let i = 0; i < firstDayOfMonth; i++) {
//             days.push(<div key={`empty-${i}`} className="day-cell"></div>);
//         }

//         for (let i = 1; i <= daysInMonth; i++) {
//             const date = new Date(month.getFullYear(), month.getMonth(), i);
//             const isSelected =
//                 (dateRange.start_date &&
//                     new Date(dateRange.start_date).toDateString() === date.toDateString()) ||
//                 (dateRange.end_date &&
//                     new Date(dateRange.end_date).toDateString() === date.toDateString());
//             const isInRange =
//                 dateRange.start_date &&
//                 dateRange.end_date &&
//                 date > new Date(dateRange.start_date) &&
//                 date < new Date(dateRange.end_date);
//             const isDisabled = isBefore(date, today);

//             days.push(
//                 <button
//                     key={i}
//                     onClick={() => !isDisabled && handleDateClick(date)}
//                     className={`day-cell ${isDisabled ? "disabled" : ""} ${isSelected ? "selected" : isInRange ? "in-range" : "hoverable"
//                         }`}
//                     disabled={isDisabled}
//                 >
//                     {i}
//                 </button>
//             );
//         }

//         return (
//             <div className="calendar-container">
//                 <div className="month-title">{format(month, "MMMM yyyy")}</div>
//                 <div className="calendar-grid">
//                     {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
//                         <div key={day} className="day-cell day-header">
//                             {day}
//                         </div>
//                     ))}
//                     {days}
//                 </div>
//             </div>
//         );
//     };
//     const disablePreviousButton = () => {
//         return currentMonth.getMonth() === 0;
//     };

//     const ClearAll = () =>{
//         setSelectedDestination('');
//         setAdultCount(0);
//         setChildCount(0);
//         setInfrontCount(0);
//         setPetsCount(0);
//         setDates('')
//     }
//     return (
//         <>
//             <div data-bs-toggle="modal" data-bs-target="#searchModal" className="form_mob s97awm atm_am_kb7nvz atm_5j_1pm7oz0 atm_7l_dezgoh atm_j6_8vuzuz atm_9s_11p5wf0 atm_h_1fhbwtr atm_8w_73ivac atm_gx_idpfg4 atm_vz_qft6q7 atm_ui_dava36 atm_uv_xoomkg s1upghlx atm_26_1p8m8iw atm_3f_1tyokbi atm_70_504m4t dir dir-ltr">
//                 <button type="button" className="l1ovpqvx atm_1he2i46_1k8pnbi_10saat9 atm_yxpdqi_1pv6nv4_10saat9 atm_1a0hdzc_w1h1e8_10saat9 atm_2bu6ew_929bqk_10saat9 atm_12oyo1u_73u7pn_10saat9 atm_fiaz40_1etamxe_10saat9 bfknzxl atm_9j_tlke0l atm_mk_h2mmj6 atm_70_5j5alw atm_tl_1gw4zv3 atm_9j_13gfvf7_1o5j5ji c1i81z0m atm_fr_11a07z3 atm_r2_1j28jx2 atm_26_1j28jx2 atm_3f_glywfm atm_7l_1kw7nm4 atm_gi_idpfg4 atm_l8_idpfg4 atm_r3_1kw7nm4 atm_rd_glywfm atm_e2_1osqo2v atm_vy_1osqo2v atm_bx_1kw7nm4 atm_c8_1kw7nm4 atm_g3_1kw7nm4 atm_cs_1kw7nm4 atm_kd_glywfm atm_h_1h6ojuz atm_9s_1n7usvw atm_j3_1osqo2v atm_uc_glywfm atm_vb_glywfm atm_5j_b4p6a2 atm_uc_glywfm__1rrf6b5 atm_kd_glywfm_1w3cfyq atm_3f_glywfm_e4a3ld atm_l8_idpfg4_e4a3ld atm_gi_idpfg4_e4a3ld atm_3f_glywfm_1r4qscq atm_kd_glywfm_6y7yyg atm_kd_glywfm_pfnrn2_1oszvuo atm_l8_idpfg4_1icshfk_1oszvuo atm_gi_idpfg4_1icshfk_1oszvuo atm_3f_glywfm_b5gff8_1oszvuo atm_kd_glywfm_2by9w9_1oszvuo atm_k4_kb7nvz_1o5j5ji atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_tr_glywfm_csw3t1 atm_uc_aaiy6o_1w3cfyq atm_70_1xvh5se_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_1xvh5se_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam s1pm3o7c atm_dz_rhb615 atm_lj_evh4rp atm_li_evh4rp dir dir-ltr">
//                     <span className="su7l6qf atm_9s_11p5wf0 atm_mg_1h6ojuz dir dir-ltr">
//                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="presentation" focusable="false" style={{ display: 'block', height: '20px', width: '20px', fill: 'currentColor' }}><path d="M13 0a13 13 0 0 1 10.5 20.67l7.91 7.92-2.82 2.82-7.92-7.91A12.94 12.94 0 0 1 13 26a13 13 0 1 1 0-26zm0 4a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"></path></svg>
//                     </span>
//                     <span className="m10pln4b atm_9s_1o8liyq atm_lk_yh40bf atm_j3_1osqo2v atm_ks_15vqwwr dir dir-ltr">
//                         <div className="p1b4e8cr atm_c8_km0zk7 atm_fr_1m9t47k atm_cs_10d11i2 atm_g3_gktfv atm_9s_1ulexfb atm_ks_15vqwwr atm_sq_1l2sidv atm_vv_1q9ccgz dir dir-ltr">Where to?</div>
//                         <div className="s1f5fdzj atm_9s_1txwivl atm_c8_1uc0753 atm_g3_lonqig atm_fr_r7vles atm_7l_1esdqks atm_li_p5ox87 atm_cx_14y27yu dir dir-ltr" >
//                             <span className="s13th1u8 atm_am_1pywi5l atm_jb_12am3vd atm_ks_15vqwwr atm_sq_1l2sidv atm_vv_1q9ccgz dir dir-ltr">
//                                 {selectedDestination ? selectedDestination
//                                     :
//                                     'Anywhere'
//                                 }
//                             </span>
//                             <span >•</span>
//                             <span className="s13th1u8 atm_am_1pywi5l atm_jb_12am3vd atm_ks_15vqwwr atm_sq_1l2sidv atm_vv_1q9ccgz dir dir-ltr">
//                                 {dateRange?.start_date && dateRange?.end_date ? (
//                                     `${format(new Date(dateRange.start_date), "MMMM dd")} - ${format(new Date(dateRange.end_date), "MMMM dd")}`
//                                 ) : dateRange?.start_date ? (
//                                     `${format(new Date(dateRange.start_date), "MMMM dd")}`
//                                 ) : (
//                                     "Any week"
//                                 )}
//                             </span>
//                             <span >•</span>
//                             <span className="s13th1u8 atm_am_1pywi5l atm_jb_12am3vd atm_ks_15vqwwr atm_sq_1l2sidv atm_vv_1q9ccgz dir dir-ltr">
//                                 {(adultCount > 0 || childCount > 0 || infrontCount > 0 || petsCount > 0) ?
//                                     `${adultCount + childCount} guest${(adultCount + childCount) !== 1 ? 's' : ''}, ${infrontCount} infant${infrontCount !== 1 ? 's' : ''}, ${petsCount} pet${petsCount !== 1 ? 's' : ''}`
//                                     :
//                                     "Add guests"
//                                 }
//                             </span>
//                         </div>
//                         <span className="a8jt5op atm_3f_idpfg4 atm_7h_hxbz6r atm_7i_ysn8ba atm_e2_t94yts atm_ks_zryt35 atm_l8_idpfg4 atm_mk_stnw88 atm_vv_1q9ccgz atm_vy_t94yts dir dir-ltr" id="searchInputDescriptionId">Currently showing Any week, Add guests. Change search.</span>
//                     </span>
//                 </button>
//             </div>

//             <div className="modal fade" id="searchModal" tabIndex="-1" aria-labelledby="searchModalLabel" aria-hidden="true">
//                 <div className="modal-dialog modal-fullscreen">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                         </div>
//                         <form className="modal-body">
//                             <div className="accordion" id="accordionExample">
//                                 {/* destination area  */}
//                                 <div className="accordion-item">
//                                     <h2 className="accordion-header" id="headingOne">
//                                         <button className="accordion-button shadow-none bg-transparent text-black" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
//                                             <div tabIndex="-1" className="hpipapi atm_7l_1kw7nm4 atm_c8_1x4eueo atm_cs_1kw7nm4 atm_g3_1kw7nm4 atm_gi_idpfg4 atm_l8_idpfg4 atm_kd_idpfg4_pfnrn2 dir dir-ltr" >
//                                                 <div className="e3mxwuc atm_fr_kzfbxz atm_c8_11s2xic atm_g3_29gxgc atm_cs_19iasv6 atm_lj_4oy61j atm_li_4oy61j dir dir-ltr">
//                                                     {selectedDestination ? selectedDestination
//                                                         :
//                                                         'Where to?'
//                                                     }
//                                                 </div>
//                                             </div>
//                                         </button>
//                                     </h2>
//                                     <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
//                                         <div className="pt-0 b6977yo atm_e2_1osqo2v atm_ld_p5ox87 atm_lc_p5ox87 atm_lj_n5iugv atm_li_n5iugv dir dir-ltr">
//                                             <section className="h1ubsqwa atm_e2_1osqo2v dir dir-ltr">
//                                                 <div className="cenhzg5 atm_e2_1osqo2v dir dir-ltr">

//                                                     <div className="boqzkyp atm_gp_1ixj6vq  dir dir-ltr">
//                                                         <button type="button" className="l1ovpqvx atm_1he2i46_1k8pnbi_10saat9 atm_yxpdqi_1pv6nv4_10saat9 atm_1a0hdzc_w1h1e8_10saat9 atm_2bu6ew_929bqk_10saat9 atm_12oyo1u_73u7pn_10saat9 atm_fiaz40_1etamxe_10saat9 b175d0kc atm_9j_tlke0l atm_9s_1o8liyq atm_gi_idpfg4 atm_mk_h2mmj6 atm_rd_glywfm atm_70_5j5alw atm_7l_jt7fhx atm_tl_1gw4zv3 atm_9j_13gfvf7_1o5j5ji c1uvhr3t atm_bx_48h72j atm_c8_2x1prs atm_g3_1jbyh58 atm_fr_11a07z3 atm_cs_10d11i2 atm_kd_glywfm atm_uc_1lizyuv atm_r2_1j28jx2 atm_l8_1xmywv2 atm_e2_1wqb8tt atm_26_1p8m8iw atm_3f_qjnubg atm_5j_kitwna atm_r3_v2br90 atm_8w_1t7jgwy atm_uc_glywfm__1rrf6b5 atm_kd_glywfm_1w3cfyq atm_uc_aaiy6o_1w3cfyq atm_70_1b8lkes_1w3cfyq atm_3f_glywfm_e4a3ld atm_l8_idpfg4_e4a3ld atm_gi_idpfg4_e4a3ld atm_3f_glywfm_1r4qscq atm_kd_glywfm_6y7yyg atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_kd_glywfm_pfnrn2_1oszvuo atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_1b8lkes_pfnrn2_1oszvuo atm_3f_glywfm_1icshfk_1oszvuo atm_l8_idpfg4_1icshfk_1oszvuo atm_gi_idpfg4_1icshfk_1oszvuo atm_3f_glywfm_b5gff8_1oszvuo atm_kd_glywfm_2by9w9_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_tr_18md41p_csw3t1 atm_k4_kb7nvz_1o5j5ji f1yjg3j5 atm_vy_1osqo2v dir dir-ltr">
//                                                             <span className="c3cyu4 atm_9s_1txwivl atm_ks_15vqwwr atm_h_1h6ojuz atm_fc_1y6m0gg atm_gi_idpfg4 atm_vv_1q9ccgz atm_84_19bvopo atm_e2_1osqo2v atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_cs_10d11i2 atm_7l_dezgoh dir dir-ltr">
//                                                                 <span>
//                                                                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentColor', strokeWidth: '4', overflow: 'visible' }}><path fill="none" d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"></path></svg>
//                                                                 </span>

//                                                                 <input className='mob_search' value={selectedDestination} type="text" placeholder='Search destinations' />
//                                                             </span>
//                                                         </button>
//                                                     </div>

//                                                     <div className="c1kiv95n atm_gp_1gibeiw dir dir-ltr">
//                                                         <div className="co891fj atm_gy_2bgklt atm_gx_2bgklt dir dir-ltr">
//                                                             <div className="dbq73sc atm_9s_1txwivl atm_l0_15zigw atm_lj_gktfv atm_li_gktfv atm_cx_1gibeiw atm_p9_glywfm atm_9s_glywfm_14pyf7n dir dir-ltr">
//                                                                 {Countries?.map((item, index) => {
//                                                                     return (
//                                                                         <div key={index} onClick={() => handleDestinationSelect(item?.name)} className="dtd8ppw atm_73_usvi9m atm_e2_ngv8hl atm_h3_1y44olf atm_am_cw2zys atm_j3_qrq5vy dir dir-ltr">
//                                                                             <div className="c1q1697z atm_9s_1txwivl atm_ar_1bp4okc atm_n5_1yuitx atm_l8_1y44olf atm_l8_ftgil2__oggzyc atm_5j_qe0vi4__oggzyc atm_2d_1s7alg2_1nos8r_1jiodmv dir dir-ltr">
//                                                                                 <button className="c1y2gkhb atm_9s_1o8liyq atm_9j_tlke0l atm_r3_1h6ojuz atm_3f_uuagnh atm_l8_idpfg4 atm_gi_idpfg4 atm_4b_rke8ap atm_7l_jt7fhx atm_bx_48h72j atm_mk_h2mmj6 atm_uq_17liqq3 atm_ui_1bljbuh atm_uv_xoomkg atm_kd_glywfm atm_5j_kitwna atm_e2_1wugsn5 atm_ks_zryt35 atm_vy_1osqo2v atm_1w_gbua2q atm_2d_rke8ap atm_g3_idpfg4 atm_r2_1j28jx2 atm_7l_177r58q_1nos8r_uv4tnr atm_4b_lb1gtz_1nos8r_uv4tnr atm_7l_177r58q_csw3t1 atm_4b_lb1gtz_csw3t1 atm_tr_ybgkrq_csw3t1 atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_70_15w7q17_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_15w7q17_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_uc_aaiy6o_1s76pf2 atm_70_15w7q17_1s76pf2 atm_uc_glywfm_1s76pf2_1rrf6b5 atm_uc_aaiy6o_1y5fnfe_1oszvuo atm_70_15w7q17_1y5fnfe_1oszvuo atm_uc_glywfm_1y5fnfe_1o31aam atm_4b_rke8ap_1nos8r_1jiodmv atm_4b_rke8ap_csw3t1_oggzyc dir dir-ltr" type="button">
//                                                                                     <img src={`/images/${item?.image}`} className="i123w48w  atm_e2_1wugsn5 atm_vy_1osqo2v atm_1w_gbua2q atm_jp_1f51e7f dir dir-ltr" alt="" />
//                                                                                 </button>
//                                                                                 <div className="o18vo2mo atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_gw_1lkvw50 atm_ks_15vqwwr atm_sq_1l2sidv atm_vv_1q9ccgz dir dir-ltr" aria-hidden="true">
//                                                                                     {item?.name}
//                                                                                 </div>
//                                                                             </div>
//                                                                         </div>
//                                                                     );
//                                                                 })}
//                                                             </div>
//                                                         </div>
//                                                     </div>

//                                                 </div>
//                                             </section>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Date select area */}
//                                 <div className="accordion-item">
//                                     <h2 className="accordion-header" id="headingTwo">
//                                         <button className="accordion-button shadow-none bg-transparent text-black collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
//                                             <div tabIndex="-1" className="hpipapi atm_7l_1kw7nm4 atm_c8_1x4eueo atm_cs_1kw7nm4 atm_g3_1kw7nm4 atm_gi_idpfg4 atm_l8_idpfg4 atm_kd_idpfg4_pfnrn2 dir dir-ltr" >
//                                                 <div className="e3mxwuc atm_fr_kzfbxz atm_c8_11s2xic atm_g3_29gxgc atm_cs_19iasv6 atm_lj_4oy61j atm_li_4oy61j dir dir-ltr">
//                                                     {dateRange?.start_date && dateRange?.end_date ? (
//                                                         `${format(new Date(dateRange.start_date), "MMMM dd")} - ${format(new Date(dateRange.end_date), "MMMM dd")}`
//                                                     ) : dateRange?.start_date ? (
//                                                         `${format(new Date(dateRange.start_date), "MMMM dd")}`
//                                                     ) : (
//                                                         "When’s your trip?"
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         </button>
//                                     </h2>
//                                     <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
//                                         <div className="popover-container position-static shadow-none">
//                                             <div className="d-flex justify-content-between align-items-center mb-3">
//                                                 <button
//                                                     className="button_change"
//                                                     onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
//                                                     disabled={disablePreviousButton()} // Disable previous button if it's January
//                                                 >
//                                                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" /></svg>            </button>
//                                                 <button
//                                                     className="button_change"
//                                                     onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
//                                                 >
//                                                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" /></svg>
//                                                 </button>
//                                             </div>
//                                             <div className="row_date_picker">
//                                                 {renderCalendar(currentMonth)}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Guest select area  */}
//                                 <div className="accordion-item">
//                                     <h2 className="accordion-header" id="headingThree">
//                                         <button className="accordion-button shadow-none bg-transparent text-black collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
//                                             <div tabIndex="-1" className="hpipapi atm_7l_1kw7nm4 atm_c8_1x4eueo atm_cs_1kw7nm4 atm_g3_1kw7nm4 atm_gi_idpfg4 atm_l8_idpfg4 atm_kd_idpfg4_pfnrn2 dir dir-ltr" >
//                                                 <div className="e3mxwuc atm_fr_kzfbxz atm_c8_11s2xic atm_g3_29gxgc atm_cs_19iasv6 atm_lj_4oy61j atm_li_4oy61j dir dir-ltr">
//                                                     {(adultCount > 0 || childCount > 0 || infrontCount > 0 || petsCount > 0) ?
//                                                         `${adultCount + childCount} guest${(adultCount + childCount) !== 1 ? 's' : ''}, ${infrontCount} infant${infrontCount !== 1 ? 's' : ''}, ${petsCount} pet${petsCount !== 1 ? 's' : ''}`
//                                                         :
//                                                         "Who’s coming?"
//                                                     }
//                                                 </div>
//                                             </div>
//                                         </button>
//                                     </h2>
//                                     <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
//                                         <div className="accordion-body">
//                                             <div className="g6e6z5i atm_l8_14br1z3 dir dir-ltr">

//                                                 <div className="cnhxj7b atm_7l_dezgoh atm_9s_1txwivl atm_h_1h6ojuz atm_fc_1yb4nlp atm_be_1g80g66 atm_cx_19bvopo atm_lb_1drp7u0 atm_ll_2p0wge atm_40_1f9jazd_1i0dyc0 atm_jb_p2n4d6__oggzyc atm_lb_1crvktv__oggzyc dir dir-ltr">
//                                                     <section>
//                                                         <div className="tjx911r atm_7l_dezgoh atm_cs_10d11i2 atm_9s_1aaaxdl atm_lc_idpfg4 t1676ied atm_c8_2x1prs atm_g3_1jbyh58 atm_fr_11a07z3 dir dir-ltr">
//                                                             <h3 id="searchFlow-title-label-adults" tabIndex="-1" className="hpipapi atm_7l_1kw7nm4 atm_c8_1x4eueo atm_cs_1kw7nm4 atm_g3_1kw7nm4 atm_gi_idpfg4 atm_l8_idpfg4 atm_kd_idpfg4_pfnrn2 dir dir-ltr">
//                                                                 Adults
//                                                             </h3>
//                                                         </div>

//                                                         <div className="s12mgzio atm_cs_6adqpa atm_ld_evh4rp atm_7l_1admnp8 sxeujms atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_ld_evh4rp__oggzyc dir dir-ltr">
//                                                             Ages 13 or above
//                                                         </div>
//                                                     </section>

//                                                     <div className="caex243 atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1yb4nlp atm_vy_e2f67q atm_e2_1vi7ecw atm_7l_jt7fhx atm_cs_6adqpa atm_c8_2x1prs atm_g3_1jbyh58 atm_fr_11a07z3 atm_bx_48h72j dir dir-ltr">
//                                                         <button onClick={() => setAdultCount(adultCount - 1)} className={`${adultCount <= 0 ? 'disabled' : ''} bv4zwx4 atm_ax_idpfg4 atm_bb_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_r3_1h6ojuz atm_rd_glywfm atm_3f_97hwo atm_bx_1kw7nm4 atm_tl_1gw4zv3 atm_vy_1vi7ecw atm_e2_1vi7ecw atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1h6ojuz atm_7l_1he744i atm_4b_1en9qhd atm_26_1qwqy05 atm_5j_1ssbidh atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_7l_jt7fhx_1vpy06o_uv4tnr atm_4b_1qnzqti_1vpy06o_uv4tnr atm_26_1qwqy05_1vpy06o_uv4tnr atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_7l_jt7fhx_1w3cfyq atm_4b_1qnzqti_1w3cfyq atm_26_1qwqy05_1w3cfyq atm_70_1txm9bj_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_7l_jt7fhx_pfnrn2_1oszvuo atm_4b_1qnzqti_pfnrn2_1oszvuo atm_26_1qwqy05_pfnrn2_1oszvuo atm_70_1txm9bj_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_7l_1vvgs7l_1o5j5ji atm_4b_1vvgs7l_1o5j5ji atm_26_1qwqy05_1o5j5ji dir dir-ltr`} type="button" disabled="" tabIndex="-1" aria-label="decrease value" aria-describedby="searchFlow-title-label-adults" data-testid="stepper-adults-decrease-button">
//                                                             <span className="i98ho2o atm_e2_qslrf5 atm_vy_qslrf5 atm_l8_14y27yu dir dir-ltr">
//                                                                 <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}><path d="m.75 6.75h10.5v-1.5h-10.5z"></path></svg>
//                                                             </span>
//                                                         </button>

//                                                         <div className="vqatjzs atm_mk_h2mmj6 atm_7l_1kw7nm4 atm_bx_1kw7nm4 atm_c8_1kw7nm4 atm_g3_1kw7nm4 dir dir-ltr">
//                                                             <span aria-hidden="true" data-testid="stepper-adults-value">
//                                                                 {adultCount}
//                                                             </span>
//                                                             <span className="vlastcb atm_fq_idpfg4 atm_3f_idpfg4 atm_7h_hxbz6r atm_7i_ysn8ba atm_e2_t94yts atm_ks_zryt35 atm_l8_idpfg4 atm_mk_stnw88 atm_vv_1q9ccgz atm_vy_t94yts dir dir-ltr">
//                                                                 {adultCount} Adults
//                                                             </span>
//                                                         </div>

//                                                         <button onClick={() => setAdultCount(adultCount + 1)} className="bv4zwx4 atm_ax_idpfg4 atm_bb_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_r3_1h6ojuz atm_rd_glywfm atm_3f_97hwo atm_bx_1kw7nm4 atm_tl_1gw4zv3 atm_vy_1vi7ecw atm_e2_1vi7ecw atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1h6ojuz atm_7l_1he744i atm_4b_1en9qhd atm_26_1qwqy05 atm_5j_1ssbidh atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_7l_jt7fhx_1vpy06o_uv4tnr atm_4b_1qnzqti_1vpy06o_uv4tnr atm_26_1qwqy05_1vpy06o_uv4tnr atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_7l_jt7fhx_1w3cfyq atm_4b_1qnzqti_1w3cfyq atm_26_1qwqy05_1w3cfyq atm_70_1txm9bj_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_7l_jt7fhx_pfnrn2_1oszvuo atm_4b_1qnzqti_pfnrn2_1oszvuo atm_26_1qwqy05_pfnrn2_1oszvuo atm_70_1txm9bj_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_7l_1vvgs7l_1o5j5ji atm_4b_1vvgs7l_1o5j5ji atm_26_1qwqy05_1o5j5ji dir dir-ltr" type="button" aria-label="increase value" aria-describedby="searchFlow-title-label-adults" data-testid="stepper-adults-increase-button">
//                                                             <span className="i98ho2o atm_e2_qslrf5 atm_vy_qslrf5 atm_l8_14y27yu dir dir-ltr">
//                                                                 <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}><path d="m6.75.75v4.5h4.5v1.5h-4.5v4.5h-1.5v-4.5h-4.5v-1.5h4.5v-4.5z"></path></svg>
//                                                             </span>
//                                                         </button>
//                                                     </div>
//                                                 </div>

//                                                 <div className="cnhxj7b atm_7l_dezgoh atm_9s_1txwivl atm_h_1h6ojuz atm_fc_1yb4nlp atm_be_1g80g66 atm_cx_19bvopo atm_lb_1drp7u0 atm_ll_2p0wge atm_40_1f9jazd_1i0dyc0 atm_jb_p2n4d6__oggzyc atm_lb_1crvktv__oggzyc dir dir-ltr">
//                                                     <section>
//                                                         <div className="tjx911r atm_7l_dezgoh atm_cs_10d11i2 atm_9s_1aaaxdl atm_lc_idpfg4 t1676ied atm_c8_2x1prs atm_g3_1jbyh58 atm_fr_11a07z3 dir dir-ltr">
//                                                             <h3 id="searchFlow-title-label-children" tabIndex="-1" className="hpipapi atm_7l_1kw7nm4 atm_c8_1x4eueo atm_cs_1kw7nm4 atm_g3_1kw7nm4 atm_gi_idpfg4 atm_l8_idpfg4 atm_kd_idpfg4_pfnrn2 dir dir-ltr">
//                                                                 Children
//                                                             </h3>
//                                                         </div>

//                                                         <div className="s12mgzio atm_cs_6adqpa atm_ld_evh4rp atm_7l_1admnp8 sxeujms atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_ld_evh4rp__oggzyc dir dir-ltr">
//                                                             Ages 2 – 12
//                                                         </div>
//                                                     </section>

//                                                     <div className="caex243 atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1yb4nlp atm_vy_e2f67q atm_e2_1vi7ecw atm_7l_jt7fhx atm_cs_6adqpa atm_c8_2x1prs atm_g3_1jbyh58 atm_fr_11a07z3 atm_bx_48h72j dir dir-ltr">
//                                                         <button onClick={() => setChildCount(childCount - 1)} className={`${childCount <= 0 ? 'disabled' : ''} bv4zwx4 atm_ax_idpfg4 atm_bb_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_r3_1h6ojuz atm_rd_glywfm atm_3f_97hwo atm_bx_1kw7nm4 atm_tl_1gw4zv3 atm_vy_1vi7ecw atm_e2_1vi7ecw atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1h6ojuz atm_7l_1he744i atm_4b_1en9qhd atm_26_1qwqy05 atm_5j_1ssbidh atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_7l_jt7fhx_1vpy06o_uv4tnr atm_4b_1qnzqti_1vpy06o_uv4tnr atm_26_1qwqy05_1vpy06o_uv4tnr atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_7l_jt7fhx_1w3cfyq atm_4b_1qnzqti_1w3cfyq atm_26_1qwqy05_1w3cfyq atm_70_1txm9bj_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_7l_jt7fhx_pfnrn2_1oszvuo atm_4b_1qnzqti_pfnrn2_1oszvuo atm_26_1qwqy05_pfnrn2_1oszvuo atm_70_1txm9bj_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_7l_1vvgs7l_1o5j5ji atm_4b_1vvgs7l_1o5j5ji atm_26_1qwqy05_1o5j5ji dir dir-ltr`} type="button" disabled="" tabIndex="-1" aria-label="decrease value" aria-describedby="searchFlow-title-label-adults" data-testid="stepper-adults-decrease-button">
//                                                             <span className="i98ho2o atm_e2_qslrf5 atm_vy_qslrf5 atm_l8_14y27yu dir dir-ltr">
//                                                                 <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}><path d="m.75 6.75h10.5v-1.5h-10.5z"></path></svg>
//                                                             </span>
//                                                         </button>

//                                                         <div className="vqatjzs atm_mk_h2mmj6 atm_7l_1kw7nm4 atm_bx_1kw7nm4 atm_c8_1kw7nm4 atm_g3_1kw7nm4 dir dir-ltr">
//                                                             <span aria-hidden="true" data-testid="stepper-adults-value">
//                                                                 {childCount}
//                                                             </span>
//                                                             <span className="vlastcb atm_fq_idpfg4 atm_3f_idpfg4 atm_7h_hxbz6r atm_7i_ysn8ba atm_e2_t94yts atm_ks_zryt35 atm_l8_idpfg4 atm_mk_stnw88 atm_vv_1q9ccgz atm_vy_t94yts dir dir-ltr">
//                                                                 {childCount} Adults
//                                                             </span>
//                                                         </div>

//                                                         <button onClick={() => setChildCount(childCount + 1)} className="bv4zwx4 atm_ax_idpfg4 atm_bb_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_r3_1h6ojuz atm_rd_glywfm atm_3f_97hwo atm_bx_1kw7nm4 atm_tl_1gw4zv3 atm_vy_1vi7ecw atm_e2_1vi7ecw atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1h6ojuz atm_7l_1he744i atm_4b_1en9qhd atm_26_1qwqy05 atm_5j_1ssbidh atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_7l_jt7fhx_1vpy06o_uv4tnr atm_4b_1qnzqti_1vpy06o_uv4tnr atm_26_1qwqy05_1vpy06o_uv4tnr atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_7l_jt7fhx_1w3cfyq atm_4b_1qnzqti_1w3cfyq atm_26_1qwqy05_1w3cfyq atm_70_1txm9bj_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_7l_jt7fhx_pfnrn2_1oszvuo atm_4b_1qnzqti_pfnrn2_1oszvuo atm_26_1qwqy05_pfnrn2_1oszvuo atm_70_1txm9bj_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_7l_1vvgs7l_1o5j5ji atm_4b_1vvgs7l_1o5j5ji atm_26_1qwqy05_1o5j5ji dir dir-ltr" type="button" aria-label="increase value" aria-describedby="searchFlow-title-label-adults" data-testid="stepper-adults-increase-button">
//                                                             <span className="i98ho2o atm_e2_qslrf5 atm_vy_qslrf5 atm_l8_14y27yu dir dir-ltr">
//                                                                 <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}><path d="m6.75.75v4.5h4.5v1.5h-4.5v4.5h-1.5v-4.5h-4.5v-1.5h4.5v-4.5z"></path></svg>
//                                                             </span>
//                                                         </button>
//                                                     </div>

//                                                 </div>

//                                                 <div className="cnhxj7b atm_7l_dezgoh atm_9s_1txwivl atm_h_1h6ojuz atm_fc_1yb4nlp atm_be_1g80g66 atm_cx_19bvopo atm_lb_1drp7u0 atm_ll_2p0wge atm_40_1f9jazd_1i0dyc0 atm_jb_p2n4d6__oggzyc atm_lb_1crvktv__oggzyc dir dir-ltr" data-testid="search-block-filter-stepper-row-infants">
//                                                     <section>
//                                                         <div className="tjx911r atm_7l_dezgoh atm_cs_10d11i2 atm_9s_1aaaxdl atm_lc_idpfg4 t1676ied atm_c8_2x1prs atm_g3_1jbyh58 atm_fr_11a07z3 dir dir-ltr">
//                                                             <h3 id="searchFlow-title-label-infants" tabIndex="-1" className="hpipapi atm_7l_1kw7nm4 atm_c8_1x4eueo atm_cs_1kw7nm4 atm_g3_1kw7nm4 atm_gi_idpfg4 atm_l8_idpfg4 atm_kd_idpfg4_pfnrn2 dir dir-ltr" elementtiming="LCP-target">Infants</h3>
//                                                         </div>
//                                                         <div className="s12mgzio atm_cs_6adqpa atm_ld_evh4rp atm_7l_1admnp8 sxeujms atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_ld_evh4rp__oggzyc dir dir-ltr">
//                                                             Under 2
//                                                         </div>
//                                                     </section>


//                                                     <div className="caex243 atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1yb4nlp atm_vy_e2f67q atm_e2_1vi7ecw atm_7l_jt7fhx atm_cs_6adqpa atm_c8_2x1prs atm_g3_1jbyh58 atm_fr_11a07z3 atm_bx_48h72j dir dir-ltr">
//                                                         <button onClick={() => setInfrontCount(infrontCount - 1)} className={`${infrontCount <= 0 ? 'disabled' : ''} bv4zwx4 atm_ax_idpfg4 atm_bb_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_r3_1h6ojuz atm_rd_glywfm atm_3f_97hwo atm_bx_1kw7nm4 atm_tl_1gw4zv3 atm_vy_1vi7ecw atm_e2_1vi7ecw atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1h6ojuz atm_7l_1he744i atm_4b_1en9qhd atm_26_1qwqy05 atm_5j_1ssbidh atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_7l_jt7fhx_1vpy06o_uv4tnr atm_4b_1qnzqti_1vpy06o_uv4tnr atm_26_1qwqy05_1vpy06o_uv4tnr atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_7l_jt7fhx_1w3cfyq atm_4b_1qnzqti_1w3cfyq atm_26_1qwqy05_1w3cfyq atm_70_1txm9bj_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_7l_jt7fhx_pfnrn2_1oszvuo atm_4b_1qnzqti_pfnrn2_1oszvuo atm_26_1qwqy05_pfnrn2_1oszvuo atm_70_1txm9bj_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_7l_1vvgs7l_1o5j5ji atm_4b_1vvgs7l_1o5j5ji atm_26_1qwqy05_1o5j5ji dir dir-ltr`} type="button" disabled="" tabIndex="-1" aria-label="decrease value" aria-describedby="searchFlow-title-label-adults" data-testid="stepper-adults-decrease-button">
//                                                             <span className="i98ho2o atm_e2_qslrf5 atm_vy_qslrf5 atm_l8_14y27yu dir dir-ltr">
//                                                                 <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}><path d="m.75 6.75h10.5v-1.5h-10.5z"></path></svg>
//                                                             </span>
//                                                         </button>

//                                                         <div className="vqatjzs atm_mk_h2mmj6 atm_7l_1kw7nm4 atm_bx_1kw7nm4 atm_c8_1kw7nm4 atm_g3_1kw7nm4 dir dir-ltr">
//                                                             <span aria-hidden="true" data-testid="stepper-adults-value">
//                                                                 {infrontCount}
//                                                             </span>
//                                                             <span className="vlastcb atm_fq_idpfg4 atm_3f_idpfg4 atm_7h_hxbz6r atm_7i_ysn8ba atm_e2_t94yts atm_ks_zryt35 atm_l8_idpfg4 atm_mk_stnw88 atm_vv_1q9ccgz atm_vy_t94yts dir dir-ltr">
//                                                                 {infrontCount} Adults
//                                                             </span>
//                                                         </div>

//                                                         <button onClick={() => setInfrontCount(infrontCount + 1)} className="bv4zwx4 atm_ax_idpfg4 atm_bb_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_r3_1h6ojuz atm_rd_glywfm atm_3f_97hwo atm_bx_1kw7nm4 atm_tl_1gw4zv3 atm_vy_1vi7ecw atm_e2_1vi7ecw atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1h6ojuz atm_7l_1he744i atm_4b_1en9qhd atm_26_1qwqy05 atm_5j_1ssbidh atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_7l_jt7fhx_1vpy06o_uv4tnr atm_4b_1qnzqti_1vpy06o_uv4tnr atm_26_1qwqy05_1vpy06o_uv4tnr atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_7l_jt7fhx_1w3cfyq atm_4b_1qnzqti_1w3cfyq atm_26_1qwqy05_1w3cfyq atm_70_1txm9bj_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_7l_jt7fhx_pfnrn2_1oszvuo atm_4b_1qnzqti_pfnrn2_1oszvuo atm_26_1qwqy05_pfnrn2_1oszvuo atm_70_1txm9bj_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_7l_1vvgs7l_1o5j5ji atm_4b_1vvgs7l_1o5j5ji atm_26_1qwqy05_1o5j5ji dir dir-ltr" type="button" aria-label="increase value" aria-describedby="searchFlow-title-label-adults" data-testid="stepper-adults-increase-button">
//                                                             <span className="i98ho2o atm_e2_qslrf5 atm_vy_qslrf5 atm_l8_14y27yu dir dir-ltr">
//                                                                 <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}><path d="m6.75.75v4.5h4.5v1.5h-4.5v4.5h-1.5v-4.5h-4.5v-1.5h4.5v-4.5z"></path></svg>
//                                                             </span>
//                                                         </button>
//                                                     </div>

//                                                 </div>

//                                                 <div className="cnhxj7b atm_7l_dezgoh atm_9s_1txwivl atm_h_1h6ojuz atm_fc_1yb4nlp atm_be_1g80g66 atm_cx_19bvopo atm_lb_1drp7u0 atm_ll_2p0wge atm_40_1f9jazd_1i0dyc0 atm_jb_p2n4d6__oggzyc atm_lb_1crvktv__oggzyc dir dir-ltr">

//                                                     <section>
//                                                         <div className="tjx911r atm_7l_dezgoh atm_cs_10d11i2 atm_9s_1aaaxdl atm_lc_idpfg4 t1676ied atm_c8_2x1prs atm_g3_1jbyh58 atm_fr_11a07z3 dir dir-ltr">
//                                                             <h3 id="searchFlow-title-label-pets" tabIndex="-1" className="hpipapi atm_7l_1kw7nm4 atm_c8_1x4eueo atm_cs_1kw7nm4 atm_g3_1kw7nm4 atm_gi_idpfg4 atm_l8_idpfg4 atm_kd_idpfg4_pfnrn2 dir dir-ltr" elementtiming="LCP-target">
//                                                                 Pets
//                                                             </h3>
//                                                         </div>

//                                                         <div className="s12mgzio atm_cs_6adqpa atm_ld_evh4rp atm_7l_1admnp8 sxeujms atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_ld_evh4rp__oggzyc dir dir-ltr">
//                                                             <Link href='#!' type="button" className="_11su815w l1ovpqvx atm_1he2i46_1k8pnbi_10saat9 atm_yxpdqi_1pv6nv4_10saat9 atm_1a0hdzc_w1h1e8_10saat9 atm_2bu6ew_929bqk_10saat9 atm_12oyo1u_73u7pn_10saat9 atm_fiaz40_1etamxe_10saat9 dir dir-ltr">
//                                                                 Bringing a service animal?
//                                                             </Link>
//                                                         </div>
//                                                     </section>

//                                                     <div className="caex243 atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1yb4nlp atm_vy_e2f67q atm_e2_1vi7ecw atm_7l_jt7fhx atm_cs_6adqpa atm_c8_2x1prs atm_g3_1jbyh58 atm_fr_11a07z3 atm_bx_48h72j dir dir-ltr">
//                                                         <button onClick={() => setPetsCount(petsCount - 1)} className={`${petsCount <= 0 ? 'disabled' : ''} bv4zwx4 atm_ax_idpfg4 atm_bb_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_r3_1h6ojuz atm_rd_glywfm atm_3f_97hwo atm_bx_1kw7nm4 atm_tl_1gw4zv3 atm_vy_1vi7ecw atm_e2_1vi7ecw atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1h6ojuz atm_7l_1he744i atm_4b_1en9qhd atm_26_1qwqy05 atm_5j_1ssbidh atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_7l_jt7fhx_1vpy06o_uv4tnr atm_4b_1qnzqti_1vpy06o_uv4tnr atm_26_1qwqy05_1vpy06o_uv4tnr atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_7l_jt7fhx_1w3cfyq atm_4b_1qnzqti_1w3cfyq atm_26_1qwqy05_1w3cfyq atm_70_1txm9bj_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_7l_jt7fhx_pfnrn2_1oszvuo atm_4b_1qnzqti_pfnrn2_1oszvuo atm_26_1qwqy05_pfnrn2_1oszvuo atm_70_1txm9bj_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_7l_1vvgs7l_1o5j5ji atm_4b_1vvgs7l_1o5j5ji atm_26_1qwqy05_1o5j5ji dir dir-ltr`} type="button" disabled="" tabIndex="-1" aria-label="decrease value" aria-describedby="searchFlow-title-label-adults" data-testid="stepper-adults-decrease-button">
//                                                             <span className="i98ho2o atm_e2_qslrf5 atm_vy_qslrf5 atm_l8_14y27yu dir dir-ltr">
//                                                                 <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}><path d="m.75 6.75h10.5v-1.5h-10.5z"></path></svg>
//                                                             </span>
//                                                         </button>

//                                                         <div className="vqatjzs atm_mk_h2mmj6 atm_7l_1kw7nm4 atm_bx_1kw7nm4 atm_c8_1kw7nm4 atm_g3_1kw7nm4 dir dir-ltr">
//                                                             <span aria-hidden="true" data-testid="stepper-adults-value">
//                                                                 {petsCount}
//                                                             </span>
//                                                             <span className="vlastcb atm_fq_idpfg4 atm_3f_idpfg4 atm_7h_hxbz6r atm_7i_ysn8ba atm_e2_t94yts atm_ks_zryt35 atm_l8_idpfg4 atm_mk_stnw88 atm_vv_1q9ccgz atm_vy_t94yts dir dir-ltr">
//                                                                 {petsCount} Adults
//                                                             </span>
//                                                         </div>

//                                                         <button onClick={() => setPetsCount(petsCount + 1)} className="bv4zwx4 atm_ax_idpfg4 atm_bb_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_r3_1h6ojuz atm_rd_glywfm atm_3f_97hwo atm_bx_1kw7nm4 atm_tl_1gw4zv3 atm_vy_1vi7ecw atm_e2_1vi7ecw atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1h6ojuz atm_7l_1he744i atm_4b_1en9qhd atm_26_1qwqy05 atm_5j_1ssbidh atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_7l_jt7fhx_1vpy06o_uv4tnr atm_4b_1qnzqti_1vpy06o_uv4tnr atm_26_1qwqy05_1vpy06o_uv4tnr atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_7l_jt7fhx_1w3cfyq atm_4b_1qnzqti_1w3cfyq atm_26_1qwqy05_1w3cfyq atm_70_1txm9bj_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_7l_jt7fhx_pfnrn2_1oszvuo atm_4b_1qnzqti_pfnrn2_1oszvuo atm_26_1qwqy05_pfnrn2_1oszvuo atm_70_1txm9bj_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_7l_1vvgs7l_1o5j5ji atm_4b_1vvgs7l_1o5j5ji atm_26_1qwqy05_1o5j5ji dir dir-ltr" type="button" aria-label="increase value" aria-describedby="searchFlow-title-label-adults" data-testid="stepper-adults-increase-button">
//                                                             <span className="i98ho2o atm_e2_qslrf5 atm_vy_qslrf5 atm_l8_14y27yu dir dir-ltr">
//                                                                 <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}><path d="m6.75.75v4.5h4.5v1.5h-4.5v4.5h-1.5v-4.5h-4.5v-1.5h4.5v-4.5z"></path></svg>
//                                                             </span>
//                                                         </button>
//                                                     </div>
//                                                 </div>

//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>

//                             </div>

//                             <footer className="fj81y0n atm_67_1e9224w atm_9s_1txwivl atm_fc_1yb4nlp atm_l8_1lzldkb atm_26_sw29y8 atm_bb_idpfg4 dir dir-ltr">
//                                 <button type="button" onClick={ClearAll} className="l1ovpqvx atm_1he2i46_1k8pnbi_10saat9 atm_yxpdqi_1pv6nv4_10saat9 atm_1a0hdzc_w1h1e8_10saat9 atm_2bu6ew_929bqk_10saat9 atm_12oyo1u_73u7pn_10saat9 atm_fiaz40_1etamxe_10saat9 be3uexp atm_9j_tlke0l atm_9s_1o8liyq atm_gi_idpfg4 atm_mk_h2mmj6 atm_r3_1h6ojuz atm_70_5j5alw atm_vy_1wugsn5 atm_tl_1gw4zv3 atm_9j_13gfvf7_1o5j5ji c1kqzsh2 atm_bx_48h72j atm_c8_2x1prs atm_g3_1jbyh58 atm_fr_11a07z3 atm_cs_10d11i2 atm_5j_t09oo2 atm_kd_glywfm atm_uc_1lizyuv atm_r2_1j28jx2 atm_jb_1fkumsa atm_3f_glywfm atm_26_1j28jx2 atm_7l_jt7fhx atm_rd_8stvzk atm_9xn0br_1wugsn5 atm_9tnf0v_1wugsn5 atm_7o60g0_1wugsn5 atm_gz_14idwd0 atm_h0_14idwd0 atm_l8_19bvopo atm_8w_1t7jgwy atm_uc_glywfm__1rrf6b5 atm_kd_glywfm_1w3cfyq atm_uc_aaiy6o_1w3cfyq atm_3f_glywfm_e4a3ld atm_l8_idpfg4_e4a3ld atm_gi_idpfg4_e4a3ld atm_3f_glywfm_1r4qscq atm_kd_glywfm_6y7yyg atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_kd_glywfm_pfnrn2_1oszvuo atm_uc_aaiy6o_pfnrn2_1oszvuo atm_3f_glywfm_1icshfk_1oszvuo atm_l8_idpfg4_1icshfk_1oszvuo atm_gi_idpfg4_1icshfk_1oszvuo atm_3f_glywfm_b5gff8_1oszvuo atm_kd_glywfm_2by9w9_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_tr_18md41p_csw3t1 atm_k4_kb7nvz_1o5j5ji atm_3f_glywfm_1w3cfyq atm_26_zbnr2t_1w3cfyq atm_7l_jt7fhx_1w3cfyq atm_70_18bflhl_1w3cfyq atm_3f_glywfm_pfnrn2_1oszvuo atm_26_zbnr2t_pfnrn2_1oszvuo atm_7l_jt7fhx_pfnrn2_1oszvuo atm_70_18bflhl_pfnrn2_1oszvuo atm_rd_8stvzk_pfnrn2 atm_3f_glywfm_1nos8r_uv4tnr atm_26_zbnr2t_1nos8r_uv4tnr atm_7l_177r58q_1nos8r_uv4tnr atm_rd_8stvzk_1nos8r_uv4tnr atm_3f_glywfm_4fughm_uv4tnr atm_26_1j28jx2_4fughm_uv4tnr atm_7l_9vytuy_4fughm_uv4tnr atm_3f_glywfm_csw3t1 atm_26_zbnr2t_csw3t1 atm_7l_177r58q_csw3t1 atm_3f_glywfm_1o5j5ji atm_26_1j28jx2_1o5j5ji atm_7l_9vytuy_1o5j5ji dir dir-ltr">
//                                     <div className="b1i40xu2 atm_g3_f6fqlb atm_gz_19bvopo_95nicl dir dir-ltr">
//                                         Clear all
//                                     </div>
//                                 </button>
//                                 <button className='btn btn-primary searchbtn_mob' type='submit'>
//                                     <img src="/images/magnifine.png" alt="" /> Search
//                                 </button>
//                             </footer>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default SearchMobile


import Link from 'next/link';
import React, { useState } from 'react';
import { addMonths, format, isBefore, startOfDay, isEqual, subMonths } from "date-fns";

const SearchMobile = () => {
    // destionation state 
    const [selectedDestination, setSelectedDestination] = useState('');

    // guest range state
    const [adultCount, setAdultCount] = useState(0);
    const [childCount, setChildCount] = useState(0);
    const [infrontCount, setInfrontCount] = useState(0);
    const [petsCount, setPetsCount] = useState(0);

    // date range state
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [dateRange, setDates] = useState({
        start_date: '',
        end_date: ''
    })

    // destination code 
    const handleDestinationSelect = (name) => {
        setSelectedDestination(name);
    };
    const Countries = [
        {
            name: 'I’m flexible',
            image: 'flex.jpg',
        },
        {
            name: 'Canada',
            image: 'canada.webp',
        },
        {
            name: 'United Arab Emirates',
            image: 'arab.jpg',
        },
        {
            name: 'Europe',
            image: 'europe.jpg',
        },
        {
            name: 'Africa',
            image: 'flex.jpg',
        },
        {
            name: 'United Kingdom',
            image: 'u-king.jpg',
        },
        {
            name: 'Asia',
            image: 'flex.jpg',
        },
        {
            name: 'United States',
            image: 'u-state.jpg',
        }
    ];

    // date range code 
    const onDateChange = (dates) => {
        setDates(dates);
    }
    const handleDateClick = (date) => {
        const selectedDate = startOfDay(date);

        if (!dateRange.start_date || (dateRange.start_date && dateRange.end_date)) {
            onDateChange({ start_date: selectedDate, end_date: undefined });
        } else if (isBefore(selectedDate, new Date(dateRange.start_date))) {
            onDateChange({ start_date: selectedDate, end_date: undefined });
        } else {
            onDateChange({ ...dateRange, end_date: selectedDate });
        }
    };
    const renderCalendar = (month) => {
        const today = startOfDay(new Date());
        const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
        const firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
        const days = [];

        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="day-cell"></div>);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(month.getFullYear(), month.getMonth(), i);
            const isSelected =
                (dateRange.start_date &&
                    new Date(dateRange.start_date).toDateString() === date.toDateString()) ||
                (dateRange.end_date &&
                    new Date(dateRange.end_date).toDateString() === date.toDateString());
            const isInRange =
                dateRange.start_date &&
                dateRange.end_date &&
                date > new Date(dateRange.start_date) &&
                date < new Date(dateRange.end_date);
            const isDisabled = isBefore(date, today);

            days.push(
                <button
                    key={i}
                    onClick={() => !isDisabled && handleDateClick(date)}
                    className={`day-cell ${isDisabled ? "disabled" : ""} ${isSelected ? "selected" : isInRange ? "in-range" : "hoverable"
                        }`}
                    disabled={isDisabled}
                >
                    {i}
                </button>
            );
        }

        return (
            <div className="calendar-container">
                <div className="month-title">{format(month, "MMMM yyyy")}</div>
                <div className="calendar-grid">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                        <div key={day} className="day-cell day-header">
                            {day}
                        </div>
                    ))}
                    {days}
                </div>
            </div>
        );
    };
    const disablePreviousButton = () => {
        return currentMonth.getMonth() === 0;
    };

    const ClearAll = () => {
        setSelectedDestination('');
        setAdultCount(0);
        setChildCount(0);
        setInfrontCount(0);
        setPetsCount(0);
        setDates('')
    }
    return (
        <>
            <div data-bs-toggle="modal" data-bs-target="#searchModal" className="form_mob s97awm atm_am_kb7nvz atm_5j_1pm7oz0 atm_7l_dezgoh atm_j6_8vuzuz atm_9s_11p5wf0 atm_h_1fhbwtr atm_8w_73ivac atm_gx_idpfg4 atm_vz_qft6q7 atm_ui_dava36 atm_uv_xoomkg s1upghlx atm_26_1p8m8iw atm_3f_1tyokbi atm_70_504m4t dir dir-ltr">
                <button type="button" className="l1ovpqvx atm_1he2i46_1k8pnbi_10saat9 atm_yxpdqi_1pv6nv4_10saat9 atm_1a0hdzc_w1h1e8_10saat9 atm_2bu6ew_929bqk_10saat9 atm_12oyo1u_73u7pn_10saat9 atm_fiaz40_1etamxe_10saat9 bfknzxl atm_9j_tlke0l atm_mk_h2mmj6 atm_70_5j5alw atm_tl_1gw4zv3 atm_9j_13gfvf7_1o5j5ji c1i81z0m atm_fr_11a07z3 atm_r2_1j28jx2 atm_26_1j28jx2 atm_3f_glywfm atm_7l_1kw7nm4 atm_gi_idpfg4 atm_l8_idpfg4 atm_r3_1kw7nm4 atm_rd_glywfm atm_e2_1osqo2v atm_vy_1osqo2v atm_bx_1kw7nm4 atm_c8_1kw7nm4 atm_g3_1kw7nm4 atm_cs_1kw7nm4 atm_kd_glywfm atm_h_1h6ojuz atm_9s_1n7usvw atm_j3_1osqo2v atm_uc_glywfm atm_vb_glywfm atm_5j_b4p6a2 atm_uc_glywfm__1rrf6b5 atm_kd_glywfm_1w3cfyq atm_3f_glywfm_e4a3ld atm_l8_idpfg4_e4a3ld atm_gi_idpfg4_e4a3ld atm_3f_glywfm_1r4qscq atm_kd_glywfm_6y7yyg atm_kd_glywfm_pfnrn2_1oszvuo atm_l8_idpfg4_1icshfk_1oszvuo atm_gi_idpfg4_1icshfk_1oszvuo atm_3f_glywfm_b5gff8_1oszvuo atm_kd_glywfm_2by9w9_1oszvuo atm_k4_kb7nvz_1o5j5ji atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_tr_glywfm_csw3t1 atm_uc_aaiy6o_1w3cfyq atm_70_1xvh5se_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_1xvh5se_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam s1pm3o7c atm_dz_rhb615 atm_lj_evh4rp atm_li_evh4rp dir dir-ltr">
                    <span className="su7l6qf atm_9s_11p5wf0 atm_mg_1h6ojuz dir dir-ltr">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="presentation" focusable="false" style={{ display: 'block', height: '20px', width: '20px', fill: 'currentColor' }}><path d="M13 0a13 13 0 0 1 10.5 20.67l7.91 7.92-2.82 2.82-7.92-7.91A12.94 12.94 0 0 1 13 26a13 13 0 1 1 0-26zm0 4a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"></path></svg>
                    </span>
                    <span className="m10pln4b atm_9s_1o8liyq atm_lk_yh40bf atm_j3_1osqo2v atm_ks_15vqwwr dir dir-ltr">
                        <div className="p1b4e8cr atm_c8_km0zk7 atm_fr_1m9t47k atm_cs_10d11i2 atm_g3_gktfv atm_9s_1ulexfb atm_ks_15vqwwr atm_sq_1l2sidv atm_vv_1q9ccgz dir dir-ltr">Where to?</div>
                        <div className="s1f5fdzj atm_9s_1txwivl atm_c8_1uc0753 atm_g3_lonqig atm_fr_r7vles atm_7l_1esdqks atm_li_p5ox87 atm_cx_14y27yu dir dir-ltr" >
                            <span className="s13th1u8 atm_am_1pywi5l atm_jb_12am3vd atm_ks_15vqwwr atm_sq_1l2sidv atm_vv_1q9ccgz dir dir-ltr">
                                {selectedDestination ? selectedDestination
                                    :
                                    'Anywhere'
                                }
                            </span>
                            <span >•</span>
                            <span className="s13th1u8 atm_am_1pywi5l atm_jb_12am3vd atm_ks_15vqwwr atm_sq_1l2sidv atm_vv_1q9ccgz dir dir-ltr">
                                {dateRange?.start_date && dateRange?.end_date ? (
                                    `${format(new Date(dateRange.start_date), "MMMM dd")} - ${format(new Date(dateRange.end_date), "MMMM dd")}`
                                ) : dateRange?.start_date ? (
                                    `${format(new Date(dateRange.start_date), "MMMM dd")}`
                                ) : (
                                    "Any week"
                                )}
                            </span>
                            <span >•</span>
                            <span className="s13th1u8 atm_am_1pywi5l atm_jb_12am3vd atm_ks_15vqwwr atm_sq_1l2sidv atm_vv_1q9ccgz dir dir-ltr">
                                {(adultCount > 0 || childCount > 0 || infrontCount > 0 || petsCount > 0) ?
                                    `${adultCount + childCount} guest${(adultCount + childCount) !== 1 ? 's' : ''}, ${infrontCount} infant${infrontCount !== 1 ? 's' : ''}, ${petsCount} pet${petsCount !== 1 ? 's' : ''}`
                                    :
                                    "Add guests"
                                }
                            </span>
                        </div>
                        <span className="a8jt5op atm_3f_idpfg4 atm_7h_hxbz6r atm_7i_ysn8ba atm_e2_t94yts atm_ks_zryt35 atm_l8_idpfg4 atm_mk_stnw88 atm_vv_1q9ccgz atm_vy_t94yts dir dir-ltr" id="searchInputDescriptionId">Currently showing Any week, Add guests. Change search.</span>
                    </span>
                </button>
            </div>

            <div className="modal fade" id="searchModal" tabIndex="-1" aria-labelledby="searchModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form className="modal-body">
                            <div className="accordion" id="accordionExample">
                                {/* destination area  */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button shadow-none bg-transparent text-black" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            <div tabIndex="-1" className="hpipapi atm_7l_1kw7nm4 atm_c8_1x4eueo atm_cs_1kw7nm4 atm_g3_1kw7nm4 atm_gi_idpfg4 atm_l8_idpfg4 atm_kd_idpfg4_pfnrn2 dir dir-ltr" >
                                                <div className="e3mxwuc atm_fr_kzfbxz atm_c8_11s2xic atm_g3_29gxgc atm_cs_19iasv6 atm_lj_4oy61j atm_li_4oy61j dir dir-ltr">
                                                    {selectedDestination ? selectedDestination
                                                        :
                                                        'Where to?'
                                                    }
                                                </div>
                                            </div>
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div className="pt-0 b6977yo atm_e2_1osqo2v atm_ld_p5ox87 atm_lc_p5ox87 atm_lj_n5iugv atm_li_n5iugv dir dir-ltr">
                                            <section className="h1ubsqwa atm_e2_1osqo2v dir dir-ltr">
                                                <div className="cenhzg5 atm_e2_1osqo2v dir dir-ltr">

                                                    <div className="boqzkyp atm_gp_1ixj6vq  dir dir-ltr">
                                                        <button type="button" className="l1ovpqvx atm_1he2i46_1k8pnbi_10saat9 atm_yxpdqi_1pv6nv4_10saat9 atm_1a0hdzc_w1h1e8_10saat9 atm_2bu6ew_929bqk_10saat9 atm_12oyo1u_73u7pn_10saat9 atm_fiaz40_1etamxe_10saat9 b175d0kc atm_9j_tlke0l atm_9s_1o8liyq atm_gi_idpfg4 atm_mk_h2mmj6 atm_rd_glywfm atm_70_5j5alw atm_7l_jt7fhx atm_tl_1gw4zv3 atm_9j_13gfvf7_1o5j5ji c1uvhr3t atm_bx_48h72j atm_c8_2x1prs atm_g3_1jbyh58 atm_fr_11a07z3 atm_cs_10d11i2 atm_kd_glywfm atm_uc_1lizyuv atm_r2_1j28jx2 atm_l8_1xmywv2 atm_e2_1wqb8tt atm_26_1p8m8iw atm_3f_qjnubg atm_5j_kitwna atm_r3_v2br90 atm_8w_1t7jgwy atm_uc_glywfm__1rrf6b5 atm_kd_glywfm_1w3cfyq atm_uc_aaiy6o_1w3cfyq atm_70_1b8lkes_1w3cfyq atm_3f_glywfm_e4a3ld atm_l8_idpfg4_e4a3ld atm_gi_idpfg4_e4a3ld atm_3f_glywfm_1r4qscq atm_kd_glywfm_6y7yyg atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_kd_glywfm_pfnrn2_1oszvuo atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_1b8lkes_pfnrn2_1oszvuo atm_3f_glywfm_1icshfk_1oszvuo atm_l8_idpfg4_1icshfk_1oszvuo atm_gi_idpfg4_1icshfk_1oszvuo atm_3f_glywfm_b5gff8_1oszvuo atm_kd_glywfm_2by9w9_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_tr_18md41p_csw3t1 atm_k4_kb7nvz_1o5j5ji f1yjg3j5 atm_vy_1osqo2v dir dir-ltr">
                                                            <span className="c3cyu4 atm_9s_1txwivl atm_ks_15vqwwr atm_h_1h6ojuz atm_fc_1y6m0gg atm_gi_idpfg4 atm_vv_1q9ccgz atm_84_19bvopo atm_e2_1osqo2v atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_cs_10d11i2 atm_7l_dezgoh dir dir-ltr">
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentColor', strokeWidth: '4', overflow: 'visible' }}><path fill="none" d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"></path></svg>
                                                                </span>

                                                                <input className='mob_search' value={selectedDestination} type="text" placeholder='Search destinations' />
                                                            </span>
                                                        </button>
                                                    </div>

                                                    <div className="c1kiv95n atm_gp_1gibeiw dir dir-ltr">
                                                        <div className="co891fj atm_gy_2bgklt atm_gx_2bgklt dir dir-ltr">
                                                            <div className="dbq73sc atm_9s_1txwivl atm_l0_15zigw atm_lj_gktfv atm_li_gktfv atm_cx_1gibeiw atm_p9_glywfm atm_9s_glywfm_14pyf7n dir dir-ltr">
                                                                {Countries?.map((item, index) => {
                                                                    return (
                                                                        <div key={index} onClick={() => handleDestinationSelect(item?.name)} className="dtd8ppw atm_73_usvi9m atm_e2_ngv8hl atm_h3_1y44olf atm_am_cw2zys atm_j3_qrq5vy dir dir-ltr">
                                                                            <div className="c1q1697z atm_9s_1txwivl atm_ar_1bp4okc atm_n5_1yuitx atm_l8_1y44olf atm_l8_ftgil2__oggzyc atm_5j_qe0vi4__oggzyc atm_2d_1s7alg2_1nos8r_1jiodmv dir dir-ltr">
                                                                                <button className="c1y2gkhb atm_9s_1o8liyq atm_9j_tlke0l atm_r3_1h6ojuz atm_3f_uuagnh atm_l8_idpfg4 atm_gi_idpfg4 atm_4b_rke8ap atm_7l_jt7fhx atm_bx_48h72j atm_mk_h2mmj6 atm_uq_17liqq3 atm_ui_1bljbuh atm_uv_xoomkg atm_kd_glywfm atm_5j_kitwna atm_e2_1wugsn5 atm_ks_zryt35 atm_vy_1osqo2v atm_1w_gbua2q atm_2d_rke8ap atm_g3_idpfg4 atm_r2_1j28jx2 atm_7l_177r58q_1nos8r_uv4tnr atm_4b_lb1gtz_1nos8r_uv4tnr atm_7l_177r58q_csw3t1 atm_4b_lb1gtz_csw3t1 atm_tr_ybgkrq_csw3t1 atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_70_15w7q17_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_15w7q17_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_uc_aaiy6o_1s76pf2 atm_70_15w7q17_1s76pf2 atm_uc_glywfm_1s76pf2_1rrf6b5 atm_uc_aaiy6o_1y5fnfe_1oszvuo atm_70_15w7q17_1y5fnfe_1oszvuo atm_uc_glywfm_1y5fnfe_1o31aam atm_4b_rke8ap_1nos8r_1jiodmv atm_4b_rke8ap_csw3t1_oggzyc dir dir-ltr" type="button">
                                                                                    <img src={`/images/${item?.image}`} className="i123w48w  atm_e2_1wugsn5 atm_vy_1osqo2v atm_1w_gbua2q atm_jp_1f51e7f dir dir-ltr" alt="" />
                                                                                </button>
                                                                                <div className="o18vo2mo atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_gw_1lkvw50 atm_ks_15vqwwr atm_sq_1l2sidv atm_vv_1q9ccgz dir dir-ltr" aria-hidden="true">
                                                                                    {item?.name}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>

                                {/* Date select area */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button className="accordion-button shadow-none bg-transparent text-black collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            <div tabIndex="-1" className="hpipapi atm_7l_1kw7nm4 atm_c8_1x4eueo atm_cs_1kw7nm4 atm_g3_1kw7nm4 atm_gi_idpfg4 atm_l8_idpfg4 atm_kd_idpfg4_pfnrn2 dir dir-ltr" >
                                                <div className="e3mxwuc atm_fr_kzfbxz atm_c8_11s2xic atm_g3_29gxgc atm_cs_19iasv6 atm_lj_4oy61j atm_li_4oy61j dir dir-ltr">
                                                    {dateRange?.start_date && dateRange?.end_date ? (
                                                        `${format(new Date(dateRange.start_date), "MMMM dd")} - ${format(new Date(dateRange.end_date), "MMMM dd")}`
                                                    ) : dateRange?.start_date ? (
                                                        `${format(new Date(dateRange.start_date), "MMMM dd")}`
                                                    ) : (
                                                        "When’s your trip?"
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                        <div className="popover-container position-static shadow-none">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <button
                                                    className="button_change"
                                                    onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                                                    disabled={disablePreviousButton()} // Disable previous button if it's January
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" /></svg>            </button>
                                                <button
                                                    className="button_change"
                                                    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" /></svg>
                                                </button>
                                            </div>
                                            <div className="row_date_picker">
                                                {renderCalendar(currentMonth)}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Guest select area  */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button className="accordion-button shadow-none bg-transparent text-black collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            <div tabIndex="-1" className="hpipapi atm_7l_1kw7nm4 atm_c8_1x4eueo atm_cs_1kw7nm4 atm_g3_1kw7nm4 atm_gi_idpfg4 atm_l8_idpfg4 atm_kd_idpfg4_pfnrn2 dir dir-ltr" >
                                                <div className="e3mxwuc atm_fr_kzfbxz atm_c8_11s2xic atm_g3_29gxgc atm_cs_19iasv6 atm_lj_4oy61j atm_li_4oy61j dir dir-ltr">
                                                    {(adultCount > 0 || childCount > 0 || infrontCount > 0 || petsCount > 0) ?
                                                        `${adultCount + childCount} guest${(adultCount + childCount) !== 1 ? 's' : ''}, ${infrontCount} infant${infrontCount !== 1 ? 's' : ''}, ${petsCount} pet${petsCount !== 1 ? 's' : ''}`
                                                        :
                                                        "Who’s coming?"
                                                    }
                                                </div>
                                            </div>
                                        </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <div className="g6e6z5i atm_l8_14br1z3 dir dir-ltr">

                                                <div className="cnhxj7b atm_7l_dezgoh atm_9s_1txwivl atm_h_1h6ojuz atm_fc_1yb4nlp atm_be_1g80g66 atm_cx_19bvopo atm_lb_1drp7u0 atm_ll_2p0wge atm_40_1f9jazd_1i0dyc0 atm_jb_p2n4d6__oggzyc atm_lb_1crvktv__oggzyc dir dir-ltr">
                                                    <section>
                                                        <div className="tjx911r atm_7l_dezgoh atm_cs_10d11i2 atm_9s_1aaaxdl atm_lc_idpfg4 t1676ied atm_c8_2x1prs atm_g3_1jbyh58 atm_fr_11a07z3 dir dir-ltr">
                                                            <h3 id="searchFlow-title-label-adults" tabIndex="-1" className="hpipapi atm_7l_1kw7nm4 atm_c8_1x4eueo atm_cs_1kw7nm4 atm_g3_1kw7nm4 atm_gi_idpfg4 atm_l8_idpfg4 atm_kd_idpfg4_pfnrn2 dir dir-ltr">
                                                                Adults
                                                            </h3>
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
                                                            <h3 id="searchFlow-title-label-children" tabIndex="-1" className="hpipapi atm_7l_1kw7nm4 atm_c8_1x4eueo atm_cs_1kw7nm4 atm_g3_1kw7nm4 atm_gi_idpfg4 atm_l8_idpfg4 atm_kd_idpfg4_pfnrn2 dir dir-ltr">
                                                                Children
                                                            </h3>
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
                                                            <h3 id="searchFlow-title-label-infants" tabIndex="-1" className="hpipapi atm_7l_1kw7nm4 atm_c8_1x4eueo atm_cs_1kw7nm4 atm_g3_1kw7nm4 atm_gi_idpfg4 atm_l8_idpfg4 atm_kd_idpfg4_pfnrn2 dir dir-ltr" elementtiming="LCP-target">Infants</h3>
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
                                                            <h3 id="searchFlow-title-label-pets" tabIndex="-1" className="hpipapi atm_7l_1kw7nm4 atm_c8_1x4eueo atm_cs_1kw7nm4 atm_g3_1kw7nm4 atm_gi_idpfg4 atm_l8_idpfg4 atm_kd_idpfg4_pfnrn2 dir dir-ltr" elementtiming="LCP-target">
                                                                Pets
                                                            </h3>
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

                            <footer className="fj81y0n atm_67_1e9224w atm_9s_1txwivl atm_fc_1yb4nlp atm_l8_1lzldkb atm_26_sw29y8 atm_bb_idpfg4 dir dir-ltr">
                                <button type="button" onClick={ClearAll} className="l1ovpqvx atm_1he2i46_1k8pnbi_10saat9 atm_yxpdqi_1pv6nv4_10saat9 atm_1a0hdzc_w1h1e8_10saat9 atm_2bu6ew_929bqk_10saat9 atm_12oyo1u_73u7pn_10saat9 atm_fiaz40_1etamxe_10saat9 be3uexp atm_9j_tlke0l atm_9s_1o8liyq atm_gi_idpfg4 atm_mk_h2mmj6 atm_r3_1h6ojuz atm_70_5j5alw atm_vy_1wugsn5 atm_tl_1gw4zv3 atm_9j_13gfvf7_1o5j5ji c1kqzsh2 atm_bx_48h72j atm_c8_2x1prs atm_g3_1jbyh58 atm_fr_11a07z3 atm_cs_10d11i2 atm_5j_t09oo2 atm_kd_glywfm atm_uc_1lizyuv atm_r2_1j28jx2 atm_jb_1fkumsa atm_3f_glywfm atm_26_1j28jx2 atm_7l_jt7fhx atm_rd_8stvzk atm_9xn0br_1wugsn5 atm_9tnf0v_1wugsn5 atm_7o60g0_1wugsn5 atm_gz_14idwd0 atm_h0_14idwd0 atm_l8_19bvopo atm_8w_1t7jgwy atm_uc_glywfm__1rrf6b5 atm_kd_glywfm_1w3cfyq atm_uc_aaiy6o_1w3cfyq atm_3f_glywfm_e4a3ld atm_l8_idpfg4_e4a3ld atm_gi_idpfg4_e4a3ld atm_3f_glywfm_1r4qscq atm_kd_glywfm_6y7yyg atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_kd_glywfm_pfnrn2_1oszvuo atm_uc_aaiy6o_pfnrn2_1oszvuo atm_3f_glywfm_1icshfk_1oszvuo atm_l8_idpfg4_1icshfk_1oszvuo atm_gi_idpfg4_1icshfk_1oszvuo atm_3f_glywfm_b5gff8_1oszvuo atm_kd_glywfm_2by9w9_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_tr_18md41p_csw3t1 atm_k4_kb7nvz_1o5j5ji atm_3f_glywfm_1w3cfyq atm_26_zbnr2t_1w3cfyq atm_7l_jt7fhx_1w3cfyq atm_70_18bflhl_1w3cfyq atm_3f_glywfm_pfnrn2_1oszvuo atm_26_zbnr2t_pfnrn2_1oszvuo atm_7l_jt7fhx_pfnrn2_1oszvuo atm_70_18bflhl_pfnrn2_1oszvuo atm_rd_8stvzk_pfnrn2 atm_3f_glywfm_1nos8r_uv4tnr atm_26_zbnr2t_1nos8r_uv4tnr atm_7l_177r58q_1nos8r_uv4tnr atm_rd_8stvzk_1nos8r_uv4tnr atm_3f_glywfm_4fughm_uv4tnr atm_26_1j28jx2_4fughm_uv4tnr atm_7l_9vytuy_4fughm_uv4tnr atm_3f_glywfm_csw3t1 atm_26_zbnr2t_csw3t1 atm_7l_177r58q_csw3t1 atm_3f_glywfm_1o5j5ji atm_26_1j28jx2_1o5j5ji atm_7l_9vytuy_1o5j5ji dir dir-ltr">
                                    <div className="b1i40xu2 atm_g3_f6fqlb atm_gz_19bvopo_95nicl dir dir-ltr">
                                        Clear all
                                    </div>
                                </button>
                                <button className='btn btn-primary searchbtn_mob' type='submit'>
                                    <img src="/images/magnifine.png" alt="" /> Search
                                </button>
                            </footer>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchMobile