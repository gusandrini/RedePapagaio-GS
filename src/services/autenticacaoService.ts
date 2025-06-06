import { AuthResponse } from '../types/navigation';
import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const autenticarUsuario = async (usuario: string, senha: string): Promise<AuthResponse> => {
  try {
    console.log('Iniciando login para o usuário:', usuario);
    const resposta = await api.post('/autenticacao/login', null, {
      params: {
        username: usuario,
        password: senha
      }
    });

    if (resposta.data.token) {
      await AsyncStorage.setItem('@AuthData:token', resposta.data.token);
      console.log('Token armazenado com sucesso');
    }

    return resposta.data;
  } catch (erro: any) {
    console.error('Falha ao realizar o login:', {
      mensagem: erro.message,
      resposta: erro.response?.data,
      configuracao: {
        url: `${erro.config?.baseURL}${erro.config?.url}`,
        metodo: erro.config?.method
      }
    });
    throw erro;
  }
};

export const recuperarToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem('@AuthData:token');
  } catch (erro) {
    console.error('Erro ao recuperar token:', erro);
    return null;
  }
};

export const encerrarSessao = async () => {
  try {
    await AsyncStorage.removeItem('@AuthData:token');
  } catch (erro) {
    console.error('Erro ao encerrar sessão:', erro);
  }
};
