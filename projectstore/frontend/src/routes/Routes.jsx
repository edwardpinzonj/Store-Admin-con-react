import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import DashboardPage from "../pages/Dashboard";
import NotFoundPage from "../pages/NotFoundPage";
import Register from "../components/users/Register";
// componentes protegidos
import PermissionList from "../components/permissions/PermissionList";
import RolesList from "../components/roles/RoleList";
import UserList from "../components/users/UserList";

//componentes de configuración
import ProtectedRoute from "../config/ProtectedRoute";
import AutoLogout from "../config/AutoLogout";

const RoutesComponent = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route exact path="/" element={<ProtectedRoute />}>
          <Route exact path="/permission" element={<PermissionList />} />
          <Route exact path="/roles" element={<RolesList />} />
          <Route exact path="/users" element={<UserList />} />
          <Route exact path="/dashboard" element={<DashboardPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <AutoLogout />
    </>
  );
};

export default RoutesComponent;
