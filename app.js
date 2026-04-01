const express = require("express");
const cors = require("cors");
require("dotenv").config();
const produtorRoutes = require("./src/routes/produtorRoutes");
const authRoutes = require("./src/routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/produtores", produtorRoutes);

module.exports = app;