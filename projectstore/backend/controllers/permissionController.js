const Permission = require("../models/Permission");
const fs = require("fs");
const path = require("path");

function getFilesWithoutExtensions(folderPath) {
  try {
    // Leer los archivos de la carpeta
    const files = fs.readdirSync(folderPath);

    // Filtrar los archivos para obtener solo los nombres sin extensiones
    const fileNamesWithoutExtensions = files.map(
      (file) => path.parse(file).name
    );

    return fileNamesWithoutExtensions;
  } catch (error) {
    console.error("Error al leer los archivos de la carpeta:", error);
    return [];
  }
}

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
    // Ejemplo de uso
    const folderPath = "./backend/controllers";
    const controllers = getFilesWithoutExtensions(folderPath);
    res.status(200).json({ permissions, controllers });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los permisos" });
  }
};

const getPermissionById = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await Permission.findById(id);
    if (!permission) {
      return res.status(404).json({ error: "Permiso no encontrado" });
    }
    res.status(200).json(permission);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el permiso" });
  }
};

const updatePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPermission = await Permission.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedPermission) {
      return res.status(404).json({ error: "Permiso no encontrado" });
    }
    res.status(200).json(updatedPermission);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el permiso" });
  }
};

const deletePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPermission = await Permission.findByIdAndDelete(id);
    if (!deletedPermission) {
      return res.status(404).json({ error: "Permiso no encontrado" });
    }
    res.status(200).json(deletedPermission);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el permiso" });
  }
};

module.exports = {
  createPermission,
  getPermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
};
