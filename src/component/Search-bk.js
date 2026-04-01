// import Link from 'next/link';
// import { useState, useEffect } from 'react';

// const Search = () => {
//   const [isActive, setIsActive] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [adultCount, setAdultCount] = useState(0);
//   const [childCount, setChildCount] = useState(0);
//   const [infrontCount, setInfrontCount] = useState(0);
//   const [petsCount, setPetsCount] = useState(0);
//   const [counterModel, setCounterModal] = useState(false);

//   useEffect(() => {
//     const inputElement = document.getElementById('bigsearch-query-location-input');

//     const handleFocus = () => setIsActive(true);
//     const handleBlur = () => setIsActive(false);

//     inputElement.addEventListener('focus', handleFocus);
//     inputElement.addEventListener('blur', handleBlur);

//     // Cleanup event listeners on component unmount
//     return () => {
//       inputElement.removeEventListener('focus', handleFocus);
//       inputElement.removeEventListener('blur', handleBlur);
//     };
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 150) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);



//   const toggleMoreLinks = () => {
//     setCounterModal(!counterModel);
// };

//   return (
//     <>
//       <div className={` ${isScrolled ? 'StickElement' : ''}`}>
//         <form className="form_web f114qjlg atm_gi_xjk4d9 atm_j3_1an8f3t dir dir-ltr">
//           <div id="search-tabpanel" className="cbb5b2h atm_5j_1vi7ecw atm_7l_dezgoh atm_9s_1txwivl atm_e2_1k4yqc2 atm_mk_h2mmj6 atm_vy_1osqo2v atm_kd_glywfm atm_2d_1qf8lb3 atm_3f_1vlbu9m atm_70_i67ecm c12eo2r8 atm_u5paz6_1p8m8iw atm_mu5wzz_1s7alg2 atm_yo3zfk_1esdqks dir dir-ltr">
//             <div className="ir2ixub atm_9s_1txwivl atm_h_1h6ojuz atm_am_163v1yp atm_e2_1osqo2v atm_jb_idpfg4 atm_mj_1wugsn5 dir dir-ltr">
//               <div className="qam9yc8 atm_am_iqcgjs atm_jb_idpfg4 atm_am_j1sv9b__1v156lz dir dir-ltr">
//                 {/*locatio search input */}
//                 <div className="i1iy0ljo atm_mk_h2mmj6 atm_h_1h6ojuz atm_9s_1txwivl atm_am_qk3dho atm_gi_1n1ank9 atm_jb_idpfg4 dir dir-ltr">
//                   <label className="fix_row ihcg2em atm_9j_tlke0l atm_9s_1ulexfb atm_2a_1u8qnfj atm_3f_okh77k atm_5j_1vi7ecw atm_am_qk3dho atm_jb_idpfg4 atm_l8_2zoau0 atm_6h_1s2714j_vmtskl atm_66_nqa18y_vmtskl atm_4b_1egtlkw_vmtskl atm_5e_idpfg4_vmtskl atm_92_1yyfdc7_vmtskl atm_9s_glywfm_vmtskl atm_e2_1vi7ecw_vmtskl atm_h3_4h84z3_vmtskl atm_mk_stnw88_vmtskl atm_n3_idpfg4_vmtskl atm_tk_1ssbidh_vmtskl atm_wq_idpfg4_vmtskl atm_2a_1u8qnfj_9in345 atm_3f_okh77k_9in345 atm_5j_1vi7ecw_9in345 atm_6i_idpfg4_9in345 atm_92_1yyfdc7_9in345 atm_fq_idpfg4_9in345 atm_mk_stnw88_9in345 atm_n3_idpfg4_9in345 atm_tk_idpfg4_9in345 atm_wq_idpfg4_9in345 i1w7syu0 atm_9s_1ulexfb_1rqz0hn atm_h0_yh40bf_9bj8xt atm_2d_um1unu_9bj8xt atm_9s_1ulexfb_1jy6zas atm_2d_1p8m8iw_1joo1sn atm_4b_1p8m8iw_1joo1sn atm_70_d987b7_1joo1sn atm_fq_idpfg4_1joo1sn atm_n3_idpfg4_1joo1sn atm_h0_yh40bf_1joo1sn dir dir-ltr">
//                     <div>
//                       <img className='form_icon' height={30} src="/images/location.png" alt="" />
//                     </div>
//                     <div className="i18libcr atm_mk_h2mmj6 atm_wq_kb7nvz dir dir-ltr">
//                       <div className="ikfcax3 atm_c8_1uc0753 atm_g3_lonqig atm_fr_r7vles atm_cs_10d11i2 atm_le_yh40bf dir dir-ltr">
//                         Where
//                       </div>
//                       <input autoComplete="off" autoCorrect="off" spellCheck="false" id="bigsearch-query-location-input" type="search" placeholder="Search destinations" className="i18z192n atm_9s_1ulexfb atm_3f_idpfg4 atm_gi_idpfg4 atm_l8_idpfg4 atm_vy_1osqo2v atm_26_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_cs_10d11i2 atm_7l_dezgoh atm_sq_1l2sidv atm_c8_km0zk7_17x46du atm_g3_18khvle_17x46du atm_fr_1m9t47k_17x46du atm_cs_6adqpa_17x46du atm_c8_km0zk7_y5ttn9 atm_g3_18khvle_y5ttn9 atm_fr_1m9t47k_y5ttn9 atm_cs_6adqpa_y5ttn9 atm_c8_km0zk7_1k1obal atm_g3_18khvle_1k1obal atm_fr_1m9t47k_1k1obal atm_cs_6adqpa_1k1obal atm_c8_km0zk7_m14rgb atm_g3_18khvle_m14rgb atm_fr_1m9t47k_m14rgb atm_cs_6adqpa_m14rgb atm_c8_km0zk7_3ykvna atm_g3_18khvle_3ykvna atm_fr_1m9t47k_3ykvna atm_cs_6adqpa_3ykvna atm_9s_glywfm_16s2r6p atm_kd_glywfm_pfnrn2 atm_ll_1fwxnve_c2x6ez iupdi7y atm_7l_1jsbn00_17x46du atm_7l_1jsbn00_y5ttn9 atm_7l_1jsbn00_1k1obal atm_7l_1jsbn00_m14rgb atm_7l_1jsbn00_3ykvna dir dir-ltr" />
//                     </div>
//                   </label>
//                 </div>
//                 {/*locatio search input */}

//                 {/* location popup */}
//                 <div className={`search_where ${isActive ? 'active' : ''} coy2xq9 atm_mk_stnw88 atm_tk_1osqo2v atm_26_1p8m8iw atm_5j_1vi7ecw atm_70_z3lat3 atm_gp_1fwxnve atm_iy_1xor2vp atm_l0_15vqwwr atm_l1_1wugsn5 atm_l2_1f51e7f atm_lb_4n2dxu atm_lh_swyrjs l1hvhoo atm_fq_idpfg4 hwzl8dt atm_vl_i-15vqwwr atm_mj_i-glywfm atm_k4_idpfg4 b7815u5 atm_wq_kb7nvz atm_8rg8tq_1ixj6vq atm_5sxl3l_uuw12j atm_5sxl3l_1w81w6r__1v156lz b552ge3 atm_vy_1ssbidh atm_jb_13hw3cp im0ru76 atm_anyfd1_15cdnaj atm_ypb0rd_p5ox87 dir dir-ltr`}>
//                   <div className=" dir dir-ltr" id="locationInspirationsSectionID">

//                     <div className="c1uycpqq atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_cs_19iasv6 atm_go_1ixj6vq atm_gy_1yuitx dir dir-ltr">
//                       Search by region
//                     </div>

//                     <div className="dttmvf5 atm_9s_11p5wf0 atm_n5_i2wt44 atm_d7_idpfg4 atm_ks_15vqwwr atm_dz_zk4kx0 atm_e0_988hr2 dir dir-ltr">

//                       <div className="c1q1697z atm_9s_1txwivl atm_ar_1bp4okc atm_n5_1yuitx atm_l8_1y44olf atm_l8_ftgil2__oggzyc atm_5j_qe0vi4__oggzyc atm_2d_1s7alg2_1nos8r_1jiodmv dir dir-ltr">

//                         <button className="c1y2gkhb atm_9s_1o8liyq atm_9j_tlke0l atm_r3_1h6ojuz atm_3f_uuagnh atm_l8_idpfg4 atm_gi_idpfg4 atm_4b_rke8ap atm_7l_jt7fhx atm_bx_48h72j atm_mk_h2mmj6 atm_uq_17liqq3 atm_ui_1bljbuh atm_uv_xoomkg atm_kd_glywfm atm_5j_kitwna atm_e2_1wugsn5 atm_ks_zryt35 atm_vy_1osqo2v atm_1w_gbua2q atm_2d_rke8ap atm_g3_idpfg4 atm_r2_1j28jx2 atm_7l_177r58q_1nos8r_uv4tnr atm_4b_lb1gtz_1nos8r_uv4tnr atm_7l_177r58q_csw3t1 atm_4b_lb1gtz_csw3t1 atm_tr_ybgkrq_csw3t1 atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_70_15w7q17_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_15w7q17_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_uc_aaiy6o_1s76pf2 atm_70_15w7q17_1s76pf2 atm_uc_glywfm_1s76pf2_1rrf6b5 atm_uc_aaiy6o_1y5fnfe_1oszvuo atm_70_15w7q17_1y5fnfe_1oszvuo atm_uc_glywfm_1y5fnfe_1o31aam atm_4b_rke8ap_1nos8r_1jiodmv atm_4b_rke8ap_csw3t1_oggzyc dir dir-ltr" type="button">
//                           <img className="i123w48w  atm_e2_1wugsn5 atm_vy_1osqo2v atm_1w_gbua2q atm_jp_1f51e7f dir dir-ltr" alt="" src="/images/flex.jpg" />
//                         </button>

//                         <div className="o18vo2mo atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_gw_1lkvw50 atm_ks_15vqwwr atm_sq_1l2sidv atm_vv_1q9ccgz dir dir-ltr">
//                           I’m flexible
//                         </div>

//                       </div>

//                       <div className="c1q1697z atm_9s_1txwivl atm_ar_1bp4okc atm_n5_1yuitx atm_l8_1y44olf atm_l8_ftgil2__oggzyc atm_5j_qe0vi4__oggzyc atm_2d_1s7alg2_1nos8r_1jiodmv dir dir-ltr">

//                         <button className="c1y2gkhb atm_9s_1o8liyq atm_9j_tlke0l atm_r3_1h6ojuz atm_3f_uuagnh atm_l8_idpfg4 atm_gi_idpfg4 atm_4b_rke8ap atm_7l_jt7fhx atm_bx_48h72j atm_mk_h2mmj6 atm_uq_17liqq3 atm_ui_1bljbuh atm_uv_xoomkg atm_kd_glywfm atm_5j_kitwna atm_e2_1wugsn5 atm_ks_zryt35 atm_vy_1osqo2v atm_1w_gbua2q atm_2d_rke8ap atm_g3_idpfg4 atm_r2_1j28jx2 atm_7l_177r58q_1nos8r_uv4tnr atm_4b_lb1gtz_1nos8r_uv4tnr atm_7l_177r58q_csw3t1 atm_4b_lb1gtz_csw3t1 atm_tr_ybgkrq_csw3t1 atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_70_15w7q17_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_15w7q17_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_uc_aaiy6o_1s76pf2 atm_70_15w7q17_1s76pf2 atm_uc_glywfm_1s76pf2_1rrf6b5 atm_uc_aaiy6o_1y5fnfe_1oszvuo atm_70_15w7q17_1y5fnfe_1oszvuo atm_uc_glywfm_1y5fnfe_1o31aam atm_4b_rke8ap_1nos8r_1jiodmv atm_4b_rke8ap_csw3t1_oggzyc dir dir-ltr" type="button">
//                           <img className="i123w48w  atm_e2_1wugsn5 atm_vy_1osqo2v atm_1w_gbua2q atm_jp_1f51e7f dir dir-ltr" alt="" src="/images/canada.webp" />
//                         </button>

//                         <div className="o18vo2mo atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_gw_1lkvw50 atm_ks_15vqwwr atm_sq_1l2sidv atm_vv_1q9ccgz dir dir-ltr">
//                           Canada
//                         </div>

//                       </div>

//                       <div className="c1q1697z atm_9s_1txwivl atm_ar_1bp4okc atm_n5_1yuitx atm_l8_1y44olf atm_l8_ftgil2__oggzyc atm_5j_qe0vi4__oggzyc atm_2d_1s7alg2_1nos8r_1jiodmv dir dir-ltr">

