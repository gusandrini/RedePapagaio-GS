import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface Usuario {
  nome: string;
  tipo: 'Voluntário' | 'Pessoa Afetada' | 'Instituição';
  cpf: string;
  reputacao: number;
}

const mockUsuario: Usuario = {
  nome: 'João da Silva',
  tipo: 'Voluntário',
  cpf: '123.456.789-00',
  reputacao: 4.5,
};

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState<Usuario>(mockUsuario);
  const [editando, setEditando] = useState(false);
  const [novoNome, setNovoNome] = useState(usuario.nome);
  const [novoTipo, setNovoTipo] = useState(usuario.tipo);

  const [estrelas, setEstrelas] = useState(0);
  const [comentario, setComentario] = useState('');

  const salvarEdicao = () => {
    if (!novoNome.trim()) {
      Alert.alert('Erro', 'O nome não pode estar vazio.');
      return;
    }
    setUsuario({ ...usuario, nome: novoNome, tipo: novoTipo });
    setEditando(false);
    Alert.alert('Perfil atualizado', 'As informações foram salvas com sucesso.');
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Você saiu da conta.');
    navigation.navigate('Login' as never); // ajuste necessário se tipo não estiver explícito
  };

  const enviarFeedback = () => {
    if (estrelas === 0) {
      Alert.alert('Aviso', 'Por favor, selecione uma nota.');
      return;
    }
    console.log('Feedback enviado:', { estrelas, comentario });
    Alert.alert('Obrigado!', 'Sua avaliação foi registrada.');
    setEstrelas(0);
    setComentario('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Nome:</Text>
        {editando ? (
          <TextInput
            style={styles.input}
            value={novoNome}
            onChangeText={setNovoNome}
          />
        ) : (
          <Text style={styles.value}>{usuario.nome}</Text>
        )}
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Tipo:</Text>
        {editando ? (
          <Picker
            selectedValue={novoTipo}
            onValueChange={setNovoTipo}
            style={styles.picker}
          >
            <Picker.Item label="Voluntário" value="Voluntário" />
            <Picker.Item label="Pessoa Afetada" value="Pessoa Afetada" />
            <Picker.Item label="Instituição" value="Instituição" />
          </Picker>
        ) : (
          <Text style={styles.value}>{usuario.tipo}</Text>
        )}
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>CPF:</Text>
        <Text style={styles.value}>{usuario.cpf}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Reputação:</Text>
        <Text style={styles.value}>
          {'⭐'.repeat(Math.round(usuario.reputacao))} ({usuario.reputacao})
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        {editando ? (
          <>
            <Button title="Salvar" onPress={salvarEdicao} color="#28a745" />
            <View style={{ marginVertical: 10 }} />
            <Button title="Cancelar" onPress={() => setEditando(false)} color="#6c757d" />
          </>
        ) : (
          <>
            <Button title="Editar perfil" onPress={() => setEditando(true)} color="#007bff" />
            <View style={{ marginVertical: 10 }} />
            <Button title="Sair" onPress={handleLogout} color="#dc3545" />
          </>
        )}
      </View>

      {/* Avaliação do App */}
      <View style={{ marginTop: 40 }}>
        <Text style={styles.title}>Avalie o aplicativo</Text>
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => setEstrelas(star)}>
              <Ionicons
                name={star <= estrelas ? 'star' : 'star-outline'}
                size={36}
                color={star <= estrelas ? '#f5c518' : '#ccc'}
              />
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Deixe seu comentário (opcional)"
          value={comentario}
          onChangeText={setComentario}
          multiline
          numberOfLines={3}
        />
        <Button title="Enviar avaliação" onPress={enviarFeedback} color="#007bff" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#f2f2f2' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 },
  infoBox: { marginBottom: 15 },
  label: { fontWeight: 'bold', fontSize: 16 },
  value: { fontSize: 16, color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 4,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
  },
  picker: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 4,
  },
  buttonContainer: { marginTop: 30 },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
});
