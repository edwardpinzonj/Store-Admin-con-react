const express = require("express");
const router = express.Router();
const productBrandController = require("../controllers/productBrandController");

router.post("/", productBrandController.createProductBrand);
router.get("/", productBrandController.getProductBrands);
router.get("/:productBrandId", productBrandController.getProductBrandById);
router.put("/:productBrandId", productBrandController.updateProductBrand);
router.delete("/:productBrandId", productBrandController.deleteProductBrand);

module.exports = router;
