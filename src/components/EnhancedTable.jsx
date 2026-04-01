import React from 'react';
import { AnimatedSection } from './index';

const EnhancedTable = ({
  headers,
  data,
  loading = false,
  className = '',
  animate = true
}) => {
  const Component = animate ? AnimatedSection : 'div';
  const animationProps = animate ? { animation: 'fadeInUp', delay: 100 } : {};

  return (
    <Component {...animationProps}>
      <div className={`table-enhanced ${className}`}>
        {loading ? (
          <div className="p-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="loading-skeleton mb-3" style={{ height: '40px' }} />
            ))}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table mb-0">
              <thead>
                <tr>
                  {headers.map((header, index) => (
                    <th key={index} scope="col">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Component>
  );
};

export default EnhancedTable;
