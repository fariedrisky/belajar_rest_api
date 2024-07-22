// Ini adalah file route untuk resource user

// Mengimpor modul express
const express = require("express");

// Membuat router baru menggunakan express
const router = express.Router(); // Router() adalah function

// Mengimpor controller dari file user.controller.js di direktori ../controllers
const userController = require("../controllers/user.controller");

// Mengimpor validasi dari file user.validation.js di direktori ../validations
const userValidation = require("../validations/user.validation");

// Menambahkan route GET untuk mendapatkan semua data user
// Menggunakan fungsi getUsers dari user.controller.js
router.get("/", userController.getUsers);

// Menambahkan route GET untuk mendapatkan data user berdasarkan id
// Menggunakan fungsi getUser dari user.controller.js
router.get("/:user_id", userController.getUser);

/* Menambahkan route POST untuk membuat data user baru
   Parameter pertama adalah validasi data menggunakan userValidation.createUser
   Parameter kedua adalah fungsi yang akan dieksekusi jika data valid
   Menggunakan fungsi createUser dari user.controller.js */
router.post("/create", userValidation.createUser, userController.createUser);

/* Menambahkan route PUT untuk mengupdate data user berdasarkan id
   Parameter pertama adalah fungsi yang akan dieksekusi jika data valid
   Menggunakan fungsi updateUser dari user.controller.js */
router.put("/update/:user_id", userController.updateUser);

/* Menambahkan route DELETE untuk menghapus data user berdasarkan id
   Parameter pertama adalah fungsi yang akan dieksekusi jika data valid
   Menggunakan fungsi deleteUser dari user.controller.js */
router.delete("/delete/:user_id", userController.deleteUser);

// Mengexport router agar dapat diakses di file lain
module.exports = router;

/*
const express = require("express");
const userController = require("../controllers/user.controller");

module.exports = express.Router()
    .get("/", userController.getUsers)
    .post("/create", userController.createUser)
    .put("/edit/:id", userController.editUser)
    .delete("/delete/:id", userController.deleteUser);
Dalam pendekatan ini, express.Router() dipanggil dan metode chaining digunakan untuk mendefinisikan beberapa rute, 
kemudian hasilnya langsung diekspor. 
Pastikan bahwa rute-rute dan controller yang digunakan sudah benar dan sesuai dengan yang diharapkan.

*/
