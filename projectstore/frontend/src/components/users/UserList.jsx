import React, { useState, useEffect } from "react";
import api from "../../config/api";
import PermissionsProvider, {
  usePermissions,
} from "../../config/PermissionsContext"; // Importa el componente PermissionsProvider y el hook usePermissions

import UserForm from "./UserForm";
import ConfirmationModal from "../ConfirmationModal";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [roles, setRoles] = useState([]);
  const allowedActions = usePermissions();
  const [isAllowed, setIsAllowed] = useState({
    create: allowedActions.includes("create"),
    edit: allowedActions.includes("edit"),
    delete: allowedActions.includes("delete"),
  });

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await api.get("/roles");
      setRoles(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const openCreateForm = () => {
    setSelectedUser(null);
    setIsFormOpen(true);
  };

  const openEditForm = (user) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setSelectedUser(null);
    setIsFormOpen(false);
  };

  const openConfirmationModal = (user) => {
    setSelectedUser(user);
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setSelectedUser(null);
    setIsConfirmationModalOpen(false);
  };

  const deleteUser = async () => {
    try {
      await api.delete(`/users/${selectedUser._id}`);
      setIsConfirmationModalOpen(false);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserSubmit = async () => {
    setIsFormOpen(false);
    fetchUsers();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">User Management</h1>

      <button
        onClick={openCreateForm}
        disabled={!isAllowed.create}
        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500"
      >
        Add User
      </button>

      <table className="mt-4 w-full">
        <thead>
          <tr>
            <th className="py-2">Username</th>
            <th className="py-2">Email</th>
            <th className="py-2">Role</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const userRole = roles.find((role) => role._id === user.role);
            const roleName = userRole ? userRole.name : "";

            return (
              <tr key={user._id}>
                <td className="py-2">{user.username}</td>
                <td className="py-2">{user.email}</td>
                <td className="py-2">{roleName}</td>
                <td className="py-2">
                  <button
                    onClick={() => openEditForm(user)}
                    className="px-2 py-1 text-sm font-medium text-indigo-600 rounded-md hover:bg-indigo-100"
                    disabled={!isAllowed.edit}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openConfirmationModal(user)}
                    className="px-2 py-1 ml-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-100"
                    disabled={!isAllowed.delete}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-75 bg-gray-900">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {selectedUser ? "Edit User" : "Create User"}
              </h2>
              <button
                onClick={closeForm}
                className="px-2 py-1 text-sm font-medium text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
            </div>
            <UserForm
              user={selectedUser}
              roles={roles}
              onClose={closeForm}
              onSubmit={handleUserSubmit}
            />
          </div>
        </div>
      )}

      {isConfirmationModalOpen && (
        <ConfirmationModal
          message="Are you sure you want to delete this user?"
          onConfirm={deleteUser}
          onCancel={closeConfirmationModal}
        />
      )}
    </div>
  );
};

const allowedRoles = ["64a37341c4818f516bc4eb04", "64a2f13587ce9a8f529ff289"];
const componentName = "userController";

const UserManagementWithPermissions = () => (
  <PermissionsProvider
    allowedRoles={allowedRoles}
    componentName={componentName}
  >
    <UserManagement />
  </PermissionsProvider>
);

export default UserManagementWithPermissions;
