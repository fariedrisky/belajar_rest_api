// services/auth.service.js
const bcrypt = require("bcrypt");
const jwt = require("../utilities/jwt");
const db = require("../../db/models/index"); // Sesuaikan dengan struktur Anda

const Users = db.users;

// Register a new user
const registerUser = async (name, username, email, password) => {
    try {
        // Hash password with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new user
        const newUser = await Users.create({
            name,
            username,
            email,
            password: hashedPassword,
        });

        return {
            message: "User registered successfully",
            userId: newUser.id,
        };
    } catch (error) {
        throw new Error("Registration failed: " + error.message);
    }
};

// Login a user
const loginUser = async (email, password) => {
    try {
        // Find user by email
        const user = await Users.findOne({ where: { email } });

        if (!user) {
            throw new Error("Invalid credentials");
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            throw new Error("Invalid credentials");
        }

        // Generate JWT
        const token = jwt.generateToken({ userId: user.id });

        return { message: "Login successful", token };
    } catch (error) {
        throw new Error("Login failed: " + error.message);
    }
};

module.exports = { registerUser, loginUser };
