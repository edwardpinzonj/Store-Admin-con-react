const express = require("express");
const router = express.Router();
const rolesController = require("../controllers/rolesController");

router.post("/", rolesController.createRole);
router.get("/", rolesController.getRoles);
router.get("/:id", rolesController.getRoleById);
router.put("/:id", rolesController.updateRole);
router.delete("/:id", rolesController.deleteRole);

module.exports = router;
