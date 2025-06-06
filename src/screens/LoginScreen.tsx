import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../types/navigation';
import api from '../services/api';
import axios from 'axios';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<LoginScreenNavigationProp>();

  // Função para autenticar o usuário (login ou cadastro)
  const handleAuth = async () => {
    // Verifica se os campos obrigatórios estão preenchidos
    if (!email.trim() || !password.trim() || (!isLogin && !nome.trim())) {
      return Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
    }
    console.log("Passou pelo trim de email e senha")
    setLoading(true);

    try {
      if (isLogin) {
        // Requisição de login para autenticar o usuário e pegar o token JWT
        console.log("Estou aqui em login")
        const response = await api.post('/autenticacao/login', { username: email, password });

        const { token } = response.data;
        console.log('Token recebido:', token); // Log para verificar se o token está vindo

        if (token) {
          // Armazenando o token no AsyncStorage
          await AsyncStorage.setItem('@AuthData:token', token);
          console.log('Token armazenado com sucesso:', token);  // Log de sucesso

          Alert.alert('Sucesso', 'Login realizado com sucesso!');
          navigation.navigate('Home');
          setEmail('');
          setPassword('');
        } else {
          Alert.alert('Erro', 'Email ou senha inválidos');
        }
      } else {
        const hoje = new Date();
        const dataCadastro = new Date(
          hoje.getFullYear(),
          hoje.getMonth(),
          hoje.getDate()
        ).toISOString().split('T')[0];

        const novoUsuario = {
          idUsuario: 0,
          nmUsuario: nome,
          nmEmail: email,  // Aqui está o uso correto do campo 'email'
          nmSenha: password,  // Senha em texto simples
          dtCadastro: dataCadastro,
        };

        console.log(novoUsuario)
        console.log("Preparando para salvar novo usuário")
        // Requisição de cadastro de novo usuário
        const response = await api.post('/usuarios/inserir', novoUsuario);
        // const response = await axios.post('http://liknr60-anonymous-8081.exp.direct:8080/usuarios/inserir', novoUsuario)
        console.log(`Resposta da função: ${response}`)
      
        const usuarioCriado = response.data;
        console.log(`Usuário criado: ${usuarioCriado}`)

        if (usuarioCriado?.idUsuario) {
          Alert.alert('Sucesso', 'Cadastro realizado com sucesso! Faça login.');
          setIsLogin(true);  // Troca para a tela de login
        } else {
          Alert.alert('Erro', 'Ocorreu um erro ao cadastrar. Tente novamente.');
        }
        setNome('');
        setEmail('');
        setPassword('');
      }
    } catch (error: any) {
      console.error('Erro na autenticação:', error.response?.data || error);

      // Mensagem de erro mais clara para diferentes tipos de falha
      if (error?.message === 'Network Error') {
        Alert.alert('Erro de Rede', 'Não foi possível conectar ao servidor. Verifique sua conexão.');
      } else {
        Alert.alert(
          'Erro',
          error?.response?.data?.message || 'Erro interno. Verifique os dados enviados.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Função para verificar se o token está armazenado no AsyncStorage
  const verificarToken = async (): Promise<string | null> => {
    try {
      const token = await AsyncStorage.getItem('@AuthData:token');
      console.log('Token recuperado:', token); // Log para verificar se o token está sendo recuperado
      if (!token) {
        throw new Error('Token não encontrado');
      }
      return token;
    } catch (error) {
      console.error('Erro ao verificar token:', error);
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Login' : 'Cadastro'}</Text>

      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor={colors.offWhite}
          value={nome}
          onChangeText={setNome}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor={colors.offWhite}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor={colors.offWhite}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {loading ? (
        <ActivityIndicator size="large" color={colors.orange} style={styles.loader} />
      ) : (
        <TouchableOpacity style={styles.buttonContainer} onPress={handleAuth} activeOpacity={0.8}>
          <Text style={styles.buttonText}>{isLogin ? 'Entrar' : 'Cadastrar'}</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)} disabled={loading}>
        <Text style={styles.toggle}>
          {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const colors = {
  darkBlue: '#031C26',
  offWhite: '#F2F2F0',
  gold: '#D9C359',
  orange: '#F2811D',
  red: '#BF1515',
  grayLight: '#ccc',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: colors.darkBlue,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: colors.offWhite,
  },
  input: {
    borderWidth: 1.5,
    borderColor: colors.gold,
    backgroundColor: colors.darkBlue,
    color: colors.offWhite,
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  toggle: {
    color: colors.gold,
    textAlign: 'center',
    marginTop: 18,
    fontWeight: '600',
  },
  loader: {
    marginVertical: 12,
  },
  buttonContainer: {
    backgroundColor: colors.orange,
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 10,
  },
  buttonText: {
    color: colors.offWhite,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});
