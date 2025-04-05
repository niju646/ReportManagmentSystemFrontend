

// src/utils/api.ts
import axios from "axios";
import { type NotificationReport, type Message } from "../types";

const API_URL = "http://localhost:3001/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const { data } = await axios.post(`${API_URL}/refresh`, { refreshToken });
        localStorage.setItem("accessToken", data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const logout = async (refreshToken: string) => {
  const response = await api.post("/logout", { refreshToken });
  return response.data;
};

export const getReport = async (notificationId: number) => {
  const response = await api.get(`/report/${notificationId}`);
  return response.data;
};

export const getSummary = async () => {
  const response = await api.get("/summary");
  return response.data;
};

export const getMessage = async (notificationId: number, recipient: string): Promise<Message> => {
  const response = await api.get(`/message/${notificationId}/${encodeURIComponent(recipient)}`);
  if (response.data.success) {
    return response.data.data as Message;
  } else {
    throw new Error(response.data.error || "Failed to fetch message");
  }
};

export default api;