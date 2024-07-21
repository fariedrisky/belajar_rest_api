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
