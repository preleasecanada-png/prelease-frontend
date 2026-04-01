import React from 'react';

const ProgressRing = ({
  percentage,
  size = 120,
  strokeWidth = 8,
  color = '#D80621',
  backgroundColor = '#e3e8f0',
  showText = true,
  className = ''
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`position-relative d-inline-block ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.5s ease-in-out'
          }}
        />
      </svg>
      {showText && (
        <div 
          className="position-absolute top-50 start-50 translate-middle text-center"
          style={{ fontSize: `${size / 5}px` }}
        >
          <div className="fw-bold">{percentage}%</div>
        </div>
      )}
    </div>
  );
};

export default ProgressRing;
