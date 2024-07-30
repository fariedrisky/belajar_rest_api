// Import modul yang diperlukan menggunakan sintaks ES Modules
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import rute dan utilitas
import userRoutes from "./apps/routes/user.route.js";
import authRoutes from "./apps/routes/auth.route.js"; // Menambahkan rute auth
import matkulRoutes from "./apps/routes/matkul.route.js"; // Menambahkan rute auth
import { authenticateJWT } from "./apps/middleware/auth.middleware.js";
import { checkAndResetAutoIncrement } from "./db/utils/resetAutoIncrement.js";

// Mengaktifkan penggunaan nilai dari file .env
dotenv.config();

// Membuat objek aplikasi express
const app = express();

// Mengatur port default jika tidak ada nilai dari variabel PORT
const port = process.env.PORT || 3000;

// Mengambil nilai dari variabel NODE_ENV
const { NODE_ENV } = process.env;

// Mengaktifkan middleware cors
app.use(cors());

// Mengaktifkan middleware json untuk mengolah request dengan format JSON
app.use(express.json());

// Mengaktifkan middleware cookie-parser untuk mengolah request dengan cookie
app.use(cookieParser());

// Mengaktifkan middleware urlencoded untuk mengolah request dengan format URL
app.use(express.urlencoded({ extended: false }));

// Mengaktifkan middleware static untuk mengaktifkan penyediaan file statis
app.use(express.static("public"));

// Menambahkan rute untuk autentikasi
app.use("/api/auth", authRoutes); // Menggunakan authRoutes untuk autentikasi

// Menambahkan middleware untuk menangani request GET pada path root
app.get("/", (req, res) => {
    res.send("Selamat datang di API saya");
});

// Menambahkan middleware untuk menangani request pada path /users dengan proteksi JWT
app.use("/api/users", authenticateJWT, userRoutes); // Hapus middleware autentikasi dulu

// Menambahkan rute untuk autentikasi
app.use("/api/matkul", authenticateJWT, matkulRoutes); // Menggunakan authRoutes untuk autentikasi

// Mengaktifkan listener pada port dan menampilkan informasi tentang port dan environment yang digunakan
app.listen(port, () => {
    // Panggil fungsi untuk memeriksa dan mereset auto-increment
    checkAndResetAutoIncrement();
    process.stdout.write(`Port Aktif : ${port} \n`);
    process.stdout.write(`Environment : ${NODE_ENV} \n`);
});
