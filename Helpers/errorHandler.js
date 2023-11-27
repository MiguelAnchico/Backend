const errorHandler = (
  error,
  req,
  res,
  statusCode = 500,
  message = "Error en el servidor"
) => {
  console.error(error);
  res.status(statusCode).json({ message, details: error.message });
};

module.exports = errorHandler;
