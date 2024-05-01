const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const router = require("./routes");
require("dotenv").config();
const errorHandler = require("./utils/errorHandler");

// Esta es nuestra aplicación
const app = express();

// Middlewares
app.use(express.json());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(cors());
// Rutas de la API
app.use("/api/v1", router);
// Error handler
app.use(errorHandler);

module.exports = app;
