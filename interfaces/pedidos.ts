import { EtapasOrdenadasInterface } from "./etapas";
import { PrioridadesOrdendasInterface } from "./prioridad";

export interface PedidosInterface {
  _id: string;
  idReferencia: string;
  fechaRegistro: string;
  fechaEntrega: string;
  vendedor: any;
  diseniador: any;
  cliente: any;
  sucursal: any;
  prioridad: any;
  etapa: any;
  color: any;
  origen: any;
  archivado: boolean;
  foranea: string;
}

export interface PromesaPrioridadesOrdInterface {
  ok: boolean;
  prioridadOrdenadaDB: PrioridadesOrdendasInterface;
  mensaje?: string;
}

export interface PromesaEtapasOrdInterface {
  ok: boolean;
  etapasOrdenadasDB: EtapasOrdenadasInterface;
  mensaje?: string;
}

/* 

Catalogos referenciados:
  1. Productos pedidos (Lleva un propiedad itmbs: boolean)
  2. Archivos
  3. Pagos
*/
