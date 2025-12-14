# API Integration Guide

## Overview
This guide explains the API integration between the frontend (React/Vite) and backend (Express/MongoDB) for the eCommerce application.

## Setup Instructions

### 1. Backend Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the backend root:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_jwt_secret_key
   PAYPAL_CLIENT_ID=your_paypal_client_id
   PAYPAL_SECRET=your_paypal_secret
   ```

3. Start the backend server:
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:5000/api`

### 2. Frontend Setup
1. Navigate to the view folder:
   ```bash
   cd view
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file (or use the provided `.env.local`):
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth token)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart
- `GET /api/cart` - Get user's cart (requires auth)
- `POST /api/cart/add` - Add item to cart (requires auth)
- `POST /api/cart/update` - Update cart item (requires auth)
- `POST /api/cart/remove` - Remove item from cart (requires auth)
- `DELETE /api/cart/clear` - Clear cart (requires auth)

### Orders
- `POST /api/orders` - Create order (requires auth)
- `POST /api/orders/paypal/capture/:orderId` - Capture PayPal payment (requires auth)
- `GET /api/orders/my` - Get user's orders (requires auth)
- `GET /api/orders/:id` - Get order details (requires auth)
- `GET /api/orders` - Get all orders (admin only)
- `PUT /api/orders/:id/status` - Update order status (admin only)

## Frontend API Integration

### API Utility (`src/utils/api.js`)
All API calls are centralized in `src/utils/api.js` with the following features:
- Automatic token injection from localStorage
- Error handling
- Response parsing

### Usage Examples

#### Authentication
```javascript
import { authAPI } from '../utils/api';

// Register
const response = await authAPI.register({ name, email, password });
localStorage.setItem('token', response.token);

// Login
const response = await authAPI.login({ email, password });
localStorage.setItem('token', response.token);

// Get current user
const user = await authAPI.getMe();
```

#### Products
```javascript
import { productAPI } from '../utils/api';

// Get all products
const products = await productAPI.getAll();

// Get product by ID
const product = await productAPI.getById(id);
```

#### Cart
```javascript
import { cartAPI } from '../utils/api';

// Get cart
const cart = await cartAPI.getCart();

// Add to cart
await cartAPI.addItem({ productId, quantity });

// Update cart item
await cartAPI.updateItem({ productId, quantity });

// Remove from cart
await cartAPI.removeItem({ productId });

// Clear cart
await cartAPI.clearCart();
```

#### Orders
```javascript
import { orderAPI } from '../utils/api';

// Create order
const order = await orderAPI.create(orderData);

// Capture PayPal payment
const result = await orderAPI.paypalCapture(orderId, paymentData);

// Get user's orders
const orders = await orderAPI.getMyOrders();
```

## Updated Components

### 1. **Login** (`src/pages/Login.jsx`)
- Integrated with auth API
- Stores JWT token in localStorage
- Redirects to home on success

### 2. **Register** (`src/pages/Register.jsx`)
- Integrated with auth API
- Auto-login after registration
- Error handling with toast notifications

### 3. **Home** (`src/pages/Home.jsx`)
- Fetches products from API
- Displays different product sections
- Real-time data loading

### 4. **NewArrivals** (`src/components/Products/NewArrivals.jsx`)
- Fetches latest products from API
- Carousel with drag support

### 5. **ProductDetails** (`src/components/Products/ProductDetailsNew.jsx`)
- Fetches product by ID
- Integrates with cart context
- Similar products recommendation

### 6. **CartContext** (`src/context/CartContext.jsx`)
- API-backed cart management
- Syncs with backend cart
- Auto-fetch on component mount

### 7. **Checkout** (`src/components/Cart/CheckoutNew.jsx`)
- Integrated with orders API
- PayPal payment integration
- Order summary display

### 8. **Profile** (`src/pages/Profile.jsx`)
- Fetches user data from auth API
- Logout functionality
- Redirects to login if not authenticated

### 9. **MyOrdersPage** (`src/pages/MyOrdersPage.jsx`)
- Fetches user's orders from API
- Displays order status and payment info
- Real-time order tracking

## Authentication Flow

1. User registers/logs in
2. JWT token is received and stored in localStorage
3. Token is automatically added to all subsequent requests
4. On 401 error, token is cleared and user is redirected to login
5. On logout, token is removed from localStorage

## Error Handling

All API errors are caught and displayed to the user via toast notifications:
```javascript
try {
  const response = await authAPI.login(credentials);
  toast.success('Login successful!');
} catch (error) {
  toast.error(error.message || 'Login failed');
}
```

## CORS Configuration

The backend is configured with CORS to accept requests from:
- `http://localhost:5173` (development)
- Can be extended in `app.js` for production domains

## Notes

- All protected routes require a valid JWT token
- The API URL can be changed in `.env.local` for different environments
- PayPal configuration is handled through environment variables
- File uploads for products use FormData API
