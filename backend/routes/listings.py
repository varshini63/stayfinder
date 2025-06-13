from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.listing import Listing
listings_bp = Blueprint('listings', __name__)
@listings_bp.route('', methods=['GET'])
def get_listings():
    filters = request.args.to_dict()
    listing_model = Listing(current_app.db)
    listings = listing_model.get_all_listings(filters)
    return jsonify({'listings': listings}), 200
@listings_bp.route('/<listing_id>', methods=['GET'])
def get_listing(listing_id):
    listing_model = Listing(current_app.db)
    listing = listing_model.get_listing_by_id(listing_id)
    if not listing:
        return jsonify({'error': 'Listing not found'}), 404
    return jsonify({'listing': listing}), 200
@listings_bp.route('', methods=['POST'])
@jwt_required()
def create_listing():
    data = request.get_json()
    user_id = get_jwt_identity()
    required_fields = ['title', 'description', 'location', 'price', 'bedrooms', 'bathrooms']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    listing_data = {
        'host_id': user_id,
        'title': data['title'],
        'description': data['description'],
        'location': data['location'],
        'price': float(data['price']),
        'bedrooms': int(data['bedrooms']),
        'bathrooms': int(data['bathrooms']),
        'amenities': data.get('amenities', []),
        'images': data.get('images', []),
        'property_type': data.get('property_type', 'apartment')
    }
    listing_model = Listing(current_app.db)
    listing_id = listing_model.create_listing(listing_data)
    return jsonify({'listing_id': listing_id}), 201
@listings_bp.route('/host', methods=['GET'])
@jwt_required()
def get_host_listings():
    user_id = get_jwt_identity()
    listing_model = Listing(current_app.db)
    listings = listing_model.get_listings_by_host(user_id)
    return jsonify({'listings': listings}), 200
@listings_bp.route('/<listing_id>', methods=['PUT'])
@jwt_required()
def update_listing(listing_id):
    data = request.get_json()
    user_id = get_jwt_identity()
    listing_model = Listing(current_app.db)
    listing = listing_model.get_listing_by_id(listing_id)
    if not listing or listing['host_id'] != user_id:
        return jsonify({'error': 'Listing not found or unauthorized'}), 404
    success = listing_model.update_listing(listing_id, data)
    if success:
        return jsonify({'message': 'Listing updated successfully'}), 200
    return jsonify({'error': 'Failed to update listing'}), 500
@listings_bp.route('/<listing_id>', methods=['DELETE'])
@jwt_required()
def delete_listing(listing_id):
    user_id = get_jwt_identity()
    listing_model = Listing(current_app.db)
    listing = listing_model.get_listing_by_id(listing_id)
    if not listing or listing['host_id'] != user_id:
        return jsonify({'error': 'Listing not found or unauthorized'}), 404
    success = listing_model.delete_listing(listing_id)
    if success:
        return jsonify({'message': 'Listing deleted successfully'}), 200
    return jsonify({'error': 'Failed to delete listing'}), 500