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

// PRODUCT API
export const productAPI = {
  getAll: () => apiCall('/products'),
  getById: (id) => apiCall(`/products/${id}`),
  getByCategory: (category, subCategory) =>
    apiCall(`/products/${category}/${subCategory}`),
};

// ORDER API
export const orderAPI = {
  create: (data) => apiCall('/orders', { method: 'POST', body: JSON.stringify(data) }),
  getMyOrders: () => apiCall('/orders/my'),
  getOrder: (id) => apiCall(`/orders/${id}`),
  adminGetAll: () => apiCall('/orders'),
  updateStatus: (id, data) =>
    apiCall(`/orders/${id}/status`, { method: 'PUT', body: JSON.stringify(data) }),
};

export const authAPI = {};
export const cartAPI = {};

export default {
  authAPI,
  productAPI,
  cartAPI,
  orderAPI,
};*/
// FILE: src/api/api.js (or wherever your API file is)

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
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {  // Fixed: Added ()
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

// PRODUCT API
export const productAPI = {
  getAll: () => apiCall('/products'),
  getById: (id) => apiCall(`/products/${id}`),  // Fixed: Changed to ()
  getByCategory: (category, subCategory) =>
    apiCall(`/products/${category}/${subCategory}`),  // Fixed: Changed to ()
  search: (query, category, subCategory) => {
    let url = `/products/search?q=${encodeURIComponent(query)}`;
    if (category) url += `&category=${category}`;
    if (subCategory) url += `&subCategory=${subCategory}`;
    return apiCall(url);
  },
};

// ORDER API
export const orderAPI = {
  create: (data) => apiCall('/orders', { method: 'POST', body: JSON.stringify(data) }),
  getMyOrders: () => apiCall('/orders/my'),
  getOrder: (id) => apiCall(`/orders/${id}`),  // Fixed: Changed to ()
  adminGetAll: () => apiCall('/orders'),
  updateStatus: (id, data) =>
    apiCall(`/orders/${id}/status`, { method: 'PUT', body: JSON.stringify(data) }),  // Fixed: Changed to ()
};

// FILTER API
export const filterAPI = {
  getFilterOptions: (category, subCategory) => 
    apiCall(`/filters/${category}/${subCategory}`),
};

// CATEGORY API
export const categoryAPI = {
  getAll: () => apiCall('/categories'),
  getSubCategories: (category) => apiCall(`/categories/${category}/subcategories`),
};

// AUTH API (add your auth endpoints here)
export const authAPI = {
  login: (data) => apiCall('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  register: (data) => apiCall('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  logout: () => {
    localStorage.removeItem('token');
    return Promise.resolve();
  },
};

// CART API (if you need server-side cart)
export const cartAPI = {
  get: () => apiCall('/cart'),
  add: (data) => apiCall('/cart', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiCall(`/cart/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id) => apiCall(`/cart/${id}`, { method: 'DELETE' }),
  clear: () => apiCall('/cart', { method: 'DELETE' }),
};

export default {
  authAPI,
  productAPI,
  cartAPI,
  orderAPI,
  filterAPI,
  categoryAPI,
};
