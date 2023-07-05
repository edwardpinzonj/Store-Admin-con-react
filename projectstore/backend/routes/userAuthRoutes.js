const express = require("express");
const router = express.Router();
const userAuthController = require("../controllers/userAuthController");

router.post("/", userAuthController.createUser);
router.get("/", userAuthController.getUsers);
router.post("/login", userAuthController.login);
router.post("/logout", userAuthController.logout);

module.exports = router;
