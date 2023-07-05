import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../config/api";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar si hay una sesión activa al cargar la vista
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", { email, password });

      if (response.status === 200) {
        // Inicio de sesión exitoso, guardar token en el almacenamiento local
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("role", JSON.stringify(user.role));
        localStorage.setItem("userId", user._id);
        setIsLoggedIn(true);

        // Redirigir al panel de control (dashboard)
        navigate("/dashboard");
      } else {
        setError("Credenciales incorrectas. Inténtalo de nuevo.");
      }
    } catch (error) {
      setError("Error al iniciar sesión. Inténtalo de nuevo.");
    }
  };

  const handleLogout = () => {
    // Limpiar el token del almacenamiento local y establecer isLoggedIn en falso
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return (
      <div className="container mx-auto mt-4">
        <h1 className="text-2xl font-bold mb-4">Sesión activa</h1>
        <button
          className="bg-red-500 text-white rounded px-4 py-2"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4">Inicio de sesión</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-semibold">
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2"
        >
          Iniciar sesión
        </button>
      </form>
      <p className="mt-4">
        ¿No tienes una cuenta?{" "}
        <Link to="/register" className="text-blue-500">
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
};

export default Login;
