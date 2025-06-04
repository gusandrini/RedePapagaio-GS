import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

interface Usuario {
  idUsuario: number;
  nmUsuario: string;
  nmEmail: string;
  dtCadastro: string;
}

const colors = {
  darkBlue: '#031C26',
  offWhite: '#F2F2F0',
  gold: '#D9C359',
  orange: '#F2811D',
  red: '#BF1515',
  grayLight: '#ccc',
};

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [editando, setEditando] = useState(false);
  const [novoNome, setNovoNome] = useState('');

  useEffect(() => {
    async function carregarPerfil() {
      try {
        const id = await AsyncStorage.getItem('usuarioId');
        console.log('ID do usuário recuperado:', id);

        if (!id) {
          Alert.alert('Erro', 'ID do usuário não encontrado.');
          return;
        }

        const { data } = await api.get(`/usuarios/${id}`);
        console.log('Dados do usuário recebidos:', data);

        setUsuario(data);
        setNovoNome(data.nmUsuario || '');
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
        console.error('Erro ao carregar perfil:', error);
      }
    }

    carregarPerfil();
  }, []);

  const salvarEdicao = async () => {
    if (!novoNome.trim() || !usuario) {
      Alert.alert('Erro', 'O nome não pode estar vazio.');
      return;
    }

    try {
      await api.put(`/usuarios/atualizar/${usuario.idUsuario}`, {
        ...usuario,
        nmUsuario: novoNome,
      });

      setUsuario({ ...usuario, nmUsuario: novoNome });
      setEditando(false);
      Alert.alert('Perfil atualizado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar as alterações.');
      console.error('Erro ao salvar edição:', error);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('usuarioId');
    Alert.alert('Logout', 'Você saiu da conta.');
    navigation.navigate('Login' as never);
  };

  const excluirConta = async () => {
    if (!usuario) return;

    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir sua conta? Esta ação é irreversível.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.delete(`/usuarios/remover/${usuario.idUsuario}`);
              await AsyncStorage.removeItem('usuarioId');
              Alert.alert('Conta excluída com sucesso.');
              navigation.navigate('Login' as never);
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir a conta.');
              console.error('Erro ao excluir conta:', error);
            }
          },
        },
      ]
    );
  };

  if (!usuario) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={{ color: colors.offWhite }}>Carregando perfil...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Perfil do Usuário</Text>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Nome:</Text>
          {editando ? (
            <TextInput
              style={styles.input}
              value={novoNome}
              onChangeText={setNovoNome}
              placeholder="Digite seu nome"
              placeholderTextColor={colors.grayLight}
            />
          ) : (
            <Text style={styles.value}>{usuario.nmUsuario}</Text>
          )}
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{usuario.nmEmail}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Cadastro:</Text>
          <Text style={styles.value}>{usuario.dtCadastro}</Text>
        </View>

        <View style={styles.buttonContainer}>
          {editando ? (
            <>
              <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={salvarEdicao}>
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setEditando(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={[styles.button, styles.editButton]}
                onPress={() => setEditando(true)}
              >
                <Text style={styles.buttonText}>Editar perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
                <Text style={styles.buttonText}>Sair</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={excluirConta}>
                <Text style={styles.buttonText}>Excluir conta</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.darkBlue },
  container: { flexGrow: 1, padding: 20 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: colors.offWhite,
  },
  infoBox: { marginBottom: 15 },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.offWhite,
    marginBottom: 4,
  },
  value: { fontSize: 16, color: colors.offWhite },
  input: {
    borderWidth: 1,
    borderColor: colors.gold,
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
    backgroundColor: '#14394d',
    color: colors.offWhite,
    fontSize: 16,
  },
  buttonContainer: { marginTop: 30 },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: { color: colors.offWhite, fontSize: 16, fontWeight: 'bold' },
  editButton: { backgroundColor: colors.gold },
  saveButton: { backgroundColor: '#28a745' },
  cancelButton: { backgroundColor: colors.red },
  logoutButton: { backgroundColor: colors.red },
  deleteButton: { backgroundColor: '#8B0000' },
});
