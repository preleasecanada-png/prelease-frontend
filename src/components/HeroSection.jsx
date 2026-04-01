import React from 'react';
import { AnimatedSection, AnimatedButton } from './index';

const HeroSection = ({ 
  title, 
  subtitle, 
  backgroundImage, 
  showCTA = true,
  ctaText = "Get Started",
  onCTAClick,
  height = "600px"
}) => {
  return (
    <div 
      className="position-relative overflow-hidden"
      style={{ 
        height,
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container h-100">
        <div className="row align-items-center h-100">
          <div className="col-lg-8">
            <AnimatedSection animation="fadeInUp" delay={100}>
              <h1 className="display-1 fw-bold text-white mb-4 text-shadow">
                {title}
              </h1>
              <p className="lead text-white mb-4 text-shadow">
                {subtitle}
              </p>
              {showCTA && (
                <AnimatedButton 
                  variant="primary" 
                  size="large"
                  onClick={onCTAClick}
                  className="pulse-enhanced"
                >
                  {ctaText}
                </AnimatedButton>
              )}
            </AnimatedSection>
          </div>
        </div>
      </div>
      
      {/* Animated background elements */}
      <div className="position-absolute top-0 start-0 w-100 h-100">
        <div className="floating position-absolute top-20 start-10">
          <div className="morph-shape w-20 h-20 bg-white opacity-10"></div>
        </div>
        <div className="floating position-absolute top-40 end-10" style={{ animationDelay: '2s' }}>
          <div className="morph-shape w-16 h-16 bg-white opacity-10"></div>
        </div>
        <div className="floating position-absolute bottom-20 start-20" style={{ animationDelay: '4s' }}>
          <div className="morph-shape w-24 h-24 bg-white opacity-10"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
