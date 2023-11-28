const Dispositivo = require("../Models/Dispositivo");
const errorHandler = require("../Helpers/errorHandler");

// Obtener todos los dispositivos
const getDispositivos = async (req, res) => {
  try {
    const dispositivos = await Dispositivo.find();
    res.json(dispositivos);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

// Obtener un dispositivo por ID
const getDispositivoById = async (req, res) => {
  try {
    const dispositivo = await Dispositivo.findById(req.params.id);
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
    );
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
    );
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

const addTemperaturaHumedad = async (req, res) => {
  try {
    const { id } = req.params;
    const { temperatura, humedad } = req.body;
    const fechaRegistro = new Date(); // Obtiene la fecha y hora actuales

    // Encuentra el dispositivo por ID
    const dispositivo = await Dispositivo.findById(id);

    if (!dispositivo) {
      return res.status(404).json({ message: "Dispositivo no encontrado" });
    }

    // Modifica los objetos de temperatura y humedad para incluir la fecha de registro
    const nuevaTemperatura = { ...temperatura, fechaRegistro };
    const nuevaHumedad = { ...humedad, fechaRegistro };

    // Añade las nuevas lecturas a las listas correspondientes
    dispositivo.temperatura.push(nuevaTemperatura);
    dispositivo.humedad.push(nuevaHumedad);

    // Guarda los cambios en la base de datos
    await dispositivo.save();

    res.status(200).json({
      message: "Lecturas añadidas con éxito",
      dispositivo: dispositivo,
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
  addTemperaturaHumedad,
  deleteDispositivo,
};
