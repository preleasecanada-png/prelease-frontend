import DestinationCard from '@/component/DestinationCard'
import PlaceCard from '@/component/PlaceCard'
import React, { memo, useContext, useEffect, useState } from 'react'
import { CreateApiContext } from '../../ContextApi/CreateApiContext';
import { useRouter } from 'next/router';

const Destinations = memo(() => {
  const [mapOpen, setMapOpen] = useState(false);
  const router = useRouter();
  const { fetchDestination, destinations, locale, loader } = useContext(CreateApiContext);

  useEffect(() => {
    fetchDestination(router?.query?.index);
  }, [router]);

  return (
    <>

      <section className='main_area_content dest_sec'>
        <div className='top_fade dest_fade'>
          <img src="/images/mapbg.webp" alt="" />
        </div>

        <div className='content_area'>
          <section className='section-two'>
            <div className='destination-header'>
              <h1 className='destination-city-name'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="24" height="24" fill="#D80621"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
                {router?.query?.index ? router.query.index.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : ''}
              </h1>
              <p className='destination-property-count'>
                {destinations?.length || 0} {destinations?.length === 1 ? 'property' : 'properties'} available
              </p>
            </div>
            <div className="cd56ld atm_1l7p0i1_lepw20 atm_1298uvg_idpfg4 atm_mk_h2mmj6 atm_fb_1cl4t0h atm_1ngntrb_1y44olf atm_lcucu6_1tcgj5g atm_lcucu6_1ylpe5n__oggzyc atm_1efm4uq_1fwxnve__oggzyc atm_1efm4uq_grho7r_hpb1k1_oggzyc atm_lcucu6_1ylpe5n__qky54b atm_lcucu6_u29brm__jx8car cb80sj1 atm_kt_glywfm dir dir-ltr">
              <div className="f12t1m0s atm_j3_1371zjx atm_gw_1wugsn5 atm_lj_ke7zzc atm_li_ke7zzc atm_8w_wetwqu atm_vy_1osqo2v atm_gp_1ixj6vq f10v78d0 atm_go_dnsvzo dir dir-ltr">
                <div className="gsgwcjk atm_1d13e1y_p5ox87 atm_yrukzc_1od0ugv atm_10yczz8_kb7nvz atm_10yczz8_cs5v99__1ldigyt atm_10yczz8_11wpgbn__1v156lz atm_10yczz8_egatvm__qky54b atm_10yczz8_qfx8er__1xolj55 atm_10yczz8_ouytup__w5e62l g14v8520 atm_9s_11p5wf0 atm_d5_j5tqy atm_d7_1ymvx20 atm_dl_1mvrszh atm_dz_hxz02 dir dir-ltr">
                  <PlaceCard places={destinations} loader={loader} />
                </div>
              </div>
            </div>
          </section>
        </div>

        <button className='open_map' onClick={() => setMapOpen(true)}>
          {/* Show Map */}
          {locale?.home?.show_map}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M384 476.1L192 421.2l0-385.3L384 90.8l0 385.3zm32-1.2l0-386.5L543.1 37.5c15.8-6.3 32.9 5.3 32.9 22.3l0 334.8c0 9.8-6 18.6-15.1 22.3L416 474.8zM15.1 95.1L160 37.2l0 386.5L32.9 474.5C17.1 480.8 0 469.2 0 452.2L0 117.4c0-9.8 6-18.6 15.1-22.3z" /></svg>
        </button>

        <div className={`map_area ${mapOpen ? 'd-flex' : 'd-none'}`}>
          <button className='close_map' onClick={() => setMapOpen(false)}>
            {locale?.home?.show_list}
            <svg fill='#000' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M40 48C26.7 48 16 58.7 16 72l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24L40 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM16 232l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0z" /></svg>
          </button>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2620023.382493951!2d-105.78486778554559!3d55.86354586927403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b0d03d337cc6ad9%3A0x9968b72aa2438fa5!2sCanada!5e0!3m2!1sen!2s!4v1724168992026!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: '0' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </>
  )
});

Destinations.displayName = 'Destinations';

export default Destinations
