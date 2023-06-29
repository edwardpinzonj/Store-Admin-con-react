const express = require("express");
const router = express.Router();
const permissionRoutes = require("./permissionRoutes");
const userRoutes = require("./userRoutes");
const productBrandRoutes = require("./productBrandRoutes");
const productCategoryRoutes = require("./productCategoryRoutes");
const productRoutes = require("./productRoutes");

router.use("/permissions", permissionRoutes);
router.use("/users", userRoutes);
router.use("/product-brands", productBrandRoutes);
router.use("/product-categories", productCategoryRoutes);
router.use("/products", productRoutes);

module.exports = router;
