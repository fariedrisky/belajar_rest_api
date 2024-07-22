const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/", userController.getUsers);

router.post("/create", userController.createUser);

router.put("/edit/:id", userController.editUser);

router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
