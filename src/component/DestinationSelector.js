import React, { useState } from 'react';

const DestinationSelector = ({ id, activePopover, setActivePopover, Countries, selectedDestination: selectedDestinationProp, setSelectedDestination: setSelectedDestinationProp }) => {
    const [selectedDestinationInternal, setSelectedDestinationInternal] = useState('');
    const selectedDestination = selectedDestinationProp !== undefined ? selectedDestinationProp : selectedDestinationInternal;
    const setSelectedDestination = setSelectedDestinationProp || setSelectedDestinationInternal;
    const isOpen = activePopover === id;


    const toggleDestinations = () => {
        if (isOpen) {
            setActivePopover(null);
        } else {
            setActivePopover(id);
        }
    };

    const handleDestinationSelect = (name) => {
        setSelectedDestination(name);
        setActivePopover(null);
    };

    return (
        <>
            <div className='row_selector' onClick={toggleDestinations}>
                <img className='form_icon' src="/images/location.png" alt="" />
                <div className='form_heads'>
                    <h3>Where</h3>
                    <input
                        type="text"
                        placeholder='Search destinations'
                        value={selectedDestination}
                        readOnly
                    />
                </div>
            </div>
            {isOpen && (
            <div className={`popover-container`}>
                <div className=" dir dir-ltr" id="locationInspirationsSectionID">
                    <div className="c1uycpqq atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_cs_19iasv6 atm_go_1ixj6vq atm_gy_1yuitx dir dir-ltr">
                        Search by city
                    </div>
                    <div className="grid-destinations">
                        {Countries?.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="cardDesinations c1q1697z atm_9s_1txwivl atm_ar_1bp4okc atm_n5_1yuitx atm_l8_1y44olf atm_l8_ftgil2__oggzyc atm_5j_qe0vi4__oggzyc atm_2d_1s7alg2_1nos8r_1jiodmv dir dir-ltr"
                                    onClick={() => handleDestinationSelect(item.name)}
                                >
                                    <button
                                        className="c1y2gkhb atm_9s_1o8liyq atm_9j_tlke0l atm_r3_1h6ojuz atm_3f_uuagnh atm_l8_idpfg4 atm_gi_idpfg4 atm_4b_rke8ap atm_7l_jt7fhx atm_bx_48h72j atm_mk_h2mmj6 atm_uq_17liqq3 atm_ui_1bljbuh atm_uv_xoomkg atm_kd_glywfm atm_5j_kitwna atm_e2_1wugsn5 atm_ks_zryt35 atm_vy_1osqo2v atm_1w_gbua2q atm_2d_rke8ap atm_g3_idpfg4 atm_r2_1j28jx2 atm_7l_177r58q_1nos8r_uv4tnr atm_4b_lb1gtz_1nos8r_uv4tnr atm_7l_177r58q_csw3t1 atm_4b_lb1gtz_csw3t1 atm_tr_ybgkrq_csw3t1 atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_aaiy6o_1w3cfyq atm_70_15w7q17_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_aaiy6o_pfnrn2_1oszvuo atm_70_15w7q17_pfnrn2_1oszvuo atm_uc_glywfm_pfnrn2_1o31aam atm_uc_aaiy6o_1s76pf2 atm_70_15w7q17_1s76pf2 atm_uc_glywfm_1s76pf2_1rrf6b5 atm_uc_aaiy6o_1y5fnfe_1oszvuo atm_70_15w7q17_1y5fnfe_1oszvuo atm_uc_glywfm_1y5fnfe_1o31aam atm_4b_rke8ap_1nos8r_1jiodmv atm_4b_rke8ap_csw3t1_oggzyc dir dir-ltr"
                                        type="button"
                                    >
                                        <img
                                            className="i123w48w  atm_e2_1wugsn5 atm_vy_1osqo2v atm_1w_gbua2q atm_jp_1f51e7f dir dir-ltr"
                                            alt=""
                                            src={`/images/${item?.image}`}
                                        />
                                    </button>
                                    <div className="o18vo2mo atm_c8_km0zk7 atm_g3_18khvle atm_fr_1m9t47k atm_7l_dezgoh atm_gw_1lkvw50 atm_ks_15vqwwr atm_sq_1l2sidv atm_vv_1q9ccgz dir dir-ltr">
                                        {item?.name}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            )}
        </>
    );
};

export default DestinationSelector;
