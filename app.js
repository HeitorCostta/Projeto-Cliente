const express = require("express");
const cors = require("cors");
require("dotenv").config();

const produtorRoutes = require("./src/routes/produtorRoutes");
const authRoutes = require("./src/routes/authRoutes");
const propriedadeRoutes = require("./src/routes/propriedadeRoutes");

const app = express();


const allowedOrigins = [
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "https://agroferreira.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    
    if (!origin) return callback(null, true);

    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    
    if (origin.includes("vercel.app")) {
      return callback(null, true);
    }

    
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());


app.use("/auth", authRoutes);
app.use("/produtores", produtorRoutes);
app.use("/propriedades", propriedadeRoutes);

module.exports = app;