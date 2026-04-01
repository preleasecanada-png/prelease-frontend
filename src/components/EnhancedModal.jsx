import React, { useEffect, useState } from 'react';
import { AnimatedButton } from './index';

const EnhancedModal = ({
  show,
  onHide,
  title,
  children,
  size = 'medium',
  backdrop = true,
  keyboard = true,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [show]);

  const handleBackdropClick = (e) => {
    if (backdrop && e.target === e.currentTarget) {
      onHide();
    }
  };

  const handleEscape = (e) => {
    if (keyboard && e.key === 'Escape') {
      onHide();
    }
  };

  useEffect(() => {
    if (show && keyboard) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [show, keyboard]);

  if (!show) return null;

  const sizeClasses = {
    small: 'modal-sm',
    medium: '',
    large: 'modal-lg',
    extraLarge: 'modal-xl'
  };

  return (
    <div 
      className={`modal fade ${isVisible ? 'show' : ''} ${className}`}
      style={{ 
        display: isVisible ? 'block' : 'none',
        backgroundColor: backdrop ? 'rgba(0,0,0,0.5)' : 'transparent'
      }}
      onClick={handleBackdropClick}
    >
      <div className={`modal-dialog modal-dialog-centered ${sizeClasses[size] || sizeClasses.medium}`}>
        <div className="modal-content modal-enhanced">
          {title && (
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onHide}
              />
            </div>
          )}
          <div className="modal-body">
            {children}
          </div>
          <div className="modal-footer">
            <AnimatedButton variant="outline" onClick={onHide}>
              Close
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedModal;
