const mongoose = require("mongoose");
const { Schema } = mongoose;

const lecturaSchema = new Schema(
  {
    superior: { type: Number, required: true },
    inferior: { type: Number, required: true },
    fechaRegistro: { type: Date, default: Date.now },
  },
  {
    _id: false,
  }
);

const dispositivoSchema = new Schema({
  animalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Serpiente",
    required: false,
  },
  temperatura: [lecturaSchema],
  humedad: [lecturaSchema],
  ajusteTemperatura: { type: Number, required: true },
  tiempoAspersor: { type: Date, required: true },
  prenderAspersor: { type: Boolean, required: true },
});

const Dispositivo = mongoose.model("Dispositivo", dispositivoSchema);

module.exports = Dispositivo;
