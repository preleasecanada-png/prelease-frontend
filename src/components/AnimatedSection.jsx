import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const AnimatedSection = ({
  children,
  animation = 'fadeInUp',
  delay = 0,
  className = '',
  threshold = 0.1,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  const animationClasses = {
    fadeInUp: 'animate-on-scroll',
    slideInLeft: 'animate-on-scroll',
    pulse: 'animate-on-scroll'
  };

  const classes = [
    animationClasses[animation] || animationClasses.fadeInUp,
    isVisible ? 'visible' : '',
    className
  ].filter(Boolean).join(' ');

  const style = {
    transitionDelay: isVisible ? `${delay}ms` : '0ms'
  };

  return (
    <div
      ref={ref}
      className={classes}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

AnimatedSection.propTypes = {
  children: PropTypes.node.isRequired,
  animation: PropTypes.oneOf(['fadeInUp', 'slideInLeft', 'pulse']),
  delay: PropTypes.number,
  className: PropTypes.string,
  threshold: PropTypes.number
};

export default AnimatedSection;
