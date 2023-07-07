import React from "react";
import api from "./api";

export const handleLogout = async () => {
  console.log("Logout");
  try {
    await api.post("/auth/logout");
    console.log("Fin de la sesión automática");
  } catch (error) {
    console.log("Error en el cierre de sesión automático", error);
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
  }
};
