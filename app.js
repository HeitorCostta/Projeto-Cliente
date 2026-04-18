const express = require("express");
const cors = require("cors");
require("dotenv").config();
const produtorRoutes = require("./src/routes/produtorRoutes");
const authRoutes = require("./src/routes/authRoutes");
const propriedadeRoutes = require("./src/routes/propriedadeRoutes");

const app = express();

app.use(cors({
  origin: "https://projeto-cliente-ten.vercel.app", // Permite que qualquer lugar (Vercel, Local, etc) acesse sua API
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/produtores", produtorRoutes);
app.use("/propriedades", propriedadeRoutes);

module.exports = app;