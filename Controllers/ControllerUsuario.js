const User = require("../Models/User");
const generarJWT = require("../Helpers/jwt");

const getUser = (req, res) => {
  User.find()
    .populate("dispositivos")
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .populate("dispositivos")
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json("Usuario no encontrado");
    }

    // Validar la contraseña
    if (!user.validatePassword(password)) {
      return res.status(400).json("Contraseña incorrecta");
    }

    // Generar JWT
    const token = await generarJWT(user.id, user.email);

    res.json({
      uid: user.id,
      name: user.email,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor", error: err });
  }
};

// Registrar usuario
const registerUser = async (req, res) => {
  try {
    const { email, password, nombre } = req.body;
    const existingUser = await User.findOne({
      email: email.toLowerCase().trim(),
    });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "El correo electrónico ya está registrado." });
    }

    const user = new User({
      email,
      nombre,
    });
    user.setPassword(password);

    await user.save();

    const token = await generarJWT(user.id, user.email);

    res.status(201).json({
      uid: user.id,
      name: user.email,
      token,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al registrar el usuario", error: err });
  }
};

const deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("Usuario eliminado."))
    .catch((err) => res.status(400).json("Error: " + err));
};

const updateUser = async (req, res) => {
  const updates = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updates },
      { new: true, runValidators: true } // new: true devuelve el documento actualizado, runValidators: true aplica las validaciones del esquema
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario actualizado con éxito", user: updatedUser });
  } catch (error) {
    res.status(400).json({
      message: "Error al actualizar el usuario",
      error: error.message,
    });
  }
};

const actualizarDispositivosUsuario = async (req, res) => {
  const userId = req.params.id;
  const dispositivos = req.body.dispositivos;

  if (!Array.isArray(dispositivos)) {
    return res
      .status(400)
      .json({ message: "Los dispositivos deben ser un arreglo" });
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { dispositivos: dispositivos } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({
      message: "Dispositivos del usuario actualizados con éxito",
      user: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al actualizar los dispositivos del usuario",
      error: error.message,
    });
  }
};

module.exports = {
  getUser,
  getUserById,
  loginUser,
  registerUser,
  deleteUser,
  updateUser,
  actualizarDispositivosUsuario,
};
