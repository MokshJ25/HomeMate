// frontend/src/utils/api.js
import axios from 'axios';

const base = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

const api = axios.create({ baseURL: base });

// attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
