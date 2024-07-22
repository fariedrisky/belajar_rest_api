const UserServices = require("../services/user.service");

exports.getUsers = async (req, res) => {
    try {
        const response = await UserServices.getUsers();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Gagal mengambil data user",
            error: error.message,
        });
    }
};

exports.createUser = async (req, res) => {
    try {
        const response = await UserServices.createUser(req);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Gagal membuat user",
            error: error.message,
        });
    }
};

exports.editUser = async (req, res) => {
    try {
        const response = await UserServices.editUser(req);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Gagal mengedit user",
            error: error.message,
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const response = await UserServices.deleteUser(req);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Gagal menghapus user",
            error: error.message,
        });
    }
};
