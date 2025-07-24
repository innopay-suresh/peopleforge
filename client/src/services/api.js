import axios from 'axios';
import { getAccessToken, setAccessToken } from './authTokenStore';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(null, async (error) => {
  const original = error.config;
  if (error.response && error.response.status === 401 && !original._retry) {
    original._retry = true;
    try {
      const res = await axios.post('http://localhost:8000/refresh-token', {}, { withCredentials: true });
      setAccessToken(res.data.access_token);
      original.headers.Authorization = `Bearer ${res.data.access_token}`;
      return api(original);
    } catch {
      window.location.href = '/login';
    }
  }
  return Promise.reject(error);
});

export default api;
