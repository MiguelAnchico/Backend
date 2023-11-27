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
  addTemperaturaHumedad,
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

// Ruta para agregar actualizaciones del aspersor
router.patch("/:id/lecturas", addTemperaturaHumedad);

// Ruta para eliminar un dispositivo por su ID
router.delete("/:id", deleteDispositivo);

module.exports = router;
