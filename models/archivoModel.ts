import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

// Interface
import { ArchivoInterface } from "../interfaces/archivo";

// crear esquema
const Schema = mongoose.Schema;

const archivoSchema = new Schema({
  archivo: { type: String },
  nombre: { type: String },
  tipo: { type: Schema.Types.ObjectId, ref: "tipoArchivos" },
  pedido: { type: Schema.Types.ObjectId, ref: "pedidos" },
  idCreador: {
    type: Schema.Types.ObjectId,
    ref: "userWorker",
    required: [true, "Es necesario el ID del creador"],
  },
  fecha: { type: String },
  ext: { type: String },
  foranea: { type: mongoose.Types.ObjectId, ref: "userWorker" },
});

// validacion para único elemento
archivoSchema.plugin(uniqueValidator, { message: "{PATH}, ya existe!!" });

export = mongoose.model<ArchivoInterface>("archivos", archivoSchema);
