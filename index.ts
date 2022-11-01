import mongoose from "mongoose";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import Server from "./class/server";

// rutas
import archivoRouter from "./routes/archivoPedido";

// const server = new Server();
const server = Server.instance;

// body parser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// cors
server.app.use(cors({ origin: true, credentials: true }));

// fileUpload
server.app.use(
  fileUpload({
    createParentPath: true,
  })
);

// Models
require("./models/workerModel");
require("./models/tipoArchivoModel");

// conexion local
mongoose.connect(
  "mongodb://127.0.0.1:27017/angie",
  { autoIndex: false },
  (err) => {
    if (err) throw err;
    console.log("Base de datos Online");
    // mongoose.connection.close()
  }
);

// usar las rutas
server.app.use("/archivo", archivoRouter);

// correr servidor
server.start(() => {
  console.log(`Servidor corriendo en el puerto: ${server.port}`);
});
