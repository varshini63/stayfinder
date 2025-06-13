from bson import ObjectId
from datetime import datetime
class Listing:
    def __init__(self, db):
        self.collection = db.listings
    def create_listing(self, listing_data):
        listing_data['created_at'] = datetime.utcnow()
        listing_data['available_dates'] = []
        result = self.collection.insert_one(listing_data)
        return str(result.inserted_id)
    def get_all_listings(self, filters=None):
        query = {}
        if filters:
            if 'location' in filters:
                query['location'] = {'$regex': filters['location'], '$options': 'i'}
            if 'min_price' in filters:
                query['price'] = {'$gte': float(filters['min_price'])}
            if 'max_price' in filters:
                if 'price' not in query:
                    query['price'] = {}
                query['price']['$lte'] = float(filters['max_price'])
        listings = list(self.collection.find(query))
        for listing in listings:
            listing['_id'] = str(listing['_id'])
        return listings
    def get_listing_by_id(self, listing_id):
        listing = self.collection.find_one({'_id': ObjectId(listing_id)})
        if listing:
            listing['_id'] = str(listing['_id'])
            return listing
        return None
    def get_listings_by_host(self, host_id):
        listings = list(self.collection.find({'host_id': host_id}))
        for listing in listings:
            listing['_id'] = str(listing['_id'])
        return listings
    def update_listing(self, listing_id, update_data):
        result = self.collection.update_one(
            {'_id': ObjectId(listing_id)},
            {'$set': update_data}
        )
        return result.modified_count > 0
    def delete_listing(self, listing_id):
        result = self.collection.delete_one({'_id': ObjectId(listing_id)})
        return result.deleted_count > 0