export interface PrioridadModelInterface {
  _id: string;
  idCreador: string;
  nombre: string;
  estado: boolean;
  foranea: string;
}

export interface PrioridadesOrdendasInterface {
  _id: string;
  colPrioridad: string;
  foranea: string;
  prioridades: Array<PrioridadModelInterface>;
}
