import React from 'react';
import PropTypes from 'prop-types';

const LoadingSkeleton = ({ 
  lines = 3, 
  height = 20, 
  className = '',
  animate = true 
}) => {
  return (
    <div className={className}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`skeleton ${animate ? 'animate' : ''}`}
          style={{
            height: `${height}px`,
            marginBottom: index < lines - 1 ? '10px' : '0',
            borderRadius: '8px'
          }}
        />
      ))}
    </div>
  );
};

LoadingSkeleton.propTypes = {
  lines: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  animate: PropTypes.bool
};

export default LoadingSkeleton;
