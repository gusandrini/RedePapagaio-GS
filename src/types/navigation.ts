export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  HelpOptions: { cidade: string; problema: string };
  OngDetail: { id: string; nome: string; cidade: string };
  ChatIA: undefined;
  Feedback: undefined;
  Mapa: undefined;
  About: undefined;
  Alertas: undefined;

  // Rota para criar ou editar ocorrência
  CreateOccurrence: {
    ocorrencia?: {
      idOcorrencia: number;
      tipoOcorrencia: { dsTipoOcorrencia: string };
      regiao: { nmRegiao: string };
      nivelUrgencia: { idNivelUrgencia: number };
      statusOcorrencia: { idStatusOcorrencia: number };
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
