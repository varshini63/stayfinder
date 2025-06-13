import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookingCalendar from '../components/BookingCalendar';
import { listingsAPI } from '../utils/api';
function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchListing();
  }, [id]);
  const fetchListing = async () => {
    try {
      const response = await listingsAPI.getListing(id);
      setListing(response.data.listing);
    } catch (error) {
      console.error('Failed to fetch listing');
    }
    setLoading(false);
  };
  if (loading) {
    return <div style={{textAlign: 'center', padding: '2rem'}}>Loading...</div>;
  }
  if (!listing) {
    return <div style={{textAlign: 'center', padding: '2rem'}}>Listing not found</div>;
  }
  return (
    <div className="listing-detail">
      <div className="listing-images">
        <img
          src={listing.images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2'}
          alt={listing.title}
          className="main-image"
        />
      </div>
      <div className="listing-content">
        <div className="listing-info">
          <h1>{listing.title}</h1>
          <div className="listing-meta">
            <span>📍 {listing.location}</span>
            <span>🛏️ {listing.bedrooms} bedrooms</span>
            <span>🛁 {listing.bathrooms} bathrooms</span>
          </div>
          <p style={{fontSize: '1.1rem', lineHeight: '1.8', margin: '2rem 0'}}>
            {listing.description}
          </p>
          {listing.amenities && listing.amenities.length > 0 && (
            <div className="amenities">
              <h3>Amenities</h3>
              <div className="amenities-list">
                {listing.amenities.map((amenity, index) => (
                  <span key={index} className="amenity-tag">{amenity}</span>
                ))}
              </div>
            </div>
          )}
        </div>
        <BookingCalendar listing={listing} />
      </div>
    </div>
  );
}
export default ListingDetail;