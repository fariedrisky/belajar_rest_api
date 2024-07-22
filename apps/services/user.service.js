const db = require("../../db/models/index");

const Users = db.users;

//exports.getUsers = async (params) => {
//    try {
//        return {
//            status: 200,
//            data: {
//                name: "Muhammad Faried Risky",
//                email: "fariedrisky@gmail.com",
//                address: "Meunasah Krueng",
//            },
//        };
//    } catch (error) {
//        return {
//            status: 500,
//            message: "Gagal mengambil data user",
//            error: error.message,
//        };
//    }
//};
exports.getUsers = async () => {
    try {
        // Mengambil semua pengguna dari database
        const users = await Users.findAll();

        // Menyusun respons dengan data pengguna
        return {
            status: 200,
            message: "Berikut data user secara lengkap",
            data: users,
        };
    } catch (error) {
        return {
            status: 500,
            message: "Gagal mengambil data user",
            error: error.message,
        };
    }
};

exports.createUser = async (req) => {
    try {
        const { name, email } = req.body;
        await Users.create({
            name: name,
            email: email,
        });

        return {
            status: 200,
            message: "Berhasil menyimpan data user",
        };
    } catch (error) {
        return {
            status: 500,
            message: "Gagal membuat user",
            error: error.message,
        };
    }
};

exports.editUser = async (req) => {
    try {
        const { id } = req.params;
        const { name, email, address } = req.body;
        await Users.update(
            { name, email, address },
            {
                where: { id: id },
            }
        );

        return {
            status: 200,
            message: "Berhasil mengedit data user",
        };
    } catch (error) {
        return {
            status: 500,
            message: "Gagal mengedit user",
            error: error.message,
        };
    }
};

exports.deleteUser = async (req) => {
    try {
        const { id } = req.params;
        await Users.destroy({
            where: { id: id },
        });

        return {
            status: 200,
            message: "Berhasil menghapus user",
        };
    } catch (error) {
        return {
            status: 500,
            message: "Gagal menghapus user",
            error: error.message,
        };
    }
};
