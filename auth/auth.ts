import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
const SEED = require("../environment/environment");

// Globales
import { environmnet } from "../environment/environment";

const verificaToken = (req: any, resp: Response, next: NextFunction) => {
  const token = req.get("token") || "";

  // Comprobación del token
  jwt.verify(token, environmnet.SEED, (err: any, decoded: any) => {
    if (err) {
      return resp.json({
        ok: false,
        mensaje: `Token incorrecto`,
        err,
      });
    }

    // Insertar en el Request el usuario
    req.usuario = decoded.usuario;
    next();
  });
};

export { verificaToken };
