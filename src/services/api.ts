import axios from 'axios';
import { recuperarToken } from './autenticacaoService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { reset } from './navigationService';

const api = axios.create({
  baseURL: 'http://192.168.68.111:8080',  
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

    // Logging de requisição (remover ou ajustar para produção)
    if (__DEV__) {
      console.log('Requisição:', {
        url: config.url,
        method: config.method,
        headers: config.headers,
        data: config.data,
      });
    }

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
    // Logging de resposta (remover ou ajustar para produção)
    if (__DEV__) {
      console.log('Resposta:', {
        status: response.status,
        data: response.data,
      });
    }
    return response;
  },
  async (error) => {
    const status = error.response?.status;
    console.error('Erro na resposta:', {
      status,
      data: error.response?.data,
      message: error.message,
    });

    if (status === 401 || status === 403) {
      // Limpa todos os dados armazenados
      await AsyncStorage.clear();
      
      Alert.alert(
        'Sessão Expirada',
        'Sua sessão expirou ou você não tem permissão. Por favor, faça login novamente.',
        [
          {
            text: 'OK',
            onPress: () => reset('Login') // Reseta a navegação para a tela de login
          }
        ]
      );
    } else if (status >= 500) {
      console.error('Erro interno no servidor. Tente novamente mais tarde.');
    }

    return Promise.reject(error);
  }
);

export default api;
