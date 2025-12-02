import axios from "axios";
import { useAuthStore } from "@/utils/auth";
import { refreshToken } from "@/services/auth.service";

// Construct baseURL from .env
const BASE = import.meta.env.VITE_BASE_URL || "http://localhost:8081/";
export const baseURL = `${BASE}api/v1`;

// Create Axios instance
const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  timeout: 10000,
});

/* -----------------------------------------------------------
   🔹 ATTACH ACCESS TOKEN BEFORE EVERY REQUEST
----------------------------------------------------------- */
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* -----------------------------------------------------------
   🔹 REFRESH TOKEN HANDLER
----------------------------------------------------------- */

// Prevent multiple refresh calls
let isRefreshing = false;

// Store failed requests temporarily
let failedQueue = [];

/**
 * Add a failed request to queue.
 */
const addToQueue = (cb) => {
  failedQueue.push(cb);
};

/**
 * Resolve all queued requests after token refresh.
 */
const resolveQueue = (newToken) => {
  failedQueue.forEach((cb) => cb(newToken));
  failedQueue = [];
};

/* -----------------------------------------------------------
   🔹 RESPONSE INTERCEPTOR
----------------------------------------------------------- */
api.interceptors.response.use(
  (res) => res,

  async (error) => {
    const original = error.config;
    const is401 = error.response?.status === 401;

    // If not 401 OR already retried, exit
    if (!is401 || original._retry) return Promise.reject(error);

    original._retry = true;

    /* ---------- If a refresh request is already running ---------- */
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        addToQueue((newToken) => {
          if (!newToken) return reject(error);

          original.headers.Authorization = `Bearer ${newToken}`;
          resolve(api(original));
        });
      });
    }

    /* ---------- Start a new refresh token request ---------- */
    isRefreshing = true;

    try {
      const response = await refreshToken(); // MUST return { accessToken }
      const newAccessToken = response?.accessToken;

      if (!newAccessToken) throw new Error("No accessToken returned");

      // Update token in Zustand
      useAuthStore.getState().setAccessToken(newAccessToken);

      // Resume all queued requests
      resolveQueue(newAccessToken);

      // Retry original request
      original.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(original);

    } catch (refreshErr) {
      // Refresh failed → logout user
      resolveQueue(null);
      useAuthStore.getState().logout({ silent: true });
      return Promise.reject(refreshErr);

    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
