// Mengimpor objek DataTypes dari sequelize
const { DataTypes } = require("sequelize");

// Membuat fungsi export yang mengembalikan objek model users
module.exports = (sequelize) => {
    // Membuat objek attributes yang berisi definisi kolom pada tabel users
    const attributes = {
        // Kolom id dengan tipe data INTEGER(10), tidak boleh kosong,
        // tidak memiliki nilai default, dan berfungsi sebagai primary key dan auto increment
        id: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            defaultValue: null,
            primaryKey: true,
            autoIncrement: true,
            comment: null,
            field: "id",
        },
        // Kolom name dengan tipe data STRING(), tidak boleh kosong
        name: {
            type: DataTypes.STRING(),
            field: "name",
        },
        // Kolom email dengan tipe data STRING(255), boleh kosong
        email: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: "email",
        },
        // Kolom created_at dengan tipe data DATE(), tidak boleh kosong,
        // tidak memiliki komentar, dan memiliki nilai default saat ini
        created_at: {
            type: DataTypes.DATE(),
            allowNull: false,
            comment: null,
            defaultValue: DataTypes.NOW,
            field: "created_at",
        },
        // Kolom updated_at dengan tipe data DATE(), tidak boleh kosong,
        // tidak memiliki nilai default
        updated_at: {
            type: DataTypes.DATE(),
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: "updated_at",
        },
    };

    // Membuat objek options yang berisi konfigurasi tambahan pada model users
    const options = {
        // Menentukan nama tabel yang akan digunakan
        tableName: "users",
        // Menentukan komentar pada tabel
        comment: "",
        // Menentukan indeks pada tabel
        indexes: [],
        // Menentukan apakah model users akan menggunakan time stamps
        timestamps: false,
    };

    // Membuat model users menggunakan metode define dari sequelize,
    // dengan nama model "users", attributes, dan options
    return sequelize.define("users", attributes, options);
};
