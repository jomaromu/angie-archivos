import { Response, Request } from "express";

const datosArchivos = (req: any, resp: Response) => {
  let archivo = null;

  if (!req.files || Object.keys(req.files).length === 0) {
    return null;
  }

  if (req.files.archivo.length > 0) {
    archivo = req.files.archivo[0];
    return archivo;
  }

  if (req.files.archivo) {
    archivo = req.files;
    return archivo.archivo;
  }
};

export { datosArchivos };
