const express = require("express");
const router = express.Router();
const verificarToken = require("../Middlewares/verificarToken");

const {
  getUser,
  getUserById,
  loginUser,
  registerUser,
  deleteUser,
  updateUser,
  actualizarDispositivosUsuario,
} = require("../Controllers/ControllerUsuario");

// Ruta para obtener todos los usuarios
router.get("/", getUser);

// Ruta para obtener un usuario por su ID
router.get("/:id", getUserById);

// Ruta para que un usuario inicie sesión
router.post("/login", loginUser);

// Ruta para registrar un nuevo usuario
router.post("/register", registerUser);

// Ruta para eliminar un usuario
router.delete("/:id", deleteUser);

// Ruta para actualizar un usuario
router.put("/:id", updateUser);

// Ruta para actualizar los dispositivos del usuario
router.put("/dispositivo/:id", actualizarDispositivosUsuario);

module.exports = router;
