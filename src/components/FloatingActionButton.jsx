import React from 'react';
import PropTypes from 'prop-types';

const FloatingActionButton = ({
  icon,
  onClick,
  position = 'bottom-right',
  size = 'medium',
  color = 'primary',
  className = '',
  tooltip = '',
  ...props
}) => {
  const positionClasses = {
    'bottom-right': 'bottom-0 end-0',
    'bottom-left': 'bottom-0 start-0',
    'top-right': 'top-0 end-0',
    'top-left': 'top-0 start-0'
  };

  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-14 h-14',
    large: 'w-16 h-16'
  };

  const colorClasses = {
    primary: 'gradient-primary',
    success: 'gradient-success',
    info: 'gradient-info',
    warning: 'bg-warning',
    danger: 'bg-danger'
  };

  const classes = [
    'fab',
    positionClasses[position] || positionClasses['bottom-right'],
    sizeClasses[size] || sizeClasses['medium'],
    colorClasses[color] || colorClasses['primary'],
    className
  ].join(' ');

  return (
    <div className="position-fixed p-4" style={{ zIndex: 1000 }}>
      <button
        className={classes}
        onClick={onClick}
        title={tooltip}
        {...props}
      >
        {icon}
      </button>
      {tooltip && (
        <div className="tooltip-enhanced position-absolute bottom-100 mb-2 start-50 translate-middle-x">
          {tooltip}
        </div>
      )}
    </div>
  );
};

FloatingActionButton.propTypes = {
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  position: PropTypes.oneOf(['bottom-right', 'bottom-left', 'top-right', 'top-left']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf(['primary', 'success', 'info', 'warning', 'danger']),
  className: PropTypes.string,
  tooltip: PropTypes.string
};

export default FloatingActionButton;
