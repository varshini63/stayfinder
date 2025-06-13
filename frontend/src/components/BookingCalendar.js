import React, { useState } from 'react';
import { bookingsAPI } from '../utils/api';
function BookingCalendar({ listing }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const calculatePrice = () => {
    if (checkIn && checkOut) {
      const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
      setTotalPrice(nights * listing.price);
    }
  };
  React.useEffect(() => {
    calculatePrice();
  }, [checkIn, checkOut, listing.price]);
  const handleBooking = async (e) => {
    e.preventDefault();
    if (!localStorage.getItem('token')) {
      alert('Please login to make a booking');
      return;
    }
    setLoading(true);
    try {
      const bookingData = {
        listing_id: listing._id,
        check_in: checkIn,
        check_out: checkOut,
        guests: guests
      };
      await bookingsAPI.createBooking(bookingData);
      alert('Booking created successfully!');
      setCheckIn('');
      setCheckOut('');
      setGuests(1);
    } catch (error) {
      alert('Failed to create booking');
    }
    setLoading(false);
  };
  return (
    <div className="booking-card">
      <div className="price-display">
        ${listing.price} <span style={{fontSize: '1rem', fontWeight: 'normal'}}>per night</span>
      </div>
      <form onSubmit={handleBooking}>
        <div className="date-inputs">
          <div className="form-group">
            <label>Check-in</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Check-out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="guests-input">
          <label>Guests</label>
          <select
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
            style={{width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px'}}
          >
            {[...Array(8)].map((_, i) => (
              <option key={i} value={i + 1}>{i + 1} guest{i > 0 ? 's' : ''}</option>
            ))}
          </select>
        </div>
        {totalPrice > 0 && (
          <div style={{margin: '1rem 0', padding: '1rem', background: '#f7f7f7', borderRadius: '8px'}}>
            <div>Total: ${totalPrice}</div>
          </div>
        )}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
          style={{width: '100%'}}
        >
          {loading ? 'Booking...' : 'Reserve'}
        </button>
      </form>
    </div>
  );
}
export default BookingCalendar;