import Server from "./server";
import { Response, Request } from "express";
import mongoose, { CallbackError } from "mongoose";
import { UploadedFile } from "express-fileupload";
import path from "path";
import { nanoid } from "nanoid";
import rimraf from "rimraf";
import moment from "moment";
import fs from "fs";
moment.locale("es");

// Funciones externas
import { datosArchivos } from "../functions/manejarArchivos";

// modelos
import archivoModel from "../models/archivoModel";

// interfaces
import { ArchivoInterface } from "../interfaces/archivo";

// import { castEstado } from '../functions/castEstado';

export class ArchivoClass {
  constructor() {}

  nuevoArchivo(req: any, resp: Response): any {
    const archivo: UploadedFile = datosArchivos(req, resp);
    let nombre = req.body.nombre;
    const tipo = new mongoose.Types.ObjectId(req.body.tipo);
    const idCreador = new mongoose.Types.ObjectId(req.body.idCreador);
    const pedido = new mongoose.Types.ObjectId(req.body.pedido);
    const fecha = req.body.fecha;
    let ruta = "";
    let ext = "";
    const foranea = new mongoose.Types.ObjectId(req.body.foranea);
    const pathUsuario: string = req.body.foranea;

    if (!nombre || nombre == "null") {
      nombre = nanoid(10);
    } else {
      const date = new Date();
      nombre = `${nombre}-${nanoid(3)}-${date.getMilliseconds()}`;
    }
    const rutaUsuario = path.resolve(__dirname, `../uploads/${pathUsuario}`);

    const guardarArchivo = () => {
      ext = archivo.name.split(".")[archivo.name.split(".").length - 1];
      ruta = path.resolve(__dirname, `${rutaUsuario}/${nombre}.${ext}`);

      archivo.mv(ruta, (err) => {
        if (err) {
          return resp.json({
            ok: false,
            mensaje: "Error al subir archivo",
            err,
          });
        } else {
          const nuevoFile = new archivoModel({
            archivo: ruta,
            nombre,
            tipo,
            idCreador,
            pedido,
            fecha,
            ext,
            foranea,
          });

          nuevoFile.save((err: any, archivoDB: ArchivoInterface) => {
            if (err) {
              return resp.json({
                ok: false,
                mensaje: "Error al subir el archivo",
                err,
              });
            } else {
              const server = Server.instance;
              server.io.in(pathUsuario).emit("cargar-archivos", { ok: true });
              return resp.json({
                ok: true,
                archivoDB,
              });
            }
          });
        }
      });
    };

    if (archivo) {
      if (fs.existsSync(rutaUsuario)) {
        guardarArchivo();
      } else {
        if (fs.mkdirSync(rutaUsuario, { recursive: true })) {
          guardarArchivo();
        } else {
          return resp.json({
            ok: false,
            mensaje: "Error al guardar archivo",
          });
        }
      }
    } else {
      return resp.json({
        ok: false,
        mensaje: "No se encontró un archivo",
      });
    }
  }

  obtenerArchivos(req: any, resp: Response): void {
    const pedido = new mongoose.Types.ObjectId(req.get("pedido"));
    const foranea = new mongoose.Types.ObjectId(req.get("foranea"));
    archivoModel
      .find({ pedido, foranea })
      .populate("tipo")
      .populate("idCreador")
      .exec((err: CallbackError, archivosDB: Array<ArchivoInterface>) => {
        if (err) {
          return resp.json({
            ok: false,
            mensaje: "Error al obtener los archivos",
            err,
          });
        } else {
          return resp.json({
            ok: true,
            archivosDB,
          });
        }
      });
  }

  eliminarArchivo(req: any, resp: Response): void {
    const _id = new mongoose.Types.ObjectId(req.get("id"));
    const foranea = new mongoose.Types.ObjectId(req.get("foranea"));
    const rutaUsuario: string = req.get("foranea");
    const nombreArchivo = req.get("nombreArchivo");
    const ruta = path.resolve(
      __dirname,
      `../uploads/${rutaUsuario}/${nombreArchivo}`
    );

    const eliminarImg = new Promise((resolve, reject) => {
      rimraf(ruta, { disableGlob: true }, (err) => {
        if (err) {
          reject(false);
        } else {
          resolve(true);
        }
      });
    });

    const eliminarDB = new Promise((resolve, reject) => {
      archivoModel.findOneAndDelete(
        { _id, foranea },
        (err: CallbackError, archivoDB: ArchivoInterface) => {
          if (err) {
            reject(false);
          } else {
            resolve(archivoDB);
          }
        }
      );
    });

    Promise.all([eliminarImg, eliminarDB])
      .then((respProm) => {
        const respDeleRute = respProm[1];
        const archivoDB = respProm[1];

        const server = Server.instance;
        server.io.in(rutaUsuario).emit("cargar-archivos", { ok: true });
        return resp.json({
          ok: true,
          archivoDB,
        });
      })
      .catch((err) => {
        return resp.json({
          ok: false,
          err,
        });
      });
  }

  abrirArchivo(req: any, resp: Response): void {
    const archivo = req.query.archivo;
    const rutaArchivo = path.resolve(__dirname, `../uploads/${archivo}`);
    resp.sendFile(rutaArchivo);
  }

  eliminarArchivos(req: any, resp: Response): void {
    const idPedido = new mongoose.Types.ObjectId(req.get("idPedido"));
    const foranea = new mongoose.Types.ObjectId(req.get("foranea"));
    const rutaUsuario: string = req.get("foranea");
    const archivos: Array<any> = req.body.archivos;
    let eliminarImg: any;

    archivos.forEach((archivo) => {
      const ruta = path.resolve(
        __dirname,
        `../uploads/${rutaUsuario}/${archivo.nombre}.${archivo.ext}`
      );

      eliminarImg = new Promise((resolve, reject) => {
        rimraf(ruta, { disableGlob: true }, (err) => {
          if (err) {
            reject(false);
          } else {
            resolve(true);
          }
        });
      });
    });

    const eliminarDB = new Promise((resolve, reject) => {
      archivoModel.deleteMany(
        { pedido: idPedido, foranea },
        (err: CallbackError, archivoDB: ArchivoInterface) => {
          if (err) {
            reject(false);
          } else {
            resolve(true);
          }
        }
      );
    });

    Promise.all([eliminarImg, eliminarDB])
      .then((respProm) => {
        // console.log(respProm);
        // const respDeleRute = respProm[1];
        // const archivoDB = respProm[1];

        return resp.json({
          ok: true,
        });
      })
      .catch((err) => {
        console.log(err);
        return resp.json({
          ok: false,
        });
      });
  }
}
