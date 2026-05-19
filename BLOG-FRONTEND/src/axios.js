import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://blog-app-1-kny9.onrender.com',
  withCredentials: true,
});

export default api;
