// Import model Users dari file models/index.js yang berada di level atas
import db from "../../db/models/index.js";

// Definisikan objek Users yang merujuk pada model Users yang telah diimport
const Users = db.users;

// Fungsi untuk mendapatkan semua data user
export const getUsers = async () => {
    try {
        // Menggunakan fungsi findAll() dari model Users untuk mendapatkan semua data user
        const users = await Users.findAll();

        // Membuat objek response dengan status 200, pesan, dan data user
        return {
            status: 200,
            message: "Berikut data user secara lengkap",
            data: users,
        };
    } catch (error) {
        // Jika terjadi error, membuat objek response dengan status 500, pesan, dan error message
        return {
            status: 500,
            message: "Gagal mengambil data user",
            error: error.message,
        };
    }
};

// Fungsi untuk mendapatkan data user berdasarkan id
export const getUser = async (id) => {
    try {
        // Menggunakan fungsi findOne() dari model Users untuk mendapatkan data user berdasarkan id
        const user = await Users.findOne({
            where: { id: id },
        });

        // Jika user tidak ditemukan, kirimkan status 404
        if (!user) {
            return {
                status: 404,
                message: "User tidak ditemukan",
            };
        }

        // Membuat objek response dengan status 200, pesan, dan data user yang ditemukan
        return {
            status: 200,
            message: "Berikut data user yang dicari",
            data: user,
        };
    } catch (error) {
        // Jika terjadi error, membuat objek response dengan status 500, pesan, dan error message
        return {
            status: 500,
            message: "Gagal mengambil data user",
            error: error.message,
        };
    }
};

// Fungsi untuk membuat data user baru
export const createUser = async (name, username, email, password) => {
    try {
        // Cek apakah email sudah digunakan
        const cekUser = await Users.findOne({ where: { email: email } });

        if (cekUser) throw new Error("Email sudah digunakan");

        // Menggunakan fungsi create() dari model Users untuk membuat data user baru
        const user = await Users.create({
            name,
            username,
            email,
            password, // Pastikan password sudah di-hash sebelum disimpan
        });

        // Membuat objek response dengan status 201, pesan, dan data user yang baru ditambahkan
        return {
            status: 201,
            message: "Berhasil menyimpan data user",
            data: user,
        };
    } catch (error) {
        // Jika terjadi error, membuat objek response dengan status 500, pesan, dan error message
        return {
            status: 500,
            message: "Gagal membuat user",
            error: error.message,
        };
    }
};

// Fungsi untuk mengupdate data user
export const updateUser = async (
    id,
    name,
    username,
    email,
    password,
    userIdFromToken
) => {
    try {
        // Check if the ID in the request matches the ID from the token
        if (id !== userIdFromToken) {
            return {
                status: 403,
                message: "Tidak diizinkan mengedit data user lain",
            };
        }

        // Cek apakah user dengan id tersebut ada
        const user = await Users.findOne({
            where: { id: id },
        });

        if (!user) {
            return {
                status: 404,
                message: "User tidak ditemukan",
            };
        }

        // Menggunakan fungsi update() dari model Users untuk mengupdate data user berdasarkan id
        await Users.update(
            {
                name,
                username,
                email,
                password, // Hash password jika diubah
            },
            {
                where: { id: id },
            }
        );

        // Membuat objek response dengan status 200, pesan, dan data user yang diperbarui
        return {
            status: 200,
            message: "Berhasil mengedit data user",
        };
    } catch (error) {
        // Jika terjadi error, membuat objek response dengan status 500, pesan, dan error message
        return {
            status: 500,
            message: "Gagal mengedit user",
            error: error.message,
        };
    }
};

// Fungsi untuk menghapus data user
export const deleteUser = async (id, userIdFromToken) => {
    try {
        // Check if the ID in the request matches the ID from the token
        if (id !== userIdFromToken) {
            return {
                status: 403,
                message: "Tidak diizinkan menghapus data user lain",
            };
        }

        // Cek apakah user dengan id tersebut ada
        const user = await Users.findOne({
            where: { id: id },
        });

        if (!user) {
            return {
                status: 404,
                message: "User tidak ditemukan",
            };
        }

        // Menggunakan fungsi destroy() dari model Users untuk menghapus data user berdasarkan id
        await Users.destroy({
            where: { id: id },
        });

        // Membuat objek response dengan status 200, pesan, dan data user yang dihapus
        return {
            status: 200,
            message: "Berhasil menghapus user",
        };
    } catch (error) {
        // Jika terjadi error, membuat objek response dengan status 500, pesan, dan error message
        return {
            status: 500,
            message: "Gagal menghapus user",
            error: error.message,
        };
    }
};
