import jwt from "jsonwebtoken";
import { secretKey, expiresIn } from "../config/config.js";

// Fungsi untuk membuat token JWT
export function generateToken(payload, expiresInParam = expiresIn) {
    return jwt.sign(payload, secretKey, { expiresIn: expiresInParam });
}

// Fungsi untuk memverifikasi token JWT dari header req
export function verifyToken(token) {
    try {
        // Decode dan verifikasi token
        const decoded = jwt.verify(token, secretKey);
        return decoded; // Mengembalikan payload jika token valid
    } catch (error) {
        throw new Error("Invalid Token");
    }
}
