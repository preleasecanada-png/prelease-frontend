import PlaceCard from '@/component/PlaceCard'
import { CreateApiContext } from '@/ContextApi/CreateApiContext';
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from "next/router";
import { imageBaseUrl } from '@/Helper/helper'

const PROPERTY_TYPES = [
  'Apartment', 'House', 'Condo', 'Townhouse', 'Studio', 'Loft', 'Duplex', 'Room'
]

const CITIES = ['Montreal', 'Edmonton', 'Ottawa', 'Toronto', 'Vancouver']

const FindHome = () => {
  const { properties, fetchProperties, loader, fetchAmenities, amenities } = useContext(CreateApiContext);
  const router = useRouter();
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selectedAmenities, setSelectedAmenities] = useState([])

  const [filters, setFilters] = useState({
    min_price: '',
    max_price: '',
    min_bedrooms: '',
    min_bathrooms: '',
    min_guests: '',
    property_type: '',
    city: '',
    sort_by: '',
  })

  useEffect(() => {
    if (amenities?.length === 0) fetchAmenities();
  }, [])

  useEffect(() => {
    if (!router.isReady) return;
    const merged = { ...router.query }
    Object.entries(filters).forEach(([k, v]) => { if (v) merged[k] = v })
    if (selectedAmenities.length > 0) merged.amenities = selectedAmenities.join(',')
    fetchProperties(merged);
  }, [router.isReady, router.query]);

  const buildQuery = (f, amenIds) => {
    const merged = { ...router.query }
    Object.entries(f).forEach(([key, val]) => {
      if (val) merged[key] = val
      else delete merged[key]
    })
    if (amenIds && amenIds.length > 0) merged.amenities = amenIds.join(',')
    else delete merged.amenities
    return merged
  }

  const applyFilters = () => {
    fetchProperties(buildQuery(filters, selectedAmenities))
    setFiltersOpen(false)
  }

  const resetFilters = () => {
    const empty = {
      min_price: '',
      max_price: '',
      min_bedrooms: '',
      min_bathrooms: '',
      min_guests: '',
      property_type: '',
      city: '',
      sort_by: '',
    }
    setFilters(empty)
    setSelectedAmenities([])
    fetchProperties(router.query)
    setFiltersOpen(false)
  }

  const toggleAmenity = (id) => {
    setSelectedAmenities(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id])
  }

  const activeFilterCount = Object.values(filters).filter(v => v !== '').length + selectedAmenities.length

  return (
    <>
      <section className='find-home'>
        {/* Filter Bar */}
        <div style={{
          background: '#fff',
          borderBottom: '1px solid #eee',
          padding: '12px 2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}>
          <button onClick={() => setFiltersOpen(!filtersOpen)} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: activeFilterCount > 0 ? '#D80621' : '#fff',
            color: activeFilterCount > 0 ? '#fff' : '#000',
            border: '1px solid #ddd',
            borderRadius: '50px', padding: '8px 20px',
            fontSize: '14px', fontWeight: 600, cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>

          {/* Quick sort pills */}
          {['newest', 'price_asc', 'price_desc'].map(sortKey => (
            <button key={sortKey} onClick={() => {
              const newFilters = { ...filters, sort_by: filters.sort_by === sortKey ? '' : sortKey }
              setFilters(newFilters)
              const merged = { ...router.query }
              Object.entries(newFilters).forEach(([k, v]) => { if (v) merged[k] = v; else delete merged[k] })
              fetchProperties(merged)
            }} style={{
              background: filters.sort_by === sortKey ? '#000' : '#fff',
              color: filters.sort_by === sortKey ? '#fff' : '#000',
              border: '1px solid #ddd',
              borderRadius: '50px', padding: '8px 16px',
              fontSize: '13px', fontWeight: 500, cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}>
              {sortKey === 'newest' ? 'Newest' : sortKey === 'price_asc' ? 'Price ↑' : 'Price ↓'}
            </button>
          ))}

          {/* Quick city pills */}
          {CITIES.map(city => (
            <button key={city} onClick={() => {
              const newCity = filters.city === city ? '' : city
              const newFilters = { ...filters, city: newCity }
              setFilters(newFilters)
              const merged = { ...router.query }
              Object.entries(newFilters).forEach(([k, v]) => { if (v) merged[k] = v; else delete merged[k] })
              fetchProperties(merged)
            }} style={{
              background: filters.city === city ? '#6e0311' : '#fff',
              color: filters.city === city ? '#fff' : '#000',
              border: '1px solid #ddd',
              borderRadius: '50px', padding: '8px 16px',
              fontSize: '13px', fontWeight: 500, cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}>
              {city}
            </button>
          ))}

          {activeFilterCount > 0 && (
            <button onClick={resetFilters} style={{
              background: 'transparent', border: 'none',
              color: '#D80621', fontSize: '13px', fontWeight: 600,
              cursor: 'pointer', textDecoration: 'underline',
            }}>
              Clear all
            </button>
          )}

          <span style={{ marginLeft: 'auto', fontSize: '14px', color: '#000000be' }}>
            {properties?.length || 0} properties found
          </span>
        </div>

        {/* Filter Panel (expandable) */}
        <div style={{
          maxHeight: filtersOpen ? '500px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
          background: '#fafafa',
          borderBottom: filtersOpen ? '1px solid #eee' : 'none',
        }}>
          <div style={{ padding: '1.5rem 2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
              {/* Price Range */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#000', display: 'block', marginBottom: '6px' }}>Min Price ($)</label>
                <input
                  type="number"
                  placeholder="0"
                  value={filters.min_price}
                  onChange={e => setFilters({ ...filters, min_price: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#000', display: 'block', marginBottom: '6px' }}>Max Price ($)</label>
                <input
                  type="number"
                  placeholder="10000"
                  value={filters.max_price}
                  onChange={e => setFilters({ ...filters, max_price: e.target.value })}
                  style={inputStyle}
                />
              </div>

              {/* Bedrooms */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#000', display: 'block', marginBottom: '6px' }}>Min Bedrooms</label>
                <select
                  value={filters.min_bedrooms}
                  onChange={e => setFilters({ ...filters, min_bedrooms: e.target.value })}
                  style={inputStyle}
                >
                  <option value="">Any</option>
                  {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}+</option>)}
                </select>
              </div>

              {/* Bathrooms */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#000', display: 'block', marginBottom: '6px' }}>Min Bathrooms</label>
                <select
                  value={filters.min_bathrooms}
                  onChange={e => setFilters({ ...filters, min_bathrooms: e.target.value })}
                  style={inputStyle}
                >
                  <option value="">Any</option>
                  {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n}+</option>)}
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#000', display: 'block', marginBottom: '6px' }}>Property Type</label>
                <select
                  value={filters.property_type}
                  onChange={e => setFilters({ ...filters, property_type: e.target.value })}
                  style={inputStyle}
                >
                  <option value="">All types</option>
                  {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* City */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#000', display: 'block', marginBottom: '6px' }}>City</label>
                <select
                  value={filters.city}
                  onChange={e => setFilters({ ...filters, city: e.target.value })}
                  style={inputStyle}
                >
                  <option value="">All cities</option>
                  {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Min Guests */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#000', display: 'block', marginBottom: '6px' }}>Min Guests</label>
                <select
                  value={filters.min_guests}
                  onChange={e => setFilters({ ...filters, min_guests: e.target.value })}
                  style={inputStyle}
                >
                  <option value="">Any</option>
                  {[1, 2, 3, 4, 5, 6, 8, 10].map(n => <option key={n} value={n}>{n}+</option>)}
                </select>
              </div>
            </div>

            {/* Amenities */}
            {amenities?.length > 0 && (
              <div style={{ marginTop: '1.5rem' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#000', display: 'block', marginBottom: '10px' }}>Amenities</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {amenities.map(a => {
                    const isActive = selectedAmenities.includes(a.id)
                    return (
                      <button key={a.id} onClick={() => toggleAmenity(a.id)} style={{
                        display: 'flex', alignItems: 'center', gap: '6px',
                        padding: '7px 14px', borderRadius: '50px',
                        border: isActive ? '2px solid #D80621' : '1px solid #ddd',
                        background: isActive ? '#fff0f2' : '#fff',
                        color: isActive ? '#D80621' : '#444',
                        fontSize: '13px', fontWeight: isActive ? 600 : 500,
                        cursor: 'pointer', transition: 'all 0.2s',
                      }}>
                        {a.image && <img src={imageBaseUrl(a.image)} alt="" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />}
                        {a.name}
                        {isActive && <span style={{ marginLeft: '2px' }}>✓</span>}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', marginTop: '1.5rem' }}>
              <button onClick={applyFilters} style={{
                background: 'linear-gradient(#191919, #2b2b2b)',
                color: '#fff', border: 'none', borderRadius: '50px',
                padding: '10px 28px', fontSize: '14px', fontWeight: 600,
                cursor: 'pointer',
              }}>
                Apply Filters
              </button>
              <button onClick={resetFilters} style={{
                background: 'transparent',
                color: '#D80621', border: '2px solid #D80621', borderRadius: '50px',
                padding: '10px 28px', fontSize: '14px', fontWeight: 600,
                cursor: 'pointer',
              }}>
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Property Grid */}
        <div className="cd56ld atm_1l7p0i1_lepw20 atm_1298uvg_idpfg4 atm_mk_h2mmj6 atm_fb_1cl4t0h atm_1ngntrb_1y44olf atm_lcucu6_1tcgj5g atm_lcucu6_1ylpe5n__oggzyc atm_1efm4uq_1fwxnve__oggzyc atm_1efm4uq_grho7r_hpb1k1_oggzyc atm_lcucu6_1ylpe5n__qky54b atm_lcucu6_u29brm__jx8car cb80sj1 atm_kt_glywfm dir dir-ltr">
          <div className="f12t1m0s atm_j3_1371zjx atm_gw_1wugsn5 atm_lj_ke7zzc atm_li_ke7zzc atm_26_1p8m8iw atm_8w_wetwqu atm_vy_1osqo2v atm_gp_1ixj6vq f10v78d0 atm_go_dnsvzo dir dir-ltr">
            <div className="gsgwcjk atm_1d13e1y_p5ox87 atm_yrukzc_1od0ugv atm_10yczz8_kb7nvz atm_10yczz8_cs5v99__1ldigyt atm_10yczz8_11wpgbn__1v156lz atm_10yczz8_egatvm__qky54b atm_10yczz8_qfx8er__1xolj55 atm_10yczz8_ouytup__w5e62l g14v8520 atm_9s_11p5wf0 atm_d5_j5tqy atm_d7_1ymvx20 atm_dl_1mvrszh atm_dz_hxz02 dir dir-ltr">
              <PlaceCard properties={properties} loader={loader} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  border: '1px solid #ddd',
  borderRadius: '12px',
  fontSize: '14px',
  background: '#fff',
  color: '#000',
  outline: 'none',
}

export default FindHome
