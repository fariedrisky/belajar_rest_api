// Mengimpor modul body dari express-validator
const { body } = require("express-validator");

// Mengimpor fungsi validate dari file ../utilities/validator
const { validate } = require("../utilities/validator");

// Mendefinisikan fungsi createUser dengan parameter validasi
// Parameter validasi berupa array yang berisi validasi untuk field "name"
exports.createUser = validate([
    // Membuat validasi untuk field "name" dengan method notEmpty()
    // Jika field "name" kosong, pesan error akan "Nama tidak boleh kosong."
    body("name").notEmpty().withMessage("Nama tidak boleh kosong."),
]);

