import React, { useEffect, useRef, useState } from "react";
import { handleLogout } from "./Logout";

const AutoLogout = () => {
  const timeoutRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const resetTimer = () => {
      // Limpiar el timeout existente (si existe) antes de configurar uno nuevo
      clearTimeout(timeoutRef.current);

      // Configurar un nuevo timeout para cerrar la sesión automáticamente
      timeoutRef.current = setTimeout(() => {
        handleLogout();
        setShowModal(true);
      }, 3 * 60 * 1000);
    };

    const handleActivity = () => {
      resetTimer();
    };

    // Escuchar eventos relevantes para restablecer el temporizador de inactividad
    document.addEventListener("mousedown", handleActivity);
    document.addEventListener("keydown", handleActivity);
    document.addEventListener("touchstart", handleActivity);

    // Iniciar el temporizador cuando el componente se monte
    resetTimer();

    // Limpiar los eventos y el temporizador cuando el componente se desmonte
    return () => {
      document.removeEventListener("mousedown", handleActivity);
      document.removeEventListener("keydown", handleActivity);
      document.removeEventListener("touchstart", handleActivity);
      clearTimeout(timeoutRef.current);
    };
  }, []); // Sin dependencias, se ejecuta solo una vez

  const closeModal = () => {
    setShowModal(false);
    window.location.reload();
    // navigate("/"); // Redirigir al usuario a la página principal ("/")
  };

  return (
    <>
      {showModal && (
        <>
          <div className="modal-overlay" style={overlayStyle}></div>
          <div className="modal" style={modalStyle}>
            <div className="modal-content">
              <h3>Sesión finalizada por inactividad</h3>
              <button onClick={closeModal}>Aceptar</button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "#fff",
  padding: "20px",
  borderRadius: "5px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  zIndex: 9999,
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.5)",
  zIndex: 9998,
};

export default AutoLogout;
