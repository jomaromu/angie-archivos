import express from "express";
import socketIO from "socket.io";
import http from "http";
import { environmnet } from "../environment/environment";

export default class Server {
  // propiedades
  private static _instance: Server;

  public app: express.Application;
  public port: Number;

  public io: socketIO.Server;
  public httpServer: http.Server;

  constructor() {
    this.app = express();
    this.httpServer = new http.Server(this.app);
    this.port = environmnet.port;

    // configuro io
    this.io = new socketIO.Server(this.httpServer, {
      cors: {
        origin: true,
        credentials: true,
      },
    });

    this.escucharConexiones();
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  private escucharConexiones() {
    console.log("Escuchando conexiones");

    this.io.on("connection", (cliente) => {
      cliente.on("room", (room) => {
        cliente.join(room);
        console.log(`Cliente conectado a room: ${room}`);
      });
    });
  }

  // levantar el servidor
  start(callback: Function): void {
    this.httpServer.listen(this.port, callback());
  }
}
