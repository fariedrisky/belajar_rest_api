// config/config.js
import dotenv from "dotenv";

dotenv.config();

export const secretKey =
    process.env.JWT_SECRET_KEY || "your-default-secret-key";
export const expiresIn = "1h"; // Token expiration time
