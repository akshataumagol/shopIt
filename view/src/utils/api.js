// api.js
/*const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API Error');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// PRODUCT API — FIXED ✔
export const productAPI = {
  getAll: () => apiCall('/products'),
  getById: (id) => apiCall(`/products/${id}`),
  getByCategory: (category, subCategory) =>
    apiCall(`/products/${category}/${subCategory}`),
};

// Example orderAPI (unchanged)
export const orderAPI = {
  create: (data) => apiCall('/orders', { method: 'POST', body: JSON.stringify(data) }),
  getMyOrders: () => apiCall('/orders/my'),
  getOrder: (id) => apiCall(`/orders/${id}`),
  adminGetAll: () => apiCall('/orders'),
  updateStatus: (id, data) =>
    apiCall(`/orders/${id}/status`, { method: 'PUT', body: JSON.stringify(data) }),
};

export const authAPI = 
export const cartAPI = 

// Default export (unchanged)
export default {
  authAPI,
  productAPI,
  cartAPI,
  orderAPI,
};
*/
// api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API Error');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// PRODUCT API — FIXED ✔
export const productAPI = {
  getAll: () => apiCall('/products'),
  getById: (id) => apiCall(`/products/${id}`),
  getByCategory: (category, subCategory) =>
    apiCall(`/products/${category}/${subCategory}`),
};

// Example orderAPI (unchanged)
export const orderAPI = {
  create: (data) => apiCall('/orders', { method: 'POST', body: JSON.stringify(data) }),
  getMyOrders: () => apiCall('/orders/my'),
  getOrder: (id) => apiCall(`/orders/${id}`),
  adminGetAll: () => apiCall('/orders'),
  updateStatus: (id, data) =>
    apiCall(`/orders/${id}/status`, { method: 'PUT', body: JSON.stringify(data) }),
};

export const authAPI = {}
export const cartAPI = {}

// Default export (unchanged)
export default {
  authAPI,
  productAPI,
  cartAPI,
  orderAPI,
};