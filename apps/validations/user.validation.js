// Mengimpor modul body dari express-validator
import { body } from "express-validator";

// Mengimpor fungsi validate dari file ../utilities/validator
import { validate } from "../utilities/validator.js";

// Mengimpor model Users dari file models/index.js
import db from "../../db/models/index.js";
const Users = db.users;

// Mendefinisikan fungsi createUser dengan parameter validasi
// Parameter validasi berupa array yang berisi validasi untuk field "name"
export const createUser = validate([
    // Membuat validasi untuk field "name" dengan method notEmpty()
    // Jika field "name" kosong, pesan error akan "Nama tidak boleh kosong."
    body("name").notEmpty().withMessage("Nama tidak boleh kosong."),

    // Validasi untuk field "username"
    body("username")
        .notEmpty()
        .withMessage("Username tidak boleh kosong.")
        .isLength({ min: 3 })
        .withMessage("Username harus memiliki minimal 3 karakter.")
        .custom(async (value) => {
            // Cek apakah username sudah digunakan
            const user = await Users.findOne({
                where: { username: value },
            });
            if (user) {
                return Promise.reject("Username sudah digunakan");
            }
        }),

    // Validasi untuk field "email"
    body("email")
        .notEmpty()
        .withMessage("Email tidak boleh kosong")
        .isEmail()
        .withMessage("Email tidak valid")
        .custom(async (value) => {
            // Cek apakah email sudah digunakan
            const user = await Users.findOne({
                where: { email: value },
            });
            if (user) {
                return Promise.reject("Email sudah digunakan");
            }
        }),

    // Validasi untuk field "password"
    body("password").notEmpty().withMessage("Password tidak boleh kosong"),
]);
