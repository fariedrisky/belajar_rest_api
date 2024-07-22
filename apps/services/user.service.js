// Import model Users dari file models/index.js yang berada di level atas
const db = require("../../db/models/index");

// Definisikan objek Users yang merujuk pada model Users yang telah diimport
const Users = db.users;

// Fungsi untuk mendapatkan semua data user
// Fungsi ini mengembalikan Promise yang berisi objek response
// Jika berhasil, response berisi status 200, pesan, dan data user
// Jika gagal, response berisi status 500, pesan, dan error message
exports.getUsers = async () => {
    try {
        // Menggunakan fungsi findAll() dari model Users untuk mendapatkan semua data user
        // Fungsi ini mengembalikan Promise yang berisi array dari objek user
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
// Fungsi ini mengembalikan Promise yang berisi objek response
// Jika berhasil, response berisi status 200, pesan, dan data user yang ditemukan
// Jika gagal, response berisi status 500, pesan, dan error message
exports.getUser = async (user_id) => {
    try {
        // Menggunakan fungsi findOne() dari model Users untuk mendapatkan data user berdasarkan id
        // Fungsi ini mengembalikan Promise yang berisi objek user
        const user = await Users.findOne({
            where: { id: user_id },
        });

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
// Fungsi ini mengembalikan Promise yang berisi objek response
// Jika berhasil, response berisi status 200, pesan, dan data user yang baru ditambahkan
// Jika gagal, response berisi status 500, pesan, dan error message
exports.createUser = async (req) => {
    try {
        // Mengambil nilai dari properti name dan email dari objek body yang dikirimkan melalui request
        const { name, email } = req.body;
        // Menggunakan fungsi create() dari model Users untuk membuat data user baru
        // Fungsi ini mengembalikan Promise yang berisi objek user
        await Users.create({
            name: name,
            email: email,
        });

        // Membuat objek response dengan status 200, pesan, dan data user yang baru ditambahkan
        return {
            status: 200,
            message: "Berhasil menyimpan data user",
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
// Fungsi ini mengembalikan Promise yang berisi objek response
// Jika berhasil, response berisi status 200, pesan, dan data user yang diperbarui
// Jika gagal, response berisi status 500, pesan, dan error message
exports.updateUser = async (req, user_id) => {
    try {
        // Mengambil nilai dari properti name, email, dan address dari objek body yang dikirimkan melalui request
        const { name, email, address } = req.body;
        // Menggunakan fungsi update() dari model Users untuk mengupdate data user berdasarkan id
        // Fungsi ini mengembalikan Promise yang berisi objek user
        await Users.update(
            { name, email, address },
            {
                where: { id: user_id },
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
// Fungsi ini mengembalikan Promise yang berisi objek response
// Jika berhasil, response berisi status 200, pesan, dan data user yang dihapus
// Jika gagal, response berisi status 500, pesan, dan error message
exports.deleteUser = async (req, user_id) => {
    try {
        // Menggunakan fungsi destroy() dari model Users untuk menghapus data user berdasarkan id
        // Fungsi ini mengembalikan Promise yang berisi objek user
        await Users.destroy({
            where: { id: user_id },
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
