const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./db/config");

// crear el servidor de express
const app = express();

//base de datos
dbConnection();

// CORS
app.use(cors());

// Directorio Publico
app.use(express.static("public"));

// Lectura y parseo del body antes body parser
app.use(express.json());

//Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`servidor corriendo en puerto ${process.env.PORT}`);
});
