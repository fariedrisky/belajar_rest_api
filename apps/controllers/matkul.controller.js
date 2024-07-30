import * as matkulService from "../services/matkul.service.js";

// Create a new mata kuliah
export const createMatkul = async (req, res) => {
    const { nama_matkul } = req.body;
    const { role, id: userId, name: namaDosen } = req.user;

    if (role !== 2) {
        return res
            .status(403)
            .json({ message: "Access forbidden: Not a dosen" });
    }

    try {
        const result = await matkulService.createMatkul(
            userId,
            namaDosen,
            nama_matkul
        );
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an existing mata kuliah
export const updateMatkul = async (req, res) => {
    const { id } = req.params;
    const { nama_matkul, grade } = req.body;
    const { role, id: userId } = req.user;

    if (role !== 2) {
        return res.status(403).json({ message: "Access forbidden" });
    }

    try {
        const result = await matkulService.updateMatkul(
            id,
            userId,
            nama_matkul,
            grade
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a mata kuliah
export const deleteMatkul = async (req, res) => {
    const { id } = req.params;
    const { role, id: userId } = req.user;

    if (role !== 2) {
        return res.status(403).json({ message: "Access forbidden" });
    }

    try {
        const result = await matkulService.deleteMatkul(id, userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Submit a mata kuliah for approval
export const submitMatkul = async (req, res) => {
    const { id } = req.params;
    const { role, id: userId } = req.user;

    if (role !== 2) {
        return res.status(403).json({ message: "Access forbidden" });
    }

    try {
        const result = await matkulService.submitMatkul(id, userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Approve a mata kuliah
export const approveMatkul = async (req, res) => {
    const { id } = req.params;
    const { role } = req.user;

    if (role !== 3) {
        return res
            .status(403)
            .json({ message: "Access forbidden: Not a kajur" });
    }

    try {
        const result = await matkulService.approveMatkul(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Reject a mata kuliah
export const rejectMatkul = async (req, res) => {
    const { id } = req.params;
    const { role } = req.user;

    if (role !== 3) {
        return res
            .status(403)
            .json({ message: "Access forbidden: Not a kajur" });
    }

    try {
        const result = await matkulService.rejectMatkul(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get mata kuliah berdasarkan role pengguna
export const getMatkul = async (req, res) => {
    const { role, id: userId } = req.user;

    try {
        const result = await matkulService.getMatkul(role, userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add mata kuliah to mahasiswa's enrollment
export const addMatkul = async (req, res) => {
    const { mata_kuliah_id } = req.body;
    const { id: mahasiswaId } = req.user;

    if (!mata_kuliah_id) {
        return res.status(400).json({ message: "Mata kuliah ID is required" });
    }

    try {
        const result = await matkulService.addMatkulForMahasiswa(
            mahasiswaId,
            mata_kuliah_id
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get mata kuliah that mahasiswa can choose
export const getMatkulToChoose = async (req, res) => {
    const { role, id: userId } = req.user;

    if (role !== 1) {
        return res
            .status(403)
            .json({ message: "Access forbidden: Not a mahasiswa" });
    }

    try {
        const result = await matkulService.getMatkulToChoose(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update grade for a mata kuliah
export const updateGrade = async (req, res) => {
    const { id } = req.params;
    const { grade } = req.body;
    const { role, id: dosenId } = req.user;

    if (role !== 2) {
        return res.status(403).json({ message: "Access forbidden" });
    }

    try {
        const result = await matkulService.updateGrade(id, dosenId, grade);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
