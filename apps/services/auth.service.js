import bcrypt from "bcryptjs";
import { generateToken } from "../utilities/jwt.js";
import db from "../../db/models/index.js";

const Users = db.User;

// Register a new user
export const registerUser = async (name, username, email, password, role) => {
    try {
        // Validate role input (should be 1, 2, or 3 as integers)
        if (![1, 2, 3].includes(role)) {
            throw new Error("Invalid role");
        }

        // Hash password with bcryptjs
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new user
        const newUser = await Users.create({
            name,
            username,
            email,
            password: hashedPassword,
            role: role, // Store role as an integer
        });

        return {
            message: "User registered successfully",
            userId: newUser.id,
        };
    } catch (error) {
        throw {
            status: 500,
            message: "Registration failed",
            error: error.message,
        };
    }
};

// Login a user
export const loginUser = async (email, password) => {
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

        const payload = {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role, // Include role in the payload if needed
        };
        console.log("loginUser ~ payload.name:", payload.name);
        // Generate JWT
        const token = generateToken(payload);

        return {
            message: "Login successful",
            token,
            name: user.name,
            role: user.role,
        };
    } catch (error) {
        throw {
            status: 500,
            message: "Login failed",
            error: error.message,
        };
    }
};
