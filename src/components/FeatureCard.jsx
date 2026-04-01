import React from 'react';
import { AnimatedSection } from './index';

const FeatureCard = ({
  icon,
  title,
  description,
  delay = 0,
  gradient = false,
  className = ''
}) => {
  return (
    <AnimatedSection animation="fadeInUp" delay={delay}>
      <div className={`enhanced-card h-100 text-center ${gradient ? 'gradient-bg text-white' : ''} ${className}`}>
        <div className="mb-4">
          <div className="d-inline-flex align-items-center justify-content-center">
            {icon}
          </div>
        </div>
        <h4 className="fw-bold mb-3">{title}</h4>
        <p className={`${gradient ? 'text-white' : 'text-muted'}`}>
          {description}
        </p>
      </div>
    </AnimatedSection>
  );
};

export default FeatureCard;
