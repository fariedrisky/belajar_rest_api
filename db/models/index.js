import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import sequelize from "../connection.js";
import { Sequelize } from "sequelize";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = {};

// Read and import all model files from the 'models' directory
const modelFiles = fs.readdirSync(__dirname).filter((file) => {
    return (
        file.indexOf(".") !== 0 &&
        file !== "index.js" &&
        file.slice(-3) === ".js"
    );
});

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

export default db;
