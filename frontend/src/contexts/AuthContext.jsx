import React, { createContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister } from '../services/authService';
import { getUserProfile } from '../services/userService';
import api from '../services/api'; // Assuming api.js sets up Axios with interceptors

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        // Set token globally for Axios
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          // Fetch user profile to verify token and get fresh user data
          const userData = await getUserProfile();
          setUser(userData);
        } catch (err) {
          console.error("Failed to load user from token:", err);
          localStorage.removeItem('token');
          delete api.defaults.headers.common['Authorization'];
          setUser(null);
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    setAuthError(null);
    try {
      const data = await apiLogin(credentials);
      localStorage.setItem('token', data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      setUser(data.user); // Assuming login returns user data directly
      setLoading(false);
      return data;
    } catch (err) {
      setAuthError(err.response?.data?.message || 'Login failed');
      setLoading(false);
      throw err; // Re-throw to be handled by page component
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setAuthError(null);
    try {
      const data = await apiRegister(userData);
      // Optionally auto-login after register, or prompt for login
      // localStorage.setItem('token', data.token);
      // api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      // setUser(data.user);
      setLoading(false);
      return data;
    } catch (err) {
      setAuthError(err.response?.data?.message || 'Registration failed');
      setLoading(false);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, loading, authError }}>
      {children}
    </AuthContext.Provider>
  );
};