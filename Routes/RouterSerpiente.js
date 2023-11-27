const express = require("express");
const router = express.Router();

// Importar los controladores que manejan las solicitudes para las serpientes
const {
  getAllSerpientes,
  getSerpienteById,
  createSerpiente,
  updateSerpiente,
  deleteSerpiente,
  updateRegistroSerpiente,
  deleteRegistroSerpiente,
} = require("../Controllers/ControllerSerpiente");

// Ruta para obtener todas las serpientes
router.get("/", getAllSerpientes);

// Ruta para obtener una serpiente por su ID
router.get("/:id", getSerpienteById);

// Ruta para crear una nueva serpiente
router.post("/", createSerpiente);

// Ruta para actualizar una serpiente existente por su ID
router.put("/:id", updateSerpiente);

// Ruta para actualizar el registro del peso o longitud de la serpiente
router.put("/:id", updateRegistroSerpiente);

// Ruta para eliminar el registro del peso o longitud de la serpiente
router.delete("/:id", deleteRegistroSerpiente);

// Ruta para eliminar una serpiente por su ID
router.delete("/:id", deleteSerpiente);

module.exports = router;
