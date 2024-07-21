exports.getUsers = async (params) => {
    try {
        return {
            status: 200,
            data: {
                name: "Muhammad Faried Risky",
                email: "fariedrisky@gmail.com",
                address: "Meunasah Krueng",
            },
        };
    } catch (error) {
        return {
            status: 500,
            message: "Gagal mengambil data user",
            error: error.message,
        };
    }
};
