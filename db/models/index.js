"use strict";

// Mengimpor modul-modul yang diperlukan untuk membuat koneksi ke database
import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import process from "process";

// Mendapatkan informasi tentang file ini
const basename = path.basename(new URL(import.meta.url).pathname);
const env = process.env.NODE_ENV || "development";

// Mengimpor konfigurasi untuk koneksi ke database
import configFile from "../config/config.js";
const config = configFile[env];
const db = {};

// Mendeklarasikan variabel sequelize
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
fs.readdirSync(new URL(".", import.meta.url).pathname)
    .filter((file) => {
        return (
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js" &&
            file.indexOf(".test.js") === -1
        );
    })
    // Membuat instance dari setiap model dan menyimpannya di dalam objek db
    .forEach(async (file) => {
        const { default: modelImport } = await import(
            path.join(__dirname, file)
        );
        const model = modelImport(sequelize, Sequelize.DataTypes);
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

// Mengekspor objek db agar dapat digunakan di bagian lain dari aplikasi
export default db;
