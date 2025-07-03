import api from './api';

// LOGIN
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error.response?.data || error.message;
  }
};

// REGISTER
export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error.response?.data || error.message;
  }
};

// LOGOUT
export const logout = async () => {
  try {
    await api.post('/auth/logout');
    localStorage.removeItem('token');
  } catch (error) {
    console.error('Logout failed:', error);
    throw error.response?.data || error.message;
  }
};

// REFRESH TOKEN
export const refreshToken = async () => {
  try {
    const response = await api.post('/auth/refresh');
    return response.data;
  } catch (error) {
    console.error('Token refresh failed:', error);
    throw error.response?.data || error.message;
  }
};
