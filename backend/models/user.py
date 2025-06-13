from bson import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
class User:
    def __init__(self, db):
        self.collection = db.users
    def create_user(self, email, password, name):
        if self.collection.find_one({'email': email}):
            return None
        hashed_password = generate_password_hash(password)
        user_data = {
            'email': email,
            'password': hashed_password,
            'name': name,
            'is_host': False
        }
        result = self.collection.insert_one(user_data)
        return str(result.inserted_id)
    def authenticate_user(self, email, password):
        user = self.collection.find_one({'email': email})
        if user and check_password_hash(user['password'], password):
            user['_id'] = str(user['_id'])
            return user
        return None
    def get_user_by_id(self, user_id):
        user = self.collection.find_one({'_id': ObjectId(user_id)})
        if user:
            user['_id'] = str(user['_id'])
            return user
        return None