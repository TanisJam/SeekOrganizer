import axios from 'axios';
import { AuthService } from './auth.service';
import { redirect } from 'next/navigation';

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
      redirect('/login');
    }
    return Promise.reject(error);
  }
);

export default api;
