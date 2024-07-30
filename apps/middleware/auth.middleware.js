import { verifyToken } from "../utilities/jwt.js";

// Middleware untuk autentikasi JWT
export const authenticateJWT = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Bearer Token Not Found",
        });
    }

    const token = authorizationHeader.split(" ")[1];

    try {
        // Memverifikasi token dan menambahkan informasi pengguna ke req.user
        req.user = verifyToken(token); // decode token dan simpan di req.user
        next(); // Pass control to the next middleware or route
    } catch (error) {
        return res.status(401).json({
            message: error.message,
        });
    }
};

// Middleware untuk memverifikasi peran pengguna
// Middleware untuk memverifikasi peran pengguna
export const authorizeRole = (...roles) => {
    return (req, res, next) => {
        const role = req.user.role;
        console.log("User Role:", role);
        console.log("Allowed Roles:", roles); // Log untuk debug

        // Memetakan peran numerik ke deskripsi
        const roleDescriptions = {
            1: "Mahasiswa",
            2: "Dosen",
            3: "Kajur",
        };

        // Cek apakah peran pengguna termasuk dalam daftar peran yang diperbolehkan
        if (!roles.includes(role)) {
            const allowedRolesDescriptions = roles
                .map((r) => roleDescriptions[r])
                .join(", ");
            return res.status(403).json({
                message: `Access forbidden: User role ${roleDescriptions[role]} is not allowed. Allowed roles: ${allowedRolesDescriptions}.`,
            });
        }

        next();
    };
};
