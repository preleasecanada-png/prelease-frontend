import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { memo, useCallback, useContext, useEffect, useState } from 'react'
import { CreateApiContext } from '../ContextApi/CreateApiContext';

const SideDrops = memo(() => {
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [userPicture, setUserPicture] = useState('');
    const [userName, setUserName] = useState('');
    const router = useRouter();
    const { locale } = useContext(CreateApiContext);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        const role = localStorage.getItem('role');
        const picture = localStorage.getItem('user_picture');
        const name = localStorage.getItem('user_name');
        setToken(token);
        setEmail(email);
        setRole(role);
        setUserPicture(picture || '');
        setUserName(name || '');
    });

    const handleLogout = useCallback((e) => {
        e.preventDefault();
        logoutUser();
    }, [email]);

    const logoutUser = async () => {
        try {
            const formData = new FormData();
            formData.append('email', email);
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/logout`, {
                method: 'POST',
                body: formData,
            });
            if (res.status === 200) {
                window.localStorage.removeItem('token');
                window.localStorage.removeItem('email');
                window.localStorage.removeItem('user_picture');
                window.localStorage.removeItem('user_name');
                setToken('');
                setUserPicture('');
                setUserName('');
                router.push('/sign-up');
            } else {
                console.log('error');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className='login_row align-items-start'>
                <div className='mt-1' data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <button type="button" className={`chplgv4 atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_9s_1o8liyq atm_bx_1kw7nm4 atm_gi_idpfg4 atm_ks_ewfl5b atm_r3_1kw7nm4 atm_rd_glywfm atm_vb_1wugsn5 atm_kd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_cs_10d11i2 atm_l8_1fwxnve atm_mk_h2mmj6 atm_vv_1q9ccgz atm_wq_kb7nvz atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_5j_qslrf5_vmtskl atm_6i_idpfg4_vmtskl atm_92_1yyfdc7_vmtskl atm_fq_j39m9b_vmtskl atm_mk_stnw88_vmtskl atm_n3_j39m9b_vmtskl atm_tk_idpfg4_vmtskl atm_wq_idpfg4_vmtskl atm_wq_cs5v99_1w3cfyq atm_uc_aaiy6o_9xuho3 atm_70_lgq2mu_9xuho3 atm_uc_glywfm_9xuho3_1rrf6b5 atm_wq_cs5v99_pfnrn2_1oszvuo atm_uc_aaiy6o_1buez3b_1oszvuo atm_70_lgq2mu_1buez3b_1oszvuo atm_uc_glywfm_1buez3b_1o31aam c177491c atm_7l_dezgoh atm_uc_fg9k26 atm_26_116dmco_1rqz0hn dir dir-ltr`} aria-expanded="false" aria-label="Choose a language and currency">
                        <div className="lloffz7 atm_h_1h6ojuz atm_9s_1txwivl atm_e2_1osqo2v atm_mk_h2mmj6 atm_wq_kb7nvz dir dir-ltr">
                            <div className="_z5mecy" aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '16px', width: '16px', fill: 'currentcolor' }} >
                                    <path d="M8 .25a7.77 7.77 0 0 1 7.75 7.78 7.75 7.75 0 0 1-7.52 7.72h-.25A7.75 7.75 0 0 1 .25 8.24v-.25A7.75 7.75 0 0 1 8 .25zm1.95 8.5h-3.9c.15 2.9 1.17 5.34 1.88 5.5H8c.68 0 1.72-2.37 1.93-5.23zm4.26 0h-2.76c-.09 1.96-.53 3.78-1.18 5.08A6.26 6.26 0 0 0 14.17 9zm-9.67 0H1.8a6.26 6.26 0 0 0 3.94 5.08 12.59 12.59 0 0 1-1.16-4.7l-.03-.38zm1.2-6.58-.12.05a6.26 6.26 0 0 0-3.83 5.03h2.75c.09-1.83.48-3.54 1.06-4.81zm2.25-.42c-.7 0-1.78 2.51-1.94 5.5h3.9c-.15-2.9-1.18-5.34-1.89-5.5h-.07zm2.28.43.03.05a12.95 12.95 0 0 1 1.15 5.02h2.75a6.28 6.28 0 0 0-3.93-5.07z" />
                                </svg>
                            </div>
                        </div>
                    </button>
                </div>

                <div className="_3hmsj">
                    <div className="_167wsvl">
                        <div className="cnky2vc atm_1s_glywfm atm_26_1j28jx2 atm_9j_tlke0l atm_bx_1kw7nm4 atm_c8_1kw7nm4 atm_cs_1kw7nm4 atm_gi_idpfg4 atm_ks_ewfl5b atm_r3_1kw7nm4 atm_rd_glywfm atm_vb_1wugsn5 atm_kd_glywfm atm_h_1h6ojuz atm_2d_1p8m8iw atm_3f_1vlbu9m atm_5j_1rwtgmb atm_7l_dezgoh atm_9s_116y0ak atm_e2_12oa1m8 atm_l8_ef04uq atm_mk_h2mmj6 atm_vh_nkobfv atm_uc_aaiy6o atm_wq_kb7nvz atm_g3_qnbkur atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_glywfm__1rrf6b5 atm_uc_aaiy6o_1w3cfyq atm_70_lgq2mu_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_lgq2mu_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam c1r2bm7w atm_70_1p8xsmn_1nos8r cln384f atm_1ieuuo9_1vi7ecw atm_1dfygl2_fyhuej atm_1lqvdwn_1ul9x4n atm_f4syw5_ftgil2 atm_1255xc1_dlk8xv atm_1ellefq_12etsqc atm_vl4zd4_t94yts dir dir-ltr" style={{cursor: 'pointer'}}>
                            <div>
                                <div className="dropdown-toggle dir dir-ltr for_web_ham" id="sideDrop" data-bs-toggle="dropdown" aria-expanded="false">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentColor', strokeWidth: '3', overflow: 'visible' }}>
                                        <g fill="none">
                                            <path d="M2 16h28M2 24h28M2 8h28"></path>
                                        </g>
                                    </svg>
                                </div>
                                <div className="dropdown-menu p-0 border-0" aria-labelledby="sideDrop">

                                    <div className="c3i7glo atm_26_1p8m8iw atm_5j_kitwna atm_70_8oykxz atm_7l_dezgoh atm_l8_brf0ql atm_tk_1ssbidh atm_n3_idpfg4 atm_iy_1aa3ab3 atm_l1_1wugsn5 atm_wq_cs5v99 atm_jb_ghg70p c39hl9j atm_9s_1ulexfb dir dir-ltr" tabIndex="-1" id="simple-header-profile-menu" data-testid="simple-header-profile-menu">
                                        {!token && !token ?
                                            <>
                                                <Link href='/sign-up' className="c1ql0u4u atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_bx_1kw7nm4 atm_gi_idpfg4 atm_ks_ewfl5b atm_r3_1kw7nm4 atm_rd_glywfm atm_vb_1wugsn5 atm_kd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_l8_11nx8fq atm_vv_1q9ccgz atm_vy_1osqo2v atm_cs_10d11i2 atm_9s_1txwivl atm_h_1h6ojuz atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_2d_116dmco_1b5lzrw atm_uc_aaiy6o_1w3cfyq atm_70_cdw4us_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_cdw4us_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam c138yemz dir dir-ltr" >
                                                    <div className="lgh3vnd atm_am_1gtjylf dir dir-ltr">{locale?.home?.sign_up}</div>
                                                </Link>
                                                <Link href='/login' className="cd7h8km atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_bx_1kw7nm4 atm_gi_idpfg4 atm_ks_ewfl5b atm_r3_1kw7nm4 atm_rd_glywfm atm_vb_1wugsn5 atm_kd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_l8_11nx8fq atm_vv_1q9ccgz atm_vy_1osqo2v atm_cs_6adqpa atm_9s_1txwivl atm_h_1h6ojuz atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_2d_116dmco_1b5lzrw atm_uc_aaiy6o_1w3cfyq atm_70_cdw4us_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_cdw4us_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam c11luhwk dir dir-ltr" >
                                                    <div className="l1xexnrd atm_am_1gtjylf dir dir-ltr">{locale?.home?.login}</div>
                                                </Link>
                                                <div className="d1rna43j atm_26_1oqmvsg atm_gi_brf0ql atm_e2_t94yts dir dir-ltr"></div>
                                            </>
                                            : ''}


                                        <Link href='/gift-cards' className="cd7h8km atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_bx_1kw7nm4 atm_gi_idpfg4 atm_ks_ewfl5b atm_r3_1kw7nm4 atm_rd_glywfm atm_vb_1wugsn5 atm_kd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_l8_11nx8fq atm_vv_1q9ccgz atm_vy_1osqo2v atm_cs_6adqpa atm_9s_1txwivl atm_h_1h6ojuz atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_2d_116dmco_1b5lzrw atm_uc_aaiy6o_1w3cfyq atm_70_cdw4us_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_cdw4us_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam c11luhwk dir dir-ltr" >
                                            <div className="l1xexnrd atm_am_1gtjylf dir dir-ltr">{locale?.home?.gift_card}</div>
                                        </Link>
                                        <Link href='/prelease-your-home' className="cd7h8km atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_bx_1kw7nm4 atm_gi_idpfg4 atm_ks_ewfl5b atm_r3_1kw7nm4 atm_rd_glywfm atm_vb_1wugsn5 atm_kd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_l8_11nx8fq atm_vv_1q9ccgz atm_vy_1osqo2v atm_cs_6adqpa atm_9s_1txwivl atm_h_1h6ojuz atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_2d_116dmco_1b5lzrw atm_uc_aaiy6o_1w3cfyq atm_70_cdw4us_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_cdw4us_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam c11luhwk dir dir-ltr">
                                            <div className="l1xexnrd atm_am_1gtjylf dir dir-ltr">{locale?.home?.preLease_your_home}</div>
                                        </Link>
                                        <Link href='/help-center' className="cd7h8km atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_bx_1kw7nm4 atm_gi_idpfg4 atm_ks_ewfl5b atm_r3_1kw7nm4 atm_rd_glywfm atm_vb_1wugsn5 atm_kd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_l8_11nx8fq atm_vv_1q9ccgz atm_vy_1osqo2v atm_cs_6adqpa atm_9s_1txwivl atm_h_1h6ojuz atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_2d_116dmco_1b5lzrw atm_uc_aaiy6o_1w3cfyq atm_70_cdw4us_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_cdw4us_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam c11luhwk dir dir-ltr">
                                            <div className="l1xexnrd atm_am_1gtjylf dir dir-ltr">{locale?.footer?.help_center}</div>
                                        </Link>
                                        {token && token != null ?
                                            <>

                                                <Link href='/dashboard' className="cd7h8km atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_bx_1kw7nm4 atm_gi_idpfg4 atm_ks_ewfl5b atm_r3_1kw7nm4 atm_rd_glywfm atm_vb_1wugsn5 atm_kd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_l8_11nx8fq atm_vv_1q9ccgz atm_vy_1osqo2v atm_cs_6adqpa atm_9s_1txwivl atm_h_1h6ojuz atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_2d_116dmco_1b5lzrw atm_uc_aaiy6o_1w3cfyq atm_70_cdw4us_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_cdw4us_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam c11luhwk dir dir-ltr" >
                                                    <div className="l1xexnrd atm_am_1gtjylf dir dir-ltr">Dashboard</div>
                                                </Link>

                                                {role === 'admin' && (
                                                    <Link href='/admin' className="cd7h8km atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_bx_1kw7nm4 atm_gi_idpfg4 atm_ks_ewfl5b atm_r3_1kw7nm4 atm_rd_glywfm atm_vb_1wugsn5 atm_kd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_l8_11nx8fq atm_vv_1q9ccgz atm_vy_1osqo2v atm_cs_6adqpa atm_9s_1txwivl atm_h_1h6ojuz atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_2d_116dmco_1b5lzrw atm_uc_aaiy6o_1w3cfyq atm_70_cdw4us_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_cdw4us_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam c11luhwk dir dir-ltr" style={{ color: '#D80621', fontWeight: '600' }}>
                                                        <div className="l1xexnrd atm_am_1gtjylf dir dir-ltr">🛡️ Admin Panel</div>
                                                    </Link>
                                                )}

                                                {(role === 'Landlord' || role === 'host' || role === 'admin') && (
                                                    <>
                                                    <Link href='/properties' className="cd7h8km atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_bx_1kw7nm4 atm_gi_idpfg4 atm_ks_ewfl5b atm_r3_1kw7nm4 atm_rd_glywfm atm_vb_1wugsn5 atm_kd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_l8_11nx8fq atm_vv_1q9ccgz atm_vy_1osqo2v atm_cs_6adqpa atm_9s_1txwivl atm_h_1h6ojuz atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_2d_116dmco_1b5lzrw atm_uc_aaiy6o_1w3cfyq atm_70_cdw4us_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_cdw4us_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam c11luhwk dir dir-ltr" >
                                                        <div className="l1xexnrd atm_am_1gtjylf dir dir-ltr">{locale?.home?.properties}</div>
                                                    </Link>
                                                    <Link href='/my-properties' className="cd7h8km atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_bx_1kw7nm4 atm_gi_idpfg4 atm_ks_ewfl5b atm_r3_1kw7nm4 atm_rd_glywfm atm_vb_1wugsn5 atm_kd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_l8_11nx8fq atm_vv_1q9ccgz atm_vy_1osqo2v atm_cs_6adqpa atm_9s_1txwivl atm_h_1h6ojuz atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_2d_116dmco_1b5lzrw atm_uc_aaiy6o_1w3cfyq atm_70_cdw4us_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_cdw4us_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam c11luhwk dir dir-ltr" >
                                                        <div className="l1xexnrd atm_am_1gtjylf dir dir-ltr">My Properties</div>
                                                    </Link>
                                                    </>
                                                )}

                                                <Link href='/account' className="cd7h8km atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_bx_1kw7nm4 atm_gi_idpfg4 atm_ks_ewfl5b atm_r3_1kw7nm4 atm_rd_glywfm atm_vb_1wugsn5 atm_kd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_l8_11nx8fq atm_vv_1q9ccgz atm_vy_1osqo2v atm_cs_6adqpa atm_9s_1txwivl atm_h_1h6ojuz atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_2d_116dmco_1b5lzrw atm_uc_aaiy6o_1w3cfyq atm_70_cdw4us_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_cdw4us_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam c11luhwk dir dir-ltr" >
                                                    <div className="l1xexnrd atm_am_1gtjylf dir dir-ltr">Account</div>
                                                </Link>

                                                <Link href='/notifications' className="cd7h8km atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_bx_1kw7nm4 atm_gi_idpfg4 atm_ks_ewfl5b atm_r3_1kw7nm4 atm_rd_glywfm atm_vb_1wugsn5 atm_kd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_l8_11nx8fq atm_vv_1q9ccgz atm_vy_1osqo2v atm_cs_6adqpa atm_9s_1txwivl atm_h_1h6ojuz atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_2d_116dmco_1b5lzrw atm_uc_aaiy6o_1w3cfyq atm_70_cdw4us_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_cdw4us_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam c11luhwk dir dir-ltr" >
                                                    <div className="l1xexnrd atm_am_1gtjylf dir dir-ltr">Notifications</div>
                                                </Link>


                                                <Link href='/wish-lists' className="cd7h8km atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_bx_1kw7nm4 atm_gi_idpfg4 atm_ks_ewfl5b atm_r3_1kw7nm4 atm_rd_glywfm atm_vb_1wugsn5 atm_kd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_l8_11nx8fq atm_vv_1q9ccgz atm_vy_1osqo2v atm_cs_6adqpa atm_9s_1txwivl atm_h_1h6ojuz atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_2d_116dmco_1b5lzrw atm_uc_aaiy6o_1w3cfyq atm_70_cdw4us_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_cdw4us_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam c11luhwk dir dir-ltr" >
                                                    <div className="l1xexnrd atm_am_1gtjylf dir dir-ltr">Wish List</div>
                                                </Link>

                                                <Link href='/chats' className="cd7h8km atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_bx_1kw7nm4 atm_gi_idpfg4 atm_ks_ewfl5b atm_r3_1kw7nm4 atm_rd_glywfm atm_vb_1wugsn5 atm_kd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_l8_11nx8fq atm_vv_1q9ccgz atm_vy_1osqo2v atm_cs_6adqpa atm_9s_1txwivl atm_h_1h6ojuz atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_2d_116dmco_1b5lzrw atm_uc_aaiy6o_1w3cfyq atm_70_cdw4us_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_cdw4us_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam c11luhwk dir dir-ltr" >
                                                    <div className="l1xexnrd atm_am_1gtjylf dir dir-ltr">Host Chats</div>
                                                </Link>

                                                <div className="d1rna43j atm_26_1oqmvsg atm_gi_brf0ql atm_e2_t94yts dir dir-ltr"></div>

                                                <Link href='/applications' className="cd7h8km atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_bx_1kw7nm4 atm_gi_idpfg4 atm_ks_ewfl5b atm_r3_1kw7nm4 atm_rd_glywfm atm_vb_1wugsn5 atm_kd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_l8_11nx8fq atm_vv_1q9ccgz atm_vy_1osqo2v atm_cs_6adqpa atm_9s_1txwivl atm_h_1h6ojuz atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_2d_116dmco_1b5lzrw atm_uc_aaiy6o_1w3cfyq atm_70_cdw4us_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_cdw4us_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam c11luhwk dir dir-ltr" >
                                                    <div className="l1xexnrd atm_am_1gtjylf dir dir-ltr">Applications</div>
                                                </Link>

                                                <Link href='/leases' className="cd7h8km atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_bx_1kw7nm4 atm_gi_idpfg4 atm_ks_ewfl5b atm_r3_1kw7nm4 atm_rd_glywfm atm_vb_1wugsn5 atm_kd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_l8_11nx8fq atm_vv_1q9ccgz atm_vy_1osqo2v atm_cs_6adqpa atm_9s_1txwivl atm_h_1h6ojuz atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_2d_116dmco_1b5lzrw atm_uc_aaiy6o_1w3cfyq atm_70_cdw4us_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_cdw4us_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam c11luhwk dir dir-ltr" >
                                                    <div className="l1xexnrd atm_am_1gtjylf dir dir-ltr">Leases</div>
                                                </Link>

                                                <Link href='/payments' className="cd7h8km atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_bx_1kw7nm4 atm_gi_idpfg4 atm_ks_ewfl5b atm_r3_1kw7nm4 atm_rd_glywfm atm_vb_1wugsn5 atm_kd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_l8_11nx8fq atm_vv_1q9ccgz atm_vy_1osqo2v atm_cs_6adqpa atm_9s_1txwivl atm_h_1h6ojuz atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_2d_116dmco_1b5lzrw atm_uc_aaiy6o_1w3cfyq atm_70_cdw4us_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_cdw4us_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam c11luhwk dir dir-ltr" >
                                                    <div className="l1xexnrd atm_am_1gtjylf dir dir-ltr">Payments</div>
                                                </Link>

                                                <Link href='/reviews' className="cd7h8km atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_bx_1kw7nm4 atm_gi_idpfg4 atm_ks_ewfl5b atm_r3_1kw7nm4 atm_rd_glywfm atm_vb_1wugsn5 atm_kd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_l8_11nx8fq atm_vv_1q9ccgz atm_vy_1osqo2v atm_cs_6adqpa atm_9s_1txwivl atm_h_1h6ojuz atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_2d_116dmco_1b5lzrw atm_uc_aaiy6o_1w3cfyq atm_70_cdw4us_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_cdw4us_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam c11luhwk dir dir-ltr" >
                                                    <div className="l1xexnrd atm_am_1gtjylf dir dir-ltr">Reviews</div>
                                                </Link>

                                                <Link href='/insurance' className="cd7h8km atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_bx_1kw7nm4 atm_gi_idpfg4 atm_ks_ewfl5b atm_r3_1kw7nm4 atm_rd_glywfm atm_vb_1wugsn5 atm_kd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_l8_11nx8fq atm_vv_1q9ccgz atm_vy_1osqo2v atm_cs_6adqpa atm_9s_1txwivl atm_h_1h6ojuz atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_2d_116dmco_1b5lzrw atm_uc_aaiy6o_1w3cfyq atm_70_cdw4us_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_cdw4us_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam c11luhwk dir dir-ltr" >
                                                    <div className="l1xexnrd atm_am_1gtjylf dir dir-ltr">Insurance</div>
                                                </Link>

                                                <Link href='/maintenance' className="cd7h8km atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_bx_1kw7nm4 atm_gi_idpfg4 atm_ks_ewfl5b atm_r3_1kw7nm4 atm_rd_glywfm atm_vb_1wugsn5 atm_kd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_l8_11nx8fq atm_vv_1q9ccgz atm_vy_1osqo2v atm_cs_6adqpa atm_9s_1txwivl atm_h_1h6ojuz atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_2d_116dmco_1b5lzrw atm_uc_aaiy6o_1w3cfyq atm_70_cdw4us_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_cdw4us_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam c11luhwk dir dir-ltr" >
                                                    <div className="l1xexnrd atm_am_1gtjylf dir dir-ltr">Maintenance</div>
                                                </Link>
                                            </>
                                            : null
                                        }


                                        {token && token ? <>
                                            <button onClick={handleLogout} className="cd7h8km atm_1s_glywfm atm_26_1j28jx2 atm_3f_idpfg4 atm_9j_tlke0l atm_bx_1kw7nm4 atm_gi_idpfg4 atm_ks_ewfl5b atm_r3_1kw7nm4 atm_rd_glywfm atm_vb_1wugsn5 atm_kd_glywfm atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_l8_11nx8fq atm_vv_1q9ccgz atm_vy_1osqo2v atm_cs_6adqpa atm_9s_1txwivl atm_h_1h6ojuz atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_2d_116dmco_1b5lzrw atm_uc_aaiy6o_1w3cfyq atm_70_cdw4us_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_cdw4us_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam c11luhwk dir dir-ltr">
                                                <div className="l1xexnrd atm_am_1gtjylf dir dir-ltr">{locale?.home?.logout}</div>
                                            </button>
                                        </> : null}
                                    </div>
                                </div>
                            </div>

                            <div className="dir dir-ltr for_mob_ham">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentColor', strokeWidth: '3', overflow: 'visible' }}>
                                    <g fill="none">
                                        <path d="M2 16h28M2 24h28M2 8h28"></path>
                                    </g>
                                </svg>
                            </div>

                            <div className="fs7xov7 atm_7l_1esdqks atm_am_sfpmae atm_e2_x4u3u4 atm_gz_1qdqwt3 atm_ks_15vqwwr atm_mk_h2mmj6 atm_vy_x4u3u4 atm_wq_kb7nvz dir dir-ltr header-profile-avatar">
                                {token && userPicture ? (
                                    <img src={userPicture.startsWith('http') ? userPicture : `${process.env.NEXT_PUBLIC_BASE_LOCAL_IMAGE_URL}/${userPicture}`} alt="Profile" />
                                ) : token && userName ? (
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', backgroundColor: '#D80621', color: '#fff', fontSize: '14px', fontWeight: '600' }}>
                                        {userName.charAt(0).toUpperCase()}
                                    </div>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '100%', width: '100%', fill: 'currentColor' }}>
                                        <path d="M16 .7C7.56.7.7 7.56.7 16S7.56 31.3 16 31.3 31.3 24.44 31.3 16 24.44.7 16 .7zm0 28c-4.02 0-7.6-1.88-9.93-4.81a12.43 12.43 0 0 1 6.45-4.4A6.5 6.5 0 0 1 9.5 14a6.5 6.5 0 0 1 13 0 6.51 6.51 0 0 1-3.02 5.5 12.42 12.42 0 0 1 6.45 4.4A12.67 12.67 0 0 1 16 28.7z"></path>
                                    </svg>
                                )}
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
});

SideDrops.displayName = 'SideDrops';

export default SideDrops
