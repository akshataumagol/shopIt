const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://shopit-56mz.onrender.com/api';

/* =========================
   Helper API function
========================= */
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API Error');
  }

  return data;
};

/* =========================
   AUTH API ✅ FIXED
========================= */
export const authAPI = {
  register: (data) =>
    apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  login: (data) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getMe: () => apiCall('/auth/me'),

  logout: () => {
    localStorage.removeItem('token');
  },
};

/* =========================
   PRODUCT API
========================= */
export const productAPI = {
  getAll: () => apiCall('/products'),
  getById: (id) => apiCall(`/products/${id}`),
  getByCategory: (category, subCategory) =>
    apiCall(`/products/${category}/${subCategory}`),
};

/* =========================
   ORDER API
========================= */
export const orderAPI = {
  create: (data) =>
    apiCall('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getMyOrders: () => apiCall('/orders/my'),

  getOrder: (id) => apiCall(`/orders/${id}`),
};

/* =========================
   CART API (optional)
========================= */
export const cartAPI = {
  getCart: () => apiCall('/cart'),
  addItem: (data) =>
    apiCall('/cart/add', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  removeItem: (data) =>
    apiCall('/cart/remove', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  clear: () => apiCall('/cart/clear', { method: 'DELETE' }),
};

export default {
  authAPI,
  productAPI,
  orderAPI,
  cartAPI,
};

/*const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://shopit-56mz.onrender.com/api';

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
*/
