const PORT = process.env.PORT;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.x7t9gs5.mongodb.net/${DB_NAME}`;

module.exports = {
  PORT,
  DB_URI,
};
