// Mengimpor fungsi validationResult dari express-validator untuk memvalidasi data request
const { validationResult } = require("express-validator");

// Membuat fungsi validate yang akan dipanggil di file route untuk memvalidasi data request
// Parameter validations adalah array yang berisi validasi-validasi yang akan dieksekusi
module.exports.validate = (validations) => async (req, res, next) => {
    // Memanggil fungsi map pada array validations dan memanggil fungsi run pada setiap validasi
    // dengan parameter req, untuk memvalidasi data request
    await Promise.all(validations.map((validation) => validation.run(req)));

    // Mengambil hasil validasi dari req menggunakan fungsi validationResult
    const errors = validationResult(req);

    // Jika ada error pada validasi, maka mengirimkan response dengan status 400 (bad request)
    // dengan pesan error yang diambil dari array errors
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            error: errors.array()[0].msg,
        });
    }

    // Jika tidak ada error, maka melanjutkan ke middleware berikutnya menggunakan next()
    next();
};
