require("dotenv").config(); // this is important!

module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: "mysql",
        dialectOptions: {
            decimalNumbers: true,
        },
        port: process.env.DB_PORT ? process.env.DB_PORT : 3306,
        timezone: "+07:00",
        logging: false,
    },
    test: {
        username: process.env.DB_USER_TEST,
        password: process.env.DB_PASSWORD_TEST,
        database: process.env.DB_NAME_TEST,
        host: process.env.DB_HOST_TEST,
        dialect: "mysql",
        dialectOptions: {
            decimalNumbers: true,
        },
        port: process.env.DB_PORT ? process.env.DB_PORT : 3306,
        timezone: "+07:00",
        logging: false,
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: "mysql",
        dialectOptions: {
            decimalNumbers: true,
        },
        port: process.env.DB_PORT ? process.env.DB_PORT : 3306,
        timezone: "+07:00",
        logging: false,
    },
};