//                         <button className="c1y2gkhb atm_9s_1o8liyq atm_9j_tlke0l atm_r3_1h6ojuz atm_3f_uuagnh atm_l8_idpfg4 atm_gi_idpfg4 atm_4b_rke8ap atm_7l_jt7fhx atm_bx_48h72j atm_mk_h2mmj6 atm_uq_17liqq3 atm_ui_1bljbuh atm_uv_xoomkg atm_kd_glywfm atm_5j_kitwna atm_e2_1wugsn5 atm_ks_zryt35 atm_vy_1osqo2v atm_1w_gbua2q atm_2d_rke8ap atm_g3_idpfg4 atm_r2_1j28jx2 atm_7l_177r58q_1nos8r_uv4tnr atm_4b_lb1gtz_1nos8r_uv4tnr atm_7l_177r58q_csw3t1 atm_4b_lb1gtz_csw3t1 atm_tr_ybgkrq_csw3t1 atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_70_15w7q17_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_15w7q17_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_uc_aaiy6o_1s76pf2 atm_70_15w7q17_1s76pf2 atm_uc_glywfm_1s76pf2_1rrf6b5 atm_uc_aaiy6o_1y5fnfe_1oszvuo atm_70_15w7q17_1y5fnfe_1oszvuo atm_uc_glywfm_1y5fnfe_1o31aam atm_4b_rke8ap_1nos8r_1jiodmv atm_4b_rke8ap_csw3t1_oggzyc dir dir-ltr" type="button">
//                           <img className="i123w48w  atm_e2_1wugsn5 atm_vy_1osqo2v atm_1w_gbua2q atm_jp_1f51e7f dir dir-ltr" alt="" src="/images/arab.jpg" />
//                         </button>

//                         <div className="o18vo2mo atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_gw_1lkvw50 atm_ks_15vqwwr atm_sq_1l2sidv atm_vv_1q9ccgz dir dir-ltr">
//                           United Arab Emirates
//                         </div>

//                       </div>

//                       <div className="c1q1697z atm_9s_1txwivl atm_ar_1bp4okc atm_n5_1yuitx atm_l8_1y44olf atm_l8_ftgil2__oggzyc atm_5j_qe0vi4__oggzyc atm_2d_1s7alg2_1nos8r_1jiodmv dir dir-ltr">

//                         <button className="c1y2gkhb atm_9s_1o8liyq atm_9j_tlke0l atm_r3_1h6ojuz atm_3f_uuagnh atm_l8_idpfg4 atm_gi_idpfg4 atm_4b_rke8ap atm_7l_jt7fhx atm_bx_48h72j atm_mk_h2mmj6 atm_uq_17liqq3 atm_ui_1bljbuh atm_uv_xoomkg atm_kd_glywfm atm_5j_kitwna atm_e2_1wugsn5 atm_ks_zryt35 atm_vy_1osqo2v atm_1w_gbua2q atm_2d_rke8ap atm_g3_idpfg4 atm_r2_1j28jx2 atm_7l_177r58q_1nos8r_uv4tnr atm_4b_lb1gtz_1nos8r_uv4tnr atm_7l_177r58q_csw3t1 atm_4b_lb1gtz_csw3t1 atm_tr_ybgkrq_csw3t1 atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_70_15w7q17_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_15w7q17_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_uc_aaiy6o_1s76pf2 atm_70_15w7q17_1s76pf2 atm_uc_glywfm_1s76pf2_1rrf6b5 atm_uc_aaiy6o_1y5fnfe_1oszvuo atm_70_15w7q17_1y5fnfe_1oszvuo atm_uc_glywfm_1y5fnfe_1o31aam atm_4b_rke8ap_1nos8r_1jiodmv atm_4b_rke8ap_csw3t1_oggzyc dir dir-ltr" type="button">
//                           <img className="i123w48w  atm_e2_1wugsn5 atm_vy_1osqo2v atm_1w_gbua2q atm_jp_1f51e7f dir dir-ltr" alt="" src="/images/europe.jpg" />
//                         </button>

//                         <div className="o18vo2mo atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_gw_1lkvw50 atm_ks_15vqwwr atm_sq_1l2sidv atm_vv_1q9ccgz dir dir-ltr">
//                           Europe
//                         </div>

//                       </div>

//                       <div className="c1q1697z atm_9s_1txwivl atm_ar_1bp4okc atm_n5_1yuitx atm_l8_1y44olf atm_l8_ftgil2__oggzyc atm_5j_qe0vi4__oggzyc atm_2d_1s7alg2_1nos8r_1jiodmv dir dir-ltr">

//                         <button className="c1y2gkhb atm_9s_1o8liyq atm_9j_tlke0l atm_r3_1h6ojuz atm_3f_uuagnh atm_l8_idpfg4 atm_gi_idpfg4 atm_4b_rke8ap atm_7l_jt7fhx atm_bx_48h72j atm_mk_h2mmj6 atm_uq_17liqq3 atm_ui_1bljbuh atm_uv_xoomkg atm_kd_glywfm atm_5j_kitwna atm_e2_1wugsn5 atm_ks_zryt35 atm_vy_1osqo2v atm_1w_gbua2q atm_2d_rke8ap atm_g3_idpfg4 atm_r2_1j28jx2 atm_7l_177r58q_1nos8r_uv4tnr atm_4b_lb1gtz_1nos8r_uv4tnr atm_7l_177r58q_csw3t1 atm_4b_lb1gtz_csw3t1 atm_tr_ybgkrq_csw3t1 atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_70_15w7q17_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_15w7q17_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_uc_aaiy6o_1s76pf2 atm_70_15w7q17_1s76pf2 atm_uc_glywfm_1s76pf2_1rrf6b5 atm_uc_aaiy6o_1y5fnfe_1oszvuo atm_70_15w7q17_1y5fnfe_1oszvuo atm_uc_glywfm_1y5fnfe_1o31aam atm_4b_rke8ap_1nos8r_1jiodmv atm_4b_rke8ap_csw3t1_oggzyc dir dir-ltr" type="button">
//                           <img className="i123w48w  atm_e2_1wugsn5 atm_vy_1osqo2v atm_1w_gbua2q atm_jp_1f51e7f dir dir-ltr" alt="" src="/images/u-king.jpg" />
//                         </button>

//                         <div className="o18vo2mo atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_gw_1lkvw50 atm_ks_15vqwwr atm_sq_1l2sidv atm_vv_1q9ccgz dir dir-ltr">
//                           United Kingdom
//                         </div>

//                       </div>

//                       <div className="c1q1697z atm_9s_1txwivl atm_ar_1bp4okc atm_n5_1yuitx atm_l8_1y44olf atm_l8_ftgil2__oggzyc atm_5j_qe0vi4__oggzyc atm_2d_1s7alg2_1nos8r_1jiodmv dir dir-ltr">
//                         <button className="c1y2gkhb atm_9s_1o8liyq atm_9j_tlke0l atm_r3_1h6ojuz atm_3f_uuagnh atm_l8_idpfg4 atm_gi_idpfg4 atm_4b_rke8ap atm_7l_jt7fhx atm_bx_48h72j atm_mk_h2mmj6 atm_uq_17liqq3 atm_ui_1bljbuh atm_uv_xoomkg atm_kd_glywfm atm_5j_kitwna atm_e2_1wugsn5 atm_ks_zryt35 atm_vy_1osqo2v atm_1w_gbua2q atm_2d_rke8ap atm_g3_idpfg4 atm_r2_1j28jx2 atm_7l_177r58q_1nos8r_uv4tnr atm_4b_lb1gtz_1nos8r_uv4tnr atm_7l_177r58q_csw3t1 atm_4b_lb1gtz_csw3t1 atm_tr_ybgkrq_csw3t1 atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_70_15w7q17_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_15w7q17_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_uc_aaiy6o_1s76pf2 atm_70_15w7q17_1s76pf2 atm_uc_glywfm_1s76pf2_1rrf6b5 atm_uc_aaiy6o_1y5fnfe_1oszvuo atm_70_15w7q17_1y5fnfe_1oszvuo atm_uc_glywfm_1y5fnfe_1o31aam atm_4b_rke8ap_1nos8r_1jiodmv atm_4b_rke8ap_csw3t1_oggzyc dir dir-ltr" type="button">
//                           <img className="i123w48w  atm_e2_1wugsn5 atm_vy_1osqo2v atm_1w_gbua2q atm_jp_1f51e7f dir dir-ltr" alt="" src="/images/u-state.jpg" />
//                         </button>
//                         <div className="o18vo2mo atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_gw_1lkvw50 atm_ks_15vqwwr atm_sq_1l2sidv atm_vv_1q9ccgz dir dir-ltr">
//                           United States
//                         </div>
//                       </div>

//                     </div>
//                   </div>
//                 </div>
//                 {/* location popup */}
//               </div>

//               <div className="s1w513da atm_j_1h6ojuz atm_5q_1vlbu9m atm_am_jp9ccn atm_e2_1vi7ecw dir dir-ltr"></div>

//               {/* check in check out */}
//               <div className="cwk1mic atm_9s_1txwivl atm_am_eqk4pz atm_jb_idpfg4 dir dir-ltr">
//                 <div className="c1ddhymz atm_am_16wc86f atm_h_1h6ojuz atm_9s_1txwivl atm_gi_1n1ank9 atm_jb_idpfg4 atm_mk_h2mmj6 atm_vy_10bmcub dir dir-ltr">
//                   <div className="fix_row b1spesa7 atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_7l_1kw7nm4 atm_9j_tlke0l atm_bx_1kw7nm4 atm_c8_1kw7nm4 atm_cs_1kw7nm4 atm_g3_1kw7nm4 atm_gi_idpfg4 atm_ks_ewfl5b atm_rd_glywfm atm_vb_1wugsn5 atm_kd_glywfm atm_9s_1ulexfb atm_am_qk3dho atm_l8_t94yts atm_r3_1e5hqsa atm_vy_idpfg4 atm_wq_kb7nvz atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_6h_1s2714j_vmtskl atm_66_nqa18y_vmtskl atm_4b_1egtlkw_vmtskl atm_92_1yyfdc7_vmtskl atm_9s_glywfm_vmtskl atm_e2_1vi7ecw_vmtskl atm_fq_idpfg4_vmtskl atm_h3_4h84z3_vmtskl atm_mk_stnw88_vmtskl atm_n3_idpfg4_vmtskl atm_tk_1ssbidh_vmtskl atm_wq_idpfg4_vmtskl atm_2a_1u8qnfj_9in345 atm_3f_okh77k_9in345 atm_5j_1vi7ecw_9in345 atm_6i_idpfg4_9in345 atm_92_1yyfdc7_9in345 atm_fq_idpfg4_9in345 atm_mk_stnw88_9in345 atm_n3_idpfg4_9in345 atm_tk_idpfg4_9in345 atm_wq_idpfg4_9in345 b1fbhdca atm_9s_1ulexfb_1rqz0hn atm_gi_eflcwz_9bj8xt atm_2d_um1unu_9bj8xt atm_wq_cs5v99_1w3cfyq atm_9s_1ulexfb_9xuho3 atm_uc_aaiy6o_1tasb51 atm_4b_dezgoh_1tasb51 atm_70_1t2bbnk_1tasb51 atm_gi_eflcwz_1tasb51 atm_uc_glywfm_1tasb51_1rrf6b5 atm_wq_cs5v99_pfnrn2_1oszvuo atm_9s_1ulexfb_1buez3b_1oszvuo atm_uc_aaiy6o_1fu4lp4_1oszvuo atm_4b_dezgoh_1fu4lp4_1oszvuo atm_70_1t2bbnk_1fu4lp4_1oszvuo atm_gi_eflcwz_1fu4lp4_1oszvuo atm_uc_glywfm_1fu4lp4_1o31aam dir dir-ltr">
//                     <div>
//                       <img className='form_icon' height={30} src="/images/checkin.png" alt="" />
//                     </div>
//                     <div className="cz9siyu atm_l8_srw7uq atm_ks_15vqwwr atm_mk_h2mmj6 atm_vv_1q9ccgz atm_vy_1osqo2v atm_wq_kb7nvz dir dir-ltr">
//                       <div className="lk4ruxu atm_c8_1uc0753 atm_g3_lonqig atm_cs_10d11i2 atm_fr_idpfg4 atm_le_yh40bf dir dir-ltr">
//                         Check in
//                       </div>
//                       <div className="p1m42al0 atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_cs_6adqpa atm_ks_15vqwwr atm_sq_1l2sidv atm_vy_1osqo2v p1t4vwjw atm_7l_1jsbn00 dir dir-ltr">
//                         Add dates
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="s1w513da atm_j_1h6ojuz atm_5q_1vlbu9m atm_am_jp9ccn atm_e2_1vi7ecw dir dir-ltr"></div>

