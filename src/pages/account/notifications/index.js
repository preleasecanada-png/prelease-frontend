import Link from 'next/link'
import React from 'react'

const Notification = () => {
    return (
        <>
            <section className="notification-session-main-container container">
                <div className='profile-session-heading'>
                    <h4><Link href="/account">Account</Link> </h4> <p> <Link href="/account/notifications">{' > Notifications'}</Link></p>
                </div>
                <div className='notification-session-row'>
                    <div className='notification-session-left-container'>
                        <h1>Notifications</h1>
                        <div className='notification-session-left-about-you'>
                            <div className='notification-session-left-inside-det'>
                                <h3>Travel tips and offers</h3>
                                <p>Stay updated with travel tips and member-only offers.</p>
                            </div>
                            <div className=''>
                                <div className='email-and-sms-inside'>
                                    <h6>Email</h6>
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                    </div>
                                </div>
                                <div className='email-and-sms-inside'>
                                    <h6>SMS</h6>
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className='notification-session-left-about-you'>
                            <div className='notification-session-left-inside-det'>
                                <h3>Prelease updates</h3>
                                <p>Stay informed about the latest features, updates, and news from Prelease Canada.</p>
                            </div>
                            <div>
                                <div className='email-and-sms-inside'>
                                    <h6>Email</h6>
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                    </div>
                                </div>
                                <div className='email-and-sms-inside'>
                                    <h6>SMS</h6>
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='notification-session-right-container'>
                        <img src="/images/account/profile-img-3.webp" alt="" />
                        <h4>Manage how you get updates from us</h4>
                        <p>Choose how you want to receive updates. You’re in control of your alerts — turn them on or off anytime.</p>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Notification
