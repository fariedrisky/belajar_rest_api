// Import modul express
import express from "express";

// Buat router baru menggunakan express
const router = express.Router();

// Import controller dari file user.controller.js di direktori ../controllers
import * as userController from "../controllers/user.controller.js";

// Import validasi dari file user.validation.js di direktori ../validations
import * as userValidation from "../validations/user.validation.js";

// Tambahkan route GET untuk mendapatkan semua data user
router.get("/", userController.getUsers);

// Tambahkan route GET untuk mendapatkan data user berdasarkan id
router.get("/:id", userController.getUser);

// Tambahkan route POST untuk membuat data user baru
router.post("/create", userValidation.createUser, userController.createUser);

// Tambahkan route PUT untuk mengupdate data user berdasarkan id
router.put("/update/:id", userController.updateUser);

// Tambahkan route DELETE untuk menghapus data user berdasarkan id
router.delete("/delete/:id", userController.deleteUser);

// Export router agar dapat diakses di file lain
export default router;
