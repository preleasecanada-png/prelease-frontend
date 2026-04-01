import React from 'react';

const NotificationBadge = ({
  count,
  size = 'medium',
  color = 'danger',
  showZero = false,
  className = ''
}) => {
  if (!showZero && count === 0) return null;

  const sizeClasses = {
    small: 'badge-sm',
    medium: '',
    large: 'badge-lg'
  };

  const classes = [
    'badge',
    'badge-enhanced',
    'position-absolute top-0 start-100 translate-middle',
    sizeClasses[size] || sizeClasses.medium,
    `bg-${color}`,
    className
  ].join(' ');

  return (
    <span className={classes}>
      {count > 99 ? '99+' : count}
    </span>
  );
};

export default NotificationBadge;
