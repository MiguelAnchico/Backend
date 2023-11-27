const mongoose = require("mongoose");
const Config = require("./config");

// MongoDB utiliza una cadena de conexión única
const DB_URI = Config.DB_URI;

// Conectar a MongoDB
mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((err) => console.error("Error al conectar con MongoDB", err));

// Exportar la conexión para usarla en otras partes de tu aplicación
module.exports = mongoose;
