import React, { useState, useEffect } from "react";
import api from "../../config/api";

const RoleForm = ({ role, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [optionsPermissions, setOptionsPermissions] = useState([]);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await api.get("/permissions");
        setOptionsPermissions(response.data.permissions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPermissions();

    if (role) {
      const { name, description, type, permissions } = role;
      setName(name);
      setDescription(description);
      setType(type);
      setPermissions(permissions.map((e) => e._id));
    }
  }, [role]);

  const handleSelectChange = (event) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setPermissions(selectedValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const roleData = {
      name,
      description,
      type,
      permissions,
    };

    try {
      if (role) {
        await api.put(`/roles/${role._id}`, roleData);
      } else {
        await api.post("/roles", roleData);
      }

      onSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 mt-2 text-sm border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 mt-2 text-sm border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="type"
          className="block text-sm font-medium text-gray-700"
        >
          Type
        </label>
        <input
          type="text"
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-4 py-2 mt-2 text-sm border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="permissions"
          className="block text-sm font-medium text-gray-700"
        >
          Permissions
        </label>
        <select
          id="permissions"
          value={permissions}
          onChange={handleSelectChange}
          className="w-full px-4 py-2 mt-2 text-sm border rounded-md"
          required
          multiple
        >
          {Array.isArray(optionsPermissions) &&
            optionsPermissions.map((permission) => (
              <option key={permission._id} value={permission._id}>
                {permission.type}
              </option>
            ))}
        </select>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500"
        >
          {role ? "Update" : "Create"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="ml-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default RoleForm;
