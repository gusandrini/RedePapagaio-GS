import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

// Função para verificar e recuperar o token do AsyncStorage
const verificarToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('@AuthData:token');
    if (!token) {
      throw new Error('Token não encontrado');
    }
    return token;
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    return null;
  }
};

// CONTROLADORES

// Usuário Controller
export const usuariosService = {
  getUsuario: async (id: number) => {
    const token = await verificarToken();
    if (!token) throw new Error('Token não encontrado');
    const response = await api.get(`/usuarios/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  createUsuario: async (usuarioData: any) => {
    const token = await verificarToken();
    if (!token) throw new Error('Token não encontrado');
    const response = await api.post('/usuarios/inserir', usuarioData);
    return response.data;
  },
  updateUsuario: async (id: number, usuarioData: any) => {
    const token = await verificarToken();
    if (!token) throw new Error('Token não encontrado');
    const response = await api.put(`/usuarios/atualizar/${id}`, usuarioData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  deleteUsuario: async (id: number) => {
    const token = await verificarToken();
    if (!token) throw new Error('Token não encontrado');
    await api.delete(`/usuarios/remover/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  getTodosUsuarios: async () => {
    const token = await verificarToken();
    if (!token) throw new Error('Token não encontrado');
    const response = await api.get('/usuarios/todos', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

// Tipo Ocorrência Controller
export const tipoOcorrenciaService = {
  getTiposOcorrencia: async () => {
    const token = await verificarToken();
    if (!token) throw new Error('Token não encontrado');
    const response = await api.get('/tipos_ocorrencias/todos', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  createTipoOcorrencia: async (tipoData: any) => {
    const token = await verificarToken();
    if (!token) throw new Error('Token não encontrado');
    const response = await api.post('/tipos_ocorrencias/inserir', tipoData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  updateTipoOcorrencia: async (id: number, tipoData: any) => {
    const token = await verificarToken();
    if (!token) throw new Error('Token não encontrado');
    const response = await api.put(`/tipos_ocorrencias/atualizar/${id}`, tipoData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  deleteTipoOcorrencia: async (id: number) => {
    const token = await verificarToken();
    if (!token) throw new Error('Token não encontrado');
    await api.delete(`/tipos_ocorrencias/remover/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

// Tipo Ajuda Controller
export const tipoAjudaService = {
  getTiposAjuda: async () => {
    const token = await verificarToken();
    if (!token) throw new Error('Token não encontrado');
    const response = await api.get('/tipos_ajudas/todos', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  createTipoAjuda: async (tipoData: any) => {
    const token = await verificarToken();
    if (!token) throw new Error('Token não encontrado');
    const response = await api.post('/tipos_ajudas/inserir', tipoData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  updateTipoAjuda: async (id: number, tipoData: any) => {
    const token = await verificarToken();
    if (!token) throw new Error('Token não encontrado');
    const response = await api.put(`/tipos_ajudas/atualizar/${id}`, tipoData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  deleteTipoAjuda: async (id: number) => {
    const token = await verificarToken();
    if (!token) throw new Error('Token não encontrado');
    await api.delete(`/tipos_ajudas/remover/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

// Telefone Controller
export const telefoneService = {
  getTelefone: async (id: number) => {
    const token = await verificarToken();
    if (!token) throw new Error('Token não encontrado');
    const response = await api.get(`/telefones/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  createTelefone: async (telefoneData: any) => {
    const token = await verificarToken();
    if (!token) throw new Error('Token não encontrado');
    const response = await api.post('/telefones/inserir', telefoneData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  updateTelefone: async (id: number, telefoneData: any) => {
    const token = await verificarToken();
    if (!token) throw new Error('Token não encontrado');
    const response = await api.put(`/telefones/atualizar/${id}`, telefoneData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  deleteTelefone: async (id: number) => {
    const token = await verificarToken();
    if (!token) throw new Error('Token não encontrado');
    await api.delete(`/telefones/remover/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

// Status Ocorrência Controller
export const statusOcorrenciaService = {
  getStatusOcorrencias: async () => {
    const token = await verificarToken();
    if (!token) throw new Error('Token não encontrado');
    const response = await api.get('/status_ocorrencias/todos', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  createStatusOcorrencia: async (statusData: any) => {
    const token = await verificarToken();
    if (!token) throw new Error('Token não encontrado');
    const response = await api.post('/status_ocorrencias/inserir', statusData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  updateStatusOcorrencia: async (id: number, statusData: any) => {
    const token = await verificarToken();
    if (!token) throw new Error('Token não encontrado');
    const response = await api.put(`/status_ocorrencias/atualizar/${id}`, statusData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  deleteStatusOcorrencia: async (id: number) => {
    const token = await verificarToken();
    if (!token) throw new Error('Token não encontrado');
    await api.delete(`/status_ocorrencias/remover/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

// Regiao Controller
export const regiaoService = {
  getRegiao: async (id: number) => {
    const token = await verificarToken();
    if (!token) throw new Error('Token não encontrado');
    const response = await api.get(`/regioes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  createRegiao: async (regiaoData: any) => {
    const token = await verificarToken();
    if (!token) throw new Error('Token não encontrado');
    const response = await api.post('/regioes/inserir', regiaoData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  updateRegiao: async (id: number, regiaoData: any) => {
    const token = await verificarToken();
    if (!token) throw new Error('Token não encontrado');
    const response = await api.put(`/regioes/atualizar/${id}`, regiaoData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  deleteRegiao: async (id: number) => {
    const token = await verificarToken();
    if (!token) throw new Error('Token não encontrado');
    await api.delete(`/regioes/remover/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

// Ocorrencia Controller
export const ocorrenciaService = {
  getOcorrencia: async (id: number) => {
    const token = await verificarToken();
    if (!token) throw new Error('Token não encontrado');
    const response = await api.get(`/ocorrencias/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  createOcorrencia: async (ocorrenciaData: any) => {
    const token = await verificarToken();
    if (!token) throw new Error('Token não encontrado');
    const response = await api.post('/ocorrencias/inserir', ocorrenciaData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  updateOcorrencia: async (id: number, ocorrenciaData: any) => {
    const token = await verificarToken();
    if (!token) throw new Error('Token não encontrado');
    const response = await api.put(`/ocorrencias/atualizar/${id}`, ocorrenciaData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  deleteOcorrencia: async (id: number) => {
    const token = await verificarToken();
    if (!token) throw new Error('Token não encontrado');
    await api.delete(`/ocorrencias/remover/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

// Nivel Urgencia Controller
export const nivelUrgenciaService = {
  getNivelUrgencia: async (id: number) => {
    const token = await verificarToken();
    if (!token) throw new Error('Token não encontrado');
    const response = await api.get(`/niveis_urgencias/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  createNivelUrgencia: async (nivelData: any) => {
    const token = await verificarToken();
    if (!token) throw new Error('Token não encontrado');
    const response = await api.post('/niveis_urgencias/inserir', nivelData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  updateNivelUrgencia: async (id: number, nivelData: any) => {
    const token = await verificarToken();
    if (!token) throw new Error('Token não encontrado');
    const response = await api.put(`/niveis_urgencias/atualizar/${id}`, nivelData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  deleteNivelUrgencia: async (id: number) => {
    const token = await verificarToken();
    if (!token) throw new Error('Token não encontrado');
    await api.delete(`/niveis_urgencias/remover/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
