// Import user service
import * as userService from "../services/user.service.js";

// Controller untuk mendapatkan semua data user
export const getUsers = async (req, res) => {
    try {
        const response = await userService.getUsers();
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat mengambil data user",
            error: error.message,
        });
    }
};

// Controller untuk mendapatkan data user berdasarkan id
export const getUser = async (req, res) => {
    try {
        const { id } = req.params; // Mengambil id dari URL parameter
        const response = await userService.getUser(id);
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat mengambil data user",
            error: error.message,
        });
    }
};

// Controller untuk membuat data user baru
export const createUser = async (req, res) => {
    try {
        // Mengambil properti dari req.body menggunakan destructuring
        const { name, username, email, password } = req.body;

        // Memanggil fungsi createUser dari service dengan parameter yang sudah di-destructuring
        const response = await userService.createUser(
            name,
            username,
            email,
            password
        );

        // Mengirimkan response ke client
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat membuat user",
            error: error.message,
        });
    }
};

// Controller untuk mengupdate data user
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params; // Mengambil id dari URL parameter
        const { name, username, email, password } = req.body; // Mengambil properti dari req.body

        // Memanggil fungsi updateUser dari service dengan parameter yang sudah di-destructuring
        const response = await userService.updateUser(
            id,
            name,
            username,
            email,
            password
        );

        // Mengirimkan response ke client
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat mengedit user",
            error: error.message,
        });
    }
};

// Controller untuk menghapus data user
export const deleteUser = async (req, res) => {
    try {
        const id = Number(req.params.id); // Mengambil id dari URL parameter
        console.log("exports.deleteUser ~ id:", id, typeof id);

        const userIdFromToken = req.user.id;

        // Memanggil fungsi deleteUser dari service dengan id user
        const response = await userService.deleteUser(id, userIdFromToken);

        // Mengirimkan response ke client
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan saat menghapus user",
            error: error.message,
        });
    }
};
