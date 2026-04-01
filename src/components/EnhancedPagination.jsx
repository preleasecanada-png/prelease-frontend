import React from 'react';
import { AnimatedButton } from './index';

const EnhancedPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  showPrevNext = true,
  maxVisiblePages = 5,
  className = ''
}) => {
  const getVisiblePages = () => {
    const pages = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let start = Math.max(1, currentPage - halfVisible);
    let end = Math.min(totalPages, currentPage + halfVisible);
    
    if (end - start < maxVisiblePages - 1) {
      if (start === 1) {
        end = Math.min(totalPages, start + maxVisiblePages - 1);
      } else {
        start = Math.max(1, end - maxVisiblePages + 1);
      }
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={`d-flex justify-content-center align-items-center gap-2 ${className}`}>
      {showFirstLast && (
        <AnimatedButton
          variant="outline"
          size="small"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          First
        </AnimatedButton>
      )}
      
      {showPrevNext && (
        <AnimatedButton
          variant="outline"
          size="small"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ←
        </AnimatedButton>
      )}
      
      {visiblePages.map((page, index) => (
        <AnimatedButton
          key={page}
          variant={page === currentPage ? 'primary' : 'outline'}
          size="small"
          onClick={() => onPageChange(page)}
          style={{ 
            minWidth: '40px',
            animationDelay: `${index * 50}ms`
          }}
        >
          {page}
        </AnimatedButton>
      ))}
      
      {showPrevNext && (
        <AnimatedButton
          variant="outline"
          size="small"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          →
        </AnimatedButton>
      )}
      
      {showFirstLast && (
        <AnimatedButton
          variant="outline"
          size="small"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last
        </AnimatedButton>
      )}
      
      <div className="ms-3 text-muted">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default EnhancedPagination;
