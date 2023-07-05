import React, { useState, useEffect } from "react";
import api from "../../config/api";

const UserForm = ({ user, roles, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    provider: "",
    password: "",
    confirmed: false,
    blocked: false,
    role: "",
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { ...formData };

      if (user) {
        await api.put(`/users/${user._id}`, newUser);
      } else {
        await api.post("/users", newUser);
      }

      onSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="username" className="block mb-2 text-sm font-medium">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="provider" className="block mb-2 text-sm font-medium">
          Provider
        </label>
        <input
          type="text"
          id="provider"
          name="provider"
          value={formData.provider}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-2 text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="confirmed"
            name="confirmed"
            checked={formData.confirmed}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label htmlFor="confirmed" className="text-sm font-medium">
            Confirmed
          </label>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="blocked"
            name="blocked"
            checked={formData.blocked}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label htmlFor="blocked" className="text-sm font-medium">
            Blocked
          </label>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="role" className="block mb-2 text-sm font-medium">
          Role
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role._id} value={role._id}>
              {role.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500"
        >
          {user ? "Update" : "Create"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 ml-2 text-sm font-medium text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserForm;
