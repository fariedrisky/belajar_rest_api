// Memanggil modul express untuk membuat aplikasi web
const express = require("express");

// Memanggil modul dotenv untuk mengambil nilai dari file .env
const dotenv = require("dotenv");

// Memanggil modul cors untuk mengatur header CORS
const cors = require("cors");

// Memanggil modul cookie-parser untuk mengatur penanganan cookie
const cookieParser = require("cookie-parser");

// Memanggil modul routes untuk mengatur perutean request
const userRoutes = require("./apps/routes/user.route");
const authRoutes = require("./apps/routes/auth.route"); // Menambahkan rute auth

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
app.use("/api/users", userRoutes); // Hapus middleware autentikasi dulu

// Mengaktifkan listener pada port dan menampilkan informasi tentang port dan environment yang digunakan
module.exports = app.listen(port, () => {
    process.stdout.write(`Port Aktif : ${port} \n`);
    process.stdout.write(`Environment : ${NODE_ENV} \n`);
});
