// Mengimpor modul jsonwebtoken
import jwt from "jsonwebtoken";
// Mengimpor konfigurasi dari config
import config from "../config/config.js";

// Fungsi untuk membuat token JWT
export function generateToken(payload, expiresIn = config.expiresIn) {
    // Menggunakan secretKey dari config untuk menandatangani token
    return jwt.sign(payload, config.secretKey, { expiresIn });
}

// Fungsi untuk memverifikasi token JWT dari header req
export function verifyToken(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Bearer Token Not Found",
        });
    }

    const token = authorizationHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, config.secretKey);
        req.user = decoded; // Attach user info to the request
        next(); // Pass control to the next middleware or route
    } catch (error) {
        return res.status(401).json({
            message: "Invalid Token",
        });
    }
}
