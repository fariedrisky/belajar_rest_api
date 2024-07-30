"use strict";

// Import necessary modules for database connection
import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import { fileURLToPath, pathToFileURL } from "url"; // Import pathToFileURL

// Get the current file name and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get environment settings
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";

// Import database configuration
import configFile from "../config/config.js";
const config = configFile[env];
const db = {};

// Declare sequelize variable
let sequelize;

// Create a sequelize instance using environment variables or config
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );
}

// Read all model files in the current directory and import them
const modelFiles = fs.readdirSync(__dirname).filter((file) => {
    return (
        file.indexOf(".") !== 0 && // Exclude hidden files
        file !== basename && // Exclude the current file
        file.slice(-3) === ".js" && // Include only .js files
        file.indexOf(".test.js") === -1 // Exclude test files
    );
});

// Import each model using pathToFileURL
for (const file of modelFiles) {
    const modelPath = path.join(__dirname, file);
    const modelUrl = pathToFileURL(modelPath).href;

    try {
        const modelImport = await import(modelUrl);
        const model = modelImport.default(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
        console.log(`Loaded model: ${model.name}`);
    } catch (error) {
        console.error(`Failed to import model ${file}:`, error.message);
    }
}

// Set associations between models
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// Store a reference to the sequelize instance
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Debugging: Print loaded models
console.log("Loaded models:", Object.keys(db));

// Export the db object for use in other parts of the application
export default db;
