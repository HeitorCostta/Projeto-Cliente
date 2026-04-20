const express = require("express");
const cors = require("cors");
require("dotenv").config();

const produtorRoutes = require("./src/routes/produtorRoutes");
const authRoutes = require("./src/routes/authRoutes");
const propriedadeRoutes = require("./src/routes/propriedadeRoutes");

const app = express();

// Lista de origens permitidas
const allowedOrigins = [
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "https://agroferreira.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    
    if (!origin) return callback(null, true);

    
    const isAllowed = allowedOrigins.includes(origin) || origin.endsWith(".vercel.app");

    if (isAllowed) {
      callback(null, true);
    } else {
      console.log("Bloqueado pelo CORS: ", origin); 
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, 
  optionsSuccessStatus: 200 
}));


app.use(express.json());


app.get("/", (req, res) => {
  res.status(200).send("Servidor AgroFerreira rodando!");
});


app.use("/auth", authRoutes);
app.use("/produtores", produtorRoutes);
app.use("/propriedades", propriedadeRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erro interno no servidor!" });
});

module.exports = app;