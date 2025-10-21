import axios from "axios";

// You can configure your base URL using .env
// Example: VITE_API_URL=http://localhost:5000/api
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5200/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add interceptors (for token injection or error handling)
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
