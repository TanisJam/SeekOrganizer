/**
 * Axios instance configured for the application's API requests.
 *
 * @remarks
 * This instance is pre-configured with:
 * - Base URL set to '/api'
 * - Default Content-Type header set to 'application/json'
 * - Request interceptor for JWT token injection
 * - Response interceptor for handling 401 unauthorized responses
 *
 * @example
 * ```typescript
 * import api from './api';
 *
 * // Make an authenticated API request
 * const response = await api.get('/users');
 * ```
 *
 * @throws {Error} Redirects to '/login' when receiving a 401 unauthorized response
 *
 * @module ApiService
 */
import axios from 'axios';
import { AuthService } from './auth.service';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(AuthService.TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(AuthService.TOKEN_KEY);
      window.location.replace('/login');
    }
    return Promise.reject(error);
  }
);

export default api;
