import React, { useState, useEffect } from 'react';
import { AnimatedButton, NotificationBadge } from './index';

const FloatingNotification = ({
  message,
  type = 'info',
  duration = 5000,
  showClose = true,
  position = 'top-right',
  onClose
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 300);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  const positionClasses = {
    'top-right': 'position-fixed top-0 end-0 p-3',
    'top-left': 'position-fixed top-0 start-0 p-3',
    'bottom-right': 'position-fixed bottom-0 end-0 p-3',
    'bottom-left': 'position-fixed bottom-0 start-0 p-3',
    'top-center': 'position-fixed top-0 start-50 translate-middle-x p-3',
    'bottom-center': 'position-fixed bottom-0 start-50 translate-middle-x p-3'
  };

  const typeClasses = {
    'success': 'alert-success-enhanced',
    'danger': 'alert-danger-enhanced',
    'warning': 'alert-warning-enhanced',
    'info': 'alert-info-enhanced'
  };

  if (!visible) return null;

  return (
    <div className={`${positionClasses[position] || positionClasses['top-right']}`} style={{ zIndex: 9999 }}>
      <div className={`alert-enhanced ${typeClasses[type] || typeClasses['info']} d-flex align-items-center animate-on-scroll visible`}>
        <div className="flex-grow-1">
          {message}
        </div>
        {showClose && (
          <AnimatedButton
            variant="outline"
            size="small"
            onClick={handleClose}
            className="ms-3"
          >
            ×
          </AnimatedButton>
        )}
      </div>
    </div>
  );
};

export default FloatingNotification;
