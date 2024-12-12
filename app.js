console.log("Aplicacion iniciando...");

require("dotenv").config(); // importamos en dontev para poder usar las variables de entorno
const express = require("express");
const app = express();
const dbconnect = require("./config/db"); // Importar la conexión a la base de datos
const tareasRoutes = require("./routes/tareas"); // Importar las rutas de libros

app.use(express.json()); // Middleware para interpretar JSON

// Usar las rutas de libros
app.use("/api", tareasRoutes);

// Probar la conexión a la base de datos y arrancar el servidor
dbconnect()
  .then(() => {
    console.log("El servidor está corriendo");
  })
  .catch((err) => {
    console.error(
      "No se pudo iniciar el servidor debido a un error en la base de datos"
    );
  });
module.exports = app; //delegamoas la aplicacion para poder delegarle el control alVercel
