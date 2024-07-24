require("dotenv").config();

module.exports = {
    secretKey: process.env.JWT_SECRET || "your-default-secret-key",
    expiresIn: "1h", // Token expiration time
};
