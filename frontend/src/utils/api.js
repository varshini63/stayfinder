import axios from 'axios';

// Remove the './' - it should be just the full URL
const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile'),
};

export const listingsAPI = {
  getListings: (filters) => api.get('/listings', { params: filters }),
  getListing: (id) => api.get(`/listings/${id}`),
  createListing: (listingData) => api.post('/listings', listingData),
  updateListing: (id, listingData) => api.put(`/listings/${id}`, listingData),
  deleteListing: (id) => api.delete(`/listings/${id}`),
  getHostListings: () => api.get('/listings/host'),
};

export const bookingsAPI = {
  createBooking: (bookingData) => api.post('/bookings', bookingData),
  getUserBookings: () => api.get('/bookings/user'),
  getListingBookings: (listingId) => api.get(`/bookings/listing/${listingId}`),
  updateBookingStatus: (bookingId, status) => api.put(`/bookings/${bookingId}/status`, { status }),
};

export default api;