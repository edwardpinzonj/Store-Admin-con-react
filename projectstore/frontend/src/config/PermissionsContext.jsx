import React, { createContext, useContext } from "react";
import AccessDenied from "../pages/AccessDenied"; // Importa el componente de acceso denegado

const PermissionsContext = createContext([]);

export const usePermissions = () => useContext(PermissionsContext);

const PermissionsProvider = ({ children, allowedRoles, componentName }) => {
  const userRole = JSON.parse(localStorage.getItem("role"));
  const allowedActions = userRole.permissions
    .filter((f) => f.controller === componentName)
    .map((m) => [...m.actions])
    .flat();

  const allowed =
    allowedRoles.includes(userRole._id) &&
    userRole.permissions.some((p) => p.controller === componentName);

  return allowed ? (
    <PermissionsContext.Provider value={allowedActions}>
      {children}
    </PermissionsContext.Provider>
  ) : (
    <AccessDenied />
  );
};

export default PermissionsProvider;
