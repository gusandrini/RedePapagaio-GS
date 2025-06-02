export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  HelpOptions: { cidade: string; problema: string };
  OngDetail: { id: string; nome: string; cidade: string };
  ChatIA: undefined;
  // Feedback: undefined; // desativado no momento
  Mapa: undefined;
  About: undefined;
  Alertas: undefined;
  Notifications: undefined;
  Profile: undefined;

  // Rota para criar ou editar ocorrência
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
};

export type TabParamList = {
  Home: undefined;
  Alertas: undefined;
  Notificacoes: undefined;
  Perfil: undefined;
  Sobre: undefined;
};
