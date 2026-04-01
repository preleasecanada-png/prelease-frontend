import Link from 'next/link';
import React from 'react'

const HelpCenter = () => {
  return (
    <>
      <div className="help-center">
        <div className="top_fade"></div>
        <header className="help-center-header">
          <h1>Hi Roben, how can we help?</h1>
          <p>Find answers to your questions about renting, listing properties, payments, and more.</p>
          <div className="help-center-search-box">
            <input type="text" placeholder="Search for help topics ....." />
            <button>Search</button>
          </div>
        </header>
        <ul className="nav nav-tabs mb-4 mrg-55" id="helpTabs" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active border-0" id="renters-tab" data-bs-toggle="tab" data-bs-target="#renters" type="button" role="tab" aria-controls="renters" aria-selected="true">
              <img src="/images/help-center/for-renters.png" /> For Renters
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link border-0" id="landlords-tab" data-bs-toggle="tab" data-bs-target="#landlords" type="button" role="tab" aria-controls="landlords" aria-selected="false">
              <img src="/images/help-center/for-landlords.png" /> For Landlords
            </button>
          </li>
        </ul>

        <div className="tab-content" id="helpTabsContent">
          <div className="tab-pane fade show active" id="renters" role="tabpanel" aria-labelledby="renters-tab">
            <div className='help-center-main'>
              <div className='help-center-left-area'>
                <h2>For Renters</h2>
                <div className="help-center-cards">
                  <div className="help-center-card">
                    <div className='help-center-card-image'>
                      <img src="images/help-center/booking.png" alt="" />
                    </div>
                    <h3>Booking Process</h3>
                    <p className='f-size'>How to book a stay – Steps from search to confirmation.</p>
                    <div className='learn-more'>
                      <Link href="help-center/for-renters/booking-process/">Learn more →</Link>
                    </div>
                  </div>
                  <div className="help-center-card">
                    <div className='help-center-card-image'>
                      <img src="images/help-center/payment.png" alt="" />
                    </div>
                    <h3>Payments & Refunds</h3>
                    <p>How payments are handled and when refunds apply.</p>
                    <div className='learn-more'>
                      <Link href="help-center/for-renters/payment-refund">Learn more →</Link>
                    </div>
                  </div>
                  <div className="help-center-card">
                    <div className='help-center-card-image'>
                      <img src="images/help-center/trip.png" alt="" />
                    </div>
                    <h3>Trip Management</h3>
                    <p>How to view, cancel, or manage your upcoming bookings</p>
                    <div className='learn-more'>
                      <Link href="help-center/for-renters/trip-managment">Learn more →</Link>
                    </div>
                  </div>
                  <div className="help-center-card">
                    <div className='help-center-card-image'>
                      <img src="images/help-center/message.png" alt="" />
                    </div>
                    <h3>Messaging & Communication</h3>
                    <p>How to chat with your host or respond to messages.</p>
                    <div className='learn-more'>
                      <Link href="help-center/for-renters/messaging-communication">Learn more →</Link>
                    </div>
                  </div>
                  <div className="help-center-card">
                    <div className='help-center-card-image'>
                      <img src="images/help-center/account.png" alt="" />
                    </div>
                    <h3>Account & Settings</h3>
                    <p>Manage your profile info, login security, and notification preferences.</p>

                    <div className='learn-more'>
                      <Link href="help-center/for-renters/account-settings">Learn more →</Link>
                    </div>
                  </div>
                  <div className="help-center-card">
                    <div className='help-center-card-image'>
                      <img src="images/help-center/policy.png" alt="" />
                    </div>
                    <h3>Policies & Safety</h3>
                    <p>Learn about community rules, safety tips, and platform policies.</p>
                    <div className='learn-more'>
                      <Link href="help-center/for-renters/policies-safety">Learn more →</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="help-center-right-area">
                <div className="support-box">
                  <h3 className='booking-looking-for'>Can’t find what you’re looking for?</h3>
                  <p>Our support team is ready to help you with any questions or issues you might have.</p>
                  <button className="support-box-btn-red">Contact Support Team</button>
                  <Link href="/chats">
                    <button className="support-box-btn-outline">
                      Live Chat</button>
                  </Link>
                  <p>Typical response time: Within 2 hours</p>
                  <div className="support-hours">
                    <div>Support hours: <span>9AM - 8PM ET</span></div>
                    <div>Response time: <span>Within 24 hours</span></div>
                    <div>Saturday: <span>9:00 AM - 5:00 PM ET</span></div>
                    <div className='border-bottom-support-box'>Sunday: <span>10:00 AM - 4:00 PM ET</span></div>
                    <div className='emergency-hea'>Emergency Support</div>
                    <div>Available 24/7 for urgent issues</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="landlords" role="tabpanel" aria-labelledby="landlords-tab">
            <div className='help-center-main'>
              <div className='help-center-left-area'>
                <h2 >For Landlords</h2>
                <div className="help-center-cards">
                  <div className="help-center-card">
                    <div className='help-center-card-image'>
                      <img src="images/help-center/booking.png" alt="" />
                    </div>
                    <h3>Listing Your Property</h3>
                    <p>Learn how to showcase your space to the right renters on Prelease Canada.</p>
                    <div>
                      <div className='learn-more'>
                        <Link href="help-center/for-landlords/listing-your-property/">Learn more →</Link>
                      </div>
                    </div>
                  </div>
                  <div className="help-center-card">
                    <div className='help-center-card-image'>
                      <img src="images/help-center/payment.png" alt="" />
                    </div>
                    <h3>Booking Request</h3>
                    <p>Easily handle requests, confirm stays, and keep track of all your bookings in one place.</p>
                    <div className='learn-more'>
                      <Link href="help-center/for-landlords/booking-request">Learn more →</Link>
                    </div>
                  </div>
                  <div className="help-center-card">
                    <div className='help-center-card-image'>
                      <img src="images/help-center/trip.png" alt="" />
                    </div>
                    <h3>Payments & Earnings</h3>
                    <p>Understand how you get paid, track your earnings, and manage your payment settings with ease.</p>
                    <div className='learn-more'>
                      <Link href="help-center/for-landlords/payment-earnings">Learn more →</Link>
                    </div>
                  </div>
                  <div className="help-center-card">
                    <div className='help-center-card-image'>
                      <img src="images/help-center/message.png" alt="" />
                    </div>
                    <h3>Hosting Policies</h3>
                    <p>Learn about your responsibilities, cancellation rules, and how to set expectations for a smooth hosting experience.</p>
                    <div className='learn-more'>
                      <Link href="help-center/for-landlords/hosting-policies">Learn more →</Link>
                    </div>
                  </div>
                  <div className="help-center-card">
                    <div className='help-center-card-image'>
                      <img src="images/help-center/account.png" alt="" />
                    </div>
                    <h3>Manage Guest & Communicate</h3>
                    <p>Stay connected with your renters and handle guest interactions professionally throughout the stay.</p>
                    <div className='learn-more'>
                      <Link href="help-center/for-landlords/managing-guests">Learn more →</Link>
                    </div>
                  </div>
                  <div className="help-center-card">
                    <div className='help-center-card-image'>
                      <img src="images/help-center/policy.png" alt="" />
                    </div>
                    <h3>Account & Settings</h3>
                    <p>Update your personal info, manage login preferences, and keep your hosting account secure.</p>
                    <div className='learn-more'>
                      <Link href="help-center/for-landlords/account-settings">Learn more →</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="help-center-right-area">
                <div className="support-box">
                  <h3>Need additional assistance?</h3>
                  <p>Our landlord support specialists are here to help you maximize your property's potential.</p>
                  <button className="support-box-btn-red">Contact Support Team</button>
                  <button className="support-box-btn-outline">Schedule a Call</button>
                  <p>Typical response time: Within 1 hour</p>
                  <div className="support-hours">
                    <h3>Landlord Resources</h3>
                    <div className='text-danger'>Landlord Handbook</div>
                    <div className='text-danger'>Video Tutorials</div>
                    <div className='text-danger'>Webinar Schedule</div>
                    <div className='text-danger'>Landlord Community</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default HelpCenter;