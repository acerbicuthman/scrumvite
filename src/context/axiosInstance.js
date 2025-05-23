import axios from 'axios';
import { base_url } from '../library/api';

const axiosInstance = axios.create({
  baseURL: base_url,
});

// Add access token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle expired tokens
axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (
      err.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem('refreshToken');
        const res = await axios.post(`${base_url}api/token/refresh/`, {
          refresh,
        });

        const newAccess = res.data.access;

        localStorage.setItem('accessToken', newAccess);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccess}`; // ✅ GLOBAL
        originalRequest.headers.Authorization = `Bearer ${newAccess}`; // ✅ REQUEST

        return axiosInstance(originalRequest); // ✅ RETURN
      } catch (refreshError) {
        console.error('Refresh token failed', refreshError);
        localStorage.clear();
        window.location.href = '/signin';
        return Promise.reject(refreshError); // ✅ RETURN ERROR
      }
    }

    return Promise.reject(err);
  }
);

export default axiosInstance;
