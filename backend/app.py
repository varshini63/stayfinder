from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from pymongo import MongoClient
from config import Config
from routes.auth import auth_bp
from routes.listings import listings_bp
from routes.bookings import bookings_bp
app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
jwt = JWTManager(app)
client = MongoClient(app.config['MONGODB_URI'])
db = client.stayfinder
app.db = db
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(listings_bp, url_prefix='/api/listings')
app.register_blueprint(bookings_bp, url_prefix='/api/bookings')
@app.route('/api/health')
def health_check():
    return {'status': 'healthy'}
if __name__ == '__main__':
    app.run(debug=True, port=5000)