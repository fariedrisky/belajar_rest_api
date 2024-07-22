// file ini berisi fungsi untuk mengatur operasi CRUD pada resource user

// import service dari file user.service.js
const UserServices = require("../services/user.service");

// export fungsi untuk mendapatkan semua data user dari service
exports.getUsers = async (req, res) => {
    try {
        // memanggil fungsi getUsers dari user.service.js dan menyimpannya pada variabel response
        const response = await UserServices.getUsers();
        // mengirimkan response dengan status 200 (success) berupa json
        res.status(200).json(response);
    } catch (error) {
        // jika terjadi error, mengirimkan response dengan status 500 (internal server error) berupa json
        res.status(500).json({
            status: 500,
            message: "Gagal mengambil data user",
            error: error.message,
        });
    }
};

// export fungsi untuk mendapatkan data user berdasarkan id dari service
exports.getUser = async (req, res) => {
    try {
        // mengambil id dari parameter request dan menyimpannya pada variabel user_id
        const { user_id } = req.params;
        // memanggil fungsi getUser dari user.service.js dengan parameter user_id dan menyimpannya pada variabel response
        const response = await UserServices.getUser(user_id);
        // mengirimkan response dengan status 200 (success) berupa json
        res.status(200).json(response);
    } catch (error) {
        // jika terjadi error, mengirimkan response dengan status 500 (internal server error) berupa json
        res.status(500).json({
            status: 500,
            message: "Gagal mengambil data user",
            error: error.message,
        });
    }
};

// export fungsi untuk membuat data user baru dari service
exports.createUser = async (req, res) => {
    try {
        // memanggil fungsi createUser dari user.service.js dengan parameter req dan menyimpannya pada variabel response
        const response = await UserServices.createUser(req);
        // mengirimkan response dengan status 200 (success) berupa json
        res.status(200).json(response);
    } catch (error) {
        // jika terjadi error, mengirimkan response dengan status 500 (internal server error) berupa json
        res.status(500).json({
            status: 500,
            message: "Gagal membuat user",
            error: error.message,
        });
    }
};

// export fungsi untuk mengupdate data user berdasarkan id dari service
exports.updateUser = async (req, res) => {
    try {
        // mengambil id dari parameter request dan menyimpannya pada variabel user_id
        const { user_id } = req.params;
        // memanggil fungsi updateUser dari user.service.js dengan parameter req dan user_id dan menyimpannya pada variabel response
        const response = await UserServices.updateUser(req, user_id);
        // mengirimkan response dengan status 200 (success) berupa json
        res.status(200).json(response);
    } catch (error) {
        // jika terjadi error, mengirimkan response dengan status 500 (internal server error) berupa json
        res.status(500).json({
            status: 500,
            message: "Gagal mengedit user",
            error: error.message,
        });
    }
};

// export fungsi untuk menghapus data user berdasarkan id dari service
exports.deleteUser = async (req, res) => {
    try {
        // mengambil id dari parameter request dan menyimpannya pada variabel user_id
        const { user_id } = req.params;
        // memanggil fungsi deleteUser dari user.service.js dengan parameter req dan user_id dan menyimpannya pada variabel response
        const response = await UserServices.deleteUser(req, user_id);
        // mengirimkan response dengan status 200 (success) berupa json
        res.status(200).json(response);
    } catch (error) {
        // jika terjadi error, mengirimkan response dengan status 500 (internal server error) berupa json
        res.status(500).json({
            status: 500,
            message: "Gagal menghapus user",
            error: error.message,
        });
    }
};
