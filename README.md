# Natura - Online Ayurvedic Product Selling Platform

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for selling authentic Ayurvedic products online.

## ✨ Features

- 🛒 **Product Catalog**: Browse extensive collection of Ayurvedic products
- 👤 **User Authentication**: Secure login/registration system
- 🛍️ **Shopping Cart**: Add/remove products and manage orders
- 💳 **Payment Integration**: Secure payment processing with Stripe
- 📱 **Responsive Design**: Mobile-friendly interface
- ⭐ **Reviews & Ratings**: Customer feedback system
- 🔍 **Search & Filter**: Advanced product search capabilities

## 🛠️ Tech Stack

### Frontend
- React.js
- Redux (State Management)
- Axios (HTTP Client)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose (ODM)
- JWT (Authentication)
- Stripe (Payment Processing)

## 📁 Project Structure

```
Natura-Platform/
├── frontend/               # React frontend
├── backend/               # Node.js backend services
│   ├── authentication/   # Auth service
│   ├── feedback/         # Feedback service
│   ├── payment/          # Payment service
│   └── products/         # Products service
├── .env.example          # Environment variables template
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/IT22601124/SSD_Assignment.git
   cd SSD_Assignment
   ```

2. **Set up environment variables**
   
   Copy the `.env.example` files to `.env` in each service directory and fill in your actual values:
   ```bash
   # Root directory
   cp .env.example .env
   
   # Frontend
   cp frontend/.env.example frontend/.env
   
   # Backend services
   cp backend/authentication/.env.example backend/authentication/.env
   cp backend/feedback/.env.example backend/feedback/.env
   cp backend/payment/.env.example backend/payment/.env
   cp backend/products/.env.example backend/products/.env
   ```

3. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install
   
   # Install backend dependencies for each service
   cd ../backend/authentication
   npm install
   
   cd ../feedback
   npm install
   
   cd ../payment
   npm install
   
   cd ../products
   npm install
   ```

4. **Start the services**
   ```bash
   # Start frontend (from frontend directory)
   npm start
   
   # Start each backend service (from respective directories)
   # Authentication service
   cd backend/authentication
   npm start
   
   # Feedback service
   cd backend/feedback
   npm start
   
   # Payment service
   cd backend/payment
   npm start
   
   # Products service
   cd backend/products
   npm start
   ```

## 🔧 Environment Variables

Make sure to configure these environment variables in your `.env` files:

- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `STRIPE_SECRET_KEY` - Stripe secret key for payments
- `STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `PORT` - Server port for each service

## 📝 API Endpoints

### Authentication Service (Port 3001)
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Products Service (Port 3004)
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Payment Service (Port 3003)
- `POST /api/payments` - Process payment
- `GET /api/orders` - Get user orders

### Feedback Service (Port 3002)
- `GET /api/feedback` - Get all feedback
- `POST /api/feedback` - Create feedback
- `PUT /api/feedback/:id` - Update feedback
