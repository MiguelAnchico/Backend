const mongoose = require("mongoose");
const { Schema } = mongoose;

const registroSchema = new Schema({
  valor: { type: Number, required: true },
  fechaRegistro: { type: Date, default: Date.now },
});

const serpienteSchema = new Schema({
  nombre: { type: String, required: true },
  tipo: { type: String, required: true },
  edad: { type: Number, required: true },
  nacimiento: { type: Date, required: true },
  fechaAdquisicion: { type: Date, required: true },
  sexo: { type: String, required: true, enum: ["Macho", "Hembra"] },
  morfologia: { type: String },
  peso: [registroSchema],
  longitud: [registroSchema],
  atributos: [{ type: String }],
});

const Serpiente = mongoose.model("Serpiente", serpienteSchema);

module.exports = Serpiente;
