# API Integration - Quick Reference

## Quick Start Commands

```bash
# Start Backend
npm run dev
# Runs on http://localhost:5000

# Start Frontend
cd view
npm run dev
# Runs on http://localhost:5173
```

## API Base URL
```
http://localhost:5000/api
```

## Using the API Utilities

### 1. Authentication
```javascript
import { authAPI } from '../utils/api';

// Register
const { token } = await authAPI.register({ 
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123'
});
localStorage.setItem('token', token);

// Login
const { token } = await authAPI.login({
  email: 'john@example.com',
  password: 'password123'
});
localStorage.setItem('token', token);

// Get current user
const user = await authAPI.getMe();
```

### 2. Products
```javascript
import { productAPI } from '../utils/api';

// Get all products
const products = await productAPI.getAll();

// Get specific product
const product = await productAPI.getById('product-id');

// Create product (admin)
const newProduct = await productAPI.create(
  {
    name: 'New Product',
    price: 99.99,
    description: 'Description',
    category: 'category-id'
  },
  imageFiles // File array
);
```

### 3. Cart
```javascript
import { cartAPI } from '../utils/api';

// Get cart
const cart = await cartAPI.getCart();

// Add item
await cartAPI.addItem({
  productId: 'product-id',
  quantity: 1
});

// Update item
await cartAPI.updateItem({
  productId: 'product-id',
  quantity: 2
});

// Remove item
await cartAPI.removeItem({
  productId: 'product-id'
});

// Clear cart
await cartAPI.clearCart();
```

### 4. Orders
```javascript
import { orderAPI } from '../utils/api';

// Create order
const order = await orderAPI.create({
  items: cartItems,
  shippingAddress: {
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St',
    city: 'New York',
    postalCode: '10001',
    country: 'USA',
    phone: '555-1234'
  },
  total: 99.99,
  subtotal: 89.99,
  tax: 9.00,
  shipping: 0
});

// Capture PayPal payment
const result = await orderAPI.paypalCapture(order._id, {
  paypalOrderId: 'paypal-order-id'
});

// Get user's orders
const orders = await orderAPI.getMyOrders();

// Get specific order
const order = await orderAPI.getOrder('order-id');

// Get all orders (admin)
const allOrders = await orderAPI.adminGetAll();

// Update order status (admin)
await orderAPI.updateStatus('order-id', {
  status: 'shipped'
});
```

## Component Integration Examples

### Using API in a Component
```javascript
import { useEffect, useState } from 'react';
import { productAPI } from '../utils/api';
import { toast } from 'sonner';

export function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productAPI.getAll();
        setProducts(data);
      } catch (error) {
        toast.error(error.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {products.map(product => (
        <div key={product._id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### Using Cart Context
```javascript
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

export function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    try {
      await addToCart({
        productId: product._id,
        quantity: 1,
        price: product.price
      });
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  return (
    <button onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
}
```

### Protected Component
```javascript
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../utils/api';

export function ProtectedPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authAPI.getMe();
        // User is authenticated
      } catch (error) {
        // Not authenticated, redirect to login
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  return <div>Protected content</div>;
}
```

## Error Handling Pattern
```javascript
try {
  const response = await apiFunction();
  // Success
  toast.success('Operation successful!');
} catch (error) {
  // Error
  console.error('Error:', error);
  toast.error(error.message || 'Operation failed');
}
```

## Token Management
```javascript
// Store token after login
localStorage.setItem('token', response.token);

// Token is automatically included in all API calls
// No need to manually add it

// Clear token on logout
localStorage.removeItem('token');
window.location.href = '/login'; // Or use navigate()
```

## Environment Variables
```env
# .env.local
VITE_API_URL=http://localhost:5000/api
VITE_PAYPAL_CLIENT_ID=your_paypal_sandbox_id
```

## API Response Format
All API endpoints return:
```javascript
{
  success: true,
  data: { /* response data */ },
  message: "Success message"
}
```

Or on error:
```javascript
{
  success: false,
  message: "Error message"
}
```

## Common Status Codes
- 200 - OK
- 201 - Created
- 400 - Bad Request (validation error)
- 401 - Unauthorized (missing/invalid token)
- 403 - Forbidden (not enough permissions)
- 404 - Not Found
- 500 - Server Error

## Debugging Tips

1. **Check Network Tab**
   - Open DevTools → Network tab
   - Look for API requests
   - Check response status and body

2. **Check Console**
   - Look for error messages
   - Check API responses
   - Look for token issues

3. **Check LocalStorage**
   - DevTools → Application → LocalStorage
   - Verify token is stored
   - Check for 'token' key

4. **Backend Logs**
   - Terminal where backend runs
   - Look for request logs
   - Check for database errors

## Testing with curl
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass123"}'

# Get products
curl http://localhost:5000/api/products

# Get protected route (with token)
curl http://localhost:5000/api/cart \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## File Upload Example
```javascript
const handleUpload = async (files) => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('images', file);
  });
  formData.append('name', 'Product Name');
  
  const response = await fetch(
    'http://localhost:5000/api/products',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    }
  );
};
```

## Useful Imports
```javascript
// API
import { authAPI, productAPI, cartAPI, orderAPI } from '../utils/api';

// Context
import { useCart } from '../context/CartContext';

// Navigation
import { useNavigate, useParams } from 'react-router-dom';

// UI Feedback
import { toast } from 'sonner';
```

---
**Quick Reference v1.0**
Keep this file handy for quick API integration lookups!