//                 <div className="c1ddhymz atm_am_16wc86f atm_h_1h6ojuz atm_9s_1txwivl atm_gi_1n1ank9 atm_jb_idpfg4 atm_mk_h2mmj6 atm_vy_10bmcub dir dir-ltr">
//                   <div className="fix_row b1spesa7 atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_7l_1kw7nm4 atm_9j_tlke0l atm_bx_1kw7nm4 atm_c8_1kw7nm4 atm_cs_1kw7nm4 atm_g3_1kw7nm4 atm_gi_idpfg4 atm_ks_ewfl5b atm_rd_glywfm atm_vb_1wugsn5 atm_kd_glywfm atm_9s_1ulexfb atm_am_qk3dho atm_l8_t94yts atm_r3_1e5hqsa atm_vy_idpfg4 atm_wq_kb7nvz atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_6h_1s2714j_vmtskl atm_66_nqa18y_vmtskl atm_4b_1egtlkw_vmtskl atm_92_1yyfdc7_vmtskl atm_9s_glywfm_vmtskl atm_e2_1vi7ecw_vmtskl atm_fq_idpfg4_vmtskl atm_h3_4h84z3_vmtskl atm_mk_stnw88_vmtskl atm_n3_idpfg4_vmtskl atm_tk_1ssbidh_vmtskl atm_wq_idpfg4_vmtskl atm_2a_1u8qnfj_9in345 atm_3f_okh77k_9in345 atm_5j_1vi7ecw_9in345 atm_6i_idpfg4_9in345 atm_92_1yyfdc7_9in345 atm_fq_idpfg4_9in345 atm_mk_stnw88_9in345 atm_n3_idpfg4_9in345 atm_tk_idpfg4_9in345 atm_wq_idpfg4_9in345 b1fbhdca atm_9s_1ulexfb_1rqz0hn atm_gi_eflcwz_9bj8xt atm_2d_um1unu_9bj8xt atm_wq_cs5v99_1w3cfyq atm_9s_1ulexfb_9xuho3 atm_uc_aaiy6o_1tasb51 atm_4b_dezgoh_1tasb51 atm_70_1t2bbnk_1tasb51 atm_gi_eflcwz_1tasb51 atm_uc_glywfm_1tasb51_1rrf6b5 atm_wq_cs5v99_pfnrn2_1oszvuo atm_9s_1ulexfb_1buez3b_1oszvuo atm_uc_aaiy6o_1fu4lp4_1oszvuo atm_4b_dezgoh_1fu4lp4_1oszvuo atm_70_1t2bbnk_1fu4lp4_1oszvuo atm_gi_eflcwz_1fu4lp4_1oszvuo atm_uc_glywfm_1fu4lp4_1o31aam dir dir-ltr">
//                     <div>
//                       <img className='form_icon' height={30} src="/images/checkout.png" alt="" />
//                     </div>
//                     <div className="cz9siyu atm_l8_srw7uq atm_ks_15vqwwr atm_mk_h2mmj6 atm_vv_1q9ccgz atm_vy_1osqo2v atm_wq_kb7nvz dir dir-ltr">
//                       <div className="lk4ruxu atm_c8_1uc0753 atm_g3_lonqig atm_cs_10d11i2 atm_fr_idpfg4 atm_le_yh40bf dir dir-ltr">
//                         Check out
//                       </div>
//                       <div className="p1m42al0 atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_cs_6adqpa atm_ks_15vqwwr atm_sq_1l2sidv atm_vy_1osqo2v p1t4vwjw atm_7l_1jsbn00 dir dir-ltr">
//                         Add dates
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               {/* check in check out */}

//               <div className="s1w513da atm_j_1h6ojuz atm_5q_1vlbu9m atm_am_jp9ccn atm_e2_1vi7ecw dir dir-ltr"></div>

//               <div className="c111bvlt atm_9s_1txwivl atm_1eltean_1osqo2v c1gh7ier atm_am_1qhqiko dir dir-ltr">
//                 <div className="c1ddhymz atm_h_1h6ojuz atm_9s_1txwivl atm_gi_1n1ank9 atm_jb_idpfg4 atm_mk_h2mmj6 atm_vy_10bmcub cggll98 atm_am_1qhqiko dir dir-ltr">
//                   {/* add people */}

//                   <div onClick={toggleMoreLinks} className="fix_row b1spesa7 atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_7l_1kw7nm4 atm_9j_tlke0l atm_bx_1kw7nm4 atm_c8_1kw7nm4 atm_cs_1kw7nm4 atm_g3_1kw7nm4 atm_gi_idpfg4 atm_ks_ewfl5b atm_rd_glywfm atm_vb_1wugsn5 atm_kd_glywfm atm_9s_1ulexfb atm_am_qk3dho atm_l8_t94yts atm_r3_1e5hqsa atm_vy_idpfg4 atm_wq_kb7nvz atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_6h_1s2714j_vmtskl atm_66_nqa18y_vmtskl atm_4b_1egtlkw_vmtskl atm_92_1yyfdc7_vmtskl atm_9s_glywfm_vmtskl atm_e2_1vi7ecw_vmtskl atm_fq_idpfg4_vmtskl atm_h3_4h84z3_vmtskl atm_mk_stnw88_vmtskl atm_n3_idpfg4_vmtskl atm_tk_1ssbidh_vmtskl atm_wq_idpfg4_vmtskl atm_2a_1u8qnfj_9in345 atm_3f_okh77k_9in345 atm_5j_1vi7ecw_9in345 atm_6i_idpfg4_9in345 atm_92_1yyfdc7_9in345 atm_fq_idpfg4_9in345 atm_mk_stnw88_9in345 atm_n3_idpfg4_9in345 atm_tk_idpfg4_9in345 atm_wq_idpfg4_9in345 b1fbhdca atm_9s_1ulexfb_1rqz0hn atm_gi_eflcwz_9bj8xt atm_2d_um1unu_9bj8xt atm_wq_cs5v99_1w3cfyq atm_9s_1ulexfb_9xuho3 atm_uc_aaiy6o_1tasb51 atm_4b_dezgoh_1tasb51 atm_70_1t2bbnk_1tasb51 atm_gi_eflcwz_1tasb51 atm_uc_glywfm_1tasb51_1rrf6b5 atm_wq_cs5v99_pfnrn2_1oszvuo atm_9s_1ulexfb_1buez3b_1oszvuo atm_uc_aaiy6o_1fu4lp4_1oszvuo atm_4b_dezgoh_1fu4lp4_1oszvuo atm_70_1t2bbnk_1fu4lp4_1oszvuo atm_gi_eflcwz_1fu4lp4_1oszvuo atm_uc_glywfm_1fu4lp4_1o31aam b1889vka atm_5q_idpfg4_agv9cz atm_h0_idpfg4_1ve49u dir dir-ltr">
//                     <div>
//                       <img className='form_icon' height={30} src="/images/people.png" alt="" />
//                     </div>
//                     <div className="cz9siyu atm_l8_srw7uq atm_ks_15vqwwr atm_mk_h2mmj6 atm_vv_1q9ccgz atm_vy_1osqo2v atm_wq_kb7nvz dir dir-ltr">
//                       <div className="lk4ruxu atm_c8_1uc0753 atm_g3_lonqig atm_cs_10d11i2 atm_fr_idpfg4 atm_le_yh40bf dir dir-ltr">
//                         Who
//                       </div>
//                       <div className="p1m42al0 atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_cs_6adqpa atm_ks_15vqwwr atm_sq_1l2sidv atm_vy_1osqo2v p1t4vwjw atm_7l_1jsbn00 dir dir-ltr">
//                         {(adultCount > 0 || childCount > 0 || infrontCount > 0 || petsCount > 0) ? 
//                           `${adultCount + childCount} guest${(adultCount + childCount) !== 1 ? 's' : ''}, ${infrontCount} infant${infrontCount !== 1 ? 's' : ''}, ${petsCount} pet${petsCount !== 1 ? 's' : ''}` 
//                           : 
//                           "Add guests"
//                         }
//                       </div>
//                     </div>
//                   </div>

//                   <div className={`increment_drop ${counterModel ? 'd-block' : ''}`}>
//                     <div className="coy2xq9 atm_mk_stnw88 atm_tk_1osqo2v atm_wq_kb7nvz atm_26_1p8m8iw atm_5j_1vi7ecw atm_70_z3lat3 atm_gp_1fwxnve atm_iy_1xor2vp atm_l0_15vqwwr atm_l1_1wugsn5 atm_l2_1f51e7f atm_lb_4n2dxu atm_lh_swyrjs atm_5sxl3l_16m390d__1v156lz r1p5mcc8 atm_n3_idpfg4 dir dir-ltr">
//                       <div className="g6e6z5i atm_l8_14br1z3 atm_vy_smdzip dir dir-ltr">

//                         <div className="cnhxj7b atm_7l_dezgoh atm_9s_1txwivl atm_h_1h6ojuz atm_fc_1yb4nlp atm_be_1g80g66 atm_cx_19bvopo atm_lb_1drp7u0 atm_ll_2p0wge atm_40_1f9jazd_1i0dyc0 atm_jb_p2n4d6__oggzyc atm_lb_1crvktv__oggzyc dir dir-ltr">
//                           <section>
//                             <div className="tjx911r atm_7l_dezgoh atm_cs_10d11i2 atm_9s_1aaaxdl atm_lc_idpfg4 t1676ied atm_c8_2x1prs atm_g3_1jbyh58 atm_fr_11a07z3 dir dir-ltr">
//                               <h1 id="searchFlow-title-label-adults" tabIndex="-1" className="hpipapi atm_7l_1kw7nm4 atm_c8_1x4eueo atm_cs_1kw7nm4 atm_g3_1kw7nm4 atm_gi_idpfg4 atm_l8_idpfg4 atm_kd_idpfg4_pfnrn2 dir dir-ltr">
//                                 Adults
//                               </h1>
//                             </div>

//                             <div className="s12mgzio atm_cs_6adqpa atm_ld_evh4rp atm_7l_1admnp8 sxeujms atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_ld_evh4rp__oggzyc dir dir-ltr">
//                               Ages 13 or above
//                             </div>
//                           </section>

//                           <div className="caex243 atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1yb4nlp atm_vy_e2f67q atm_e2_1vi7ecw atm_7l_jt7fhx atm_cs_6adqpa atm_c8_2x1prs atm_g3_1jbyh58 atm_fr_11a07z3 atm_bx_48h72j dir dir-ltr">
//                             <button onClick={() => setAdultCount(adultCount - 1)} className={`${adultCount <= 0 ? 'disabled' : ''} bv4zwx4 atm_ax_idpfg4 atm_bb_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_r3_1h6ojuz atm_rd_glywfm atm_3f_97hwo atm_bx_1kw7nm4 atm_tl_1gw4zv3 atm_vy_1vi7ecw atm_e2_1vi7ecw atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1h6ojuz atm_7l_1he744i atm_4b_1en9qhd atm_26_1qwqy05 atm_5j_1ssbidh atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_7l_jt7fhx_1vpy06o_uv4tnr atm_4b_1qnzqti_1vpy06o_uv4tnr atm_26_1qwqy05_1vpy06o_uv4tnr atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_7l_jt7fhx_1w3cfyq atm_4b_1qnzqti_1w3cfyq atm_26_1qwqy05_1w3cfyq atm_70_1txm9bj_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_7l_jt7fhx_pfnrn2_1oszvuo atm_4b_1qnzqti_pfnrn2_1oszvuo atm_26_1qwqy05_pfnrn2_1oszvuo atm_70_1txm9bj_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_7l_1vvgs7l_1o5j5ji atm_4b_1vvgs7l_1o5j5ji atm_26_1qwqy05_1o5j5ji dir dir-ltr`} type="button" disabled="" tabIndex="-1" aria-label="decrease value" aria-describedby="searchFlow-title-label-adults" data-testid="stepper-adults-decrease-button">
//                               <span className="i98ho2o atm_e2_qslrf5 atm_vy_qslrf5 atm_l8_14y27yu dir dir-ltr">
//                                 <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}><path d="m.75 6.75h10.5v-1.5h-10.5z"></path></svg>
//                               </span>
//                             </button>

//                             <div className="vqatjzs atm_mk_h2mmj6 atm_7l_1kw7nm4 atm_bx_1kw7nm4 atm_c8_1kw7nm4 atm_g3_1kw7nm4 dir dir-ltr">
//                               <span aria-hidden="true" data-testid="stepper-adults-value">
//                                 {adultCount}
//                               </span>
//                               <span className="vlastcb atm_fq_idpfg4 atm_3f_idpfg4 atm_7h_hxbz6r atm_7i_ysn8ba atm_e2_t94yts atm_ks_zryt35 atm_l8_idpfg4 atm_mk_stnw88 atm_vv_1q9ccgz atm_vy_t94yts dir dir-ltr">
//                                 {adultCount} Adults
//                               </span>
//                             </div>

