import React, { useState, useEffect } from "react";
import api from "../../config/api";
import RoleForm from "./RoleForm";
import ConfirmationModal from "../ConfirmationModal";

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await api.get("/roles");
      setRoles(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const openCreateForm = () => {
    setSelectedRole(null);
    setIsFormOpen(true);
  };

  const openEditForm = (role) => {
    setSelectedRole(role);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const openConfirmationModal = (role) => {
    setSelectedRole(role);
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const deleteRole = async () => {
    try {
      await api.delete(`/roles/${selectedRole._id}`);
      setIsConfirmationModalOpen(false);
      fetchRoles();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRoleSubmit = async () => {
    setIsFormOpen(false);
    fetchRoles();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Roles</h1>

      <button
        onClick={openCreateForm}
        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500"
      >
        Add Role
      </button>

      <table className="mt-4 w-full">
        <thead>
          <tr>
            <th className="py-2">Identificador</th>
            <th className="py-2">Name</th>
            <th className="py-2">Description</th>
            <th className="py-2">Type</th>
            <th className="py-2">Permissions</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role._id}>
              <td className="py-2">{role._id}</td>
              <td className="py-2">{role.name}</td>
              <td className="py-2">{role.description}</td>
              <td className="py-2">{role.type}</td>
              <td className="py-2">
                <ul>
                  {role.permissions.map((permission) => (
                    <li key={permission._id}>
                      <span className="mr-2">{permission.type}</span>
                    </li>
                  ))}
                </ul>
              </td>
              <td className="py-2">
                <button
                  onClick={() => openEditForm(role)}
                  className="px-2 py-1 text-sm font-medium text-indigo-600 rounded-md hover:bg-indigo-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => openConfirmationModal(role)}
                  className="px-2 py-1 ml-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-100"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-75 bg-gray-900">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Permission Form</h2>
              <button
                onClick={closeForm}
                className="px-2 py-1 text-sm font-medium text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
            </div>
            <RoleForm
              role={selectedRole}
              onClose={closeForm}
              onSubmit={handleRoleSubmit}
            />
          </div>
        </div>
      )}

      {isConfirmationModalOpen && (
        <ConfirmationModal
          message="Are you sure you want to delete this Role?"
          onConfirm={deleteRole}
          onCancel={closeConfirmationModal}
        />
      )}
    </div>
  );
};

export default RoleList;
