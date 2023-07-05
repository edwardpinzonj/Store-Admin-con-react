const Role = require("../models/Role");

const createRole = async (req, res) => {
  try {
    const role = new Role(req.body);
    await role.save();
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el rol" });
  }
};

const getRoles = async (req, res) => {
  try {
    const roles = await Role.find().populate("permissions");
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los roles" });
  }
};

const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findById(id).populate("permissions");
    if (!role) {
      return res.status(404).json({ error: "Rol no encontrado" });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el rol" });
  }
};

const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRole = await Role.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("permissions");
    if (!updatedRole) {
      return res.status(404).json({ error: "Rol no encontrado" });
    }
    res.status(200).json(updatedRole);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el rol" });
  }
};

const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRole = await Role.findByIdAndDelete(id);
    if (!deletedRole) {
      return res.status(404).json({ error: "Rol no encontrado" });
    }
    res.status(200).json(deletedRole);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el rol" });
  }
};

module.exports = {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
};
