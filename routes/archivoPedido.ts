import { Router, Request, Response } from "express";
import { verificaToken } from "../auth/auth";
import { ArchivoClass } from "../class/archivoPedidoClass";

// instanciar el Router
const archivoRouter = Router();

archivoRouter.post(
  "/nuevoArchivo",
  [verificaToken],
  (req: Request, resp: Response) => {
    const nuevoArchivo = new ArchivoClass();
    nuevoArchivo.nuevoArchivo(req, resp);
  }
);

archivoRouter.get(
  "/obtenerArchivos",
  [verificaToken],
  (req: Request, resp: Response) => {
    const obtenerArchivos = new ArchivoClass();
    obtenerArchivos.obtenerArchivos(req, resp);
  }
);

archivoRouter.delete(
  "/eliminarArchivo",
  [verificaToken],
  (req: Request, resp: Response) => {
    const eliminarArchivo = new ArchivoClass();
    eliminarArchivo.eliminarArchivo(req, resp);
  }
);

archivoRouter.put(
  "/eliminarArchivos",
  [verificaToken],
  (req: Request, resp: Response) => {
    const eliminarArchivos = new ArchivoClass();
    eliminarArchivos.eliminarArchivos(req, resp);
  }
);

archivoRouter.get(
  "/abrirArchivo",
  /*[verificaToken],*/
  (req: Request, resp: Response) => {
    const abrirArchivo = new ArchivoClass();
    abrirArchivo.abrirArchivo(req, resp);
  }
);

export default archivoRouter;
