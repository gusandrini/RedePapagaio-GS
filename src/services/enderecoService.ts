import { NivelUrgencia, Ocorrencia, Regiao, RootStackParamList, StatusOcorrencia, TipoOcorrencia } from '../types/navigation';
import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Função auxiliar para verificar o token
const verificarToken = async () => {
  try {
    const token = await AsyncStorage.getItem('@AuthData:token');
    console.log('Token atual:', token);
    return token;
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    return null;
  }
};

export const ocorrenciaService = {
  // TipoOcorrencia: CRUD
  getTiposOcorrencia: async (): Promise<TipoOcorrencia[]> => {
    try {
      console.log('Iniciando busca de tipos de ocorrências...');
      const token = await verificarToken();

      if (!token) {
        throw new Error('Token não encontrado');
      }

      const response = await api.get('/tipos_ocorrencias/todos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Erro ao buscar tipos de ocorrências:', error);
      throw error;
    }
  },

  createTipoOcorrencia: async (tipoOcorrencia: Omit<TipoOcorrencia, 'idTipoOcorrencia'>): Promise<TipoOcorrencia> => {
    try {
      console.log('Iniciando criação de tipo de ocorrência:', tipoOcorrencia);
      const token = await verificarToken();

      if (!token) {
        throw new Error('Token não encontrado');
      }

      const response = await api.post('/tipos_ocorrencias/inserir', tipoOcorrencia, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Erro ao criar tipo de ocorrência:', error);
      throw error;
    }
  },

  updateTipoOcorrencia: async (id: number, tipoOcorrencia: Omit<TipoOcorrencia, 'idTipoOcorrencia'>): Promise<TipoOcorrencia> => {
    try {
      console.log('Iniciando atualização de tipo de ocorrência:', { id, tipoOcorrencia });
      const token = await verificarToken();

      if (!token) {
        throw new Error('Token não encontrado');
      }

      const response = await api.put(`/tipos_ocorrencias/atualizar/${id}`, tipoOcorrencia, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Erro ao atualizar tipo de ocorrência:', error);
      throw error;
    }
  },

  deleteTipoOcorrencia: async (id: number): Promise<void> => {
    try {
      console.log('Iniciando deleção de tipo de ocorrência:', id);
      const token = await verificarToken();

      if (!token) {
        throw new Error('Token não encontrado');
      }

      await api.delete(`/tipos_ocorrencias/remover/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error: any) {
      console.error('Erro ao deletar tipo de ocorrência:', error);
      throw error;
    }
  },

  // Regiao: CRUD
  getRegioes: async (): Promise<Regiao[]> => {
    try {
      console.log('Iniciando busca de regiões...');
      const token = await verificarToken();

      if (!token) {
        throw new Error('Token não encontrado');
      }

      const response = await api.get('/regioes/todas', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Erro ao buscar regiões:', error);
      throw error;
    }
  },

  createRegiao: async (regiao: Omit<Regiao, 'idRegiao'>): Promise<Regiao> => {
    try {
      const token = await verificarToken();

      if (!token) {
        throw new Error('Token não encontrado');
      }

      const response = await api.post('/regioes/inserir', regiao, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Erro ao criar região:', error);
      throw error;
    }
  },

  updateRegiao: async (id: number, regiao: Omit<Regiao, 'idRegiao'>): Promise<Regiao> => {
    try {
      const token = await verificarToken();

      if (!token) {
        throw new Error('Token não encontrado');
      }

      const response = await api.put(`/regioes/atualizar/${id}`, regiao, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Erro ao atualizar região:', error);
      throw error;
    }
  },

  deleteRegiao: async (id: number): Promise<void> => {
    try {
      const token = await verificarToken();

      if (!token) {
        throw new Error('Token não encontrado');
      }

      await api.delete(`/regioes/remover/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error: any) {
      console.error('Erro ao deletar região:', error);
      throw error;
    }
  },

  // NivelUrgencia: CRUD
  getNiveisUrgencia: async (): Promise<NivelUrgencia[]> => {
    try {
      const token = await verificarToken();

      if (!token) {
        throw new Error('Token não encontrado');
      }

      const response = await api.get('/niveis_urgencias/todos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Erro ao buscar níveis de urgência:', error);
      throw error;
    }
  },

  createNivelUrgencia: async (nivelUrgencia: Omit<NivelUrgencia, 'idNivelUrgencia'>): Promise<NivelUrgencia> => {
    try {
      const token = await verificarToken();

      if (!token) {
        throw new Error('Token não encontrado');
      }

      const response = await api.post('/niveis_urgencias/inserir', nivelUrgencia, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Erro ao criar nível de urgência:', error);
      throw error;
    }
  },

  updateNivelUrgencia: async (id: number, nivelUrgencia: Omit<NivelUrgencia, 'idNivelUrgencia'>): Promise<NivelUrgencia> => {
    try {
      const token = await verificarToken();

      if (!token) {
        throw new Error('Token não encontrado');
      }

      const response = await api.put(`/niveis_urgencias/atualizar/${id}`, nivelUrgencia, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Erro ao atualizar nível de urgência:', error);
      throw error;
    }
  },

  deleteNivelUrgencia: async (id: number): Promise<void> => {
    try {
      const token = await verificarToken();

      if (!token) {
        throw new Error('Token não encontrado');
      }

      await api.delete(`/niveis_urgencias/remover/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error: any) {
      console.error('Erro ao deletar nível de urgência:', error);
      throw error;
    }
  },

  // StatusOcorrencia: CRUD
  getStatusOcorrencia: async (): Promise<StatusOcorrencia[]> => {
    try {
      const token = await verificarToken();

      if (!token) {
        throw new Error('Token não encontrado');
      }

      const response = await api.get('/status_ocorrencias/todos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Erro ao buscar status de ocorrências:', error);
      throw error;
    }
  },

  createStatusOcorrencia: async (statusOcorrencia: Omit<StatusOcorrencia, 'idStatusOcorrencia'>): Promise<StatusOcorrencia> => {
    try {
      const token = await verificarToken();

      if (!token) {
        throw new Error('Token não encontrado');
      }

      const response = await api.post('/status_ocorrencias/inserir', statusOcorrencia, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Erro ao criar status de ocorrência:', error);
      throw error;
    }
  },

  updateStatusOcorrencia: async (id: number, statusOcorrencia: Omit<StatusOcorrencia, 'idStatusOcorrencia'>): Promise<StatusOcorrencia> => {
    try {
      const token = await verificarToken();

      if (!token) {
        throw new Error('Token não encontrado');
      }

      const response = await api.put(`/status_ocorrencias/atualizar/${id}`, statusOcorrencia, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Erro ao atualizar status de ocorrência:', error);
      throw error;
    }
  },

  deleteStatusOcorrencia: async (id: number): Promise<void> => {
    try {
      const token = await verificarToken();

      if (!token) {
        throw new Error('Token não encontrado');
      }

      await api.delete(`/status_ocorrencias/remover/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error: any) {
      console.error('Erro ao deletar status de ocorrência:', error);
      throw error;
    }
  },
};
