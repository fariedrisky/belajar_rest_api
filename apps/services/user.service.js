import db from "../../db/models/index.js";

const Users = db.User;

console.log("Loaded models:", Object.keys(db));

if (Users) {
    console.log("User model is loaded correctly.");
} else {
    console.error("User model failed to load.");
}

// Fungsi untuk mendapatkan semua data user
export const getUsers = async () => {
    try {
        const users = await Users.findAll();
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

// Fungsi untuk mendapatkan data user berdasarkan id
export const getUser = async (id) => {
    try {
        const user = await Users.findOne({
            where: { id: id },
        });

        if (!user) {
            return {
                status: 404,
                message: "User tidak ditemukan",
            };
        }

        return {
            status: 200,
            message: "Berikut data user yang dicari",
            data: user,
        };
    } catch (error) {
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
        const cekUser = await Users.findOne({ where: { email: email } });

        if (cekUser) throw new Error("Email sudah digunakan");

        const user = await Users.create({
            name,
            username,
            email,
            password, // Pastikan password sudah di-hash sebelum disimpan
        });

        return {
            status: 201,
            message: "Berhasil menyimpan data user",
            data: user,
        };
    } catch (error) {
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
        if (id !== userIdFromToken) {
            return {
                status: 403,
                message: "Tidak diizinkan mengedit data user lain",
            };
        }

        const user = await Users.findOne({
            where: { id: id },
        });

        if (!user) {
            return {
                status: 404,
                message: "User tidak ditemukan",
            };
        }

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

// Fungsi untuk menghapus data user
export const deleteUser = async (id, userIdFromToken) => {
    try {
        if (id !== userIdFromToken) {
            return {
                status: 403,
                message: "Tidak diizinkan menghapus data user lain",
            };
        }

        const user = await Users.findOne({
            where: { id: id },
        });

        if (!user) {
            return {
                status: 404,
                message: "User tidak ditemukan",
            };
        }

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
