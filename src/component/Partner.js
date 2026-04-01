import Link from 'next/link'
import React, { memo, useContext } from 'react'
import { CreateApiContext } from '../ContextApi/CreateApiContext'

const Partner = memo(() => {
  const { locale } = useContext(CreateApiContext);
  return (
    <>
      <div className='parters_row'>
        <div className='partner_card'>
          <img src="/images/ccic.webp" alt="" />
        </div>

        <div className='partner_card'>
          <img src="/images/canda.webp" alt="" />
        </div>

        <div className='partner_card'>
          <img src="/images/obg.webp" alt="" />
        </div>

        <div className='partner_card'>
          <img src="/images/imagin.webp" alt="" />
        </div>

        <div className='Joinus_area'>
          <h2>{locale?.home?.join_the_partners_network}</h2>
          <Link href="#!">
            {locale?.home?.become_a_partner}
            <img src="/images/Arrow.svg" alt="" />
          </Link>
        </div>
      </div>
    </>
  )
});

Partner.displayName = 'Partner';

export default Partner
