require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("../Config/config");

class Server {
  constructor() {
    this.app = express();
    this.port = config.PORT;
    this.server = require("http").createServer(this.app);

    this.paths = {
      usuario: "/api/usuario",
      actividades: "/api/actividad",
      serpientes: "/api/serpiente",
      dispositivos: "/api/dispositivo",
    };

    this.connectToDB();
    this.addMiddlewares();
    this.setRoutes();
  }

  async connectToDB() {
    try {
      await mongoose.connect(config.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Conexión exitosa a MongoDB");
    } catch (error) {
      console.error("Error al conectar a MongoDB", error);
      process.exit(1);
    }
  }

  addMiddlewares() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  setRoutes() {
    this.app.use(this.paths.actividades, require("../Routes/RouterActividad"));
    this.app.use(this.paths.serpientes, require("../Routes/RouterSerpiente"));
    this.app.use(
      this.paths.dispositivos,
      require("../Routes/RouterDispositivo")
    );
    this.app.use(this.paths.usuario, require("../Routes/RouterUsuario"));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}

module.exports = { Server };
