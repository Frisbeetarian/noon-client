// src/utils/axiosInstance.ts
import axios from 'axios';
import store from '../store/store';
import { rateLimitDetected, resetRateLimit } from '../store/ui';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Adjusted for Vite
  withCredentials: true,
});

// Add interceptors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('Axios error:', error.response);

    if (error.response && error.response.status === 429) {
      store.dispatch(
        rateLimitDetected({
          isRateLimited: true,
          message: error.response.data.error,
          retryAfter: error.response.data.retryAfter,
          refresh: new Date().getTime(),
        })
      );
    } else {
      store.dispatch(resetRateLimit());
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
