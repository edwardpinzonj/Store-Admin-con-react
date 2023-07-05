import React, { useState, useEffect } from "react";
import api from "../../config/api";
import PermissionForm from "./PermissionForm";
import ConfirmationModal from "../ConfirmationModal";

const PermissionList = () => {
  const [permissions, setPermissions] = useState([]);
  const [selectedPermission, setSelectedPermission] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [controllers, setControllers] = useState([]);

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      const response = await api.get("/permissions");
      setPermissions(response.data.permissions);
      setControllers(response.data.controllers);
    } catch (error) {
      console.error(error);
    }
  };

  const openCreateForm = () => {
    setSelectedPermission(null);
    setIsFormOpen(true);
  };

  const openEditForm = (permission) => {
    setSelectedPermission(permission);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setSelectedPermission(null);
    setIsFormOpen(false);
  };

  const openConfirmationModal = (permission) => {
    setSelectedPermission(permission);
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const deletePermission = async () => {
    try {
      await api.delete(`/permissions/${selectedPermission._id}`);
      setIsConfirmationModalOpen(false);
      fetchPermissions();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Permissions</h1>

      <button
        onClick={openCreateForm}
        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500"
      >
        Add Permission
      </button>

      <table className="mt-4 w-full">
        <thead>
          <tr>
            <th className="py-2">Type</th>
            <th className="py-2">Controller</th>
            <th className="py-2">Actions</th>
            <th className="py-2">Enabled</th>
            <th className="py-2">Policy</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission) => (
            <tr key={permission._id}>
              <td className="py-2">{permission.type}</td>
              <td className="py-2">{permission.controller}</td>
              <td className="py-2">
                <ul className="list-disc list-inside">
                  {permission.actions.map((action) => (
                    <li key={action}>{action}</li>
                  ))}
                </ul>
              </td>
              <td className="py-2">
                <span
                  className={
                    permission.enabled ? "text-green-600" : "text-red-600"
                  }
                >
                  {permission.enabled ? "On" : "Off"}
                </span>
              </td>
              <td className="py-2">{permission.policy}</td>
              <td className="py-2">
                <button
                  onClick={() => openEditForm(permission)}
                  className="px-2 py-1 text-sm font-medium text-indigo-600 rounded-md hover:bg-indigo-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => openConfirmationModal(permission)}
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
            <PermissionForm
              permissionId={selectedPermission?._id}
              controllers={controllers}
              onClose={closeForm}
              onSubmit={fetchPermissions}
            />
          </div>
        </div>
      )}

      {isConfirmationModalOpen && (
        <ConfirmationModal
          message="Are you sure you want to delete this permission?"
          onConfirm={deletePermission}
          onCancel={closeConfirmationModal}
        />
      )}
    </div>
  );
};

export default PermissionList;
