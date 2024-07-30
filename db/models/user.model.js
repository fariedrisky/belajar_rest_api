import { DataTypes } from "sequelize";

const UserModel = (sequelize) => {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
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
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 3,
            validate: {
                isIn: [[1, 2, 3]], // 1 = kajur, 2 = dosen, 3 = mahasiswa
            },
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    };

    const options = {
        tableName: "users",
        timestamps: false,
    };

    const User = sequelize.define("User", attributes, options);

    User.associate = (models) => {
        User.hasMany(models.MataKuliah, {
            foreignKey: "dosen_id",
            as: "MataKuliahDosen",
        });
        User.belongsToMany(models.MataKuliah, {
            through: "Enrollments", // Tabel penghbung
            foreignKey: "mahasiswa_id",
            as: "MataKuliahMahasiswa", // Alias untuk mata kuliah yang diambil oleh mahasiswa
        });
    };

    return User;
};

export default UserModel;
