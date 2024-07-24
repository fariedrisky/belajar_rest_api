const jwt = require("../utilities/jwt");

const authenticateJWT = (req, res, next) => {
    const token =
        req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access token is missing" });
    }

    try {
        const decoded = jwt.verifyToken(token);

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

module.exports = authenticateJWT;
