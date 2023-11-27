const express = require("express");
const router = express.Router();

// Importar los controladores que manejan las solicitudes para los dispositivos
const {
  getDispositivos,
  getDispositivoById,
  createDispositivo,
  updateDispositivo,
  deleteDispositivo,
  updateAspersorEstado,
} = require("../Controllers/ControllerDispositivo");

// Ruta para obtener todos los dispositivos
router.get("/", getDispositivos);

// Ruta para obtener un dispositivo por su ID
router.get("/:id", getDispositivoById);

// Ruta para crear un nuevo dispositivo
router.post("/", createDispositivo);

// Ruta para actualizar un dispositivo existente por su ID
router.put("/:id", updateDispositivo);

// Ruta para actualizar el estado del aspersor
router.put("/dispositivo/:id/aspersor", updateAspersorEstado);

// Ruta para eliminar un dispositivo por su ID
router.delete("/:id", deleteDispositivo);

module.exports = router;
