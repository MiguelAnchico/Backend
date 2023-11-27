const mongoose = require("mongoose");
const { Schema } = mongoose;

// Definir el esquema de la actividad
const actividadSchema = new Schema({
  tipo: { type: String, required: true },
  detalles: {
    comidaOfrecida: String,
    cantidad: Number,
    productosUsados: [String],
    resultado: String,
  },
  notas: String,
});

const registroSchema = new Schema({
  animalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Serpiente",
  },
  fecha: { type: Date, default: Date.now },
  actividades: [actividadSchema],
});

// Crear el modelo
const Registro = mongoose.model("Registro", registroSchema);

module.exports = Registro;
