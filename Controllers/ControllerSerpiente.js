const Serpiente = require("../Models/Serpiente");
const errorHandler = require("../Helpers/errorHandler");

// Obtener todas las serpientes
const getAllSerpientes = async (req, res) => {
  try {
    const serpientes = await Serpiente.find();
    res.json(serpientes);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

// Obtener una serpiente por ID
const getSerpienteById = async (req, res) => {
  try {
    const serpiente = await Serpiente.findById(req.params.id);
    if (!serpiente) {
      return res.status(404).json({ message: "Serpiente no encontrada" });
    }
    res.json(serpiente);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

// Crear una nueva serpiente
const createSerpiente = async (req, res) => {
  try {
    const nuevaSerpiente = new Serpiente(req.body);
    await nuevaSerpiente.save();
    res.status(201).json({
      message: "Serpiente creada con éxito",
      serpiente: nuevaSerpiente,
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

// Actualizar una serpiente por ID
const updateSerpiente = async (req, res) => {
  try {
    const serpienteActualizada = await Serpiente.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!serpienteActualizada) {
      return res.status(404).json({ message: "Serpiente no encontrada" });
    }
    res.json({
      message: "Serpiente actualizada con éxito",
      serpiente: serpienteActualizada,
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const updateRegistroSerpiente = async (req, res) => {
  const { serpienteId, registroId, tipo } = req.params; // tipo es 'peso' o 'longitud'
  const campo = `${tipo}.$[elem]`; // Path para el elemento en el array

  try {
    const serpienteActualizada = await Serpiente.findOneAndUpdate(
      { _id: serpienteId, [tipo]: { $elemMatch: { _id: registroId } } },
      { $set: { [campo]: req.body } },
      {
        new: true,
        arrayFilters: [{ "elem._id": registroId }], // Filtro para especificar cuál elemento del array actualizar
      }
    );
    if (!serpienteActualizada) {
      return res
        .status(404)
        .json({ message: "Serpiente o registro no encontrado" });
    }
    res.json({
      message: `Registro de ${tipo} actualizado con éxito`,
      serpiente: serpienteActualizada,
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

// Eliminar un registro de peso o longitud por ID de serpiente y ID de registro
const deleteRegistroSerpiente = async (req, res) => {
  const { serpienteId, registroId, tipo } = req.params; // tipo es 'peso' o 'longitud'

  try {
    const serpienteActualizada = await Serpiente.findOneAndUpdate(
      { _id: serpienteId },
      { $pull: { [tipo]: { _id: registroId } } }, // Elimina el elemento del array por su _id
      { new: true }
    );
    if (!serpienteActualizada) {
      return res
        .status(404)
        .json({ message: "Serpiente o registro no encontrado" });
    }
    res.json({
      message: `Registro de ${tipo} eliminado con éxito`,
      serpiente: serpienteActualizada,
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

// Eliminar una serpiente por ID
const deleteSerpiente = async (req, res) => {
  try {
    const serpiente = await Serpiente.findById(req.params.id);
    if (!serpiente) {
      return res.status(404).json({ message: "Serpiente no encontrada" });
    }
    await serpiente.remove();
    res.json({ message: "Serpiente eliminada con éxito" });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

module.exports = {
  getAllSerpientes,
  getSerpienteById,
  createSerpiente,
  updateSerpiente,
  deleteSerpiente,
  updateRegistroSerpiente,
  deleteRegistroSerpiente,
};
