const mongoose = require("mongoose");

const dbconnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("URI: ", process.env.MONGO_URI);
  } catch (error) {
    console.error("Error en la conexión a la base de datos:", error);
    process.exit(1);
  }
};

module.exports = dbconnect;
