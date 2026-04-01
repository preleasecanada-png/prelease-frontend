import React from 'react';
import PropTypes from 'prop-types';

const AnimatedButton = ({
  children,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  icon = null,
  onClick,
  className = '',
  ...props
}) => {
  const baseClasses = [
    'btn-enhanced',
    'transition-all',
    disabled || loading ? 'disabled' : '',
    className
  ].filter(Boolean).join(' ');

  const variantClasses = {
    primary: 'btn-primary-enhanced',
    outline: 'btn-outline-enhanced',
    success: 'gradient-success',
    info: 'gradient-info'
  };

  const sizeClasses = {
    small: 'py-2 px-4 text-sm',
    medium: 'py-3 px-6',
    large: 'py-4 px-8 text-lg'
  };

  const classes = [
    baseClasses,
    variantClasses[variant] || variantClasses.primary,
    sizeClasses[size] || sizeClasses.medium
  ].join(' ');

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="spinner-border spinner-border-sm me-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </span>
      )}
      {icon && !loading && <span className="me-2">{icon}</span>}
      {children}
    </button>
  );
};

AnimatedButton.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'outline', 'success', 'info']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string
};

export default AnimatedButton;
