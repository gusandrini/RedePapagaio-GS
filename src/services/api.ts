import axios from 'axios';
import { recuperarToken } from './autenticacaoService';

const api = axios.create({
  baseURL: 'http://192.168.68.111:8082', // Altere para o endereço correto
  timeout: 15000,  // Tempo de espera ajustado para 15 segundos
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor de requisição - Adiciona o token de autenticação
api.interceptors.request.use(
  async (config) => {
    const token = await recuperarToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn('Token não encontrado');
    }
    
    console.log('Requisição:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data
    });
    
    return config;
  },
  (error) => {
    console.error('Erro na requisição:', error);
    return Promise.reject(error);
  }
);

// Interceptor de resposta - Trata as respostas e erros
api.interceptors.response.use(
  (response) => {
    console.log('Resposta:', {
      status: response.status,
      data: response.data
    });
    return response;
  },
  async (error) => {
    const status = error.response?.status;
    console.error('Erro na resposta:', {
      status,
      data: error.response?.data,
      message: error.message
    });
    
    if (status === 401) {
      console.error('Token inválido ou expirado. Reautentique-se.');
      // Aqui você pode redirecionar o usuário para a tela de login, caso o token esteja expirado.
    } else if (status === 403) {
      console.error('Acesso proibido. O usuário não tem permissão para acessar este recurso.');
    } else if (status >= 500) {
      console.error('Erro interno no servidor. Tente novamente mais tarde.');
    }
    
    return Promise.reject(error);
  }
);

export default api;
