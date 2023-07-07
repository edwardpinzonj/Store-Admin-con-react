const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const permissionRoutes = require("./permissionRoutes");
const rolesRoutes = require("./rolesRoutes");
const userRoutes = require("./userRoutes");
const productBrandRoutes = require("./productBrandRoutes");
const productCategoryRoutes = require("./productCategoryRoutes");
const productRoutes = require("./productRoutes");

router.use("/permissions", permissionRoutes);
router.use("/roles", rolesRoutes);
router.use("/users", userRoutes);
// Middleware para el registro de solicitudes de ruta

router.use("/product-brands", productBrandRoutes);
router.use("/product-categories", productCategoryRoutes);

const cpUpload = upload.fields([
  { name: "pictures", maxCount: 7 },
  { name: "smPictures", maxCount: 7 },
]);
router.use("/products", cpUpload, productRoutes);
module.exports = router;
