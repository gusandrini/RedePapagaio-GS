export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  HelpOptions: { cidade: string; problema: string };
  OngDetail: { id: string; nome: string; cidade: string };
  ChatIA: undefined;
  Mapa: undefined;
  CreateOccurrence: {
    ocorrencia?: Ocorrencia;
  };
  WhatsApp: undefined;
};

export type TabParamList = {
  Home: undefined;
  Alertas: undefined;
  WhatsApp: undefined;
  Perfil: undefined;
  Sobre: undefined;
};

export interface AuthResponse {
  token: string;
}

export interface TipoOcorrencia {
  idTipoOcorrencia: number;
  nmTipoOcorrencia: string;
}

export interface Regiao {
  idRegiao: number;
  nmRegiao: string;
  nmCidade: string;
  nmEstado: string;
}

export interface NivelUrgencia {
  idNivelUrgencia: number;
  nmNivel: string;
}

export interface StatusOcorrencia {
  idStatusOcorrencia: number;
}

export interface Ocorrencia {
  idOcorrencia: number;
  tipoOcorrencia: TipoOcorrencia;
  regiao: Regiao;
  nivelUrgencia: NivelUrgencia;
  statusOcorrencia: StatusOcorrencia;
  dsOcorrencia: string;
}
