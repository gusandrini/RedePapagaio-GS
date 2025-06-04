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

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleAuth = async () => {
    if (!email.trim() || !password.trim() || (!isLogin && !nome.trim())) {
      return Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
    }

    setLoading(true);

    try {
      if (isLogin) {
        const response = await api.get('/usuarios/todos');
        const usuarios = response.data;

        const usuarioEncontrado = usuarios.find(
          (u: any) =>
            u.nmEmail?.toLowerCase() === email.toLowerCase() &&
            u.nmSenha === password
        );

        if (usuarioEncontrado) {
          await AsyncStorage.setItem('usuarioId', String(usuarioEncontrado.idUsuario));
          Alert.alert('Sucesso', 'Login realizado com sucesso!');
          navigation.navigate('Home');
        } else {
          Alert.alert('Erro', 'Email ou senha inválidos');
        }

      } else {
        // ✅ Corrigido para gerar data válida mesmo com fuso horário
        const hoje = new Date();
        const dataCadastro = new Date(
          hoje.getFullYear(),
          hoje.getMonth(),
          hoje.getDate()
        ).toISOString().split('T')[0];

        const novoUsuario = {
          nmUsuario: nome,
          nmEmail: email,
          nmSenha: password,
          dtCadastro: dataCadastro,
        };

        console.log('Cadastro enviado:', novoUsuario);

        const response = await api.post('/usuarios/inserir', novoUsuario);
        const usuarioCriado = response.data;

        if (usuarioCriado?.idUsuario) {
          await AsyncStorage.setItem('usuarioId', String(usuarioCriado.idUsuario));
          Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
          navigation.navigate('Home');
        } else {
          Alert.alert('Cadastro realizado', 'Faça login para continuar.');
          setIsLogin(true);
        }
      }

    } catch (error: any) {
      console.error('Erro na autenticação:', error.response?.data || error);
      Alert.alert(
        'Erro',
        error?.response?.data?.message || 'Erro interno. Verifique os dados enviados.'
      );
    } finally {
      setLoading(false);
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
