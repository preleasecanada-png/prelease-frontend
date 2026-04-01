import React, { useState } from 'react';
import { AnimatedButton } from './index';

const SearchBar = ({
  placeholder = 'Search...',
  onSearch,
  loading = false,
  className = '',
  showFilters = false,
  filters = []
}) => {
  const [query, setQuery] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleFilterSelect = (filter) => {
    onSearch(query, filter);
    setShowFilterDropdown(false);
  };

  return (
    <div className={`position-relative ${className}`}>
      <form onSubmit={handleSubmit} className="d-flex gap-2">
        <div className="flex-grow-1 position-relative">
          <input
            type="text"
            className="form-control form-control-enhanced ps-5"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="position-absolute start-0 top-50 translate-middle-y ps-3">
            <span className="text-muted">🔍</span>
          </div>
        </div>
        
        <AnimatedButton
          variant="primary"
          type="submit"
          loading={loading}
          disabled={!query.trim()}
        >
          Search
        </AnimatedButton>

        {showFilters && filters.length > 0 && (
          <div className="position-relative">
            <AnimatedButton
              variant="outline"
              type="button"
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            >
              ⚙️ Filters
            </AnimatedButton>
            
            {showFilterDropdown && (
              <div className="position-absolute top-100 end-0 mt-2 p-3 bg-white rounded shadow-enhanced" style={{ minWidth: '200px', zIndex: 1000 }}>
                {filters.map((filter, index) => (
                  <div
                    key={index}
                    className="py-2 px-3 rounded hover:bg-light cursor-pointer transition-smooth"
                    onClick={() => handleFilterSelect(filter)}
                  >
                    {filter.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
