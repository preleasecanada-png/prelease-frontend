import React from 'react';
import { AnimatedSection } from './index';

const TestimonialCard = ({
  name,
  role,
  avatar,
  rating,
  testimonial,
  delay = 0
}) => {
  return (
    <AnimatedSection animation="fadeInUp" delay={delay}>
      <div className="enhanced-card h-100">
        <div className="d-flex align-items-center mb-3">
          <div className="flex-shrink-0">
            <img 
              src={avatar} 
              alt={name}
              className="rounded-circle"
              style={{ width: '60px', height: '60px', objectFit: 'cover' }}
            />
          </div>
          <div className="ms-3">
            <h5 className="mb-0 fw-bold">{name}</h5>
            <p className="text-muted mb-0 small">{role}</p>
          </div>
        </div>
        
        <div className="mb-3">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-warning ${i < rating ? '' : 'opacity-25'}`}>
              ★
            </span>
          ))}
        </div>
        
        <p className="text-muted fst-italic">
          "{testimonial}"
        </p>
      </div>
    </AnimatedSection>
  );
};

export default TestimonialCard;
