import React from 'react';
import PropTypes from 'prop-types';

const EnhancedCard = ({
  children,
  className = '',
  animate = true,
  hover = true,
  gradient = false,
  glass = false,
  onClick,
  ...props
}) => {
  const baseClasses = [
    'enhanced-card',
    animate && 'animate',
    hover && 'hover-lift',
    gradient && 'gradient-bg',
    glass && 'glass',
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={baseClasses}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      {...props}
    >
      {children}
    </div>
  );
};

EnhancedCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  animate: PropTypes.bool,
  hover: PropTypes.bool,
  gradient: PropTypes.bool,
  glass: PropTypes.bool,
  onClick: PropTypes.func
};

export default EnhancedCard;
