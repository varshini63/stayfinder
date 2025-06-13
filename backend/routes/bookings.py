from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.booking import Booking
from models.listing import Listing
from datetime import datetime
bookings_bp = Blueprint('bookings', __name__)
@bookings_bp.route('', methods=['POST'])
@jwt_required()
def create_booking():
    data = request.get_json()
    user_id = get_jwt_identity()
    required_fields = ['listing_id', 'check_in', 'check_out', 'guests']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    listing_model = Listing(current_app.db)
    listing = listing_model.get_listing_by_id(data['listing_id'])
    if not listing:
        return jsonify({'error': 'Listing not found'}), 404
    check_in = datetime.fromisoformat(data['check_in'])
    check_out = datetime.fromisoformat(data['check_out'])
    nights = (check_out - check_in).days
    total_price = nights * listing['price']
    booking_data = {
        'user_id': user_id,
        'listing_id': data['listing_id'],
        'check_in': check_in,
        'check_out': check_out,
        'guests': int(data['guests']),
        'total_price': total_price,
        'nights': nights
    }
    booking_model = Booking(current_app.db)
    booking_id = booking_model.create_booking(booking_data)
    return jsonify({'booking_id': booking_id, 'total_price': total_price}), 201
@bookings_bp.route('/user', methods=['GET'])
@jwt_required()
def get_user_bookings():
    user_id = get_jwt_identity()
    booking_model = Booking(current_app.db)
    bookings = booking_model.get_bookings_by_user(user_id)
    return jsonify({'bookings': bookings}), 200
@bookings_bp.route('/listing/<listing_id>', methods=['GET'])
@jwt_required()
def get_listing_bookings(listing_id):
    user_id = get_jwt_identity()
    listing_model = Listing(current_app.db)
    listing = listing_model.get_listing_by_id(listing_id)
    if not listing or listing['host_id'] != user_id:
        return jsonify({'error': 'Unauthorized'}), 403
    booking_model = Booking(current_app.db)
    bookings = booking_model.get_bookings_by_listing(listing_id)
    return jsonify({'bookings': bookings}), 200
@bookings_bp.route('/<booking_id>/status', methods=['PUT'])
@jwt_required()
def update_booking_status(booking_id):
    data = request.get_json()
    status = data.get('status')
    if status not in ['confirmed', 'cancelled', 'completed']:
        return jsonify({'error': 'Invalid status'}), 400
    booking_model = Booking(current_app.db)
    success = booking_model.update_booking_status(booking_id, status)
    if success:
        return jsonify({'message': 'Booking status updated'}), 200
    return jsonify({'error': 'Failed to update booking'}), 500