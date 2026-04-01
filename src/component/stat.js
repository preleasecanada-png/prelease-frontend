import React, { useEffect, useRef, useState } from 'react'

const AnimatedCounter = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Stat = () => {
  return (
    <div>
      <section className='about-us-second-section'>
        <div className='stat_card'>
          <div className='stat_card_content'>
            <p>Why Prelease</p>
            <h2>Trusted by Thousands</h2>
            <p>Helping immigrants and Canadians find their perfect home with a secure, transparent, and modern rental experience.</p>
          </div>
          <div className="stat_cards d-flex">
            <div className="stat_card_item">
              <img src="images/card-home.webp" alt="" />
              <h3><AnimatedCounter target={500} suffix="+" /></h3>
              <p>Active Properties</p>
            </div>
            <div className="stat_card_item">
              <img src="images/card-person.webp" alt="" />
              <h3><AnimatedCounter target={2000} suffix="+" /></h3>
              <p>Active Members</p>
            </div>
            <div className="stat_card_item">
              <img src="images/card-message.webp" alt="" />
              <h3><AnimatedCounter target={95} suffix="%" /></h3>
              <p>Positive Feedback</p>
            </div>
            <div className="stat_card_item">
              <img src="images/card-guard.webp" alt="" />
              <h3><AnimatedCounter target={100} suffix="%" /></h3>
              <p>Trusted & Secure</p>
            </div>
          </div>
        </div>        
      </section>
    </div>
  )
}

export default Stat
