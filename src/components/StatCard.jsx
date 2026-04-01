import React from 'react';
import PropTypes from 'prop-types';

const StatCard = ({
  title,
  value,
  subtitle,
  icon = null,
  trend = null,
  color = 'primary',
  className = '',
  ...props
}) => {
  const colorClasses = {
    primary: 'text-gradient',
    success: 'text-success',
    info: 'text-info',
    warning: 'text-warning',
    danger: 'text-danger'
  };

  const trendIcon = trend === 'up' ? '↑' : trend === 'down' ? '↓' : null;
  const trendColor = trend === 'up' ? 'text-success' : trend === 'down' ? 'text-danger' : '';

  return (
    <div className={`stat-card animate-on-scroll ${className}`} {...props}>
      {icon && (
        <div className="mb-3">
          <div className="d-flex justify-content-center align-items-center">
            {icon}
          </div>
        </div>
      )}
      <div className={`stat-number ${colorClasses[color]}`}>
        {value}
      </div>
      <h5 className="mt-3 mb-2 fw-bold">{title}</h5>
      {subtitle && (
        <p className="text-muted mb-2">{subtitle}</p>
      )}
      {trend && (
        <div className={`${trendColor} fw-bold`}>
          {trendIcon} {trend.percentage}%
        </div>
      )}
    </div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subtitle: PropTypes.string,
  icon: PropTypes.node,
  trend: PropTypes.shape({
    direction: PropTypes.oneOf(['up', 'down']),
    percentage: PropTypes.number
  }),
  color: PropTypes.oneOf(['primary', 'success', 'info', 'warning', 'danger']),
  className: PropTypes.string
};

export default StatCard;
