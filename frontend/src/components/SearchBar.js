import React, { useState } from 'react';
function SearchBar({ onSearch }) {
  const [filters, setFilters] = useState({
    location: '',
    min_price: '',
    max_price: '',
  });
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };
  return (
    <div className="search-bar">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="location"
          placeholder="Where are you going?"
          value={filters.location}
          onChange={handleChange}
          className="search-input"
        />
        <input
          type="number"
          name="min_price"
          placeholder="Min Price"
          value={filters.min_price}
          onChange={handleChange}
          className="search-input"
        />
        <input
          type="number"
          name="max_price"
          placeholder="Max Price"
          value={filters.max_price}
          onChange={handleChange}
          className="search-input"
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
    </div>
  );
}
export default SearchBar;