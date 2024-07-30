// Import modul jwt dari file ../utilities/jwt.js
import { verifyToken } from "../utilities/jwt.js";

// Middleware untuk autentikasi JWT
export const authenticateJWT = (req, res, next) => {
    const token =
        req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access token is missing" });
    }

    try {
        const decoded = verifyToken(token);

        if (!decoded) {
            return res.status(403).json({ message: "Invalid token" });
        }

        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({
            message: "Invalid token",
            error: error.message,
        });
    }
};
