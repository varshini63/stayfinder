import React from 'react';
import { useNavigate } from 'react-router-dom';
function PropertyCard({ listing }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/listing/${listing._id}`);
  };
  return (
    <div className="property-card" onClick={handleClick}>
      <img
        src={listing.images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2'}
        alt={listing.title}
        className="property-image"
      />
      <div className="property-info">
        <h3 className="property-title">{listing.title}</h3>
        <p className="property-location">{listing.location}</p>
        <div className="property-meta">
          <span>{listing.bedrooms} bed • {listing.bathrooms} bath</span>
        </div>
        <p className="property-price">${listing.price}/night</p>
      </div>
    </div>
  );
}
export default PropertyCard;