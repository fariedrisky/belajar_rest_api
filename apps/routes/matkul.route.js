import express from "express";
import * as matkulController from "../controllers/matkul.controller.js";
import { authorizeRole } from "../middleware/auth.middleware.js";

const router = express.Router();

// Rute untuk membuat mata kuliah
router.post(
    "/create",
    authorizeRole(2), // Hanya dosen yang dapat membuat mata kuliah
    matkulController.createMatkul
);

// Rute untuk memperbarui mata kuliah
router.put(
    "/update/:id",
    authorizeRole(2), // Hanya dosen yang dapat memperbarui mata kuliah
    matkulController.updateMatkul
);

// Rute untuk menghapus mata kuliah
router.delete(
    "/:id",
    authorizeRole(2), // Hanya dosen yang dapat menghapus mata kuliah
    matkulController.deleteMatkul
);

// Rute untuk mengajukan mata kuliah untuk persetujuan
router.post(
    "/:id/submit",
    authorizeRole(2), // Hanya dosen yang dapat mengajukan mata kuliah
    matkulController.submitMatkul
);

// Rute untuk menyetujui mata kuliah
router.put(
    "/:id/approve",
    authorizeRole(3), // Hanya kajur yang dapat menyetujui mata kuliah
    matkulController.approveMatkul
);

// Rute untuk menolak mata kuliah
router.patch(
    "/:id/reject",
    authorizeRole(3), // Hanya kajur yang dapat menolak mata kuliah
    matkulController.rejectMatkul
);

// Rute untuk mendapatkan mata kuliah berdasarkan role
router.get(
    "/",
    authorizeRole(1, 2, 3), // Mahasiswa, dosen, dan kajur dapat mengakses data mata kuliah
    matkulController.getMatkul
);

// Route to get mata kuliah that mahasiswa can choose
router.post(
    "/choose",
    authorizeRole(1), // Only allow mahasiswa
    matkulController.addMatkul
);

// Rute untuk memperbarui grade mata kuliah
router.patch(
    "/:id/grade",
    authorizeRole(2), // Hanya dosen yang dapat memperbarui grade
    matkulController.updateGrade
);

export default router;
