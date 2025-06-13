from pymongo import MongoClient
from datetime import datetime
from werkzeug.security import generate_password_hash
from config import Config

# Use the MongoDB Atlas URI from your config
client = MongoClient(Config.MONGODB_URI)
db = client.get_default_database()

# Clear existing data
db.users.delete_many({})
db.listings.delete_many({})
db.bookings.delete_many({})

# Insert sample users
users = [
    {
        'email': 'john@example.com',
        'password': generate_password_hash('password123'),
        'name': 'John Doe',
        'is_host': True
    },
    {
        'email': 'jane@example.com',
        'password': generate_password_hash('password123'),
        'name': 'Jane Smith',
        'is_host': False
    }
]

user_ids = db.users.insert_many(users).inserted_ids

# Insert sample listings
listings = [
    {
        'host_id': str(user_ids[0]),
        'title': 'Cozy Downtown Apartment',
        'description': 'Beautiful apartment in the heart of the city',
        'location': 'New York, NY',
        'price': 150.0,
        'bedrooms': 2,
        'bathrooms': 1,
        'amenities': ['WiFi', 'Kitchen', 'Air Conditioning'],
        'images': ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'],
        'property_type': 'apartment',
        'created_at': datetime.utcnow()
    },
    {
        'host_id': str(user_ids[0]),
        'title': 'Luxury Beach House',
        'description': 'Stunning oceanfront property with private beach access',
        'location': 'Miami, FL',
        'price': 350.0,
        'bedrooms': 4,
        'bathrooms': 3,
        'amenities': ['WiFi', 'Pool', 'Beach Access', 'Kitchen'],
        'images': ['https://images.unsplash.com/photo-1449824913935-59a10b8d2000'],
        'property_type': 'house',
        'created_at': datetime.utcnow()
    }
]

db.listings.insert_many(listings)

print('✅ Seed data inserted successfully!')
print(f'📊 Database: {db.name}')
print(f'👥 Users inserted: {len(users)}')
print(f'🏠 Listings inserted: {len(listings)}')