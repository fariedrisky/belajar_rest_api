import { DataTypes } from "sequelize";

const EnrollmentModel = (sequelize) => {
    const attributes = {
        mahasiswa_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
        },
        mata_kuliah_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "mata_kuliah",
                key: "id",
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
        tableName: "enrollments",
        timestamps: false,
    };

    const Enrollment = sequelize.define("Enrollment", attributes, options);

    return Enrollment;
};

export default EnrollmentModel;
