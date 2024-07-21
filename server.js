const express = require("express");

//app.use('/', (req, res)=>{
//res.send('Hello World')
//})

//app.get("/", (req, res) => {
//    res.send("Hai aku method GET");
//});
//app.post("/", (req, res) => {
//    res.send("Hai aku method POST");
//});
//app.put("/", (req, res) => {
//    res.send("Hai aku method PUT");
//});
//app.delete("/", (req, res) => {
//    res.send("Hai aku method DELETE");
//});

//app.listen(3000, () => {
//    console.log("Server running on port: 3000");
//});

const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRoutes = require("./apps/routes/user.route");

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;
const { NODE_ENV } = process.env;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Welcome to my API");
});

app.use("/users", userRoutes);

module.exports = app.listen(port, () => {
    process.stdout.write(`Active Port : ${port} \n`);
    process.stdout.write(`Environtment : ${NODE_ENV} \n`);
});
