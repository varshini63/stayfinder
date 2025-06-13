from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models.user import User
auth_bp = Blueprint('auth', __name__)
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    if not all([email, password, name]):
        return jsonify({'error': 'Missing required fields'}), 400
    user_model = User(current_app.db)
    user_id = user_model.create_user(email, password, name)
    if not user_id:
        return jsonify({'error': 'User already exists'}), 409
    access_token = create_access_token(identity=user_id)
    return jsonify({'access_token': access_token, 'user_id': user_id}), 201
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if not all([email, password]):
        return jsonify({'error': 'Missing email or password'}), 400
    user_model = User(current_app.db)
    user = user_model.authenticate_user(email, password)
    if not user:
        return jsonify({'error': 'Invalid credentials'}), 401
    access_token = create_access_token(identity=user['_id'])
    return jsonify({'access_token': access_token, 'user': user}), 200
@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user_model = User(current_app.db)
    user = user_model.get_user_by_id(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify({'user': user}), 200