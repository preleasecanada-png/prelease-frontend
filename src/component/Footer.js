import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { CreateApiContext } from '../ContextApi/CreateApiContext';
import localeLang from '../locales';
const Footer = () => {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const { locale, setLocale } = useContext(CreateApiContext);
    const [langTab, setLangTab] = useState('');
    const currentDate = new Date();

    const hanleLanguageChange = (e, lang) => {
        e.preventDefault();
        setLangTab(lang);
        setLocale(localeLang[lang]);
        localStorage.setItem('language', lang);
    }

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            setLangTab(savedLanguage);
            setLocale(localeLang[savedLanguage]);
        }
    }, []);
    return (
        <>
            <footer className={`footer_main ff6a337 atm_26_116dmco atm_67_1vlbu9m dir dir-ltr  ${(router?.pathname === '/login' || router?.pathname === '/sign-up' || router?.pathname === '/forget-password' || router?.pathname === '/reset-password' || router?.pathname === '/verification') && "d-none"}`}>
                <div className='cdy1si3 atm_gw_1wugsn5 atm_lh_1tcgj5g atm_j3_lepw20 atm_lh_1ylpe5n__oggzyc atm_lh_u29brm__jx8car atm_9s_11p5wf0__w5e62l  atm_dl_1tcgj5g__w5e62l dir dir-ltr'>
                    <div className='new_letter_area'>
                        <img src="/images/pre_leaf.webp" alt="" />
                        <h2>{locale?.home?.stay_update_with_prelease_canada}</h2>
                        <form className='newletter_form'>
                            <input type="email" placeholder='Email Address' />
                            <button>{locale?.home?.send}</button>
                        </form>
                    </div>
                </div>

                <hr />

                <div className="cdy1si3 atm_gw_1wugsn5 atm_lh_1tcgj5g atm_j3_lepw20 atm_lh_1ylpe5n__oggzyc atm_lh_u29brm__jx8car atm_9s_11p5wf0__w5e62l atm_dz_uslobp__w5e62l atm_dl_1tcgj5g__w5e62l dir dir-ltr">
                    <div className="c1x7vv2s atm_dg_cs5v99 dir dir-ltr">
                        <div className="l1g2ukzz atm_9s_11p5wf0__1v156lz atm_dz_1h3c94l__1v156lz atm_84_ftgil2__1v156lz dir dir-ltr">

                            <section className="se5ui3x atm_67_1vlbu9m atm_lb_1ph3nq8 atm_67_idpfg4_13mkcot atm_67_idpfg4__1v156lz atm_lb_dnsvzo__1v156lz dir dir-ltr">
                                <h3 className="trsc28b atm_gi_idpfg4 atm_7l_dezgoh atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_cs_10d11i2 atm_gq_1gibeiw dir dir-ltr">
                                    {locale?.footer?.support}
                                </h3>
                                <ul className="l1qzr284 atm_gi_idpfg4 atm_l8_idpfg4 atm_gb_glywfm atm_9s_11p5wf0 atm_cx_1gibeiw dir dir-ltr">
                                    <li>
                                        <Link href="/help-center" className="l1ovpqvx atm_1he2i46_1k8pnbi_10saat9 atm_yxpdqi_1pv6nv4_10saat9 atm_1a0hdzc_w1h1e8_10saat9 atm_2bu6ew_929bqk_10saat9 atm_12oyo1u_73u7pn_10saat9 atm_fiaz40_1etamxe_10saat9 c1kblhex atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_vb_1wugsn5 atm_rd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_cs_6adqpa atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_rd_glywfm_1mj13j2_uv4tnr atm_rd_8stvzk_1nos8r atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_7l_1ulhtn1_pfnrn2 atm_rd_8stvzk_pfnrn2 atm_uc_ryfd4z_pfnrn2 atm_5j_yh40bf_pfnrn2 atm_70_pd3o52_pfnrn2 atm_uc_glywfm_pfnrn2_1rrf6b5 dir dir-ltr">
                                            {locale?.footer?.help_center}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#!" className="l1ovpqvx atm_1he2i46_1k8pnbi_10saat9 atm_yxpdqi_1pv6nv4_10saat9 atm_1a0hdzc_w1h1e8_10saat9 atm_2bu6ew_929bqk_10saat9 atm_12oyo1u_73u7pn_10saat9 atm_fiaz40_1etamxe_10saat9 c1kblhex atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_vb_1wugsn5 atm_rd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_cs_6adqpa atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_rd_glywfm_1mj13j2_uv4tnr atm_rd_8stvzk_1nos8r atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_7l_1ulhtn1_pfnrn2 atm_rd_8stvzk_pfnrn2 atm_uc_ryfd4z_pfnrn2 atm_5j_yh40bf_pfnrn2 atm_70_pd3o52_pfnrn2 atm_uc_glywfm_pfnrn2_1rrf6b5 dir dir-ltr">
                                            {locale?.footer?.precover}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/anti-discrimination" className="l1ovpqvx atm_1he2i46_1k8pnbi_10saat9 atm_yxpdqi_1pv6nv4_10saat9 atm_1a0hdzc_w1h1e8_10saat9 atm_2bu6ew_929bqk_10saat9 atm_12oyo1u_73u7pn_10saat9 atm_fiaz40_1etamxe_10saat9 c1kblhex atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_vb_1wugsn5 atm_rd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_cs_6adqpa atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_rd_glywfm_1mj13j2_uv4tnr atm_rd_8stvzk_1nos8r atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_7l_1ulhtn1_pfnrn2 atm_rd_8stvzk_pfnrn2 atm_uc_ryfd4z_pfnrn2 atm_5j_yh40bf_pfnrn2 atm_70_pd3o52_pfnrn2 atm_uc_glywfm_pfnrn2_1rrf6b5 dir dir-ltr">
                                            Anti-discrimination
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#!" className="l1ovpqvx atm_1he2i46_1k8pnbi_10saat9 atm_yxpdqi_1pv6nv4_10saat9 atm_1a0hdzc_w1h1e8_10saat9 atm_2bu6ew_929bqk_10saat9 atm_12oyo1u_73u7pn_10saat9 atm_fiaz40_1etamxe_10saat9 c1kblhex atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_vb_1wugsn5 atm_rd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_cs_6adqpa atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_rd_glywfm_1mj13j2_uv4tnr atm_rd_8stvzk_1nos8r atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_7l_1ulhtn1_pfnrn2 atm_rd_8stvzk_pfnrn2 atm_uc_ryfd4z_pfnrn2 atm_5j_yh40bf_pfnrn2 atm_70_pd3o52_pfnrn2 atm_uc_glywfm_pfnrn2_1rrf6b5 dir dir-ltr">
                                            {locale?.footer?.disabled_support}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#!" className="l1ovpqvx atm_1he2i46_1k8pnbi_10saat9 atm_yxpdqi_1pv6nv4_10saat9 atm_1a0hdzc_w1h1e8_10saat9 atm_2bu6ew_929bqk_10saat9 atm_12oyo1u_73u7pn_10saat9 atm_fiaz40_1etamxe_10saat9 c1kblhex atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_vb_1wugsn5 atm_rd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_cs_6adqpa atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_rd_glywfm_1mj13j2_uv4tnr atm_rd_8stvzk_1nos8r atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_7l_1ulhtn1_pfnrn2 atm_rd_8stvzk_pfnrn2 atm_uc_ryfd4z_pfnrn2 atm_5j_yh40bf_pfnrn2 atm_70_pd3o52_pfnrn2 atm_uc_glywfm_pfnrn2_1rrf6b5 dir dir-ltr">
                                            {locale?.footer?.cancellation_options}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/report-neighborhood-concern" className="l1ovpqvx atm_1he2i46_1k8pnbi_10saat9 atm_yxpdqi_1pv6nv4_10saat9 atm_1a0hdzc_w1h1e8_10saat9 atm_2bu6ew_929bqk_10saat9 atm_12oyo1u_73u7pn_10saat9 atm_fiaz40_1etamxe_10saat9 c1kblhex atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_vb_1wugsn5 atm_rd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_cs_6adqpa atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_rd_glywfm_1mj13j2_uv4tnr atm_rd_8stvzk_1nos8r atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_7l_1ulhtn1_pfnrn2 atm_rd_8stvzk_pfnrn2 atm_uc_ryfd4z_pfnrn2 atm_5j_yh40bf_pfnrn2 atm_70_pd3o52_pfnrn2 atm_uc_glywfm_pfnrn2_1rrf6b5 dir dir-ltr">
                                            {locale?.footer?.report_neighborhood_concern}
                                        </Link>
                                    </li>
                                </ul>
                            </section>

                            <section className="se5ui3x atm_67_1vlbu9m atm_lb_1ph3nq8 atm_67_idpfg4_13mkcot atm_67_idpfg4__1v156lz atm_lb_dnsvzo__1v156lz dir dir-ltr">
                                <h3 className="trsc28b atm_gi_idpfg4 atm_7l_dezgoh atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_cs_10d11i2 atm_gq_1gibeiw dir dir-ltr">
                                    {locale?.footer?.hosting}
                                </h3>
                                <ul className="l1qzr284 atm_gi_idpfg4 atm_l8_idpfg4 atm_gb_glywfm atm_9s_11p5wf0 atm_cx_1gibeiw dir dir-ltr">
                                    <li>
                                        <Link href="/prelease-your-home" className="l1ovpqvx atm_1he2i46_1k8pnbi_10saat9 atm_yxpdqi_1pv6nv4_10saat9 atm_1a0hdzc_w1h1e8_10saat9 atm_2bu6ew_929bqk_10saat9 atm_12oyo1u_73u7pn_10saat9 atm_fiaz40_1etamxe_10saat9 c1kblhex atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_vb_1wugsn5 atm_rd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_cs_6adqpa atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_rd_glywfm_1mj13j2_uv4tnr atm_rd_8stvzk_1nos8r atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_7l_1ulhtn1_pfnrn2 atm_rd_8stvzk_pfnrn2 atm_uc_ryfd4z_pfnrn2 atm_5j_yh40bf_pfnrn2 atm_70_pd3o52_pfnrn2 atm_uc_glywfm_pfnrn2_1rrf6b5 dir dir-ltr">
                                            {locale?.home?.prelease_your_home}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#!" className="l1ovpqvx atm_1he2i46_1k8pnbi_10saat9 atm_yxpdqi_1pv6nv4_10saat9 atm_1a0hdzc_w1h1e8_10saat9 atm_2bu6ew_929bqk_10saat9 atm_12oyo1u_73u7pn_10saat9 atm_fiaz40_1etamxe_10saat9 c1kblhex atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_vb_1wugsn5 atm_rd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_cs_6adqpa atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_rd_glywfm_1mj13j2_uv4tnr atm_rd_8stvzk_1nos8r atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_7l_1ulhtn1_pfnrn2 atm_rd_8stvzk_pfnrn2 atm_uc_ryfd4z_pfnrn2 atm_5j_yh40bf_pfnrn2 atm_70_pd3o52_pfnrn2 atm_uc_glywfm_pfnrn2_1rrf6b5 dir dir-ltr">
                                            {locale?.footer?.pre_cover_for_hosts}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#!" className="l1ovpqvx atm_1he2i46_1k8pnbi_10saat9 atm_yxpdqi_1pv6nv4_10saat9 atm_1a0hdzc_w1h1e8_10saat9 atm_2bu6ew_929bqk_10saat9 atm_12oyo1u_73u7pn_10saat9 atm_fiaz40_1etamxe_10saat9 c1kblhex atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_vb_1wugsn5 atm_rd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_cs_6adqpa atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_rd_glywfm_1mj13j2_uv4tnr atm_rd_8stvzk_1nos8r atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_7l_1ulhtn1_pfnrn2 atm_rd_8stvzk_pfnrn2 atm_uc_ryfd4z_pfnrn2 atm_5j_yh40bf_pfnrn2 atm_70_pd3o52_pfnrn2 atm_uc_glywfm_pfnrn2_1rrf6b5 dir dir-ltr">
                                            {locale?.footer?.hosting_resources}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#!" className="l1ovpqvx atm_1he2i46_1k8pnbi_10saat9 atm_yxpdqi_1pv6nv4_10saat9 atm_1a0hdzc_w1h1e8_10saat9 atm_2bu6ew_929bqk_10saat9 atm_12oyo1u_73u7pn_10saat9 atm_fiaz40_1etamxe_10saat9 c1kblhex atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_vb_1wugsn5 atm_rd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_cs_6adqpa atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_rd_glywfm_1mj13j2_uv4tnr atm_rd_8stvzk_1nos8r atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_7l_1ulhtn1_pfnrn2 atm_rd_8stvzk_pfnrn2 atm_uc_ryfd4z_pfnrn2 atm_5j_yh40bf_pfnrn2 atm_70_pd3o52_pfnrn2 atm_uc_glywfm_pfnrn2_1rrf6b5 dir dir-ltr">
                                            {locale?.footer?.community_forum}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#!" className="l1ovpqvx atm_1he2i46_1k8pnbi_10saat9 atm_yxpdqi_1pv6nv4_10saat9 atm_1a0hdzc_w1h1e8_10saat9 atm_2bu6ew_929bqk_10saat9 atm_12oyo1u_73u7pn_10saat9 atm_fiaz40_1etamxe_10saat9 c1kblhex atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_vb_1wugsn5 atm_rd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_cs_6adqpa atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_rd_glywfm_1mj13j2_uv4tnr atm_rd_8stvzk_1nos8r atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_7l_1ulhtn1_pfnrn2 atm_rd_8stvzk_pfnrn2 atm_uc_ryfd4z_pfnrn2 atm_5j_yh40bf_pfnrn2 atm_70_pd3o52_pfnrn2 atm_uc_glywfm_pfnrn2_1rrf6b5 dir dir-ltr">
                                            {locale?.footer?.hosting_responsibly}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#!" className="l1ovpqvx atm_1he2i46_1k8pnbi_10saat9 atm_yxpdqi_1pv6nv4_10saat9 atm_1a0hdzc_w1h1e8_10saat9 atm_2bu6ew_929bqk_10saat9 atm_12oyo1u_73u7pn_10saat9 atm_fiaz40_1etamxe_10saat9 c1kblhex atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_vb_1wugsn5 atm_rd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_cs_6adqpa atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_rd_glywfm_1mj13j2_uv4tnr atm_rd_8stvzk_1nos8r atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_7l_1ulhtn1_pfnrn2 atm_rd_8stvzk_pfnrn2 atm_uc_ryfd4z_pfnrn2 atm_5j_yh40bf_pfnrn2 atm_70_pd3o52_pfnrn2 atm_uc_glywfm_pfnrn2_1rrf6b5 dir dir-ltr">
                                            {locale?.footer?.prelease_friendly_apartments}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#!" className="l1ovpqvx atm_1he2i46_1k8pnbi_10saat9 atm_yxpdqi_1pv6nv4_10saat9 atm_1a0hdzc_w1h1e8_10saat9 atm_2bu6ew_929bqk_10saat9 atm_12oyo1u_73u7pn_10saat9 atm_fiaz40_1etamxe_10saat9 c1kblhex atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_vb_1wugsn5 atm_rd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_cs_6adqpa atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_rd_glywfm_1mj13j2_uv4tnr atm_rd_8stvzk_1nos8r atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_7l_1ulhtn1_pfnrn2 atm_rd_8stvzk_pfnrn2 atm_uc_ryfd4z_pfnrn2 atm_5j_yh40bf_pfnrn2 atm_70_pd3o52_pfnrn2 atm_uc_glywfm_pfnrn2_1rrf6b5 dir dir-ltr">
                                            {locale?.footer?.join_free_hosting_class}
                                        </Link>
                                    </li>
                                </ul>
                            </section>

                            <section className="se5ui3x atm_67_1vlbu9m atm_lb_1ph3nq8 atm_67_idpfg4_13mkcot atm_67_idpfg4__1v156lz atm_lb_dnsvzo__1v156lz dir dir-ltr">
                                <h3 className="trsc28b atm_gi_idpfg4 atm_7l_dezgoh atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_cs_10d11i2 atm_gq_1gibeiw dir dir-ltr">
                                    {locale?.footer?.prelease}
                                </h3>
                                <ul className="l1qzr284 atm_gi_idpfg4 atm_l8_idpfg4 atm_gb_glywfm atm_9s_11p5wf0 atm_cx_1gibeiw dir dir-ltr">
                                    <li>
                                        <Link href="#!" className="l1ovpqvx atm_1he2i46_1k8pnbi_10saat9 atm_yxpdqi_1pv6nv4_10saat9 atm_1a0hdzc_w1h1e8_10saat9 atm_2bu6ew_929bqk_10saat9 atm_12oyo1u_73u7pn_10saat9 atm_fiaz40_1etamxe_10saat9 c1kblhex atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_vb_1wugsn5 atm_rd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_cs_6adqpa atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_rd_glywfm_1mj13j2_uv4tnr atm_rd_8stvzk_1nos8r atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_7l_1ulhtn1_pfnrn2 atm_rd_8stvzk_pfnrn2 atm_uc_ryfd4z_pfnrn2 atm_5j_yh40bf_pfnrn2 atm_70_pd3o52_pfnrn2 atm_uc_glywfm_pfnrn2_1rrf6b5 dir dir-ltr">
                                            {locale?.home?.about_us}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#!" className="l1ovpqvx atm_1he2i46_1k8pnbi_10saat9 atm_yxpdqi_1pv6nv4_10saat9 atm_1a0hdzc_w1h1e8_10saat9 atm_2bu6ew_929bqk_10saat9 atm_12oyo1u_73u7pn_10saat9 atm_fiaz40_1etamxe_10saat9 c1kblhex atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_vb_1wugsn5 atm_rd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_cs_6adqpa atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_rd_glywfm_1mj13j2_uv4tnr atm_rd_8stvzk_1nos8r atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_7l_1ulhtn1_pfnrn2 atm_rd_8stvzk_pfnrn2 atm_uc_ryfd4z_pfnrn2 atm_5j_yh40bf_pfnrn2 atm_70_pd3o52_pfnrn2 atm_uc_glywfm_pfnrn2_1rrf6b5 dir dir-ltr">
                                            Contact
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#!" className="l1ovpqvx atm_1he2i46_1k8pnbi_10saat9 atm_yxpdqi_1pv6nv4_10saat9 atm_1a0hdzc_w1h1e8_10saat9 atm_2bu6ew_929bqk_10saat9 atm_12oyo1u_73u7pn_10saat9 atm_fiaz40_1etamxe_10saat9 c1kblhex atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_vb_1wugsn5 atm_rd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_cs_6adqpa atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_rd_glywfm_1mj13j2_uv4tnr atm_rd_8stvzk_1nos8r atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_7l_1ulhtn1_pfnrn2 atm_rd_8stvzk_pfnrn2 atm_uc_ryfd4z_pfnrn2 atm_5j_yh40bf_pfnrn2 atm_70_pd3o52_pfnrn2 atm_uc_glywfm_pfnrn2_1rrf6b5 dir dir-ltr">
                                            {locale?.footer?.careers}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/help-center" className="l1ovpqvx atm_1he2i46_1k8pnbi_10saat9 atm_yxpdqi_1pv6nv4_10saat9 atm_1a0hdzc_w1h1e8_10saat9 atm_2bu6ew_929bqk_10saat9 atm_12oyo1u_73u7pn_10saat9 atm_fiaz40_1etamxe_10saat9 c1kblhex atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_vb_1wugsn5 atm_rd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_cs_6adqpa atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_rd_glywfm_1mj13j2_uv4tnr atm_rd_8stvzk_1nos8r atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_7l_1ulhtn1_pfnrn2 atm_rd_8stvzk_pfnrn2 atm_uc_ryfd4z_pfnrn2 atm_5j_yh40bf_pfnrn2 atm_70_pd3o52_pfnrn2 atm_uc_glywfm_pfnrn2_1rrf6b5 dir dir-ltr">
                                            {locale?.footer?.landlords}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/privacy-policy" className="l1ovpqvx atm_1he2i46_1k8pnbi_10saat9 atm_yxpdqi_1pv6nv4_10saat9 atm_1a0hdzc_w1h1e8_10saat9 atm_2bu6ew_929bqk_10saat9 atm_12oyo1u_73u7pn_10saat9 atm_fiaz40_1etamxe_10saat9 c1kblhex atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_vb_1wugsn5 atm_rd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_cs_6adqpa atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_rd_glywfm_1mj13j2_uv4tnr atm_rd_8stvzk_1nos8r atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_7l_1ulhtn1_pfnrn2 atm_rd_8stvzk_pfnrn2 atm_uc_ryfd4z_pfnrn2 atm_5j_yh40bf_pfnrn2 atm_70_pd3o52_pfnrn2 atm_uc_glywfm_pfnrn2_1rrf6b5 dir dir-ltr">
                                            {locale?.footer?.privacy_policy}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#!" className="l1ovpqvx atm_1he2i46_1k8pnbi_10saat9 atm_yxpdqi_1pv6nv4_10saat9 atm_1a0hdzc_w1h1e8_10saat9 atm_2bu6ew_929bqk_10saat9 atm_12oyo1u_73u7pn_10saat9 atm_fiaz40_1etamxe_10saat9 c1kblhex atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_gi_idpfg4 atm_l8_idpfg4 atm_vb_1wugsn5 atm_rd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_cs_6adqpa atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_rd_glywfm_1mj13j2_uv4tnr atm_rd_8stvzk_1nos8r atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_7l_1ulhtn1_pfnrn2 atm_rd_8stvzk_pfnrn2 atm_uc_ryfd4z_pfnrn2 atm_5j_yh40bf_pfnrn2 atm_70_pd3o52_pfnrn2 atm_uc_glywfm_pfnrn2_1rrf6b5 dir dir-ltr">
                                            FAQ
                                        </Link>
                                    </li>
                                </ul>
                            </section>

                        </div>
                        <div className="f1n8x35d atm_lo_1ph3nq8 atm_le_1ph3nq8 atm_67_1vlbu9m dir dir-ltr last_line">
                            <div className="_lldyhy" dir="ltr">© {currentDate.getFullYear()} {locale?.footer?.prelease},Inc.</div>

                            <div className="footer_row">

                                <button onClick={() => setShowModal(true)} type="button" className="pop_change" data-bs-toggle="modal" data-bs-target="#exampleModal" data-content="language">
                                    <span className="i2is942 atm_h0_1hcum46 atm_c8_exct8b atm_cs_10d11i2 dir dir-ltr">
                                        <svg height={18} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" role="presentation" focusable="false">
                                            <path d="M8 .25a7.77 7.77 0 0 1 7.75 7.78 7.75 7.75 0 0 1-7.52 7.72h-.25A7.75 7.75 0 0 1 .25 8.24v-.25A7.75 7.75 0 0 1 8 .25zm1.95 8.5h-3.9c.15 2.9 1.17 5.34 1.88 5.5H8c.68 0 1.72-2.37 1.93-5.23zm4.26 0h-2.76c-.09 1.96-.53 3.78-1.18 5.08A6.26 6.26 0 0 0 14.17 9zm-9.67 0H1.8a6.26 6.26 0 0 0 3.94 5.08 12.59 12.59 0 0 1-1.16-4.7l-.03-.38zm1.2-6.58-.12.05a6.26 6.26 0 0 0-3.83 5.03h2.75c.09-1.83.48-3.54 1.06-4.81zm2.25-.42c-.7 0-1.78 2.51-1.94 5.5h3.9c-.15-2.9-1.18-5.34-1.89-5.5h-.07zm2.28.43.03.05a12.95 12.95 0 0 1 1.15 5.02h2.75a6.28 6.28 0 0 0-3.93-5.07z"></path>
                                        </svg>
                                    </span>
                                    <span className="l120a03b atm_cs_10d11i2 atm_rd_8stvzk_1nos8r dir dir-ltr">{langTab === 'en' ? 'English (US)' : 'French'}</span>
                                </button>

                                <button type="button" className="pop_change" data-bs-toggle="modal" data-bs-target="#exampleModal" data-content="currency">
                                    <span className="a8jt5op atm_3f_idpfg4 atm_7h_hxbz6r atm_7i_ysn8ba atm_e2_t94yts atm_ks_zryt35 atm_l8_idpfg4 atm_mk_stnw88 atm_vv_1q9ccgz atm_vy_t94yts dir dir-ltr">Choose a currency</span>
                                    <span className="i2is942 atm_h0_1hcum46 atm_c8_exct8b atm_cs_10d11i2 dir dir-ltr">$</span>
                                    <span className="l120a03b atm_cs_10d11i2 atm_rd_8stvzk_1nos8r dir dir-ltr">USD</span>
                                </button>

                                <ul className="footer_social">
                                    <li className="_1xbvnt9">
                                        <Link rel="noopener noreferrer" target="_blank" href="#!" className="_j7hlqym l1ovpqvx atm_1he2i46_1k8pnbi_10saat9 atm_yxpdqi_1pv6nv4_10saat9 atm_1a0hdzc_w1h1e8_10saat9 atm_2bu6ew_929bqk_10saat9 atm_12oyo1u_73u7pn_10saat9 atm_fiaz40_1etamxe_10saat9 dir dir-ltr">
                                            <img height={18} src="/images/facebook.png" alt="" />
                                        </Link>
                                    </li>
                                    <li className="_1xbvnt9">
                                        <Link rel="noopener noreferrer" target="_blank" href="#!" className="_j7hlqym l1ovpqvx atm_1he2i46_1k8pnbi_10saat9 atm_yxpdqi_1pv6nv4_10saat9 atm_1a0hdzc_w1h1e8_10saat9 atm_2bu6ew_929bqk_10saat9 atm_12oyo1u_73u7pn_10saat9 atm_fiaz40_1etamxe_10saat9 dir dir-ltr">
                                            <img height={18} src="/images/twitter.png" alt="" />
                                        </Link>
                                    </li>
                                    <li className="_1xbvnt9">
                                        <Link rel="noopener noreferrer" target="_blank" href="#!" className="_j7hlqym l1ovpqvx atm_1he2i46_1k8pnbi_10saat9 atm_yxpdqi_1pv6nv4_10saat9 atm_1a0hdzc_w1h1e8_10saat9 atm_2bu6ew_929bqk_10saat9 atm_12oyo1u_73u7pn_10saat9 atm_fiaz40_1etamxe_10saat9 dir dir-ltr">
                                            <img height={18} src="/images/instagram.png" alt="" />
                                        </Link>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-md">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <ul className="nav nav-pills mb-3 lang_tab" id="pills-tab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                                        {locale?.home?.language_region}
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
                                        {locale?.home?.currency}
                                    </button>
                                </li>
                            </ul>

                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                    <section>
                                        <div className="_1uvh00e">
                                            <ul className="_2f5j8p">
                                                <li className="_36rlri">
                                                    <div className="_1ljlqn6">
                                                        <div>
                                                            <span id="auto_translate_switch" className="_9lsq15">{locale?.home?.translation}</span>
                                                            <span className="_1996zg6">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '19px', width: '19px', fill: 'currentColor' }}><path d="M9 0a1 1 0 0 1 1 .88V6h5a1 1 0 0 1 1 .88V15a1 1 0 0 1-.88 1H7a1 1 0 0 1-1-.88V10H1a1 1 0 0 1-1-.88V1a1 1 0 0 1 .88-1H9zm1.73 7-1.4.5.24.21.13.13c.12.13.23.25.3.36l.08.1.05.07.04.08H7.31v1.3h1.2l.17.53.1.26.1.3A6.3 6.3 0 0 0 10 12.61c-.5.32-1.12.61-1.87.87l-.33.11-.35.11-.44.14.72 1.15.4-.13.4-.12c1-.35 1.83-.76 2.48-1.22.57.4 1.28.77 2.12 1.08l.37.14.38.12.41.13.72-1.15-.45-.14-.26-.08-.34-.11a9.23 9.23 0 0 1-1.94-.9 6.3 6.3 0 0 0 1.07-1.7l.13-.31.11-.33.17-.52h1.2V8.45h-3.05l-.1-.23A3.7 3.7 0 0 0 11 7.3l-.12-.15-.14-.15zm1.35 2.76-.04.13-.08.22-.1.27a4.99 4.99 0 0 1-.86 1.38 4.95 4.95 0 0 1-.74-1.13l-.12-.25-.1-.27-.08-.22-.04-.13h2.16zM9 1H1v8h5V7l.01-.17H3.83L3.43 8H2l2.26-6h1.48l1.5 4H9V1zM5 3.41 4.25 5.6h1.5L5 3.41z"></path></svg>
                                                            </span>

                                                            <div className="_16ldwjc">{locale?.home?.automatically_translate_reviews_to_english}.</div>
                                                        </div>

                                                        <div className="_1f8da0x">
                                                            <button aria-checked="true" aria-labelledby="auto_translate_switch" role="switch" type="button" className="canm9xs atm_5j_1vi7ecw atm_66_nqa18y atm_6h_t94yts atm_9j_tlke0l atm_e2_1vi7ecw atm_mk_h2mmj6 atm_jb_fyhuej atm_vy_fyhuej atm_kd_glywfm atm_9j_13gfvf7_1o5j5ji atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_70_j7h7jn_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_j7h7jn_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam c1i6tylb atm_2d_18sdevw atm_4b_1qnzqti atm_2d_1k0ymf0_1o5j5ji atm_4b_1k0ymf0_1o5j5ji atm_4b_1k0ymf0_itk5vk dir dir-ltr">
                                                                <input type="hidden" name="Translation" value="true" />
                                                                <div className="s195dsor atm_5j_1ssbidh atm_66_nqa18y atm_e2_1vi7ecw atm_fq_1n1ank9 atm_mk_stnw88 atm_tk_1n1ank9 atm_vy_1vi7ecw atm_2d_1qwqy05 atm_9s_1txwivl atm_h_1h6ojuz atm_fc_1h6ojuz atm_6h_yh40bf atm_uc_5cp38c atm_uc_glywfm__1rrf6b5 atm_4b_1k0ymf0_1o5j5ji atm_7l_9vytuy_1o5j5ji sl9yi1h atm_tr_28vhyn atm_4b_1qnzqti atm_7l_jt7fhx dir dir-ltr">
                                                                    <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentColor' }}><path d="m10.5 1.939 1.061 1.061-7.061 7.061-.53-.531-3-3-.531-.53 1.061-1.061 3 3 5.47-5.469z"></path></svg>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </section>

                                    <section>
                                        <div className="_1uvh00e">
                                            <div className="_nufs6k">
                                                <h2 tabIndex="-1" className="hpipapi atm_7l_1kw7nm4 atm_c8_1x4eueo atm_cs_1kw7nm4 atm_g3_1kw7nm4 atm_gi_idpfg4 atm_l8_idpfg4 atm_kd_idpfg4_pfnrn2 dir dir-ltr" elementtiming="LCP-target">{locale?.home?.choose_language_region}</h2>
                                            </div>

                                            <ul className="_170oakq">
                                                <li className="_obr3yz">
                                                    <a className={`${langTab === 'en' ? '_ci5ckgc' : '_5af8mpi'}`} onClick={(e) => hanleLanguageChange(e, 'en')} aria-current="true" role="button" href="#!">
                                                        <div>English</div>
                                                        <div className="_1w3y9kg">Canada</div>
                                                    </a>
                                                </li>
                                                <li className="_obr3yz">
                                                    <a className={`${langTab === 'fr' ? '_ci5ckgc' : '_5af8mpi'}`} onClick={(e) => hanleLanguageChange(e, 'fr')} role="button" href="#!">
                                                        <div>Français</div>
                                                        <div className="_1w3y9kg">Canada</div>
                                                    </a>
                                                </li>
                                                <li className="_obr3yz">
                                                    <a className={`${langTab === 'es' ? '_ci5ckgc' : '_5af8mpi'}`} onClick={(e) => hanleLanguageChange(e, 'es')} role="button" href="#!">
                                                        <div>Español</div>
                                                        <div className="_1w3y9kg">Internacional</div>
                                                    </a>
                                                </li>
                                                <li className="_obr3yz">
                                                    <a className={`${langTab === 'ar' ? '_ci5ckgc' : '_5af8mpi'}`} onClick={(e) => hanleLanguageChange(e, 'ar')} role="button" href="#!">
                                                        <div>العربية</div>
                                                        <div className="_1w3y9kg">Arabic</div>
                                                    </a>
                                                </li>
                                                <li className="_obr3yz">
                                                    <a className={`${langTab === 'zh' ? '_ci5ckgc' : '_5af8mpi'}`} onClick={(e) => hanleLanguageChange(e, 'zh')} role="button" href="#!">
                                                        <div>中文 (简体)</div>
                                                        <div className="_1w3y9kg">Chinese</div>
                                                    </a>
                                                </li>
                                                <li className="_obr3yz">
                                                    <a className={`${langTab === 'pt' ? '_ci5ckgc' : '_5af8mpi'}`} onClick={(e) => hanleLanguageChange(e, 'pt')} role="button" href="#!">
                                                        <div>Português</div>
                                                        <div className="_1w3y9kg">Brasil</div>
                                                    </a>
                                                </li>
                                                <li className="_obr3yz">
                                                    <a className={`${langTab === 'hi' ? '_ci5ckgc' : '_5af8mpi'}`} onClick={(e) => hanleLanguageChange(e, 'hi')} role="button" href="#!">
                                                        <div>हिन्दी</div>
                                                        <div className="_1w3y9kg">Hindi</div>
                                                    </a>
                                                </li>
                                                <li className="_obr3yz">
                                                    <a className={`${langTab === 'pa' ? '_ci5ckgc' : '_5af8mpi'}`} onClick={(e) => hanleLanguageChange(e, 'pa')} role="button" href="#!">
                                                        <div>ਪੰਜਾਬੀ</div>
                                                        <div className="_1w3y9kg">Punjabi</div>
                                                    </a>
                                                </li>
                                                <li className="_obr3yz">
                                                    <a className={`${langTab === 'tl' ? '_ci5ckgc' : '_5af8mpi'}`} onClick={(e) => hanleLanguageChange(e, 'tl')} role="button" href="#!">
                                                        <div>Tagalog</div>
                                                        <div className="_1w3y9kg">Filipino</div>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </section>
                                </div>
                                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                    <section>
                                        <div className="_1uvh00e">
                                            <div className="_nufs6k">
                                                <h2 tabIndex="-1" className="hpipapi atm_7l_1kw7nm4 atm_c8_1x4eueo atm_cs_1kw7nm4 atm_g3_1kw7nm4 atm_gi_idpfg4 atm_l8_idpfg4 atm_kd_idpfg4_pfnrn2 dir dir-ltr" elementtiming="LCP-target">{locale?.home?.choose_language_region}</h2>
                                            </div>

                                            <ul className="_170oakq">
                                                <li className="_obr3yz">
                                                    <a className="_ci5ckgc" aria-current="true" role="button" href="#!">
                                                        <div>{locale?.home?.canadian_dollar}</div>
                                                        <div className="_1w3y9kg">CAD - $</div>
                                                    </a>
                                                </li>
                                                <li className="_obr3yz">
                                                    <a className="_5af8mpi" role="button" href="#!">
                                                        <div>{locale?.home?.us_dollar}</div>
                                                        <div className="_1w3y9kg">USD - $</div>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </section>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer
