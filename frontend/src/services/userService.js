import api from './api';

// GET user profile
export const getUserProfile = async () => {
  try {
    const response = await api.get('/user/profile');
    return response.data;
  } catch (error) {
    console.error('Get profile failed:', error);
    throw error.response?.data || error.message;
  }
};

// UPDATE user profile
export const updateUserProfile = async (userData) => {
  try {
    const response = await api.put('/user/profile', userData);
    return response.data;
  } catch (error) {
    console.error('Update profile failed:', error);
    throw error.response?.data || error.message;
  }
};

// GET user preferences
export const getUserPreferences = async () => {
  try {
    const response = await api.get('/user/preferences');
    return response.data;
  } catch (error) {
    console.error('Get preferences failed:', error);
    throw error.response?.data || error.message;
  }
};

// UPDATE user preferences
export const updateUserPreferences = async (preferences) => {
  try {
    const response = await api.put('/user/preferences', preferences);
    return response.data;
  } catch (error) {
    console.error('Update preferences failed:', error);
    throw error.response?.data || error.message;
  }
};
