// src/types/navigation.ts

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  HelpOptions: { cidade: string; problema: string };
  OngDetail: { id: string; nome: string; cidade: string };
  ChatIA: undefined;
  Feedback: undefined;
  Mapa: undefined; 
  About: undefined;
};

export type TabParamList = {
  Home: undefined;
  Alertas: undefined;
  Notificacoes: undefined;
  Perfil: undefined;
  Sobre: undefined;
};
