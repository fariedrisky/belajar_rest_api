import sequelize from "../connection.js";
import MataKuliahModel from "../models/mata_kuliah.model.js";
import UserModel from "../models/user.model.js"; // Pastikan path ini benar

// Definisikan model dengan instance sequelize
const MataKuliah = MataKuliahModel(sequelize);
const User = UserModel(sequelize);

export const checkAndResetAutoIncrement = async () => {
    try {
        // Cek dan reset auto-increment pada tabel mata_kuliah
        const matkulCount = await MataKuliah.count();
        if (matkulCount === 0) {
            await sequelize.query("ALTER TABLE mata_kuliah AUTO_INCREMENT = 1");
            console.log("Auto-increment for mata_kuliah has been reset.");
        } else {
            console.log("Table mata_kuliah is not empty.");
        }

        // Cek dan reset auto-increment pada tabel users
        const userCount = await User.count();
        if (userCount === 0) {
            await sequelize.query("ALTER TABLE users AUTO_INCREMENT = 1");
            console.log("Auto-increment for users has been reset.");
        } else {
            console.log("Table users is not empty.");
        }
    } catch (error) {
        console.error("Error checking or resetting auto-increment:", error);
    }
};
