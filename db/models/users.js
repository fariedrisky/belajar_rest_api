// models/UserModel.js

import { DataTypes } from "sequelize";

const UserModel = (sequelize) => {
    // Define model attributes
    const attributes = {
        id: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                notContains: " ",
            },
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE(),
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE(),
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    };

    // Define model options
    const options = {
        tableName: "users",
        timestamps: false,
    };

    // Define the model
    const User = sequelize.define("User", attributes, options);

    return User;
};

export default UserModel;
