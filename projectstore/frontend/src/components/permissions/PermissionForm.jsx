import React, { useState, useEffect } from "react";
import api from "../../config/api";

const PermissionForm = ({ permissionId, controllers, onClose, onSubmit }) => {
  const [type, setType] = useState("");
  const [controller, setController] = useState("");
  const [actions, setActions] = useState([]);
  const [enabled, setEnabled] = useState(true);
  const [policy, setPolicy] = useState("");

  useEffect(() => {
    if (permissionId) {
      const fetchPermission = async () => {
        try {
          const response = await api.get(`/permissions/${permissionId}`);
          const { type, controller, actions, enabled, policy } = response.data;
          setType(type);
          setController(controller);
          setActions(actions);
          setEnabled(enabled);
          setPolicy(policy);
        } catch (error) {
          console.error(error);
        }
      };

      fetchPermission();
    }
  }, [permissionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const permissionData = {
      type,
      controller,
      actions,
      enabled,
      policy,
    };
    try {
      if (permissionId) {
        await api.put(`/permissions/${permissionId}`, permissionData);
      } else {
        await api.post("/permissions", permissionData);
      }

      onSubmit();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    onClose();
  };
  const handleActionChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setActions(selectedOptions);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
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
          htmlFor="controller"
          className="block text-sm font-medium text-gray-700"
        >
          Controller
        </label>
        <select
          id="controller"
          value={controller}
          onChange={(e) => setController(e.target.value)}
          className="w-full px-4 py-2 mt-2 text-sm border rounded-md"
          required
        >
          <option value="">Select Controller</option>
          {controllers.map((controller) => (
            <option key={controller} value={controller}>
              {controller}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="actions"
          className="block text-sm font-medium text-gray-700"
        >
          Actions
        </label>
        <select
          id="actions"
          value={actions}
          onChange={handleActionChange}
          className="w-full px-4 py-2 mt-2 text-sm border rounded-md"
          multiple
          required
        >
          <option value="read">Read</option>
          <option value="create">Create</option>
          <option value="edit">Edit</option>
          <option value="delete">Delete</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="enabled" className="inline-flex items-center">
          <input
            type="checkbox"
            id="enabled"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <span className="ml-2 text-sm text-gray-700">Enabled</span>
        </label>
      </div>
      <div className="mb-4">
        <label
          htmlFor="policy"
          className="block text-sm font-medium text-gray-700"
        >
          Policy
        </label>
        <input
          type="text"
          id="policy"
          value={policy}
          onChange={(e) => setPolicy(e.target.value)}
          className="w-full px-4 py-2 mt-2 text-sm border rounded-md"
          required
        />
      </div>

      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 ml-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500"
        >
          {permissionId ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default PermissionForm;
