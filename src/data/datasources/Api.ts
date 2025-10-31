import { Urls } from "../../utils/const";
import axios from "axios";

const API_BASE_URL = Urls.base;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour ajouter le token d'accès
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Intercepteur pour gérer le rafraîchissement du token si 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refresh_token")
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        const userId = localStorage.getItem("userId");
        const response = await axios.post(`${API_BASE_URL}api/auth/refresh`, {
          refreshToken,
          userId,
          type: "admin"
        });

        const newAccessToken = response.data.accessToken;
        localStorage.setItem("access_token", newAccessToken);

        // Réessaye la requête originale avec le nouveau token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Erreur de rafraîchissement du token :", refreshError);
        // Rediriger vers la page de login
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("userId");
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;