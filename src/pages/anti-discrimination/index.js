import React from 'react'

const AntiDiscrimination = () => {
    const currentDate = new Date();
    return (
        <>
            <section className='anti-discrimination-section'>
                <div className='first-step-section'>
                    <h6 className='update-hea'>{currentDate.getFullYear()} update</h6>

                    <h3 className='anti-dis-inside-hea-2'>Fighting discrimination and making travel more open to all</h3>
                    <div className='text-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ display: "block", height: "32px", width: "32px", fill: "currentColor", width: "100%" }} aria-hidden="true" role="presentation" focusable="false"><path d="m16.6 1.2.1.08.08.1L20.48 6H22v2h-2v4h2v2h-1.76l1.65 14H26v2H6v-2h4.11l1.65-14H10v-2h2V8h-2V6h1.52l3.7-4.63a1 1 0 0 1 1.38-.17zM18.23 14h-4.46l-1.65 14h7.76zM16 23a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-9.54-4.88 1.42 1.42-2.83 2.82-1.41-1.41zm19.08 0 2.82 2.83-1.41 1.41-2.83-2.82zM18 8h-4v4h4zM5 9v2H1V9zm26 0v2h-4V9zM5.05 2.64l2.83 2.82-1.42 1.42-2.82-2.83zm21.9 0 1.41 1.41-2.82 2.83-1.42-1.42zM16 3.6 14.08 6h3.84z"></path></svg>
                        <h3 className='project-lighthouse-hea'>Project Lighthouse</h3>
                        <p className='launched-para'>Launched in 2020, Project Lighthouse is a tool we use in the United States that helps uncover and address potential disparities in how users of different perceived races may experience Airbnb. We developed Project Lighthouse with guidance from a number of leading civil rights and privacy organizations. Learn more
                        </p>
                    </div>

                    <div className='main-row-parent'>
                        <div className='main-row-child'>
                            <h5>Using real data</h5>
                            <p>We examine how guests and hosts use our platform. Statistical analyses help us find opportunities to make Airbnb more open to everyone.</p>
                        </div>
                        <div className='main-row-child'>
                            <h5>Protecting privacy</h5>
                            <p>We analyze trends in aggregate and don’t associate perceived race information with specific people or accounts.
                            </p>
                        </div>
                        <div className='main-row-child'>
                            <h5>Constantly improving</h5>
                            <p>Our team continues to identify new ways to make Airbnb more open and equitable.
                            </p>
                        </div>
                    </div>
                </div>

                <div className='second-step-section'>
                    <h3>Our ongoing work</h3>
                    <div className='second-main-parent'>
                        <div className='second-main-child'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ display: "block", height: "32px", width: "32px", fill: "currentColor" }} aria-hidden="true" role="presentation" focusable="false"><path d="M17.16 1.46 6.19 17.42l-.1.17c-.05.12-.06.18-.08.4l.04.13c.19.65.23.67.97.88H13v10.97l.04.22c.05.28.1.33.4.61l.27.09c.51.16.59.1 1.13-.35l10.97-15.96.1-.18c.05-.11.06-.17.08-.39l-.04-.13c-.19-.66-.23-.67-.97-.88H19V2.03l-.04-.22c-.05-.28-.1-.33-.4-.61l-.27-.09c-.51-.16-.59-.1-1.13.35zM17 5.22V15h6.1L15 26.78V17H8.9L17 5.22z"></path></svg>
                            <h4>Making Instant Book accessible to more people</h4>
                            <p>Instant Book—a feature that allows guests to book a listing without requiring hosts to approve a reservation request—is an important tool that can help reduce potential discrimination in the booking process by supporting more objective bookings. Recent changes that allow for a more holistic definition of a positive track record on Airbnb have helped increase the number of guests successfully booking reservations via Instant Book.
                            </p>
                        </div>

                        <div className='second-main-child'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ display: "block", height: "32px", width: "32px", fill: "currentColor" }} aria-hidden="true" role="presentation" focusable="false"><path d="M20 0v2h-8V0h-2v2H4a2 2 0 0 0-2 1.85V25a5 5 0 0 0 4.78 5H25a5 5 0 0 0 5-4.78V4a2 2 0 0 0-1.85-2H22V0h-2Zm2 4h6v21a3 3 0 0 1-2.82 3H7a3 3 0 0 1-3-2.82V4h6v2h2V4h8v2h2V4ZM10 17a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM22 9a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z"></path></svg>
                            <h4>Helping hosts respond to booking requests</h4>
                            <p>New steps that help hosts respond to booking requests in a timely manner also increased the booking success rate. These changes include making pending reservation requests more prominent for hosts. This decreased the number of reservation requests that previously went unanswered, effectively increasing the number of guests who successfully book a place to stay.</p>
                        </div>

                        <div className='second-main-child'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ display: "block", height: "32px", width: "32px", fill: "currentColor" }} aria-hidden="true" role="presentation" focusable="false"><path d="m10.66 9.74-8.23 1-.15.02a2 2 0 0 0-.93 3.47l6.2 5.46-2 8.52-.03.15a2 2 0 0 0 2.96 2.05L16 26.15l7.52 4.26.13.07a2 2 0 0 0 2.8-2.27l-2-8.52 6.2-5.46.11-.11a2 2 0 0 0-1.19-3.38l-8.23-1-3.53-7.55a2 2 0 0 0-3.62 0zM12 11.59l4-8.56 4 8.56 9.33 1.13-7.1 6.26 2.27 9.69-8.5-4.82-8.5 4.82 2.28-9.7-7.11-6.25z"></path></svg>
                            <h4>Helping guests build a positive reputation on Airbnb</h4>
                            <p>Guests with reviews have a higher booking success rate. We’ve now made it easier for guests to add co-travelers with Airbnb accounts to their reservation, which enables these co-travelers to receive a review even if they did not book the stay.</p>
                        </div>

                        <div className='second-main-child'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ display: "block", height: "32px", width: "32px", fill: "currentColor" }} aria-hidden="true" role="presentation" focusable="false"><path d="M22 7a5 5 0 0 1 3.4 8.67 9 9 0 0 1 5.6 8.06V24h-2a7 7 0 0 0-6-6.93v-2.24a3 3 0 1 0-4-3V12l.08.06a5 5 0 0 1 .32 7.6 9 9 0 0 1 5.6 8.07V28h-2a7 7 0 0 0-6-6.93v-2.24a3 3 0 1 0-2 0v2.24a7 7 0 0 0-6 6.69V28H7a9 9 0 0 1 5.6-8.34 4.98 4.98 0 0 1 .32-7.6L13 12a3 3 0 1 0-4 2.83v2.24a7 7 0 0 0-6 6.69V24H1a9 9 0 0 1 5.6-8.34A4.98 4.98 0 0 1 10 7a5 5 0 0 1 4.92 4.12 4.98 4.98 0 0 1 2.16 0A5 5 0 0 1 22 7z"></path></svg>
                            <h4>Supporting hosts and guests throughout their stay</h4>
                            <p>We introduced a new feature allowing hosts and guests to display their preferred names on their profiles, after confirming their legal name. We’re also improving the process for hosts or guests who report being identified by the incorrect pronouns in a review. If a host or guest expresses this concern, the pronoun is replaced with the user’s preferred name.
                            </p>
                        </div>

                        <div className='second-main-child'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ display: "block", height: "32px", width: "32px", fill: "currentColor" }} aria-hidden="true" role="presentation" focusable="false"><path d="m16 .8.56.37C20.4 3.73 24.2 5 28 5h1v12.5C29 25.57 23.21 31 16 31S3 25.57 3 17.5V5h1c3.8 0 7.6-1.27 11.45-3.83L16 .8zm-1 3a22.2 22.2 0 0 1-9.65 3.15L5 6.97V17.5c0 6.56 4.35 11 10 11.46zm2 0v25.16c5.65-.47 10-4.9 10-11.46V6.97l-.35-.02A22.2 22.2 0 0 1 17 3.8z"></path></svg>
                            <h4>Strengthening our policies and procedures</h4>
                            <p>We’ve refined the process by which hosts decline a reservation request to help inform them about acceptable and unacceptable reasons for rejecting a booking request. We’ve also updated our Non-Discrimination Policy to make it more effective and incorporated new protections against caste discrimination. Lastly, we are implementing a series of changes to help enhance fairness when a host cancels an existing reservation.</p>
                        </div>


                        <div className='second-main-child'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ display: "block", height: "32px", width: "32px", fill: "currentColor" }} aria-hidden="true" role="presentation" focusable="false"><path d="M25 4a2 2 0 0 1 2 1.85V8h2.04c1.04 0 1.88.82 1.96 1.85V26c0 1.05-.8 1.92-1.81 2H6.96a1.98 1.98 0 0 1-1.95-1.85L5 26v-2H3a2 2 0 0 1-2-1.85V6a2 2 0 0 1 1.85-2H3zm2 18a2 2 0 0 1-1.85 2H7v2h22V10h-2zM25 6H3v16h22zm-3 12a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-8-8a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM6 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path></svg>
                            <h4>Sharing more information about economic empowerment opportunities available on Airbnb</h4>
                            <p>We are expanding the Airbnb Entrepreneurship Academy, which introduces people from diverse and historically underrepresented communities to hosting on our platform in partnership with organizations including Hispanic Wealth Project, Brotherhood Crusade, and United Spinal Association. We’re also continuing to participate in Operation HOPE’s 1 Million Black Businesses (1MBB) initiative, which provides support and coaching for Black entrepreneurs to start, grow, or scale their businesses.</p>
                        </div>

                        <div className='second-main-child'>
                            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", height: "32px", width: "32px", fill: "currentColor" }} aria-hidden="true" role="presentation" focusable="false"><path d="m13.00075 15c.7779 0 1.5298.111 2.2408.3181l-.9713 1.68c-.0235.0406-.0462.0813-.068.1222-.3882-.0789-.79-.1203-1.2015-.1203-3.31371 0-6 2.6863-6 6s2.68629 6 6 6c3.3137 0 5.9999-2.6862 6-5.9998h2c0 4.4182-3.5818 7.9998-8 7.9998-4.41828 0-8-3.5817-8-8s3.58172-8 8-8zm6.4531-13c2.2092 0 4 1.79086 4 4 0 1.83911-1.2411 3.38833-2.9315 3.85572.6869 1.44878.6554 3.18638-.1889 4.64678l-2.6003 4.4978h6.5072c2.1391 0 3.5909 2.1746 2.7708 4.1501l-2.5859 6.2292-1.8471-.7668 2.5858-6.2292c.2734-.6585-.2106-1.3833-.9236-1.3833h-6.5072c-1.5401 0-2.5023-1.6677-1.7315-3.0011l2.6004-4.4978c.647-1.1191.4984-2.5095-.3276-3.4637l1.1777-2.0377c1.1063 0 2.0017-.89543 2.0017-2s-.8954-2-2-2c-1.1045 0-2 .89543-2 2 0 .3638.0972.70492.2669.99883l-1.1567 2.00135-6.2424.00011-3.4543 5.99881-1.73319-.998 3.45428-5.99883c.35697-.61993 1.01787-1.00199 1.73321-1.00198l5.2583-.0002c-.0823-.31965-.1261-.65476-.1261-1.00009 0-2.20914 1.7909-4 4-4z"></path></svg>
                            <h4>Continuing our commitment to guests with mobility needs</h4>
                            <p>Our accessibility feature search filters make it easier for guests to find and book stays that meet their needs. Through Accessibility Review, we review every accessibility feature submitted by hosts for accuracy.</p>
                        </div>
                    </div>
                </div>

                <div className='third-step-section'>
                    <h3>Our commitment to fighting discrimination</h3>
                    <p>This work follows a history of working to fight discrimination including one of the first Civil Rights Audits in 2016, an additional update in 2019, the announcement of Project Lighthouse in 2020, and our 2022 initial release of Project Lighthouse data. These updates covered a range of evolving initiatives and efforts to support everyone being successful on Airbnb.</p>
                    <img src="/images/anti-discrimination.png" alt="" />
                </div>
            </section>
        </>
    )
}

export default AntiDiscrimination
