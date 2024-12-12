console.log("Aplicacion iniciando...");

require("dotenv").config(); // importamos en dontev para poder usar las variables de entorno
const express = require("express");
const app = express();
const dbconnect = require("./config/db"); // Importar la conexión a la base de datos
const tareasRoutes = require("./routes/tareas"); // Importar las rutas de libros

//Middleware
const loggingMiddleware = require('./middlewares/loggingMiddleware');
const errorMiddleware = require('./middlewares/errorMiddleware'); //Errores globles
const notFoundMiddleware = require('./middlewares/notFoundMiddleware');  // Importamos el middleware de rutas no encontradas

//cors
const cors = require('cors');
app.use(cors());


// Middleware para rutas no encontradas
app.use(loggingMiddleware); //Usamos el middleware de logging en toda la aplicación

app.use(express.json()); // Middleware para interpretar JSON

// Usar las rutas de libros
app.use("/api", tareasRoutes);


app.use(notFoundMiddleware); //Usamos el middleware de rutas no encontradas en toda la aplicación
app.use(errorMiddleware); //Usamos el middleware de error en toda la aplicación

app.get('/api/test',(req,res) =>{
res.send('La aplicacion esta funcionando correctamente')
})

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
