import axios from 'axios';
import toast from 'react-hot-toast';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 15000,
});

// Interceptor to attach token to every outgoing request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Response interceptor to handle token expiration (401)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and redirect if not already on login page
      localStorage.removeItem('adminToken');
      if (window.location.pathname !== '/login') {
        toast.error('Session expired. Please log in again.');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default API;
