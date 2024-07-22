// Memanggil modul express untuk membuat aplikasi web
const express = require("express");

// Menggunakan middleware untuk menangani request GET, POST, PUT, dan DELETE
// Tambahkan komentar untuk menjelaskan apa yang dilakukan oleh middleware ini
// app.use('/', (req, res)=>{
// res.send('Hello World')
// })

// Menambahkan middleware untuk menangani request GET
// app.get("/", (req, res) => {
//     res.send("Hai aku method GET");
// });

// // Menambahkan middleware untuk menangani request POST
// app.post("/", (req, res) => {
//     res.send("Hai aku method POST");
// });

// // Menambahkan middleware untuk menangani request PUT
// app.put("/", (req, res) => {
//     res.send("Hai aku method PUT");
// });

// // Menambahkan middleware untuk menangani request DELETE
// app.delete("/", (req, res) => {
//     res.send("Hai aku method DELETE");
// });

// Menerapkan listener pada port 3000 dan menampilkan pesan bahwa server sudah berjalan
// app.listen(3000, () => {
//     console.log("Server running on port: 3000");
// });

// Memanggil modul fs untuk bekerja dengan file system
const fs = require("fs");

// Memanggil modul path untuk bekerja dengan jalan file
const path = require("path");

// Memanggil modul dotenv untuk mengambil nilai dari file .env
const dotenv = require("dotenv");

// Memanggil modul cors untuk mengatur header CORS
const cors = require("cors");

// Memanggil modul cookie-parser untuk mengatur penanganan cookie
const cookieParser = require("cookie-parser");

// Memanggil modul routes untuk mengatur perutean request
const userRoutes = require("./apps/routes/user.route");

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

// Menambahkan middleware untuk menangani request GET pada path root
app.get("/", (req, res) => {
    res.send("Selamat datang di API saya");
});

// Menambahkan middleware untuk menangani request pada path /users
app.use("/users", userRoutes);

// Mengaktifkan listener pada port dan menampilkan informasi tentang port dan environment yang digunakan
module.exports = app.listen(port, () => {
    process.stdout.write(`Port Aktif : ${port} \n`);
    process.stdout.write(`Environment : ${NODE_ENV} \n`);
});
