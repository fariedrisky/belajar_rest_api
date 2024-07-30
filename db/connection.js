import { Sequelize } from "sequelize";
import configFile from "./config/config.js";

// Get environment settings
const env = process.env.NODE_ENV || "development";
const config = configFile[env];

// Create and export the Sequelize instance
const sequelize = config.use_env_variable
    ? new Sequelize(process.env[config.use_env_variable], config)
    : new Sequelize(config.database, config.username, config.password, config);

export default sequelize;
