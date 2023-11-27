const express = require("express");
const router = express.Router();

// Importar los controladores que manejan las solicitudes para los registros de actividades
const {
  getRegistros,
  getRegistrosAnimal,
  getRegistroById,
  createRegistro,
  updateRegistro,
  deleteRegistro,
  addNotaRegistro,
} = require("../Controllers/ControllerActividad");

// Obtener todos los registros
router.get("/", getRegistros);

// Obtener todos los registros de un animal específico por su ID
router.get("/:animalId", getRegistrosAnimal);

// Obtener un registro de actividad específico por ID
router.get("/registro/:id", getRegistroById);

// Crear un nuevo registro de actividad
router.post("/", createRegistro);

// Actualizar una actividad específica en un registro por el ID del registro y el ID de la actividad
router.put("/actividad/:registroId/:actividadId", updateRegistro);

// Agregar una nota a una actividad específica
router.post("/nota/:registroId/:actividadId", addNotaRegistro);

// Eliminar un registro de actividad por su ID
router.delete("/:id", deleteRegistro);

module.exports = router;