//                             <button onClick={() => setAdultCount(adultCount + 1)} className="bv4zwx4 atm_ax_idpfg4 atm_bb_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_r3_1h6ojuz atm_rd_glywfm atm_3f_97hwo atm_bx_1kw7nm4 atm_tl_1gw4zv3 atm_vy_1vi7ecw atm_e2_1vi7ecw atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1h6ojuz atm_7l_1he744i atm_4b_1en9qhd atm_26_1qwqy05 atm_5j_1ssbidh atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_7l_jt7fhx_1vpy06o_uv4tnr atm_4b_1qnzqti_1vpy06o_uv4tnr atm_26_1qwqy05_1vpy06o_uv4tnr atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_7l_jt7fhx_1w3cfyq atm_4b_1qnzqti_1w3cfyq atm_26_1qwqy05_1w3cfyq atm_70_1txm9bj_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_7l_jt7fhx_pfnrn2_1oszvuo atm_4b_1qnzqti_pfnrn2_1oszvuo atm_26_1qwqy05_pfnrn2_1oszvuo atm_70_1txm9bj_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_7l_1vvgs7l_1o5j5ji atm_4b_1vvgs7l_1o5j5ji atm_26_1qwqy05_1o5j5ji dir dir-ltr" type="button" aria-label="increase value" aria-describedby="searchFlow-title-label-adults" data-testid="stepper-adults-increase-button">
//                               <span className="i98ho2o atm_e2_qslrf5 atm_vy_qslrf5 atm_l8_14y27yu dir dir-ltr">
//                                 <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}><path d="m6.75.75v4.5h4.5v1.5h-4.5v4.5h-1.5v-4.5h-4.5v-1.5h4.5v-4.5z"></path></svg>
//                               </span>
//                             </button>
//                           </div>
//                         </div>

//                         <div className="cnhxj7b atm_7l_dezgoh atm_9s_1txwivl atm_h_1h6ojuz atm_fc_1yb4nlp atm_be_1g80g66 atm_cx_19bvopo atm_lb_1drp7u0 atm_ll_2p0wge atm_40_1f9jazd_1i0dyc0 atm_jb_p2n4d6__oggzyc atm_lb_1crvktv__oggzyc dir dir-ltr">
//                           <section>
//                             <div className="tjx911r atm_7l_dezgoh atm_cs_10d11i2 atm_9s_1aaaxdl atm_lc_idpfg4 t1676ied atm_c8_2x1prs atm_g3_1jbyh58 atm_fr_11a07z3 dir dir-ltr">
//                               <h1 id="searchFlow-title-label-children" tabIndex="-1" className="hpipapi atm_7l_1kw7nm4 atm_c8_1x4eueo atm_cs_1kw7nm4 atm_g3_1kw7nm4 atm_gi_idpfg4 atm_l8_idpfg4 atm_kd_idpfg4_pfnrn2 dir dir-ltr">
//                                 Children
//                               </h1>
//                             </div>

//                             <div className="s12mgzio atm_cs_6adqpa atm_ld_evh4rp atm_7l_1admnp8 sxeujms atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_ld_evh4rp__oggzyc dir dir-ltr">
//                               Ages 2 – 12
//                             </div>
//                           </section>

//                           <div className="caex243 atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1yb4nlp atm_vy_e2f67q atm_e2_1vi7ecw atm_7l_jt7fhx atm_cs_6adqpa atm_c8_2x1prs atm_g3_1jbyh58 atm_fr_11a07z3 atm_bx_48h72j dir dir-ltr">
//                             <button onClick={() => setChildCount(childCount - 1)} className={`${childCount <= 0 ? 'disabled' : ''} bv4zwx4 atm_ax_idpfg4 atm_bb_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_r3_1h6ojuz atm_rd_glywfm atm_3f_97hwo atm_bx_1kw7nm4 atm_tl_1gw4zv3 atm_vy_1vi7ecw atm_e2_1vi7ecw atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1h6ojuz atm_7l_1he744i atm_4b_1en9qhd atm_26_1qwqy05 atm_5j_1ssbidh atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_7l_jt7fhx_1vpy06o_uv4tnr atm_4b_1qnzqti_1vpy06o_uv4tnr atm_26_1qwqy05_1vpy06o_uv4tnr atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_7l_jt7fhx_1w3cfyq atm_4b_1qnzqti_1w3cfyq atm_26_1qwqy05_1w3cfyq atm_70_1txm9bj_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_7l_jt7fhx_pfnrn2_1oszvuo atm_4b_1qnzqti_pfnrn2_1oszvuo atm_26_1qwqy05_pfnrn2_1oszvuo atm_70_1txm9bj_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_7l_1vvgs7l_1o5j5ji atm_4b_1vvgs7l_1o5j5ji atm_26_1qwqy05_1o5j5ji dir dir-ltr`} type="button" disabled="" tabIndex="-1" aria-label="decrease value" aria-describedby="searchFlow-title-label-adults" data-testid="stepper-adults-decrease-button">
//                               <span className="i98ho2o atm_e2_qslrf5 atm_vy_qslrf5 atm_l8_14y27yu dir dir-ltr">
//                                 <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}><path d="m.75 6.75h10.5v-1.5h-10.5z"></path></svg>
//                               </span>
//                             </button>

//                             <div className="vqatjzs atm_mk_h2mmj6 atm_7l_1kw7nm4 atm_bx_1kw7nm4 atm_c8_1kw7nm4 atm_g3_1kw7nm4 dir dir-ltr">
//                               <span aria-hidden="true" data-testid="stepper-adults-value">
//                                 {childCount}
//                               </span>
//                               <span className="vlastcb atm_fq_idpfg4 atm_3f_idpfg4 atm_7h_hxbz6r atm_7i_ysn8ba atm_e2_t94yts atm_ks_zryt35 atm_l8_idpfg4 atm_mk_stnw88 atm_vv_1q9ccgz atm_vy_t94yts dir dir-ltr">
//                                 {childCount} Adults
//                               </span>
//                             </div>

//                             <button onClick={() => setChildCount(childCount + 1)} className="bv4zwx4 atm_ax_idpfg4 atm_bb_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_r3_1h6ojuz atm_rd_glywfm atm_3f_97hwo atm_bx_1kw7nm4 atm_tl_1gw4zv3 atm_vy_1vi7ecw atm_e2_1vi7ecw atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1h6ojuz atm_7l_1he744i atm_4b_1en9qhd atm_26_1qwqy05 atm_5j_1ssbidh atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_7l_jt7fhx_1vpy06o_uv4tnr atm_4b_1qnzqti_1vpy06o_uv4tnr atm_26_1qwqy05_1vpy06o_uv4tnr atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_7l_jt7fhx_1w3cfyq atm_4b_1qnzqti_1w3cfyq atm_26_1qwqy05_1w3cfyq atm_70_1txm9bj_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_7l_jt7fhx_pfnrn2_1oszvuo atm_4b_1qnzqti_pfnrn2_1oszvuo atm_26_1qwqy05_pfnrn2_1oszvuo atm_70_1txm9bj_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_7l_1vvgs7l_1o5j5ji atm_4b_1vvgs7l_1o5j5ji atm_26_1qwqy05_1o5j5ji dir dir-ltr" type="button" aria-label="increase value" aria-describedby="searchFlow-title-label-adults" data-testid="stepper-adults-increase-button">
//                               <span className="i98ho2o atm_e2_qslrf5 atm_vy_qslrf5 atm_l8_14y27yu dir dir-ltr">
//                                 <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}><path d="m6.75.75v4.5h4.5v1.5h-4.5v4.5h-1.5v-4.5h-4.5v-1.5h4.5v-4.5z"></path></svg>
//                               </span>
//                             </button>
//                           </div>

//                         </div>

//                         <div className="cnhxj7b atm_7l_dezgoh atm_9s_1txwivl atm_h_1h6ojuz atm_fc_1yb4nlp atm_be_1g80g66 atm_cx_19bvopo atm_lb_1drp7u0 atm_ll_2p0wge atm_40_1f9jazd_1i0dyc0 atm_jb_p2n4d6__oggzyc atm_lb_1crvktv__oggzyc dir dir-ltr" data-testid="search-block-filter-stepper-row-infants">
//                           <section>
//                             <div className="tjx911r atm_7l_dezgoh atm_cs_10d11i2 atm_9s_1aaaxdl atm_lc_idpfg4 t1676ied atm_c8_2x1prs atm_g3_1jbyh58 atm_fr_11a07z3 dir dir-ltr">
//                               <h1 id="searchFlow-title-label-infants" tabIndex="-1" className="hpipapi atm_7l_1kw7nm4 atm_c8_1x4eueo atm_cs_1kw7nm4 atm_g3_1kw7nm4 atm_gi_idpfg4 atm_l8_idpfg4 atm_kd_idpfg4_pfnrn2 dir dir-ltr" elementtiming="LCP-target">Infants</h1>
//                             </div>
//                             <div className="s12mgzio atm_cs_6adqpa atm_ld_evh4rp atm_7l_1admnp8 sxeujms atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_ld_evh4rp__oggzyc dir dir-ltr">
//                               Under 2
//                             </div>
//                           </section>


//                           <div className="caex243 atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1yb4nlp atm_vy_e2f67q atm_e2_1vi7ecw atm_7l_jt7fhx atm_cs_6adqpa atm_c8_2x1prs atm_g3_1jbyh58 atm_fr_11a07z3 atm_bx_48h72j dir dir-ltr">
//                             <button onClick={() => setInfrontCount(infrontCount - 1)} className={`${infrontCount <= 0 ? 'disabled' : ''} bv4zwx4 atm_ax_idpfg4 atm_bb_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_r3_1h6ojuz atm_rd_glywfm atm_3f_97hwo atm_bx_1kw7nm4 atm_tl_1gw4zv3 atm_vy_1vi7ecw atm_e2_1vi7ecw atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1h6ojuz atm_7l_1he744i atm_4b_1en9qhd atm_26_1qwqy05 atm_5j_1ssbidh atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_7l_jt7fhx_1vpy06o_uv4tnr atm_4b_1qnzqti_1vpy06o_uv4tnr atm_26_1qwqy05_1vpy06o_uv4tnr atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_7l_jt7fhx_1w3cfyq atm_4b_1qnzqti_1w3cfyq atm_26_1qwqy05_1w3cfyq atm_70_1txm9bj_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_7l_jt7fhx_pfnrn2_1oszvuo atm_4b_1qnzqti_pfnrn2_1oszvuo atm_26_1qwqy05_pfnrn2_1oszvuo atm_70_1txm9bj_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_7l_1vvgs7l_1o5j5ji atm_4b_1vvgs7l_1o5j5ji atm_26_1qwqy05_1o5j5ji dir dir-ltr`} type="button" disabled="" tabIndex="-1" aria-label="decrease value" aria-describedby="searchFlow-title-label-adults" data-testid="stepper-adults-decrease-button">
//                               <span className="i98ho2o atm_e2_qslrf5 atm_vy_qslrf5 atm_l8_14y27yu dir dir-ltr">
//                                 <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}><path d="m.75 6.75h10.5v-1.5h-10.5z"></path></svg>
//                               </span>
//                             </button>

//                             <div className="vqatjzs atm_mk_h2mmj6 atm_7l_1kw7nm4 atm_bx_1kw7nm4 atm_c8_1kw7nm4 atm_g3_1kw7nm4 dir dir-ltr">
//                               <span aria-hidden="true" data-testid="stepper-adults-value">
//                                 {infrontCount}
//                               </span>
//                               <span className="vlastcb atm_fq_idpfg4 atm_3f_idpfg4 atm_7h_hxbz6r atm_7i_ysn8ba atm_e2_t94yts atm_ks_zryt35 atm_l8_idpfg4 atm_mk_stnw88 atm_vv_1q9ccgz atm_vy_t94yts dir dir-ltr">
//                                 {infrontCount} Adults
//                               </span>
//                             </div>

//                             <button onClick={() => setInfrontCount(infrontCount + 1)} className="bv4zwx4 atm_ax_idpfg4 atm_bb_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_r3_1h6ojuz atm_rd_glywfm atm_3f_97hwo atm_bx_1kw7nm4 atm_tl_1gw4zv3 atm_vy_1vi7ecw atm_e2_1vi7ecw atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1h6ojuz atm_7l_1he744i atm_4b_1en9qhd atm_26_1qwqy05 atm_5j_1ssbidh atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_7l_jt7fhx_1vpy06o_uv4tnr atm_4b_1qnzqti_1vpy06o_uv4tnr atm_26_1qwqy05_1vpy06o_uv4tnr atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_7l_jt7fhx_1w3cfyq atm_4b_1qnzqti_1w3cfyq atm_26_1qwqy05_1w3cfyq atm_70_1txm9bj_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_7l_jt7fhx_pfnrn2_1oszvuo atm_4b_1qnzqti_pfnrn2_1oszvuo atm_26_1qwqy05_pfnrn2_1oszvuo atm_70_1txm9bj_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_7l_1vvgs7l_1o5j5ji atm_4b_1vvgs7l_1o5j5ji atm_26_1qwqy05_1o5j5ji dir dir-ltr" type="button" aria-label="increase value" aria-describedby="searchFlow-title-label-adults" data-testid="stepper-adults-increase-button">
//                               <span className="i98ho2o atm_e2_qslrf5 atm_vy_qslrf5 atm_l8_14y27yu dir dir-ltr">
//                                 <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}><path d="m6.75.75v4.5h4.5v1.5h-4.5v4.5h-1.5v-4.5h-4.5v-1.5h4.5v-4.5z"></path></svg>
//                               </span>
//                             </button>
//                           </div>

