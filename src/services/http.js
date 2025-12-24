import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 20000,
});

// Si después agregás JWT, acá lo enchufás:
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

http.interceptors.response.use(
  (r) => r,
  (e) => {
    // Manejo básico
    if (e?.response?.status === 401) {
      // localStorage.removeItem("access_token");
      // window.location.href = "/login";
    }
    return Promise.reject(e);
  }
);

export default http;
