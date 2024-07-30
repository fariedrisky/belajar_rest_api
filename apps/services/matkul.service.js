import db from "../../db/models/index.js";

const MataKuliah = db.MataKuliah;
const User = db.User;

// Create a new mata kuliah
export const createMatkul = async (userId, namaDosen, nama_matkul) => {
    try {
        // Create the course with initial status 0 (unapproved)
        const newMatkul = await MataKuliah.create({
            dosen_id: userId, // Gunakan userId sebagai dosen_id
            nama_matkul,
            nama_dosen: namaDosen, // Add nama_dosen here
            grade: null, // Initially, no grade assigned
            status: 0, // Default status is unapproved
        });

        // Immediately update the status to 1 (pending)
        await newMatkul.update({ status: 1 });

        return {
            message: "Mata kuliah created successfully",
            data: newMatkul,
        };
    } catch (error) {
        console.error("Error details:", error); // Logging tambahan
        throw new Error("Failed to create mata kuliah");
    }
};

// Update an existing mata kuliah
export const updateMatkul = async (id, dosenId, nama_matkul, grade) => {
    try {
        const matkul = await MataKuliah.findOne({
            where: { id, dosen_id: dosenId, status: 0 }, // Check if status is 0
        });

        if (!matkul) {
            throw new Error("Mata kuliah not found or cannot be edited");
        }

        matkul.nama_matkul = nama_matkul;
        matkul.grade = grade;
        await matkul.save();

        return {
            message: "Mata kuliah updated successfully",
            data: matkul,
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

// Delete a mata kuliah
export const deleteMatkul = async (id, dosenId) => {
    try {
        const matkul = await MataKuliah.findOne({
            where: { id, dosen_id: dosenId, status: 0 }, // Check if status is 0
        });

        if (!matkul) {
            throw new Error("Mata kuliah not found or cannot be deleted");
        }

        await matkul.destroy();

        return { message: "Mata kuliah deleted successfully" };
    } catch (error) {
        throw new Error(error.message);
    }
};

// Submit a mata kuliah for approval
export const submitMatkul = async (id, dosenId) => {
    try {
        const matkul = await MataKuliah.findOne({
            where: { id, dosen_id: dosenId, status: 0 }, // Check if status is 0
        });

        if (!matkul) {
            throw new Error("Mata kuliah not found or already submitted");
        }

        matkul.status = 1; // Mark as pending
        await matkul.save();

        return { message: "Mata kuliah submitted for approval" };
    } catch (error) {
        throw new Error(error.message);
    }
};

// Approve a mata kuliah
export const approveMatkul = async (id) => {
    try {
        const matkul = await MataKuliah.findByPk(id);

        if (!matkul) {
            throw new Error("Mata kuliah not found");
        }

        if (matkul.status !== 1) {
            throw new Error("Mata kuliah is not pending");
        }

        // Update status to approved (2)
        await matkul.update({ status: 2 });

        return {
            message: "Mata kuliah approved successfully",
            data: matkul,
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

export const rejectMatkul = async (id) => {
    try {
        // Cari mata kuliah berdasarkan ID
        const matkul = await MataKuliah.findByPk(id);
        if (!matkul) {
            throw new Error("Mata kuliah not found");
        }

        // Periksa apakah status sudah approved (status: 2), jika sudah maka tidak bisa ditolak
        if (matkul.status === 2) {
            throw new Error("Cannot reject approved mata kuliah");
        }

        // Update status mata kuliah menjadi 3 (rejected)
        await matkul.update({ status: 0 });

        return {
            message: "Mata kuliah rejected successfully",
            data: matkul,
        };
    } catch (error) {
        throw new Error(error.message || "Failed to reject mata kuliah");
    }
};

// Get mata kuliah berdasarkan role pengguna
export const getMatkul = async (role, userId) => {
    let condition = {};

    if (role === 1) {
        // Mahasiswa: hanya melihat mata kuliah dengan status approved (2)
        condition = { status: 2 };
    } else if (role === 2) {
        // Dosen: melihat mata kuliah yang dia ajar
        condition = { dosen_id: userId };
    } else if (role === 3) {
        // Kajur: melihat semua mata kuliah
        condition = {}; // Kosongkan kondisi untuk mendapatkan semua mata kuliah
    } else {
        throw new Error("Access forbidden");
    }

    return await MataKuliah.findAll({
        where: condition,
        include: [
            {
                model: User,
                as: "Dosen",
                attributes: ["name"], // Hanya ambil nama dosen
            },
            {
                model: User,
                as: "Mahasiswas", // Menampilkan mahasiswa yang mengambil mata kuliah
                attributes: ["name"], // Hanya ambil nama mahasiswa
                through: {
                    attributes: [], // Tidak perlu menampilkan kolom dari tabel penghubung
                },
                required: false,
            },
        ],
    });
};

// Add mata kuliah to mahasiswa's enrollment
export const addMatkulForMahasiswa = async (mahasiswaId, mataKuliahId) => {
    // Validate mata kuliah exists and is available
    const mataKuliah = await MataKuliah.findOne({
        where: { id: mataKuliahId, status: 2 },
    });
    if (!mataKuliah) {
        throw new Error("Mata kuliah not found or not available");
    }

    // Check if mahasiswa already enrolled in this mata kuliah
    const existingEnrollment = await mataKuliah.getMahasiswa({
        where: { id: mahasiswaId },
    });
    if (existingEnrollment.length > 0) {
        throw new Error("Mahasiswa already enrolled in this mata kuliah");
    }

    // Enroll mahasiswa in mata kuliah
    await mataKuliah.addMahasiswa(mahasiswaId);

    return { message: "Mata kuliah successfully chosen" };
};

// Update grade for a mata kuliah
export const updateGrade = async (id, dosenId, grade) => {
    try {
        const matkul = await MataKuliah.findOne({
            where: { id, dosen_id: dosenId, status: 2 }, // Only update if status is approved
        });

        if (!matkul) {
            throw new Error("Mata kuliah not found or not approved");
        }

        matkul.grade = grade;
        await matkul.save();

        return {
            message: "Grade updated successfully",
            data: matkul,
        };
    } catch (error) {
        throw new Error(error.message);
    }
};
