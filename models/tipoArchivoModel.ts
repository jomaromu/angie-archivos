import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

// Interface
import { TipoArchivoInteface } from "../interfaces/tipoArchivo";

// crear esquema
const Schema = mongoose.Schema;

const tipoArchivoSchema = new Schema({
  idCreador: {
    type: Schema.Types.ObjectId,
    ref: "userWorker",
    required: [true, "Es necesario el ID del creador"],
  },
  foranea: {
    type: Schema.Types.ObjectId,
    ref: "userWorker",
  },
  nombre: { type: String, unique: true },
  estado: { type: Boolean, default: true },
});

// validacion para único elemento
tipoArchivoSchema.plugin(uniqueValidator, { message: "{PATH}, ya existe!!" });

export = mongoose.model<TipoArchivoInteface>("tipoArchivos", tipoArchivoSchema);
