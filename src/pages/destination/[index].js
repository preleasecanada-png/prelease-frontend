import PlaceCard from '@/component/PlaceCard'
import React, { memo, useContext, useEffect } from 'react'
import { CreateApiContext } from '../../ContextApi/CreateApiContext';
import { useRouter } from 'next/router';

const Destinations = memo(() => {
  const router = useRouter();
  const { fetchDestination, destinations, loader } = useContext(CreateApiContext);

  useEffect(() => {
    fetchDestination(router?.query?.index);
  }, [router]);

  const cityName = router?.query?.index ? router.query.index.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : '';

  return (
    <section className='main_area_content' style={{ paddingTop: '100px' }}>
      <div className='content_area' style={{ padding: '0 5rem' }}>
        <div style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="28" height="28" fill="#D80621"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
            <h1 style={{ margin: 0, fontSize: '36px', fontWeight: '800', color: '#1a1a1a' }}>{cityName}</h1>
          </div>
          <p style={{ margin: 0, fontSize: '16px', color: '#717171' }}>
            {destinations?.length || 0} {destinations?.length === 1 ? 'property' : 'properties'} available in {cityName}
          </p>
        </div>

        {destinations?.length === 0 && !loader ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#f9f9f9', borderRadius: '16px' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <h3 style={{ margin: '16px 0 8px', fontSize: '20px', color: '#333' }}>No properties found</h3>
            <p style={{ margin: 0, color: '#999', fontSize: '15px' }}>There are no listings available in {cityName} yet. Check back soon!</p>
          </div>
        ) : (
          <div className="cd56ld atm_1l7p0i1_lepw20 atm_1298uvg_idpfg4 atm_mk_h2mmj6 atm_fb_1cl4t0h atm_1ngntrb_1y44olf atm_lcucu6_1tcgj5g atm_lcucu6_1ylpe5n__oggzyc atm_1efm4uq_1fwxnve__oggzyc atm_1efm4uq_grho7r_hpb1k1_oggzyc atm_lcucu6_1ylpe5n__qky54b atm_lcucu6_u29brm__jx8car cb80sj1 atm_kt_glywfm dir dir-ltr">
            <div className="f12t1m0s atm_j3_1371zjx atm_gw_1wugsn5 atm_lj_ke7zzc atm_li_ke7zzc atm_8w_wetwqu atm_vy_1osqo2v atm_gp_1ixj6vq f10v78d0 atm_go_dnsvzo dir dir-ltr">
              <div className="gsgwcjk atm_1d13e1y_p5ox87 atm_yrukzc_1od0ugv atm_10yczz8_kb7nvz atm_10yczz8_cs5v99__1ldigyt atm_10yczz8_11wpgbn__1v156lz atm_10yczz8_egatvm__qky54b atm_10yczz8_qfx8er__1xolj55 atm_10yczz8_ouytup__w5e62l g14v8520 atm_9s_11p5wf0 atm_d5_j5tqy atm_d7_1ymvx20 atm_dl_1mvrszh atm_dz_hxz02 dir dir-ltr">
                <PlaceCard places={destinations} loader={loader} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
});

Destinations.displayName = 'Destinations';

export default Destinations
