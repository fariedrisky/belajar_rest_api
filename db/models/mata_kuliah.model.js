import { DataTypes } from "sequelize";

const MataKuliahModel = (sequelize) => {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        dosen_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users", // Refers to the "users" table
                key: "id",
            },
        },
        nama_matkul: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nama_dosen: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        grade: {
            type: DataTypes.ENUM("A", "AB", "B", "BC", "C", "D", "E"),
            allowNull: true,
        },
        status: {
            type: DataTypes.INTEGER, // 0 = belum approve, 1 = pending, 2 = approved
            allowNull: false,
            defaultValue: 0,
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
        tableName: "mata_kuliah",
        timestamps: false,
    };

    const MataKuliah = sequelize.define("MataKuliah", attributes, options);

    MataKuliah.associate = (models) => {
        MataKuliah.belongsTo(models.User, {
            foreignKey: "dosen_id",
            as: "Dosen",
        });
        MataKuliah.belongsToMany(models.User, {
            through: "Enrollments", // Tabel penghubung
            foreignKey: "mata_kuliah_id",
            as: "Mahasiswa", // Alias untuk mahasiswa yang mengambil mata kuliah
        });
    };

    return MataKuliah;
};

export default MataKuliahModel;
