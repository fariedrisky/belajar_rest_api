// models/user.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
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

    const options = {
        tableName: "users",
        timestamps: false,
    };

    return sequelize.define("users", attributes, options);
};
