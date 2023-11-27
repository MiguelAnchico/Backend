const Dispositivo = require("../Models/Dispositivo");
const errorHandler = require("../Helpers/errorHandler");

// Obtener todos los dispositivos
const getDispositivos = async (req, res) => {
  try {
    const dispositivos = await Dispositivo.find().populate("animalId");
    res.json(dispositivos);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

// Obtener un dispositivo por ID
const getDispositivoById = async (req, res) => {
  try {
    const dispositivo = await Dispositivo.findById(req.params.id).populate(
      "animalId"
    );
    if (!dispositivo) {
      return res.status(404).json({ message: "Dispositivo no encontrado" });
    }
    res.json(dispositivo);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

// Crear un nuevo dispositivo
const createDispositivo = async (req, res) => {
  try {
    const nuevoDispositivo = new Dispositivo(req.body);
    await nuevoDispositivo.save();
    res.status(201).json({
      message: "Dispositivo creado con éxito",
      dispositivo: nuevoDispositivo,
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

// Actualizar un dispositivo por ID
const updateDispositivo = async (req, res) => {
  try {
    const dispositivoActualizado = await Dispositivo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("animalId");
    if (!dispositivoActualizado) {
      return res.status(404).json({ message: "Dispositivo no encontrado" });
    }
    res.json({
      message: "Dispositivo actualizado con éxito",
      dispositivo: dispositivoActualizado,
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const updateAspersorEstado = async (req, res) => {
  try {
    const { prenderAspersor } = req.body;
    const dispositivoActualizado = await Dispositivo.findByIdAndUpdate(
      req.params.id,
      { prenderAspersor },
      { new: true }
    ).populate("animalId");
    if (!dispositivoActualizado) {
      return res.status(404).json({ message: "Dispositivo no encontrado" });
    }
    res.json({
      message: "Estado del aspersor actualizado con éxito",
      dispositivo: dispositivoActualizado,
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

// Eliminar un dispositivo por ID
const deleteDispositivo = async (req, res) => {
  try {
    await Dispositivo.findByIdAndRemove(req.params.id);
    res.json({ message: "Dispositivo eliminado con éxito" });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

module.exports = {
  getDispositivos,
  getDispositivoById,
  createDispositivo,
  updateDispositivo,
  updateAspersorEstado,
  deleteDispositivo,
};
