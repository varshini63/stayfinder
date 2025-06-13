import React, { useState, useEffect } from 'react';
import { listingsAPI } from '../utils/api';
function HostDashboard() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    property_type: 'apartment',
    amenities: '',
    images: ''
  });
  useEffect(() => {
    fetchHostListings();
  }, []);
  const fetchHostListings = async () => {
    try {
      const response = await listingsAPI.getHostListings();
      setListings(response.data.listings);
    } catch (error) {
      console.error('Failed to fetch listings');
    }
    setLoading(false);
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const listingData = {
        ...formData,
        amenities: formData.amenities.split(',').map(a => a.trim()),
        images: formData.images.split(',').map(i => i.trim())
      };
      await listingsAPI.createListing(listingData);
      setShowForm(false);
      setFormData({
        title: '',
        description: '',
        location: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        property_type: 'apartment',
        amenities: '',
        images: ''
      });
      fetchHostListings();
    } catch (error) {
      alert('Failed to create listing');
    }
  };
  const handleDelete = async (listingId) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await listingsAPI.deleteListing(listingId);
        fetchHostListings();
      } catch (error) {
        alert('Failed to delete listing');
      }
    }
  };
  if (!localStorage.getItem('token')) {
    return (
      <div style={{textAlign: 'center', padding: '2rem'}}>
        Please login to access the host dashboard.
      </div>
    );
  }
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Host Dashboard</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
        >
          {showForm ? 'Cancel' : 'Add New Listing'}
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} style={{background: 'white', padding: '2rem', borderRadius: '12px', marginBottom: '2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.1)'}}>
          <h3 style={{marginBottom: '1rem'}}>Create New Listing</h3>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Price per night ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Property Type</label>
              <select
                name="property_type"
                value={formData.property_type}
                onChange={handleInputChange}
              >
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="villa">Villa</option>
              </select>
            </div>
            <div className="form-group">
              <label>Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              style={{width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px'}}
              required
            />
          </div>
          <div className="form-group">
            <label>Amenities (comma-separated)</label>
            <input
              type="text"
              name="amenities"
              value={formData.amenities}
              onChange={handleInputChange}
              placeholder="WiFi, Kitchen, Pool, etc."
            />
          </div>
          <div className="form-group">
            <label>Image URLs (comma-separated)</label>
            <input
              type="text"
              name="images"
              value={formData.images}
              onChange={handleInputChange}
              placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
            />
          </div>
          <button type="submit" className="btn btn-primary">Create Listing</button>
        </form>
      )}
      {loading ? (
        <div style={{textAlign: 'center', padding: '2rem'}}>Loading...</div>
      ) : (
        <div className="listings-grid">
          {listings.map(listing => (
            <div key={listing._id} className="listing-item">
              <img
                src={listing.images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2'}
                alt={listing.title}
              />
              <div className="listing-item-info">
                <h3>{listing.title}</h3>
                <p>{listing.location}</p>
                <p>${listing.price}/night • {listing.bedrooms} bed • {listing.bathrooms} bath</p>
              </div>
              <div className="listing-actions">
                <button
                  onClick={() => handleDelete(listing._id)}
                  className="btn btn-secondary"
                  style={{backgroundColor: '#ff5a5f', color: 'white'}}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {!loading && listings.length === 0 && (
        <div style={{textAlign: 'center', padding: '2rem'}}>
          You haven't created any listings yet. Click "Add New Listing" to get started!
        </div>
      )}
    </div>
  );
}
export default HostDashboard;