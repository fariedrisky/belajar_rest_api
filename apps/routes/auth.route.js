// Import modul express
import express from "express";

// Import controller dari file auth.controller.js di direktori ../controllers
import * as authController from "../controllers/auth.controller.js";

// Buat router baru menggunakan express
const router = express.Router();

// Rute untuk registrasi
router.post("/register", authController.register);

// Rute untuk login
router.post("/login", authController.login);

// Export router agar dapat diakses di file lain
export default router;
