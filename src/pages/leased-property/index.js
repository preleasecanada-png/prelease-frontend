import Partner from '@/component/Partner';
import PlaceCard from '@/component/PlaceCard'
import PropertyList from '@/component/PropertyList'
import { CreateApiContext } from '@/ContextApi/CreateApiContext';
import React, { useContext, useEffect } from 'react'

const FindHome = () => {
  const { locale, loader, properties, fetchProperties } = useContext(CreateApiContext);
  useEffect(() => {
    if (properties?.length === 0) {
      fetchProperties();
    }
  }, []);

  return (
    <>
      <section className='section-one'>
        <div className="property-leased">
          <p>My Account</p>
          <h2>Leased Properties</h2>
        </div>
      </section>

      <section className='custom_container'>
        <PropertyList properties={properties} loader={loader} />
      </section>
      <section className='section-two'>
        <h2 className='cont_heading'><strong>{locale?.home?.our}</strong> {locale?.home?.partners}</h2>
        <Partner />
      </section>
    </>
  )
}

export default FindHome
