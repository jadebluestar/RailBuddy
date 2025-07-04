import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000',
  timeout: 10000,
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// User service functions
export const getUserProfile = async () => {
  try {
    const response = await api.get('/api/user/profile'); // Single /api prefix
    console.log('✅ User profile loaded:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (userData) => {
  try {
    const response = await api.put('/api/user/profile', userData);
    console.log('✅ User profile updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error updating user profile:', error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/api/auth/login', credentials);
    console.log('✅ User logged in:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error logging in:', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/api/auth/register', userData);
    console.log('✅ User registered:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error registering user:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await api.post('/api/auth/logout');
    localStorage.removeItem('token');
    console.log('✅ User logged out');
  } catch (error) {
    console.error('❌ Error logging out:', error);
    // Still remove token even if logout fails
    localStorage.removeItem('token');
  }
};

export default api;