//                         </div>

//                         <div className="cnhxj7b atm_7l_dezgoh atm_9s_1txwivl atm_h_1h6ojuz atm_fc_1yb4nlp atm_be_1g80g66 atm_cx_19bvopo atm_lb_1drp7u0 atm_ll_2p0wge atm_40_1f9jazd_1i0dyc0 atm_jb_p2n4d6__oggzyc atm_lb_1crvktv__oggzyc dir dir-ltr">

//                           <section>
//                             <div className="tjx911r atm_7l_dezgoh atm_cs_10d11i2 atm_9s_1aaaxdl atm_lc_idpfg4 t1676ied atm_c8_2x1prs atm_g3_1jbyh58 atm_fr_11a07z3 dir dir-ltr">
//                               <h1 id="searchFlow-title-label-pets" tabIndex="-1" className="hpipapi atm_7l_1kw7nm4 atm_c8_1x4eueo atm_cs_1kw7nm4 atm_g3_1kw7nm4 atm_gi_idpfg4 atm_l8_idpfg4 atm_kd_idpfg4_pfnrn2 dir dir-ltr" elementtiming="LCP-target">
//                                 Pets
//                               </h1>
//                             </div>

//                             <div className="s12mgzio atm_cs_6adqpa atm_ld_evh4rp atm_7l_1admnp8 sxeujms atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_ld_evh4rp__oggzyc dir dir-ltr">
//                               <Link href='#!' type="button" className="_11su815w l1ovpqvx atm_1he2i46_1k8pnbi_10saat9 atm_yxpdqi_1pv6nv4_10saat9 atm_1a0hdzc_w1h1e8_10saat9 atm_2bu6ew_929bqk_10saat9 atm_12oyo1u_73u7pn_10saat9 atm_fiaz40_1etamxe_10saat9 dir dir-ltr">
//                                 Bringing a service animal?
//                               </Link>
//                             </div>
//                           </section>

//                           <div className="caex243 atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1yb4nlp atm_vy_e2f67q atm_e2_1vi7ecw atm_7l_jt7fhx atm_cs_6adqpa atm_c8_2x1prs atm_g3_1jbyh58 atm_fr_11a07z3 atm_bx_48h72j dir dir-ltr">
//                             <button onClick={() => setPetsCount(petsCount - 1)} className={`${petsCount <= 0 ? 'disabled' : ''} bv4zwx4 atm_ax_idpfg4 atm_bb_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_r3_1h6ojuz atm_rd_glywfm atm_3f_97hwo atm_bx_1kw7nm4 atm_tl_1gw4zv3 atm_vy_1vi7ecw atm_e2_1vi7ecw atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1h6ojuz atm_7l_1he744i atm_4b_1en9qhd atm_26_1qwqy05 atm_5j_1ssbidh atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_7l_jt7fhx_1vpy06o_uv4tnr atm_4b_1qnzqti_1vpy06o_uv4tnr atm_26_1qwqy05_1vpy06o_uv4tnr atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_7l_jt7fhx_1w3cfyq atm_4b_1qnzqti_1w3cfyq atm_26_1qwqy05_1w3cfyq atm_70_1txm9bj_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_7l_jt7fhx_pfnrn2_1oszvuo atm_4b_1qnzqti_pfnrn2_1oszvuo atm_26_1qwqy05_pfnrn2_1oszvuo atm_70_1txm9bj_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_7l_1vvgs7l_1o5j5ji atm_4b_1vvgs7l_1o5j5ji atm_26_1qwqy05_1o5j5ji dir dir-ltr`} type="button" disabled="" tabIndex="-1" aria-label="decrease value" aria-describedby="searchFlow-title-label-adults" data-testid="stepper-adults-decrease-button">
//                               <span className="i98ho2o atm_e2_qslrf5 atm_vy_qslrf5 atm_l8_14y27yu dir dir-ltr">
//                                 <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}><path d="m.75 6.75h10.5v-1.5h-10.5z"></path></svg>
//                               </span>
//                             </button>

//                             <div className="vqatjzs atm_mk_h2mmj6 atm_7l_1kw7nm4 atm_bx_1kw7nm4 atm_c8_1kw7nm4 atm_g3_1kw7nm4 dir dir-ltr">
//                               <span aria-hidden="true" data-testid="stepper-adults-value">
//                                 {petsCount}
//                               </span>
//                               <span className="vlastcb atm_fq_idpfg4 atm_3f_idpfg4 atm_7h_hxbz6r atm_7i_ysn8ba atm_e2_t94yts atm_ks_zryt35 atm_l8_idpfg4 atm_mk_stnw88 atm_vv_1q9ccgz atm_vy_t94yts dir dir-ltr">
//                                 {petsCount} Adults
//                               </span>
//                             </div>

//                             <button onClick={() => setPetsCount(petsCount + 1)} className="bv4zwx4 atm_ax_idpfg4 atm_bb_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_r3_1h6ojuz atm_rd_glywfm atm_3f_97hwo atm_bx_1kw7nm4 atm_tl_1gw4zv3 atm_vy_1vi7ecw atm_e2_1vi7ecw atm_9s_116y0ak atm_h_1h6ojuz atm_fc_1h6ojuz atm_7l_1he744i atm_4b_1en9qhd atm_26_1qwqy05 atm_5j_1ssbidh atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_7l_jt7fhx_1vpy06o_uv4tnr atm_4b_1qnzqti_1vpy06o_uv4tnr atm_26_1qwqy05_1vpy06o_uv4tnr atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_7l_jt7fhx_1w3cfyq atm_4b_1qnzqti_1w3cfyq atm_26_1qwqy05_1w3cfyq atm_70_1txm9bj_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_7l_jt7fhx_pfnrn2_1oszvuo atm_4b_1qnzqti_pfnrn2_1oszvuo atm_26_1qwqy05_pfnrn2_1oszvuo atm_70_1txm9bj_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_7l_1vvgs7l_1o5j5ji atm_4b_1vvgs7l_1o5j5ji atm_26_1qwqy05_1o5j5ji dir dir-ltr" type="button" aria-label="increase value" aria-describedby="searchFlow-title-label-adults" data-testid="stepper-adults-increase-button">
//                               <span className="i98ho2o atm_e2_qslrf5 atm_vy_qslrf5 atm_l8_14y27yu dir dir-ltr">
//                                 <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}><path d="m6.75.75v4.5h4.5v1.5h-4.5v4.5h-1.5v-4.5h-4.5v-1.5h4.5v-4.5z"></path></svg>
//                               </span>
//                             </button>
//                           </div>
//                         </div>

//                       </div>
//                     </div>
//                   </div>

//                   {/* add people */}

//                   {/* search button */}
//                   <div className='search_btns'>
//                     <button className='search_button'>
//                       <img src="/images/magnifine.png" alt="" />
//                       <span>Search</span>
//                     </button>
//                     <button className='search_with_ai'>
//                       <img src="/images/shineStar.png" alt="" />
//                     </button>
//                   </div>
//                   {/* search button */}
//                 </div>


//               </div>
//             </div>
//           </div>
//         </form>

//         <div data-bs-toggle="modal" data-bs-target="#searchModal" className="form_mob s97awm atm_am_kb7nvz atm_5j_1pm7oz0 atm_7l_dezgoh atm_j6_8vuzuz atm_9s_11p5wf0 atm_h_1fhbwtr atm_8w_73ivac atm_gx_idpfg4 atm_vz_qft6q7 atm_ui_dava36 atm_uv_xoomkg s1upghlx atm_26_1p8m8iw atm_3f_1tyokbi atm_70_504m4t dir dir-ltr">
//           <button type="button" className="l1ovpqvx atm_1he2i46_1k8pnbi_10saat9 atm_yxpdqi_1pv6nv4_10saat9 atm_1a0hdzc_w1h1e8_10saat9 atm_2bu6ew_929bqk_10saat9 atm_12oyo1u_73u7pn_10saat9 atm_fiaz40_1etamxe_10saat9 bfknzxl atm_9j_tlke0l atm_mk_h2mmj6 atm_70_5j5alw atm_tl_1gw4zv3 atm_9j_13gfvf7_1o5j5ji c1i81z0m atm_fr_11a07z3 atm_r2_1j28jx2 atm_26_1j28jx2 atm_3f_glywfm atm_7l_1kw7nm4 atm_gi_idpfg4 atm_l8_idpfg4 atm_r3_1kw7nm4 atm_rd_glywfm atm_e2_1osqo2v atm_vy_1osqo2v atm_bx_1kw7nm4 atm_c8_1kw7nm4 atm_g3_1kw7nm4 atm_cs_1kw7nm4 atm_kd_glywfm atm_h_1h6ojuz atm_9s_1n7usvw atm_j3_1osqo2v atm_uc_glywfm atm_vb_glywfm atm_5j_b4p6a2 atm_uc_glywfm__1rrf6b5 atm_kd_glywfm_1w3cfyq atm_3f_glywfm_e4a3ld atm_l8_idpfg4_e4a3ld atm_gi_idpfg4_e4a3ld atm_3f_glywfm_1r4qscq atm_kd_glywfm_6y7yyg atm_kd_glywfm_pfnrn2_1oszvuo atm_l8_idpfg4_1icshfk_1oszvuo atm_gi_idpfg4_1icshfk_1oszvuo atm_3f_glywfm_b5gff8_1oszvuo atm_kd_glywfm_2by9w9_1oszvuo atm_k4_kb7nvz_1o5j5ji atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_tr_glywfm_csw3t1 atm_uc_aaiy6o_1w3cfyq atm_70_1xvh5se_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_1xvh5se_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam s1pm3o7c atm_dz_rhb615 atm_lj_evh4rp atm_li_evh4rp dir dir-ltr">
//             <span className="su7l6qf atm_9s_11p5wf0 atm_mg_1h6ojuz dir dir-ltr">
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="presentation" focusable="false" style={{ display: 'block', height: '20px', width: '20px', fill: 'currentColor' }}><path d="M13 0a13 13 0 0 1 10.5 20.67l7.91 7.92-2.82 2.82-7.92-7.91A12.94 12.94 0 0 1 13 26a13 13 0 1 1 0-26zm0 4a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"></path></svg>
//             </span>
//             <span className="m10pln4b atm_9s_1o8liyq atm_lk_yh40bf atm_j3_1osqo2v atm_ks_15vqwwr dir dir-ltr">
//               <div className="p1b4e8cr atm_c8_km0zk7 atm_fr_1m9t47k atm_cs_10d11i2 atm_g3_gktfv atm_9s_1ulexfb atm_ks_15vqwwr atm_sq_1l2sidv atm_vv_1q9ccgz dir dir-ltr">Where to?</div>
//               <div className="s1f5fdzj atm_9s_1txwivl atm_c8_1uc0753 atm_g3_lonqig atm_fr_r7vles atm_7l_1esdqks atm_li_p5ox87 atm_cx_14y27yu dir dir-ltr" >
//                 <span className="s13th1u8 atm_am_1pywi5l atm_jb_12am3vd atm_ks_15vqwwr atm_sq_1l2sidv atm_vv_1q9ccgz dir dir-ltr">Anywhere</span>
//                 <span >•</span>
//                 <span className="s13th1u8 atm_am_1pywi5l atm_jb_12am3vd atm_ks_15vqwwr atm_sq_1l2sidv atm_vv_1q9ccgz dir dir-ltr">Any week</span>
//                 <span >•</span>
//                 <span className="s13th1u8 atm_am_1pywi5l atm_jb_12am3vd atm_ks_15vqwwr atm_sq_1l2sidv atm_vv_1q9ccgz dir dir-ltr">Add guests</span>
//               </div>
//               <span className="a8jt5op atm_3f_idpfg4 atm_7h_hxbz6r atm_7i_ysn8ba atm_e2_t94yts atm_ks_zryt35 atm_l8_idpfg4 atm_mk_stnw88 atm_vv_1q9ccgz atm_vy_t94yts dir dir-ltr" id="searchInputDescriptionId">Currently showing Any week, Add guests. Change search.</span>
//             </span>
//           </button>
//         </div>
//       </div>


//     </>
//   )
// }

// export default Search


import Link from 'next/link';
import { useState, useEffect } from 'react';

