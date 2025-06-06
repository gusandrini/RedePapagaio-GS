import { AuthResponse } from '../types/navigation';
import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const autenticarUsuario = async (usuario: string, senha: string): Promise<AuthResponse> => {
  try {
    // Usando o parâmetro 'usuario' no lugar de 'email'
    const resposta = await api.post('/autenticacao/login', { username: usuario, password: senha });

    if (resposta.data.token) {
      // Armazenando o token
      await AsyncStorage.setItem('@AuthData:token', resposta.data.token);
      console.log('Token armazenado com sucesso:', resposta.data.token);
    }

    return resposta.data;
  } catch (erro: any) {
    console.error('Erro ao realizar o login:', erro);
    throw erro;
  }
};

export const recuperarToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('@AuthData:token');
    return token;
  } catch (erro) {
    console.error('Erro ao recuperar token:', erro);
    return null;
  }
};

export const encerrarSessao = async () => {
  try {
    await AsyncStorage.removeItem('@AuthData:token');
    console.log('Sessão encerrada com sucesso');
  } catch (erro) {
    console.error('Erro ao encerrar sessão:', erro);
  }
};
