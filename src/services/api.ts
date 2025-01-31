import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Change this to your API URL when ready
});

// Add a request interceptor for authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (email: string, password: string) => {
    // Mock login for now
    if (email && password) {
      localStorage.setItem('token', 'mock-token');
      return { success: true };
    }
    throw new Error('Invalid credentials');
  },
  logout: () => {
    localStorage.removeItem('token');
  },
};

export default api;