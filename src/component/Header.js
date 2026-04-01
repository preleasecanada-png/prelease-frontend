import React, { useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from "next/router";
import Link from 'next/link';
import SideDrops from './SideDrops';
import Search from './Search';
import { CreateApiContext } from '../ContextApi/CreateApiContext';
const Header = ({ isScrolled }) => {
    const router = useRouter();
    const [openSearchMode, setSearchMode] = useState(false);
    const formRef = useRef(null);
    const { locale } = useContext(CreateApiContext);

    const { country, adults, children, start_date, end_date } = router.query;
    const isFindHomePage = router.pathname === '/find-home';
    const adultsNum = Number(isFindHomePage ? adults || 0 : 0);
    const childrenNum = Number(isFindHomePage ? children || 0 : 0);
    const totalGuests = adultsNum + childrenNum;

    const formatDateLabel = (iso) => {
        if (!iso) return '';
        const d = new Date(iso);
        if (Number.isNaN(d.getTime())) return '';
        return `${d.toLocaleString('default', { month: 'short' })} ${d.getDate()}`;
    };

    const dateLabel = isFindHomePage && start_date && end_date
        ? `${formatDateLabel(start_date)}-${formatDateLabel(end_date)}`
        : 'Any week';

    const guestLabel = isFindHomePage && totalGuests > 0 ? `${totalGuests} guest${totalGuests > 1 ? 's' : ''}` : 'Add guests';

    const handleClickInside = () => {
        setSearchMode(true);
    };

    const handleClickOutside = (event) => {
        if (formRef.current && !formRef.current.contains(event.target)) {
            setSearchMode(false);
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    useEffect(() => {
        // Close the search dropdown/popup whenever the route or query changes after search
        setSearchMode(false);
    }, [router.pathname, router.query]);

    return (
        <>
            <header className={`Header_u ${(router?.pathname === '/login' || router?.pathname === '/sign-up' || router?.pathname === '/forget-password' || router?.pathname === '/reset-password' || router?.pathname === '/verification') && "d-none"} `}>
                <Link href='/' className='header_logo mt-1'><img src="/images/logo.png" alt="" /></Link>

                {router.pathname !== '/help-center' && router.pathname !== '/chats' ?
                    <div className={`searching_cont ${router?.pathname === '/' && isScrolled ? "" : router?.pathname === '/' ? "DisableElement" : ''}`}>

                        <div className={`activate_search ${openSearchMode ? 'Hider' : ''}`} onClick={handleClickInside}>
                            <div className='searching' >
                                {country || 'Toronto'}
                            </div>
                            <span className='vr'></span>
                            <div className='searching' >
                                {dateLabel}
                            </div>
                            <span className='vr'></span>
                            <div className='searching opacity-50'>
                                {guestLabel}
                            </div>
                            <button type='button' className='search_67gyth'><img src="/images/magnifine.png" alt="" /></button>
                            <button type='button' className='filter_67gyth'><img src="/images/filter.png" alt="" /></button>
                        </div>

                        <div ref={formRef} className={`Main_form ${openSearchMode ? 'active' : ''} form_web f114qjlg atm_gi_xjk4d9 atm_j3_1an8f3t dir dir-ltr`}>
                            <Search />
                        </div>

                        <div className="form_mob s97awm atm_am_kb7nvz atm_5j_1pm7oz0 atm_7l_dezgoh atm_j6_8vuzuz atm_9s_11p5wf0 atm_h_1fhbwtr atm_8w_73ivac atm_gx_idpfg4 atm_vz_qft6q7 atm_ui_dava36 atm_uv_xoomkg s1upghlx atm_26_1p8m8iw atm_3f_1tyokbi atm_70_504m4t dir dir-ltr" data-bs-toggle="modal" data-bs-target="#searchModal">
                            <button type="button" className="l1ovpqvx atm_1he2i46_1k8pnbi_10saat9 atm_yxpdqi_1pv6nv4_10saat9 atm_1a0hdzc_w1h1e8_10saat9 atm_2bu6ew_929bqk_10saat9 atm_12oyo1u_73u7pn_10saat9 atm_fiaz40_1etamxe_10saat9 bfknzxl atm_9j_tlke0l atm_mk_h2mmj6 atm_70_5j5alw atm_tl_1gw4zv3 atm_9j_13gfvf7_1o5j5ji c1i81z0m atm_fr_11a07z3 atm_r2_1j28jx2 atm_26_1j28jx2 atm_3f_glywfm atm_7l_1kw7nm4 atm_gi_idpfg4 atm_l8_idpfg4 atm_r3_1kw7nm4 atm_rd_glywfm atm_e2_1osqo2v atm_vy_1osqo2v atm_bx_1kw7nm4 atm_c8_1kw7nm4 atm_g3_1kw7nm4 atm_cs_1kw7nm4 atm_kd_glywfm atm_h_1h6ojuz atm_9s_1n7usvw atm_j3_1osqo2v atm_uc_glywfm atm_vb_glywfm atm_5j_b4p6a2 atm_uc_glywfm__1rrf6b5 atm_kd_glywfm_1w3cfyq atm_3f_glywfm_e4a3ld atm_l8_idpfg4_e4a3ld atm_gi_idpfg4_e4a3ld atm_3f_glywfm_1r4qscq atm_kd_glywfm_6y7yyg atm_kd_glywfm_pfnrn2_1oszvuo atm_l8_idpfg4_1icshfk_1oszvuo atm_gi_idpfg4_1icshfk_1oszvuo atm_3f_glywfm_b5gff8_1oszvuo atm_kd_glywfm_2by9w9_1oszvuo atm_k4_kb7nvz_1o5j5ji atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_tr_glywfm_csw3t1 atm_uc_aaiy6o_1w3cfyq atm_70_1xvh5se_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_1xvh5se_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam s1pm3o7c atm_dz_rhb615 atm_lj_evh4rp atm_li_evh4rp dir dir-ltr">
                                <span className="su7l6qf atm_9s_11p5wf0 atm_mg_1h6ojuz dir dir-ltr">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="presentation" focusable="false" style={{ display: 'block', height: '20px', width: '20px', fill: 'currentColor' }}><path d="M13 0a13 13 0 0 1 10.5 20.67l7.91 7.92-2.82 2.82-7.92-7.91A12.94 12.94 0 0 1 13 26a13 13 0 1 1 0-26zm0 4a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"></path></svg>
                                </span>
                                <span className="m10pln4b atm_9s_1o8liyq atm_lk_yh40bf atm_j3_1osqo2v atm_ks_15vqwwr dir dir-ltr">
                                    <div className="p1b4e8cr atm_c8_km0zk7 atm_fr_1m9t47k atm_cs_10d11i2 atm_g3_gktfv atm_9s_1ulexfb atm_ks_15vqwwr atm_sq_1l2sidv atm_vv_1q9ccgz dir dir-ltr">Where to?</div>
                                    <div className="s1f5fdzj atm_9s_1txwivl atm_c8_1uc0753 atm_g3_lonqig atm_fr_r7vles atm_7l_1esdqks atm_li_p5ox87 atm_cx_14y27yu dir dir-ltr" >
                                        <span className="s13th1u8 atm_am_1pywi5l atm_jb_12am3vd atm_ks_15vqwwr atm_sq_1l2sidv atm_vv_1q9ccgz dir dir-ltr">{country || 'Anywhere'}</span>
                                        <span >•</span>
                                        <span className="s13th1u8 atm_am_1pywi5l atm_jb_12am3vd atm_ks_15vqwwr atm_sq_1l2sidv atm_vv_1q9ccgz dir dir-ltr">{dateLabel}</span>
                                        <span >•</span>
                                        <span className="s13th1u8 atm_am_1pywi5l atm_jb_12am3vd atm_ks_15vqwwr atm_sq_1l2sidv atm_vv_1q9ccgz dir dir-ltr">{guestLabel}</span>
                                    </div>
                                    <span className="a8jt5op atm_3f_idpfg4 atm_7h_hxbz6r atm_7i_ysn8ba atm_e2_t94yts atm_ks_zryt35 atm_l8_idpfg4 atm_mk_stnw88 atm_vv_1q9ccgz atm_vy_t94yts dir dir-ltr" id="searchInputDescriptionId">Currently showing {dateLabel}, {guestLabel}. Change search.</span>
                                </span>
                            </button>
                        </div>
                    </div>
                    : ''}
                <div className='login_row'>
                    <ul className={`nav_lnks ${isScrolled ? 'DisableElement' : ''} ${router?.pathname != '/' ? "DisableElement" : ''}`}>
                        <li><Link href="/">{locale?.home?.home || 'Home'}</Link></li>
                        <li><Link href="/find-home">{locale?.home?.find_a_home || 'Find a Home'}</Link></li>
                        <li><Link href="/about-us">{locale?.home?.about_us || 'About Us'}</Link></li>
                        <li><Link href="/contact">{locale?.home?.contact || 'Contact'}</Link></li>
                        <li><Link href="/prelease-your-home">{locale?.home?.prelease_your_home || 'PreLease your home'}</Link></li>
                    </ul>
                    {/* <Link href="/login">Login</Link><div class="Joinus_area"><LI href="/sign-up">Sign Up<img src="/images/Arrow.svg" alt=""/></LI></div> */}
                    <SideDrops />
                </div>
            </header>
        </>
    )
}

export default Header
