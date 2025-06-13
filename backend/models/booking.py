from bson import ObjectId
from datetime import datetime
class Booking:
    def __init__(self, db):
        self.collection = db.bookings
    def create_booking(self, booking_data):
        booking_data['created_at'] = datetime.utcnow()
        booking_data['status'] = 'pending'
        result = self.collection.insert_one(booking_data)
        return str(result.inserted_id)
    def get_bookings_by_user(self, user_id):
        bookings = list(self.collection.find({'user_id': user_id}))
        for booking in bookings:
            booking['_id'] = str(booking['_id'])
        return bookings
    def get_bookings_by_listing(self, listing_id):
        bookings = list(self.collection.find({'listing_id': listing_id}))
        for booking in bookings:
            booking['_id'] = str(booking['_id'])
        return bookings
    def update_booking_status(self, booking_id, status):
        result = self.collection.update_one(
            {'_id': ObjectId(booking_id)},
            {'$set': {'status': status}}
        )
        return result.modified_count > 0