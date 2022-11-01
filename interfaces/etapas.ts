export interface EtapaModelInterface {
  _id: string;
  idCreador: string;
  nombre: string;
  estado: boolean;
  foranea: string;
}

export interface EtapasOrdenadasInterface {
  _id: string;
  colEtapas: string;
  foranea: string;
  etapas: Array<EtapaModelInterface>;
}
