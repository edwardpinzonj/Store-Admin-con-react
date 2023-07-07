const express = require("express");
const router = express.Router();
const productBrandController = require("../controllers/productBrandController");

// const logRouteRequests = (req, res, next) => {
//   console.log(`Solicitud recibida para la ruta: ${req.originalUrl}`);
//   next();
// };

//router.use(logRouteRequests);
router.post("/", productBrandController.createProductBrand);
router.get("/", productBrandController.getProductBrands);
router.get("/count-products", productBrandController.getCountProductByBrands);
router.get("/:productBrandId", productBrandController.getProductBrandById);
router.put("/:productBrandId", productBrandController.updateProductBrand);
router.delete("/:productBrandId", productBrandController.deleteProductBrand);

module.exports = router;