const Search = () => {
  const [isActive, setIsActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [infrontCount, setInfrontCount] = useState(0);
  const [petsCount, setPetsCount] = useState(0);
  const [counterModel, setCounterModal] = useState(false);

  useEffect(() => {
    const inputElement = document.getElementById('bigsearch-query-location-input');

    const handleFocus = () => setIsActive(true);
    const handleBlur = () => setIsActive(false);

    inputElement.addEventListener('focus', handleFocus);
    inputElement.addEventListener('blur', handleBlur);

    // Cleanup event listeners on component unmount
    return () => {
      inputElement.removeEventListener('focus', handleFocus);
      inputElement.removeEventListener('blur', handleBlur);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  const toggleMoreLinks = () => {
    setCounterModal(!counterModel);
  };

  return (
    <>
      <div className={` ${isScrolled ? 'StickElement' : ''}`}>
        <form className="form_web f114qjlg atm_gi_xjk4d9 atm_j3_1an8f3t dir dir-ltr">
          <div id="search-tabpanel" className="cbb5b2h atm_5j_1vi7ecw atm_7l_dezgoh atm_9s_1txwivl atm_e2_1k4yqc2 atm_mk_h2mmj6 atm_vy_1osqo2v atm_kd_glywfm atm_2d_1qf8lb3 atm_3f_1vlbu9m atm_70_i67ecm c12eo2r8 atm_u5paz6_1p8m8iw atm_mu5wzz_1s7alg2 atm_yo3zfk_1esdqks dir dir-ltr">
            <div className="ir2ixub atm_9s_1txwivl atm_h_1h6ojuz atm_am_163v1yp atm_e2_1osqo2v atm_jb_idpfg4 atm_mj_1wugsn5 dir dir-ltr">
              <div className="qam9yc8 atm_am_iqcgjs atm_jb_idpfg4 atm_am_j1sv9b__1v156lz dir dir-ltr">
                {/*locatio search input */}
                <div className="i1iy0ljo atm_mk_h2mmj6 atm_h_1h6ojuz atm_9s_1txwivl atm_am_qk3dho atm_gi_1n1ank9 atm_jb_idpfg4 dir dir-ltr">
                  <label className="fix_row ihcg2em atm_9j_tlke0l atm_9s_1ulexfb atm_2a_1u8qnfj atm_3f_okh77k atm_5j_1vi7ecw atm_am_qk3dho atm_jb_idpfg4 atm_l8_2zoau0 atm_6h_1s2714j_vmtskl atm_66_nqa18y_vmtskl atm_4b_1egtlkw_vmtskl atm_5e_idpfg4_vmtskl atm_92_1yyfdc7_vmtskl atm_9s_glywfm_vmtskl atm_e2_1vi7ecw_vmtskl atm_h3_4h84z3_vmtskl atm_mk_stnw88_vmtskl atm_n3_idpfg4_vmtskl atm_tk_1ssbidh_vmtskl atm_wq_idpfg4_vmtskl atm_2a_1u8qnfj_9in345 atm_3f_okh77k_9in345 atm_5j_1vi7ecw_9in345 atm_6i_idpfg4_9in345 atm_92_1yyfdc7_9in345 atm_fq_idpfg4_9in345 atm_mk_stnw88_9in345 atm_n3_idpfg4_9in345 atm_tk_idpfg4_9in345 atm_wq_idpfg4_9in345 i1w7syu0 atm_9s_1ulexfb_1rqz0hn atm_h0_yh40bf_9bj8xt atm_2d_um1unu_9bj8xt atm_9s_1ulexfb_1jy6zas atm_2d_1p8m8iw_1joo1sn atm_4b_1p8m8iw_1joo1sn atm_70_d987b7_1joo1sn atm_fq_idpfg4_1joo1sn atm_n3_idpfg4_1joo1sn atm_h0_yh40bf_1joo1sn dir dir-ltr">
                    <div>
                      <img className='form_icon' height={30} src="/images/location.png" alt="" />
                    </div>
                    <div className="i18libcr atm_mk_h2mmj6 atm_wq_kb7nvz dir dir-ltr">
                      <div className="ikfcax3 atm_c8_1uc0753 atm_g3_lonqig atm_fr_r7vles atm_cs_10d11i2 atm_le_yh40bf dir dir-ltr">
                        Where
                      </div>
                      <input autoComplete="off" autoCorrect="off" spellCheck="false" id="bigsearch-query-location-input" type="search" placeholder="Search destinations" className="i18z192n atm_9s_1ulexfb atm_3f_idpfg4 atm_gi_idpfg4 atm_l8_idpfg4 atm_vy_1osqo2v atm_26_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_cs_10d11i2 atm_7l_dezgoh atm_sq_1l2sidv atm_c8_km0zk7_17x46du atm_g3_18khvle_17x46du atm_fr_1m9t47k_17x46du atm_cs_6adqpa_17x46du atm_c8_km0zk7_y5ttn9 atm_g3_18khvle_y5ttn9 atm_fr_1m9t47k_y5ttn9 atm_cs_6adqpa_y5ttn9 atm_c8_km0zk7_1k1obal atm_g3_18khvle_1k1obal atm_fr_1m9t47k_1k1obal atm_cs_6adqpa_1k1obal atm_c8_km0zk7_m14rgb atm_g3_18khvle_m14rgb atm_fr_1m9t47k_m14rgb atm_cs_6adqpa_m14rgb atm_c8_km0zk7_3ykvna atm_g3_18khvle_3ykvna atm_fr_1m9t47k_3ykvna atm_cs_6adqpa_3ykvna atm_9s_glywfm_16s2r6p atm_kd_glywfm_pfnrn2 atm_ll_1fwxnve_c2x6ez iupdi7y atm_7l_1jsbn00_17x46du atm_7l_1jsbn00_y5ttn9 atm_7l_1jsbn00_1k1obal atm_7l_1jsbn00_m14rgb atm_7l_1jsbn00_3ykvna dir dir-ltr" />
                    </div>
                  </label>
                </div>
                {/*locatio search input */}

                {/* location popup */}
                <div className={`search_where ${isActive ? 'active' : ''} coy2xq9 atm_mk_stnw88 atm_tk_1osqo2v atm_26_1p8m8iw atm_5j_1vi7ecw atm_70_z3lat3 atm_gp_1fwxnve atm_iy_1xor2vp atm_l0_15vqwwr atm_l1_1wugsn5 atm_l2_1f51e7f atm_lb_4n2dxu atm_lh_swyrjs l1hvhoo atm_fq_idpfg4 hwzl8dt atm_vl_i-15vqwwr atm_mj_i-glywfm atm_k4_idpfg4 b7815u5 atm_wq_kb7nvz atm_8rg8tq_1ixj6vq atm_5sxl3l_uuw12j atm_5sxl3l_1w81w6r__1v156lz b552ge3 atm_vy_1ssbidh atm_jb_13hw3cp im0ru76 atm_anyfd1_15cdnaj atm_ypb0rd_p5ox87 dir dir-ltr`}>
                  <div className=" dir dir-ltr" id="locationInspirationsSectionID">

                    <div className="c1uycpqq atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_cs_19iasv6 atm_go_1ixj6vq atm_gy_1yuitx dir dir-ltr">
                      Search by region
                    </div>

                    <div className="dttmvf5 atm_9s_11p5wf0 atm_n5_i2wt44 atm_d7_idpfg4 atm_ks_15vqwwr atm_dz_zk4kx0 atm_e0_988hr2 dir dir-ltr">

                      <div className="c1q1697z atm_9s_1txwivl atm_ar_1bp4okc atm_n5_1yuitx atm_l8_1y44olf atm_l8_ftgil2__oggzyc atm_5j_qe0vi4__oggzyc atm_2d_1s7alg2_1nos8r_1jiodmv dir dir-ltr">

                        <button className="c1y2gkhb atm_9s_1o8liyq atm_9j_tlke0l atm_r3_1h6ojuz atm_3f_uuagnh atm_l8_idpfg4 atm_gi_idpfg4 atm_4b_rke8ap atm_7l_jt7fhx atm_bx_48h72j atm_mk_h2mmj6 atm_uq_17liqq3 atm_ui_1bljbuh atm_uv_xoomkg atm_kd_glywfm atm_5j_kitwna atm_e2_1wugsn5 atm_ks_zryt35 atm_vy_1osqo2v atm_1w_gbua2q atm_2d_rke8ap atm_g3_idpfg4 atm_r2_1j28jx2 atm_7l_177r58q_1nos8r_uv4tnr atm_4b_lb1gtz_1nos8r_uv4tnr atm_7l_177r58q_csw3t1 atm_4b_lb1gtz_csw3t1 atm_tr_ybgkrq_csw3t1 atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_70_15w7q17_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_15w7q17_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_uc_aaiy6o_1s76pf2 atm_70_15w7q17_1s76pf2 atm_uc_glywfm_1s76pf2_1rrf6b5 atm_uc_aaiy6o_1y5fnfe_1oszvuo atm_70_15w7q17_1y5fnfe_1oszvuo atm_uc_glywfm_1y5fnfe_1o31aam atm_4b_rke8ap_1nos8r_1jiodmv atm_4b_rke8ap_csw3t1_oggzyc dir dir-ltr" type="button">
                          <img className="i123w48w  atm_e2_1wugsn5 atm_vy_1osqo2v atm_1w_gbua2q atm_jp_1f51e7f dir dir-ltr" alt="" src="/images/flex.jpg" />
                        </button>

                        <div className="o18vo2mo atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_gw_1lkvw50 atm_ks_15vqwwr atm_sq_1l2sidv atm_vv_1q9ccgz dir dir-ltr">
                          I’m flexible
                        </div>

                      </div>

                      <div className="c1q1697z atm_9s_1txwivl atm_ar_1bp4okc atm_n5_1yuitx atm_l8_1y44olf atm_l8_ftgil2__oggzyc atm_5j_qe0vi4__oggzyc atm_2d_1s7alg2_1nos8r_1jiodmv dir dir-ltr">

                        <button className="c1y2gkhb atm_9s_1o8liyq atm_9j_tlke0l atm_r3_1h6ojuz atm_3f_uuagnh atm_l8_idpfg4 atm_gi_idpfg4 atm_4b_rke8ap atm_7l_jt7fhx atm_bx_48h72j atm_mk_h2mmj6 atm_uq_17liqq3 atm_ui_1bljbuh atm_uv_xoomkg atm_kd_glywfm atm_5j_kitwna atm_e2_1wugsn5 atm_ks_zryt35 atm_vy_1osqo2v atm_1w_gbua2q atm_2d_rke8ap atm_g3_idpfg4 atm_r2_1j28jx2 atm_7l_177r58q_1nos8r_uv4tnr atm_4b_lb1gtz_1nos8r_uv4tnr atm_7l_177r58q_csw3t1 atm_4b_lb1gtz_csw3t1 atm_tr_ybgkrq_csw3t1 atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_70_15w7q17_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_15w7q17_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_uc_aaiy6o_1s76pf2 atm_70_15w7q17_1s76pf2 atm_uc_glywfm_1s76pf2_1rrf6b5 atm_uc_aaiy6o_1y5fnfe_1oszvuo atm_70_15w7q17_1y5fnfe_1oszvuo atm_uc_glywfm_1y5fnfe_1o31aam atm_4b_rke8ap_1nos8r_1jiodmv atm_4b_rke8ap_csw3t1_oggzyc dir dir-ltr" type="button">
                          <img className="i123w48w  atm_e2_1wugsn5 atm_vy_1osqo2v atm_1w_gbua2q atm_jp_1f51e7f dir dir-ltr" alt="" src="/images/canada.webp" />
                        </button>

                        <div className="o18vo2mo atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_gw_1lkvw50 atm_ks_15vqwwr atm_sq_1l2sidv atm_vv_1q9ccgz dir dir-ltr">
                          Canada
                        </div>

                      </div>

                      <div className="c1q1697z atm_9s_1txwivl atm_ar_1bp4okc atm_n5_1yuitx atm_l8_1y44olf atm_l8_ftgil2__oggzyc atm_5j_qe0vi4__oggzyc atm_2d_1s7alg2_1nos8r_1jiodmv dir dir-ltr">

                        <button className="c1y2gkhb atm_9s_1o8liyq atm_9j_tlke0l atm_r3_1h6ojuz atm_3f_uuagnh atm_l8_idpfg4 atm_gi_idpfg4 atm_4b_rke8ap atm_7l_jt7fhx atm_bx_48h72j atm_mk_h2mmj6 atm_uq_17liqq3 atm_ui_1bljbuh atm_uv_xoomkg atm_kd_glywfm atm_5j_kitwna atm_e2_1wugsn5 atm_ks_zryt35 atm_vy_1osqo2v atm_1w_gbua2q atm_2d_rke8ap atm_g3_idpfg4 atm_r2_1j28jx2 atm_7l_177r58q_1nos8r_uv4tnr atm_4b_lb1gtz_1nos8r_uv4tnr atm_7l_177r58q_csw3t1 atm_4b_lb1gtz_csw3t1 atm_tr_ybgkrq_csw3t1 atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_70_15w7q17_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_15w7q17_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_uc_aaiy6o_1s76pf2 atm_70_15w7q17_1s76pf2 atm_uc_glywfm_1s76pf2_1rrf6b5 atm_uc_aaiy6o_1y5fnfe_1oszvuo atm_70_15w7q17_1y5fnfe_1oszvuo atm_uc_glywfm_1y5fnfe_1o31aam atm_4b_rke8ap_1nos8r_1jiodmv atm_4b_rke8ap_csw3t1_oggzyc dir dir-ltr" type="button">
                          <img className="i123w48w  atm_e2_1wugsn5 atm_vy_1osqo2v atm_1w_gbua2q atm_jp_1f51e7f dir dir-ltr" alt="" src="/images/arab.jpg" />
                        </button>

                        <div className="o18vo2mo atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_gw_1lkvw50 atm_ks_15vqwwr atm_sq_1l2sidv atm_vv_1q9ccgz dir dir-ltr">
                          United Arab Emirates
                        </div>

                      </div>

                      <div className="c1q1697z atm_9s_1txwivl atm_ar_1bp4okc atm_n5_1yuitx atm_l8_1y44olf atm_l8_ftgil2__oggzyc atm_5j_qe0vi4__oggzyc atm_2d_1s7alg2_1nos8r_1jiodmv dir dir-ltr">

                        <button className="c1y2gkhb atm_9s_1o8liyq atm_9j_tlke0l atm_r3_1h6ojuz atm_3f_uuagnh atm_l8_idpfg4 atm_gi_idpfg4 atm_4b_rke8ap atm_7l_jt7fhx atm_bx_48h72j atm_mk_h2mmj6 atm_uq_17liqq3 atm_ui_1bljbuh atm_uv_xoomkg atm_kd_glywfm atm_5j_kitwna atm_e2_1wugsn5 atm_ks_zryt35 atm_vy_1osqo2v atm_1w_gbua2q atm_2d_rke8ap atm_g3_idpfg4 atm_r2_1j28jx2 atm_7l_177r58q_1nos8r_uv4tnr atm_4b_lb1gtz_1nos8r_uv4tnr atm_7l_177r58q_csw3t1 atm_4b_lb1gtz_csw3t1 atm_tr_ybgkrq_csw3t1 atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_70_15w7q17_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_15w7q17_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_uc_aaiy6o_1s76pf2 atm_70_15w7q17_1s76pf2 atm_uc_glywfm_1s76pf2_1rrf6b5 atm_uc_aaiy6o_1y5fnfe_1oszvuo atm_70_15w7q17_1y5fnfe_1oszvuo atm_uc_glywfm_1y5fnfe_1o31aam atm_4b_rke8ap_1nos8r_1jiodmv atm_4b_rke8ap_csw3t1_oggzyc dir dir-ltr" type="button">
                          <img className="i123w48w  atm_e2_1wugsn5 atm_vy_1osqo2v atm_1w_gbua2q atm_jp_1f51e7f dir dir-ltr" alt="" src="/images/europe.jpg" />
                        </button>

                        <div className="o18vo2mo atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_gw_1lkvw50 atm_ks_15vqwwr atm_sq_1l2sidv atm_vv_1q9ccgz dir dir-ltr">
                          Europe
                        </div>

                      </div>

                      <div className="c1q1697z atm_9s_1txwivl atm_ar_1bp4okc atm_n5_1yuitx atm_l8_1y44olf atm_l8_ftgil2__oggzyc atm_5j_qe0vi4__oggzyc atm_2d_1s7alg2_1nos8r_1jiodmv dir dir-ltr">

                        <button className="c1y2gkhb atm_9s_1o8liyq atm_9j_tlke0l atm_r3_1h6ojuz atm_3f_uuagnh atm_l8_idpfg4 atm_gi_idpfg4 atm_4b_rke8ap atm_7l_jt7fhx atm_bx_48h72j atm_mk_h2mmj6 atm_uq_17liqq3 atm_ui_1bljbuh atm_uv_xoomkg atm_kd_glywfm atm_5j_kitwna atm_e2_1wugsn5 atm_ks_zryt35 atm_vy_1osqo2v atm_1w_gbua2q atm_2d_rke8ap atm_g3_idpfg4 atm_r2_1j28jx2 atm_7l_177r58q_1nos8r_uv4tnr atm_4b_lb1gtz_1nos8r_uv4tnr atm_7l_177r58q_csw3t1 atm_4b_lb1gtz_csw3t1 atm_tr_ybgkrq_csw3t1 atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_70_15w7q17_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_15w7q17_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_uc_aaiy6o_1s76pf2 atm_70_15w7q17_1s76pf2 atm_uc_glywfm_1s76pf2_1rrf6b5 atm_uc_aaiy6o_1y5fnfe_1oszvuo atm_70_15w7q17_1y5fnfe_1oszvuo atm_uc_glywfm_1y5fnfe_1o31aam atm_4b_rke8ap_1nos8r_1jiodmv atm_4b_rke8ap_csw3t1_oggzyc dir dir-ltr" type="button">
                          <img className="i123w48w  atm_e2_1wugsn5 atm_vy_1osqo2v atm_1w_gbua2q atm_jp_1f51e7f dir dir-ltr" alt="" src="/images/u-king.jpg" />
                        </button>

                        <div className="o18vo2mo atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_gw_1lkvw50 atm_ks_15vqwwr atm_sq_1l2sidv atm_vv_1q9ccgz dir dir-ltr">
                          United Kingdom
                        </div>

                      </div>

                      <div className="c1q1697z atm_9s_1txwivl atm_ar_1bp4okc atm_n5_1yuitx atm_l8_1y44olf atm_l8_ftgil2__oggzyc atm_5j_qe0vi4__oggzyc atm_2d_1s7alg2_1nos8r_1jiodmv dir dir-ltr">
                        <button className="c1y2gkhb atm_9s_1o8liyq atm_9j_tlke0l atm_r3_1h6ojuz atm_3f_uuagnh atm_l8_idpfg4 atm_gi_idpfg4 atm_4b_rke8ap atm_7l_jt7fhx atm_bx_48h72j atm_mk_h2mmj6 atm_uq_17liqq3 atm_ui_1bljbuh atm_uv_xoomkg atm_kd_glywfm atm_5j_kitwna atm_e2_1wugsn5 atm_ks_zryt35 atm_vy_1osqo2v atm_1w_gbua2q atm_2d_rke8ap atm_g3_idpfg4 atm_r2_1j28jx2 atm_7l_177r58q_1nos8r_uv4tnr atm_4b_lb1gtz_1nos8r_uv4tnr atm_7l_177r58q_csw3t1 atm_4b_lb1gtz_csw3t1 atm_tr_ybgkrq_csw3t1 atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_70_15w7q17_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_15w7q17_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_uc_aaiy6o_1s76pf2 atm_70_15w7q17_1s76pf2 atm_uc_glywfm_1s76pf2_1rrf6b5 atm_uc_aaiy6o_1y5fnfe_1oszvuo atm_70_15w7q17_1y5fnfe_1oszvuo atm_uc_glywfm_1y5fnfe_1o31aam atm_4b_rke8ap_1nos8r_1jiodmv atm_4b_rke8ap_csw3t1_oggzyc dir dir-ltr" type="button">
                          <img className="i123w48w  atm_e2_1wugsn5 atm_vy_1osqo2v atm_1w_gbua2q atm_jp_1f51e7f dir dir-ltr" alt="" src="/images/u-state.jpg" />
                        </button>
                        <div className="o18vo2mo atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_gw_1lkvw50 atm_ks_15vqwwr atm_sq_1l2sidv atm_vv_1q9ccgz dir dir-ltr">
                          United States
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                {/* location popup */}
              </div>

              <div className="s1w513da atm_j_1h6ojuz atm_5q_1vlbu9m atm_am_jp9ccn atm_e2_1vi7ecw dir dir-ltr"></div>

              {/* check in check out */}
              <div className="cwk1mic atm_9s_1txwivl atm_am_eqk4pz atm_jb_idpfg4 dir dir-ltr">
                <div className="c1ddhymz atm_am_16wc86f atm_h_1h6ojuz atm_9s_1txwivl atm_gi_1n1ank9 atm_jb_idpfg4 atm_mk_h2mmj6 atm_vy_10bmcub dir dir-ltr">
                  <div className="fix_row b1spesa7 atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_7l_1kw7nm4 atm_9j_tlke0l atm_bx_1kw7nm4 atm_c8_1kw7nm4 atm_cs_1kw7nm4 atm_g3_1kw7nm4 atm_gi_idpfg4 atm_ks_ewfl5b atm_rd_glywfm atm_vb_1wugsn5 atm_kd_glywfm atm_9s_1ulexfb atm_am_qk3dho atm_l8_t94yts atm_r3_1e5hqsa atm_vy_idpfg4 atm_wq_kb7nvz atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_6h_1s2714j_vmtskl atm_66_nqa18y_vmtskl atm_4b_1egtlkw_vmtskl atm_92_1yyfdc7_vmtskl atm_9s_glywfm_vmtskl atm_e2_1vi7ecw_vmtskl atm_fq_idpfg4_vmtskl atm_h3_4h84z3_vmtskl atm_mk_stnw88_vmtskl atm_n3_idpfg4_vmtskl atm_tk_1ssbidh_vmtskl atm_wq_idpfg4_vmtskl atm_2a_1u8qnfj_9in345 atm_3f_okh77k_9in345 atm_5j_1vi7ecw_9in345 atm_6i_idpfg4_9in345 atm_92_1yyfdc7_9in345 atm_fq_idpfg4_9in345 atm_mk_stnw88_9in345 atm_n3_idpfg4_9in345 atm_tk_idpfg4_9in345 atm_wq_idpfg4_9in345 b1fbhdca atm_9s_1ulexfb_1rqz0hn atm_gi_eflcwz_9bj8xt atm_2d_um1unu_9bj8xt atm_wq_cs5v99_1w3cfyq atm_9s_1ulexfb_9xuho3 atm_uc_aaiy6o_1tasb51 atm_4b_dezgoh_1tasb51 atm_70_1t2bbnk_1tasb51 atm_gi_eflcwz_1tasb51 atm_uc_glywfm_1tasb51_1rrf6b5 atm_wq_cs5v99_pfnrn2_1oszvuo atm_9s_1ulexfb_1buez3b_1oszvuo atm_uc_aaiy6o_1fu4lp4_1oszvuo atm_4b_dezgoh_1fu4lp4_1oszvuo atm_70_1t2bbnk_1fu4lp4_1oszvuo atm_gi_eflcwz_1fu4lp4_1oszvuo atm_uc_glywfm_1fu4lp4_1o31aam dir dir-ltr">
                    <div>
                      <img className='form_icon' height={30} src="/images/checkin.png" alt="" />
                    </div>
                    <div className="cz9siyu atm_l8_srw7uq atm_ks_15vqwwr atm_mk_h2mmj6 atm_vv_1q9ccgz atm_vy_1osqo2v atm_wq_kb7nvz dir dir-ltr">
                      <div className="lk4ruxu atm_c8_1uc0753 atm_g3_lonqig atm_cs_10d11i2 atm_fr_idpfg4 atm_le_yh40bf dir dir-ltr">
                        Check in
                      </div>
                      <div className="p1m42al0 atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_cs_6adqpa atm_ks_15vqwwr atm_sq_1l2sidv atm_vy_1osqo2v p1t4vwjw atm_7l_1jsbn00 dir dir-ltr">
                        Add dates
                      </div>
                    </div>
                  </div>
                </div>

                <div className="s1w513da atm_j_1h6ojuz atm_5q_1vlbu9m atm_am_jp9ccn atm_e2_1vi7ecw dir dir-ltr"></div>

                <div className="c1ddhymz atm_am_16wc86f atm_h_1h6ojuz atm_9s_1txwivl atm_gi_1n1ank9 atm_jb_idpfg4 atm_mk_h2mmj6 atm_vy_10bmcub dir dir-ltr">
                  <div className="fix_row b1spesa7 atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_7l_1kw7nm4 atm_9j_tlke0l atm_bx_1kw7nm4 atm_c8_1kw7nm4 atm_cs_1kw7nm4 atm_g3_1kw7nm4 atm_gi_idpfg4 atm_ks_ewfl5b atm_rd_glywfm atm_vb_1wugsn5 atm_kd_glywfm atm_9s_1ulexfb atm_am_qk3dho atm_l8_t94yts atm_r3_1e5hqsa atm_vy_idpfg4 atm_wq_kb7nvz atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_6h_1s2714j_vmtskl atm_66_nqa18y_vmtskl atm_4b_1egtlkw_vmtskl atm_92_1yyfdc7_vmtskl atm_9s_glywfm_vmtskl atm_e2_1vi7ecw_vmtskl atm_fq_idpfg4_vmtskl atm_h3_4h84z3_vmtskl atm_mk_stnw88_vmtskl atm_n3_idpfg4_vmtskl atm_tk_1ssbidh_vmtskl atm_wq_idpfg4_vmtskl atm_2a_1u8qnfj_9in345 atm_3f_okh77k_9in345 atm_5j_1vi7ecw_9in345 atm_6i_idpfg4_9in345 atm_92_1yyfdc7_9in345 atm_fq_idpfg4_9in345 atm_mk_stnw88_9in345 atm_n3_idpfg4_9in345 atm_tk_idpfg4_9in345 atm_wq_idpfg4_9in345 b1fbhdca atm_9s_1ulexfb_1rqz0hn atm_gi_eflcwz_9bj8xt atm_2d_um1unu_9bj8xt atm_wq_cs5v99_1w3cfyq atm_9s_1ulexfb_9xuho3 atm_uc_aaiy6o_1tasb51 atm_4b_dezgoh_1tasb51 atm_70_1t2bbnk_1tasb51 atm_gi_eflcwz_1tasb51 atm_uc_glywfm_1tasb51_1rrf6b5 atm_wq_cs5v99_pfnrn2_1oszvuo atm_9s_1ulexfb_1buez3b_1oszvuo atm_uc_aaiy6o_1fu4lp4_1oszvuo atm_4b_dezgoh_1fu4lp4_1oszvuo atm_70_1t2bbnk_1fu4lp4_1oszvuo atm_gi_eflcwz_1fu4lp4_1oszvuo atm_uc_glywfm_1fu4lp4_1o31aam dir dir-ltr">
                    <div>
                      <img className='form_icon' height={30} src="/images/checkout.png" alt="" />
                    </div>
                    <div className="cz9siyu atm_l8_srw7uq atm_ks_15vqwwr atm_mk_h2mmj6 atm_vv_1q9ccgz atm_vy_1osqo2v atm_wq_kb7nvz dir dir-ltr">
                      <div className="lk4ruxu atm_c8_1uc0753 atm_g3_lonqig atm_cs_10d11i2 atm_fr_idpfg4 atm_le_yh40bf dir dir-ltr">
                        Check out
                      </div>
                      <div className="p1m42al0 atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_cs_6adqpa atm_ks_15vqwwr atm_sq_1l2sidv atm_vy_1osqo2v p1t4vwjw atm_7l_1jsbn00 dir dir-ltr">
                        Add dates
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* check in check out */}

              <div className="s1w513da atm_j_1h6ojuz atm_5q_1vlbu9m atm_am_jp9ccn atm_e2_1vi7ecw dir dir-ltr"></div>

              <div className="c111bvlt atm_9s_1txwivl atm_1eltean_1osqo2v c1gh7ier atm_am_1qhqiko dir dir-ltr">
                <div className="c1ddhymz atm_h_1h6ojuz atm_9s_1txwivl atm_gi_1n1ank9 atm_jb_idpfg4 atm_mk_h2mmj6 atm_vy_10bmcub cggll98 atm_am_1qhqiko dir dir-ltr">
                  {/* add people */}

                  <div onClick={toggleMoreLinks} className="fix_row b1spesa7 atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_7l_1kw7nm4 atm_9j_tlke0l atm_bx_1kw7nm4 atm_c8_1kw7nm4 atm_cs_1kw7nm4 atm_g3_1kw7nm4 atm_gi_idpfg4 atm_ks_ewfl5b atm_rd_glywfm atm_vb_1wugsn5 atm_kd_glywfm atm_9s_1ulexfb atm_am_qk3dho atm_l8_t94yts atm_r3_1e5hqsa atm_vy_idpfg4 atm_wq_kb7nvz atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_6h_1s2714j_vmtskl atm_66_nqa18y_vmtskl atm_4b_1egtlkw_vmtskl atm_92_1yyfdc7_vmtskl atm_9s_glywfm_vmtskl atm_e2_1vi7ecw_vmtskl atm_fq_idpfg4_vmtskl atm_h3_4h84z3_vmtskl atm_mk_stnw88_vmtskl atm_n3_idpfg4_vmtskl atm_tk_1ssbidh_vmtskl atm_wq_idpfg4_vmtskl atm_2a_1u8qnfj_9in345 atm_3f_okh77k_9in345 atm_5j_1vi7ecw_9in345 atm_6i_idpfg4_9in345 atm_92_1yyfdc7_9in345 atm_fq_idpfg4_9in345 atm_mk_stnw88_9in345 atm_n3_idpfg4_9in345 atm_tk_idpfg4_9in345 atm_wq_idpfg4_9in345 b1fbhdca atm_9s_1ulexfb_1rqz0hn atm_gi_eflcwz_9bj8xt atm_2d_um1unu_9bj8xt atm_wq_cs5v99_1w3cfyq atm_9s_1ulexfb_9xuho3 atm_uc_aaiy6o_1tasb51 atm_4b_dezgoh_1tasb51 atm_70_1t2bbnk_1tasb51 atm_gi_eflcwz_1tasb51 atm_uc_glywfm_1tasb51_1rrf6b5 atm_wq_cs5v99_pfnrn2_1oszvuo atm_9s_1ulexfb_1buez3b_1oszvuo atm_uc_aaiy6o_1fu4lp4_1oszvuo atm_4b_dezgoh_1fu4lp4_1oszvuo atm_70_1t2bbnk_1fu4lp4_1oszvuo atm_gi_eflcwz_1fu4lp4_1oszvuo atm_uc_glywfm_1fu4lp4_1o31aam b1889vka atm_5q_idpfg4_agv9cz atm_h0_idpfg4_1ve49u dir dir-ltr">
                    <div>
                      <img className='form_icon' height={30} src="/images/people.png" alt="" />
                    </div>
                    <div className="cz9siyu atm_l8_srw7uq atm_ks_15vqwwr atm_mk_h2mmj6 atm_vv_1q9ccgz atm_vy_1osqo2v atm_wq_kb7nvz dir dir-ltr">
                      <div className="lk4ruxu atm_c8_1uc0753 atm_g3_lonqig atm_cs_10d11i2 atm_fr_idpfg4 atm_le_yh40bf dir dir-ltr">
                        Who
                      </div>
                      <div className="p1m42al0 atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_cs_6adqpa atm_ks_15vqwwr atm_sq_1l2sidv atm_vy_1osqo2v p1t4vwjw atm_7l_1jsbn00 dir dir-ltr">
                        {(adultCount > 0 || childCount > 0 || infrontCount > 0 || petsCount > 0) ?
                          `${adultCount + childCount} guest${(adultCount + childCount) !== 1 ? 's' : ''}, ${infrontCount} infant${infrontCount !== 1 ? 's' : ''}, ${petsCount} pet${petsCount !== 1 ? 's' : ''}`
                          :
                          "Add guests"
                        }
                      </div>
                    </div>
                  </div>

                  <div className={`increment_drop ${counterModel ? 'd-block' : ''}`}>
                    <div className="coy2xq9 atm_mk_stnw88 atm_tk_1osqo2v atm_wq_kb7nvz atm_26_1p8m8iw atm_5j_1vi7ecw atm_70_z3lat3 atm_gp_1fwxnve atm_iy_1xor2vp atm_l0_15vqwwr atm_l1_1wugsn5 atm_l2_1f51e7f atm_lb_4n2dxu atm_lh_swyrjs atm_5sxl3l_16m390d__1v156lz r1p5mcc8 atm_n3_idpfg4 dir dir-ltr">
                      <div className="g6e6z5i atm_l8_14br1z3 atm_vy_smdzip dir dir-ltr">

                        <div className="cnhxj7b atm_7l_dezgoh atm_9s_1txwivl atm_h_1h6ojuz atm_fc_1yb4nlp atm_be_1g80g66 atm_cx_19bvopo atm_lb_1drp7u0 atm_ll_2p0wge atm_40_1f9jazd_1i0dyc0 atm_jb_p2n4d6__oggzyc atm_lb_1crvktv__oggzyc dir dir-ltr">
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

                  {/* add people */}

                  {/* search button */}
                  <div className='search_btns'>
                    <button className='search_button'>
                      <img src="/images/magnifine.png" alt="" />
                      <span>Search</span>
                    </button>
                    <button className='search_with_ai'>
                      <img src="/images/shineStar.png" alt="" />
                    </button>
                  </div>
                  {/* search button */}
                </div>


              </div>
            </div>
          </div>
        </form>

        <div data-bs-toggle="modal" data-bs-target="#searchModal" className="form_mob s97awm atm_am_kb7nvz atm_5j_1pm7oz0 atm_7l_dezgoh atm_j6_8vuzuz atm_9s_11p5wf0 atm_h_1fhbwtr atm_8w_73ivac atm_gx_idpfg4 atm_vz_qft6q7 atm_ui_dava36 atm_uv_xoomkg s1upghlx atm_26_1p8m8iw atm_3f_1tyokbi atm_70_504m4t dir dir-ltr">
          <button type="button" className="l1ovpqvx atm_1he2i46_1k8pnbi_10saat9 atm_yxpdqi_1pv6nv4_10saat9 atm_1a0hdzc_w1h1e8_10saat9 atm_2bu6ew_929bqk_10saat9 atm_12oyo1u_73u7pn_10saat9 atm_fiaz40_1etamxe_10saat9 bfknzxl atm_9j_tlke0l atm_mk_h2mmj6 atm_70_5j5alw atm_tl_1gw4zv3 atm_9j_13gfvf7_1o5j5ji c1i81z0m atm_fr_11a07z3 atm_r2_1j28jx2 atm_26_1j28jx2 atm_3f_glywfm atm_7l_1kw7nm4 atm_gi_idpfg4 atm_l8_idpfg4 atm_r3_1kw7nm4 atm_rd_glywfm atm_e2_1osqo2v atm_vy_1osqo2v atm_bx_1kw7nm4 atm_c8_1kw7nm4 atm_g3_1kw7nm4 atm_cs_1kw7nm4 atm_kd_glywfm atm_h_1h6ojuz atm_9s_1n7usvw atm_j3_1osqo2v atm_uc_glywfm atm_vb_glywfm atm_5j_b4p6a2 atm_uc_glywfm__1rrf6b5 atm_kd_glywfm_1w3cfyq atm_3f_glywfm_e4a3ld atm_l8_idpfg4_e4a3ld atm_gi_idpfg4_e4a3ld atm_3f_glywfm_1r4qscq atm_kd_glywfm_6y7yyg atm_kd_glywfm_pfnrn2_1oszvuo atm_l8_idpfg4_1icshfk_1oszvuo atm_gi_idpfg4_1icshfk_1oszvuo atm_3f_glywfm_b5gff8_1oszvuo atm_kd_glywfm_2by9w9_1oszvuo atm_k4_kb7nvz_1o5j5ji atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_tr_glywfm_csw3t1 atm_uc_aaiy6o_1w3cfyq atm_70_1xvh5se_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_1xvh5se_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam s1pm3o7c atm_dz_rhb615 atm_lj_evh4rp atm_li_evh4rp dir dir-ltr">
            <span className="su7l6qf atm_9s_11p5wf0 atm_mg_1h6ojuz dir dir-ltr">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="presentation" focusable="false" style={{ display: 'block', height: '20px', width: '20px', fill: 'currentColor' }}><path d="M13 0a13 13 0 0 1 10.5 20.67l7.91 7.92-2.82 2.82-7.92-7.91A12.94 12.94 0 0 1 13 26a13 13 0 1 1 0-26zm0 4a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"></path></svg>
            </span>
            <span className="m10pln4b atm_9s_1o8liyq atm_lk_yh40bf atm_j3_1osqo2v atm_ks_15vqwwr dir dir-ltr">
              <div className="p1b4e8cr atm_c8_km0zk7 atm_fr_1m9t47k atm_cs_10d11i2 atm_g3_gktfv atm_9s_1ulexfb atm_ks_15vqwwr atm_sq_1l2sidv atm_vv_1q9ccgz dir dir-ltr">Where to?</div>
              <div className="s1f5fdzj atm_9s_1txwivl atm_c8_1uc0753 atm_g3_lonqig atm_fr_r7vles atm_7l_1esdqks atm_li_p5ox87 atm_cx_14y27yu dir dir-ltr" >
                <span className="s13th1u8 atm_am_1pywi5l atm_jb_12am3vd atm_ks_15vqwwr atm_sq_1l2sidv atm_vv_1q9ccgz dir dir-ltr">Anywhere</span>
                <span >•</span>
                <span className="s13th1u8 atm_am_1pywi5l atm_jb_12am3vd atm_ks_15vqwwr atm_sq_1l2sidv atm_vv_1q9ccgz dir dir-ltr">Any week</span>
                <span >•</span>
                <span className="s13th1u8 atm_am_1pywi5l atm_jb_12am3vd atm_ks_15vqwwr atm_sq_1l2sidv atm_vv_1q9ccgz dir dir-ltr">Add guests</span>
              </div>
              <span className="a8jt5op atm_3f_idpfg4 atm_7h_hxbz6r atm_7i_ysn8ba atm_e2_t94yts atm_ks_zryt35 atm_l8_idpfg4 atm_mk_stnw88 atm_vv_1q9ccgz atm_vy_t94yts dir dir-ltr" id="searchInputDescriptionId">Currently showing Any week, Add guests. Change search.</span>
            </span>
          </button>
        </div>
      </div>


    </>
  )
}

export default Search