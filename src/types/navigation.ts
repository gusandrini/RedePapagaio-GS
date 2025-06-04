export type RootStackParamList = {
  Login: undefined;
  Home: undefined;

  HelpOptions: { cidade: string; problema: string };
  OngDetail: { id: string; nome: string; cidade: string };
  ChatIA: undefined;
  Mapa: undefined;
  CreateOccurrence: {
    ocorrencia?: {
      idOcorrencia: number;
      tipoOcorrencia: {
        idTipoOcorrencia: number;
        nmTipoOcorrencia: string;
      };
      regiao: {
        idRegiao: number;
        nmRegiao: string;
        nmCidade: string;
        nmEstado: string;
      };
      nivelUrgencia: {
        idNivelUrgencia: number;
        nmNivel: string;
      };
      statusOcorrencia: {
        idStatusOcorrencia: number;
      };
      dsOcorrencia: string;
    };
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
