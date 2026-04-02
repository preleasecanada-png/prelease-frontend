import DestinationCard from '@/component/DestinationCard';
import MainHeading from '@/component/MainHeading';
import Partner from '@/component/Partner';
import PlaceCard from '@/component/PlaceCard';
import { CreateApiContext } from '../ContextApi/CreateApiContext';
import Search from '@/component/Search';
import SearchMobile from '@/component/Search-mobile';
import Stat from '@/component/stat';
import SideDrops from '@/component/SideDrops';
import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

export default function Home({ isScrolled }) {
  const [mapOpen, setMapOpen] = useState(false);
  const router = useRouter();
  const { locale, loader, properties, fetchProperties } = useContext(CreateApiContext);
  useEffect(() => {
    // if (places?.length === 0) {
    // if (properties?.length === 0) {
      // fetchPlaces();
      fetchProperties();
    // }
  }, []);
  return (
    <>
      <section className='main_section'>
        <div className='top_fade'>
          <img src="/images/mapbg.webp" alt="" />
        </div>
        <div className={`main_cont `} >
          <span className={`head_wel`}>{locale?.home?.welcome_to_canada}</span>

          <MainHeading />

          <p className={`para`}>{locale?.home?.emphasize_platform_heading}</p>

          <div className={`search_for_web ${isScrolled ? 'DisableElement' : ''}`}>
            <Search />
          </div>

          <SearchMobile />

          <div className={`store_area`}>
            <Link href=""><img src="/images/appstore.webp" alt="" /></Link>
            <Link href=""><img src="/images/playstore.webp" alt="" /></Link>
          </div>
        </div>
      </section>

      <section className='main_area_content'>
        <div className='content_area'>
          {/* Popular Destinations */}
          <section className='section-two' style={{ marginBottom: '40px' }}>
            <h2 className='cont_heading'><strong>{locale?.home?.popular || 'Popular'}</strong> {locale?.home?.destinations || 'Destinations'}</h2>
            <div className="pop-dest-grid">
              {[
                { name: 'Toronto', slug: 'toronto', img: '/images/destinations/toronto.jpg', desc: 'Known for its vibrant communities and multicultural environment.' },
                { name: 'Montreal', slug: 'montreal', img: '/images/destinations/montreal.jpg', desc: 'A blend of European charm and North American dynamism.' },
                { name: 'Vancouver', slug: 'vancouver', img: '/images/destinations/vancouver.jpg', desc: 'Stunning mountains meet the Pacific in this coastal gem.' },
                { name: 'Calgary', slug: 'calgary', img: '/images/destinations/calgary.jpg', desc: 'Gateway to the Rockies with a booming urban lifestyle.' },
                { name: 'Ottawa', slug: 'ottawa', img: '/images/destinations/ottawa.jpg', desc: "Canada's capital city, rich in history and culture." },
                { name: 'Quebec City', slug: 'quebec', img: '/images/destinations/quebec.jpg', desc: 'Old-world charm with cobblestone streets and French heritage.' },
              ].map((city, i) => (
                <Link href={`/destination/${city.slug}`} key={i} className="pop-dest-card">
                  <div className="pop-dest-img-wrap">
                    <img src={city.img} alt={city.name} />
                    <div className="pop-dest-overlay">
                      <span className="pop-dest-city-name">{city.name}</span>
                    </div>
                  </div>
                  <div className="pop-dest-info">
                    <h3>{city.name}</h3>
                    <p>{city.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className='section-two'>
            <h2 className='cont_heading'><strong>{locale?.home?.featured}</strong> {locale?.home?.places}</h2>

            <div className="cd56ld atm_1l7p0i1_lepw20 atm_1298uvg_idpfg4 atm_mk_h2mmj6 atm_fb_1cl4t0h atm_1ngntrb_1y44olf atm_lcucu6_1tcgj5g atm_lcucu6_1ylpe5n__oggzyc atm_1efm4uq_1fwxnve__oggzyc atm_1efm4uq_grho7r_hpb1k1_oggzyc atm_lcucu6_1ylpe5n__qky54b atm_lcucu6_u29brm__jx8car cb80sj1 atm_kt_glywfm dir dir-ltr">
              <div className="f12t1m0s atm_j3_1371zjx atm_gw_1wugsn5 atm_lj_ke7zzc atm_li_ke7zzc atm_26_1p8m8iw atm_8w_wetwqu atm_vy_1osqo2v atm_gp_1ixj6vq f10v78d0 atm_go_dnsvzo dir dir-ltr">
                <div className="gsgwcjk atm_1d13e1y_p5ox87 atm_yrukzc_1od0ugv atm_10yczz8_kb7nvz atm_10yczz8_cs5v99__1ldigyt atm_10yczz8_11wpgbn__1v156lz atm_10yczz8_egatvm__qky54b atm_10yczz8_qfx8er__1xolj55 atm_10yczz8_ouytup__w5e62l g14v8520 atm_9s_11p5wf0 atm_d5_j5tqy atm_d7_1ymvx20 atm_dl_1mvrszh atm_dz_hxz02 dir dir-ltr">
                  <PlaceCard properties={properties} loader={loader} />
                </div>
              </div>
            </div>
          </section>
        </div>
        <button className='open_map' onClick={() => setMapOpen(true)}>
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

      {/* How it Works */}
      <section className="hiw-section">
        <div className="hiw-bg-pattern"></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="hiw-header">
            <span className="hiw-badge">{locale?.home?.simple_process || 'Simple Process'}</span>
            <h2 className="hiw-title">
              {locale?.home?.how_it || 'How It'} <span className="text-gradient">{locale?.home?.works || 'Works'}</span>
            </h2>
            <p className="hiw-subtitle">
              {locale?.home?.how_it_works_subtitle || 'Find your perfect home in Canada in just a few simple steps'}
            </p>
          </div>

          {/* Timeline connector (desktop only) */}
          <div className="hiw-timeline">
            <div className="hiw-timeline-line"></div>
          </div>

          <div className="hiw-grid">
            {[
              {
                num: '01',
                title: locale?.home?.step_search || 'Search',
                desc: locale?.home?.step_search_desc || 'Browse verified properties across Canada with advanced filters',
                stepLabel: locale?.home?.step_01 || 'STEP 01',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D80621" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                  </svg>
                ),
              },
              {
                num: '02',
                title: locale?.home?.step_apply || 'Apply',
                desc: locale?.home?.step_apply_desc || 'Submit your rental application with all required documents online',
                stepLabel: locale?.home?.step_02 || 'STEP 02',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D80621" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>
                  </svg>
                ),
              },
              {
                num: '03',
                title: locale?.home?.step_sign || 'Sign',
                desc: locale?.home?.step_sign_desc || 'Review and sign your lease agreement digitally and securely',
                stepLabel: locale?.home?.step_03 || 'STEP 03',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D80621" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>
                  </svg>
                ),
              },
              {
                num: '04',
                title: locale?.home?.step_movein || 'Move In',
                desc: locale?.home?.step_movein_desc || 'Pay securely through the platform and move into your new home',
                stepLabel: locale?.home?.step_04 || 'STEP 04',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D80621" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                ),
              },
            ].map((step, i) => (
              <div key={i} className="hiw-card">
                <div className="hiw-card-num">{step.num}</div>
                <div className="hiw-card-icon-wrap">
                  <div className="hiw-card-icon">{step.icon}</div>
                </div>
                <div className="hiw-card-step">{step.stepLabel}</div>
                <h3 className="hiw-card-title">{step.title}</h3>
                <p className="hiw-card-desc">{step.desc}</p>
                {i < 3 && <div className="hiw-card-arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D80621" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='home-third-section'>
            <div className='custom_container about-us-first-container'>

                <div className='home-left-details'>
                  <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#D80621', display: 'block', marginBottom: '8px' }}>{locale?.home?.for_landlords || 'For Landlords'}</span>
                  <h2>{locale?.home?.maximize_rental_income || 'Maximize your'} <br/>{locale?.home?.rental_income || 'rental income'}</h2>
                  <p>{locale?.home?.landlord_desc || 'List your property on Prelease Canada and connect with thousands of verified tenants. Our platform handles applications, lease agreements, payments, and insurance — so you can focus on what matters.'}</p>
                <ul>
                  <li>{locale?.home?.landlord_feature_1 || 'Smart property listing with photo galleries'}</li>
                  <li>{locale?.home?.landlord_feature_2 || 'Automated application screening'}</li>
                  <li>{locale?.home?.landlord_feature_3 || 'Digital lease signing and management'}</li>
                  <li>{locale?.home?.landlord_feature_4 || 'Secure payment collection with tracking'}</li>
                  <li>{locale?.home?.landlord_feature_5 || 'Built-in rental insurance for every lease'}</li>
                </ul>
                <Link href="/prelease-your-home" className='button' style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>{locale?.home?.list_your_property || 'List Your Property'} <img src="/images/Arrow.svg" alt="" /></Link>
                </div>
                <div className='home-left-image'><img src="images/home-landload.webp" alt="" /></div>
                
            </div>
      </section> 

      <Stat />

      {/* CTA Section */}
      <section style={{
        padding: '80px 2rem',
        background: 'linear-gradient(135deg, #D80621 0%, #6e0311 100%)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', width: '300px', height: '300px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)', top: '-80px', right: '-60px',
        }} />
        <div style={{
          position: 'absolute', width: '200px', height: '200px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)', bottom: '-50px', left: '-40px',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontSize: '38px', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', marginBottom: '16px' }}>
            {locale?.home?.ready_find_home || 'Ready to find your new home?'}
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', maxWidth: '500px', margin: '0 auto 32px', lineHeight: 1.7 }}>
            {locale?.home?.cta_subtitle || 'Join thousands of immigrants who found their perfect place in Canada through Prelease.'}
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/find-home" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '14px 32px', background: '#fff', color: '#D80621',
              borderRadius: '50px', fontWeight: 700, fontSize: '15px', textDecoration: 'none',
              transition: 'all 0.3s ease',
              border: 'none',
            }}>
              {locale?.home?.browse_properties || 'Browse Properties'}
            </Link>
            <Link href="/sign-up" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '14px 32px', background: 'transparent', color: '#fff',
              borderRadius: '50px', fontWeight: 700, fontSize: '15px', textDecoration: 'none',
              transition: 'all 0.3s ease',
              border: '2px solid rgba(255,255,255,0.4)',
            }}>
              {locale?.home?.create_account || 'Create Account'}
            </Link>
          </div>
        </div>
      </section>
      <section className='section-two'>
        <h2 className='cont_heading'><strong>{locale?.home?.our}</strong> {locale?.home?.partners}</h2>
        <Partner />
      </section>
    </>
  );
}