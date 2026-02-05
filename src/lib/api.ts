import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // Important: Send cookies with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token to headers
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only redirect to login if:
    // 1. It's a 401 error
    // 2. We're not already on the login/register/password reset pages
    // 3. It's not an auth-related request itself
    if (error.response?.status === 401) {
      const isAuthPage = typeof window !== 'undefined' && 
        (window.location.pathname.includes('/login') || 
         window.location.pathname.includes('/register') ||
         window.location.pathname.includes('/verify-email') ||
         window.location.pathname.includes('/forgot-password') ||
         window.location.pathname.includes('/reset-password'));
      
      const isAuthRequest = error.config?.url?.includes('/auth/login') || 
                           error.config?.url?.includes('/auth/register') ||
                           error.config?.url?.includes('/auth/forgot-password') ||
                           error.config?.url?.includes('/auth/reset-password');
      
      // Only redirect if not on auth pages and not an auth request
      if (!isAuthPage && !isAuthRequest && typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
