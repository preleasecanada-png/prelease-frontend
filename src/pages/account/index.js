import { CreateApiContext } from '@/ContextApi/CreateApiContext';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'

const Account = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [email, setEmail] = useState('');
  const router = useRouter();
  const { users, fetchUsersLists } = useContext(CreateApiContext);
  const [userId, setUserId] = useState('');
  const [host, setHost] = useState({});

  useEffect(() => {
    const email = localStorage.getItem('email');
    const user_id = localStorage.getItem('user_id');
    setEmail(email);
    setUserId(user_id);
  }, []);

  useEffect(() => {
    fetchUsersLists();
  }, []);

  useEffect(() => {
    if (users && users?.length > 0 && userId) {
      const found = users?.filter((item) => item.id == userId);
      if (found?.length > 0) setHost(found[0]);
    }
  }, [users, userId]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('email', email);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/logout`, {
        method: 'POST',
        body: formData,
      });
      if (res.status == 200) {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('email');
        router.push('/login');
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <section className="account-session-main-container container">
        <div className='account-session-heading'>
          <h1>Account</h1>
        </div>
        <div className='account-session-profile'>
          <div className='account-session-profile-image'>
            {host?.picture ? (
              <img src={host.picture.startsWith('http') ? host.picture : `${process.env.NEXT_PUBLIC_BASE_LOCAL_IMAGE_URL}/${host.picture}`} alt="Profile" style={{ objectFit: 'cover', borderRadius: '50%' }} />
            ) : (
              <div style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#D80621', color: '#fff', fontSize: '36px', fontWeight: '600', borderRadius: '50%' }}>
                {host?.first_name?.charAt(0)?.toUpperCase() || '?'}
              </div>
            )}
          </div>
          <div className='account-session-profile-detail'>
            <h1>{`${host?.first_name || ''}  ${host?.last_name || ''}`}</h1>
            <span>{host?.email ?? null}</span>
          </div>
        </div>
        <div className='account-session__container'>
          <Link href='/account/persanal-info' className='account-session__container__content'>
            <div className='account-session-container-content-image'>
              <img src="images/account/profile-1.webp" alt="" />
            </div>
            <h4 className='account-session__container__content__title'>Personal info</h4>
            <p className='account-session__container__content__text'>Provide personal details and how we can reach you.</p>
          </Link>
          {/* <div className='account-session__container__content'> */}
          <Link href='/account/login-security' className='account-session__container__content'>
            <div className='account-session-container-content-image'>
              <img src="images/account/profile-2.webp" alt="" />
            </div>
            <h4 className='account-session__container__content__title'>Login & security</h4>
            <p className='account-session__container__content__text'>Manage your password, device logins, and secure your account.</p>
          </Link>


          <Link href='/account/notifications' className='account-session__container__content'>
            <div className='account-session-container-content-image'>
              <img src="images/account/profile-3.webp" alt="" />
            </div>
            <h4 className='account-session__container__content__title'>Notifications</h4>
            <p className='account-session__container__content__text'>Control how and when you get updates from us.</p>
          </Link>

          <Link href='account/privacy-policy' className='account-session__container__content'>
            <div className='account-session-container-content-image'>
              <img src="images/account/profile-4.webp" alt="" />
            </div>
            <h4 className='account-session__container__content__title'>Privacy Policy</h4>
            <p className='account-session__container__content__text'>Understand how your data is used and protected.</p>
          </Link>
          <Link href='account/frequently-asked-questions' className='account-session__container__content'>
            <div className='account-session-container-content-image'>
              <img src="images/account/profile-5.webp" alt="" />
            </div>
            <h4 className='account-session__container__content__title'>FAQ’s</h4>
            <p className='account-session__container__content__text'>Find quick answers to common questions.</p>
          </Link>

          <div className='account-session__container__content' onClick={handleShow} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <div className='account-session-container-content-image'>
              <img src="images/account/profile-6.webp" alt="" />
            </div>
            <h4 className='account-session__container__content__title'>Log Out</h4>
            <p className='account-session__container__content__text'>Sign out of your account securely.</p>
          </div>

          <div className="modal fade" show={show} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-md">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title more-about-pricing-heading">Are you sure you want to log out?</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body p-4">
                  <p className='lead'>You’ll be signed out from your account. Make sure all your changes are saved before continuing.</p>
                  <div className='logout-modal-btns'>
                    <button className='btn log-modal-cancel-btn' data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                    <button className='btn log-modal-logout-btn' onClick={handleLogout}>Log Out</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Account
