import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import { listingsAPI } from '../utils/api';
function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchListings();
  }, []);
  const fetchListings = async (filters = {}) => {
    setLoading(true);
    try {
      const response = await listingsAPI.getListings(filters);
      setListings(response.data.listings);
    } catch (error) {
      console.error('Failed to fetch listings');
    }
    setLoading(false);
  };
  return (
    <div className="container">
      <SearchBar onSearch={fetchListings} />
      {loading ? (
        <div style={{textAlign: 'center', padding: '2rem'}}>Loading...</div>
      ) : (
        <div className="property-grid">
          {listings.map(listing => (
            <PropertyCard key={listing._id} listing={listing} />
          ))}
        </div>
      )}
      {!loading && listings.length === 0 && (
        <div style={{textAlign: 'center', padding: '2rem'}}>
          No properties found. Try adjusting your search criteria.
        </div>
      )}
    </div>
  );
}
export default Home;