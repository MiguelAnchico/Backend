const Registro = require("../Models/Registro");
const errorHandler = require("../Helpers/errorHandler");

const getRegistros = async (req, res) => {
  try {
    const registros = await Registro.find({}).populate("animalId");
    res.json(registros);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

// Obtener todos los registros de un animal específico por su ID
const getRegistrosAnimal = async (req, res) => {
  try {
    const animalId = req.params.animalId;
    const registros = await Registro.find({ animalId: animalId }).populate(
      "animalId"
    );
    res.json(registros);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

// Obtener un registro específico por ID
const getRegistroById = async (req, res) => {
  try {
    const registro = await Registro.findById(req.params.id);
    if (!registro) {
      return res.status(404).json("Registro no encontrado");
    }
    res.json(registro);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

// Crear un nuevo registro
const createRegistro = async (req, res) => {
  try {
    const nuevoRegistro = new Registro(req.body);
    await nuevoRegistro.save();
    res.status(201).json("Registro creado con éxito!");
  } catch (error) {
    errorHandler(error, req, res);
  }
};

// Actualizar una actividad específica en un registro
const updateRegistro = async (req, res) => {
  try {
    const { registroId, actividadId } = req.params;
    const registro = await Registro.findOneAndUpdate(
      { _id: registroId, "actividades._id": actividadId },
      {
        $set: {
          "actividades.$": req.body,
        },
      },
      { new: true }
    );
    if (!registro) {
      return res.status(404).json("Registro de actividad no encontrado");
    }
    res.json(registro);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

// Agregar una nota a una actividad específica
const addNotaRegistro = async (req, res) => {
  try {
    const { registroId, actividadId } = req.params;
    const { nota } = req.body;
    const registro = await Registro.findOneAndUpdate(
      { _id: registroId, "actividades._id": actividadId },
      {
        $set: {
          "actividades.$.notas": nota,
        },
      },
      { new: true }
    );
    if (!registro) {
      return res.status(404).json("Registro no encontrado");
    }
    res.json(registro);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

// Eliminar un registro por su ID
const deleteRegistro = async (req, res) => {
  try {
    await Registro.findByIdAndRemove(req.params.id);
    res.json("Registro eliminado con éxito");
  } catch (error) {
    errorHandler(error, req, res);
  }
};

module.exports = {
  getRegistros,
  getRegistrosAnimal,
  getRegistroById,
  createRegistro,
  updateRegistro,
  deleteRegistro,
  addNotaRegistro,
};
