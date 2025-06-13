# stayfinder
# StayFinder - Property Rental Platform

A full-stack web application for property rentals, similar to Airbnb, built with React.js frontend and Flask backend.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure login/register system with JWT tokens
- **Property Management**: Complete CRUD operations for property listings
- **Advanced Search**: Location and price-based filtering
- **Booking System**: Full reservation functionality with date management
- **Host Dashboard**: Comprehensive property management interface
- **Responsive Design**: Mobile-friendly UI across all devices

### User Roles
- **Guests**: Browse properties, make bookings, manage reservations
- **Hosts**: List properties, manage bookings, view analytics
- **Admin**: Full system management capabilities

## 🛠 Tech Stack

### Frontend
- **React.js** - UI framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Modern styling with responsive design

### Backend
- **Flask** - Python web framework
- **Flask-JWT-Extended** - JWT authentication
- **PyMongo** - MongoDB integration
- **Flask-CORS** - Cross-origin resource sharing
- **Werkzeug** - Password hashing utilities

### Database
- **MongoDB Atlas** - Cloud database service
- **Collections**: Users, Listings, Bookings

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn**
- **MongoDB Atlas account** (free tier available)

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd stayfinder
```

### 2. Backend Setup

#### Navigate to backend directory
```bash
cd backend
```



#### Install Python dependencies
```bash
pip install flask flask-cors flask-jwt-extended pymongo python-dotenv werkzeug
```

#### Configure environment variables
Create a `.env` file in the backend directory:
```env
SECRET_KEY=a8f5f167f44f4964e6c998dee827110c
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/stayfinder?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

**Note**: Replace the MongoDB URI with your actual MongoDB Atlas connection string.

### 3. Frontend Setup

#### Navigate to frontend directory
```bash
cd ../frontend
```

#### Install Node.js dependencies
```bash
npm install
# or
yarn install
```

### 4. Database Setup

#### MongoDB Atlas Configuration
1. Create a [MongoDB Atlas](https://www.mongodb.com/atlas) account
2. Create a new cluster (free M0 tier available)
3. Configure database access (create username/password)
4. Configure network access (allow your IP or 0.0.0.0/0 for development)
5. Get your connection string and update the `.env` file

#### Seed Sample Data
```bash
cd backend
python seed_data.py
```

This will populate your database with sample users and property listings.

## 🚀 Running the Application

### Start the Backend Server
```bash
cd backend
python app.py
```
The Flask server will start on `http://localhost:5000`

### Start the Frontend Development Server
```bash
cd frontend
npm start
# or
yarn start
```
The React application will start on `http://localhost:3000`

## 📊 Database Schema

### Users Collection
```javascript
{
  "_id": ObjectId,
  "email": "user@example.com",
  "password": "hashed_password",
  "name": "User Name",
  "is_host": boolean,
  "created_at": datetime
}
```

### Listings Collection
```javascript
{
  "_id": ObjectId,
  "host_id": "user_id_reference",
  "title": "Property Title",
  "description": "Property Description",
  "location": "City, State",
  "price": 150.0,
  "bedrooms": 2,
  "bathrooms": 1,
  "amenities": ["WiFi", "Kitchen", "Pool"],
  "images": ["image_url_1", "image_url_2"],
  "property_type": "apartment|house|condo",
  "created_at": datetime
}
```

### Bookings Collection
```javascript
{
  "_id": ObjectId,
  "user_id": "user_id_reference",
  "listing_id": "listing_id_reference",
  "check_in": "YYYY-MM-DD",
  "check_out": "YYYY-MM-DD",
  "guests": 2,
  "total_price": 300.0,
  "status": "pending|confirmed|cancelled",
  "created_at": datetime
}
```

## 📱 Usage

### For Guests
1. **Register/Login** to your account
2. **Browse Properties** using search and filters
3. **View Details** of properties you're interested in
4. **Make Bookings** by selecting dates and number of guests
5. **Manage Reservations** in your dashboard

### For Hosts
1. **Register/Login** with host privileges
2. **List Properties** with detailed information and photos
3. **Manage Listings** - edit, update, or remove properties
4. **Handle Bookings** - approve or decline reservation requests
5. **Track Performance** through the host dashboard

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Passwords encrypted using Werkzeug
- **CORS Protection** - Configured cross-origin resource sharing
- **Input Validation** - Server-side validation for all inputs
- **Protected Routes** - Authentication required for sensitive operations

## 🌐 Environment Variables

Create a `.env` file in the backend directory with these variables:

```env
SECRET_KEY=your-secret-key-here
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET_KEY=your-jwt-secret-key
```

