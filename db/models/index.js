"use strict";

// Memanggil modul-modul yang diperlukan untuk membuat koneksi ke database
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");

// Mendapatkan informasi tentang file ini
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";

// Mendapatkan konfigurasi untuk koneksi ke database
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;

// Jika ada variabel lingkungan yang digunakan untuk koneksi ke database
if (config.use_env_variable) {
    // Membuat koneksi ke database menggunakan nilai dari variabel lingkungan
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    // Membuat koneksi ke database menggunakan nilai yang didefinisikan di file konfigurasi
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );
}

// Membaca semua file di direktori models yang memiliki ekstensi .js
fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js" &&
            file.indexOf(".test.js") === -1
        );
    })
    // Membuat instance dari setiap model dan menyimpannya di dalam objek db
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes
        );
        db[model.name] = model;
    });

// Melakukan asosiasi antara model dengan satu model lainnya
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// Menyimpan referensi ke objek Sequelize pada objek db
db.sequelize = sequelize;

// Menyimpan objek db dan mengexportnya agar dapat digunakan di bagian lain dari aplikasi
module.exports = db;
