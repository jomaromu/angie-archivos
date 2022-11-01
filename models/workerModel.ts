import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

// Interface
import { WorkerModelInterface } from "../interfaces/worker";

// crear esquema
const Schema = mongoose.Schema;

const WorkerUserSchema = new Schema({
  nombre: { type: String, default: "Colaborador" },
  apellido: { type: String },
  identificacion: { type: String },
  telefono: { type: String },
  correo: {
    type: String,
    lowercase: true,
    required: [true, "Debe ingresar un correo"],
    unique: true,
  },
  password: { type: String },
  fecha_alta: { type: String },
  fecha_login: { type: String },
  role: { type: mongoose.Types.ObjectId, ref: "roleColaborador" },
  cantVisitas: { type: Number, default: 0 },
  estado: { type: Boolean, default: true },
  sucursal: { type: mongoose.Types.ObjectId, ref: "sucursales" },
  foranea: { type: mongoose.Types.ObjectId, ref: "userWorker" },
  empresa: { type: Boolean, default: false },
});

// validacion para único elemento
WorkerUserSchema.plugin(uniqueValidator, { message: "{PATH}, ya existe!!" });

export = mongoose.model<WorkerModelInterface>("userWorker", WorkerUserSchema);
