const express = require("express");
const router = express.Router();
const productCategoryController = require("../controllers/productCategoryController");

router.post("/", productCategoryController.createProductCategory);
router.get("/", productCategoryController.getProductCategories);
router.get(
  "/:productCategoryId",
  productCategoryController.getProductCategoryById
);
router.put(
  "/:productCategoryId",
  productCategoryController.updateProductCategory
);
router.delete(
  "/:productCategoryId",
  productCategoryController.deleteProductCategory
);

module.exports = router;
