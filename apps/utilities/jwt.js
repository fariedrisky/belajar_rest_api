// Mengimpor modul jsonwebtoken
const jwt = require("jsonwebtoken");
// Mengimpor konfigurasi dari config
const config = require("../config/config");

// Fungsi untuk membuat token JWT
function generateToken(payload, expiresIn = config.expiresIn) {
    // Menggunakan secretKey dari config untuk menandatangani token
    return jwt.sign(payload, config.secretKey, { expiresIn });
}

// Fungsi untuk memverifikasi token JWT
function verifyToken(token) {
    try {
        // Menggunakan secretKey dari config untuk memverifikasi token
        return jwt.verify(token, config.secretKey);
    } catch (error) {
        // Mengembalikan null jika verifikasi gagal
        return null;
    }
}

// Fungsi untuk mendecode token JWT tanpa verifikasi
function decodeToken(token) {
    return jwt.decode(token, { complete: true });
}

// Mengekspor fungsi-fungsi untuk digunakan di tempat lain dalam aplikasi
module.exports = {
    generateToken,
    verifyToken,
    decodeToken,
};
