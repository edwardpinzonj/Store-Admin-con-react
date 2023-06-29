const Permission = require("../models/Permission");

const createPermission = async (req, res) => {
  try {
    const permission = new Permission(req.body);
    await permission.save();
    res.status(201).json(permission);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el permiso" });
  }
};

const getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los permisos" });
  }
};

module.exports = {
  createPermission,
  getPermissions,
};
