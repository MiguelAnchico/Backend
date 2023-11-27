const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET); // Asegúrate de tener tu clave secreta en las variables de entorno
    req.user = verified;
    next(); // Continuar con el siguiente middleware o ruta
  } catch (error) {
    res.status(400).json({ message: "Token inválido" });
  }
};

module.exports = verificarToken;
