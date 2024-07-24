const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

// Rute untuk registrasi
router.post("/register", authController.register);

// Rute untuk login
router.post("/login", authController.login);

module.exports = router;
