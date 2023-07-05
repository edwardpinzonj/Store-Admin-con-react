import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // Reemplaza con la URL de tu backend
});

// Obtener el token de autorización del almacenamiento local (localStorage)
const getToken = () => {
  const token = localStorage.getItem("token");
  return token ? `Bearer ${token}` : "";
};

const getUserId = () => {
  const userId = localStorage.getItem("userId");
  return userId || "";
};
// Agregar el token de autorización a los encabezados de las solicitudes
api.interceptors.request.use((config) => {
  config.headers.Authorization = getToken();
  config.headers.userId = getUserId();
  return config;
});

export default api;
