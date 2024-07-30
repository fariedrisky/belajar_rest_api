// Import auth service
import * as authService from "../services/auth.service.js";

// Fungsi untuk registrasi pengguna baru
export const register = async (req, res) => {
    const { name, username, email, password } = req.body;

    try {
        const result = await authService.registerUser(
            name, // Menyertakan name
            username,
            email,
            password
        );
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Fungsi untuk login
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await authService.loginUser(email, password);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message,
        });
    }
};
