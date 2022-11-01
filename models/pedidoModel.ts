import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

// Interfaces
import { PedidosInterface } from "../interfaces/pedidos";

// crear esquema
const Schema = mongoose.Schema;

const PedidoSchema = new Schema({
  idReferencia: { type: String, unique: true },
  fechaRegistro: { type: String },
  fechaEntrega: { type: String },
  vendedor: { type: mongoose.Types.ObjectId, ref: "userWorker" },
  diseniador: { type: mongoose.Types.ObjectId, ref: "userWorker" },
  cliente: { type: mongoose.Types.ObjectId, ref: "userWorker" },
  sucursal: { type: mongoose.Types.ObjectId, ref: "sucursales" },
  prioridad: { type: mongoose.Types.ObjectId, ref: "prioridad" },
  etapa: { type: mongoose.Types.ObjectId, ref: "etapas" },
  color: { type: mongoose.Types.ObjectId, ref: "colores" },
  origen: { type: mongoose.Types.ObjectId, ref: "origenPedido" },
  archivado: { type: Boolean, default: false },
  foranea: { type: mongoose.Types.ObjectId, ref: "userWorker" },
});

// validacion para único elemento
PedidoSchema.plugin(uniqueValidator, { message: "{PATH}, ya existe!!" });

export = mongoose.model<PedidosInterface>("pedidos", PedidoSchema);
