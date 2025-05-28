import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
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

const colors = {
  darkBlue: '#031C26',
  offWhite: '#F2F2F0',
  gold: '#D9C359',
  orange: '#F2811D',
  red: '#BF1515',
  grayLight: '#ccc',
  grayDark: '#555',
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
    navigation.navigate('Login' as never); // ajuste conforme seu tipo de navegação
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
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
              selectionColor={colors.gold}
            />
          ) : (
            <Text style={styles.value}>{usuario.nome}</Text>
          )}
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Tipo:</Text>
          {editando ? (
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={novoTipo}
                onValueChange={setNovoTipo}
                style={styles.picker}
                dropdownIconColor={colors.gold}
              >
                <Picker.Item label="Voluntário" value="Voluntário" />
                <Picker.Item label="Pessoa Afetada" value="Pessoa Afetada" />
                <Picker.Item label="Instituição" value="Instituição" />
              </Picker>
            </View>
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
            </>
          )}
        </View>

        {/* Avaliação do App */}
        <View style={styles.feedbackSection}>
          <Text style={styles.title}>Avalie o aplicativo</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setEstrelas(star)}>
                <Ionicons
                  name={star <= estrelas ? 'star' : 'star-outline'}
                  size={36}
                  color={star <= estrelas ? colors.gold : colors.grayLight}
                />
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={styles.input}
            placeholder="Deixe seu comentário (opcional)"
            placeholderTextColor={colors.grayLight}
            value={comentario}
            onChangeText={setComentario}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
          <TouchableOpacity style={[styles.button, styles.sendButton]} onPress={enviarFeedback}>
            <Text style={styles.buttonText}>Enviar avaliação</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: colors.offWhite,
  },
  infoBox: {
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.offWhite,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: colors.offWhite,
  },
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
  pickerWrapper: {
    borderWidth: 1,
    borderColor: colors.gold,
    borderRadius: 8,
    marginTop: 4,
    overflow: 'hidden',
    backgroundColor: '#14394d',
  },
  picker: {
    color: colors.offWhite,
    height: 44,
  },
  buttonContainer: {
    marginTop: 30,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: colors.offWhite,
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: colors.gold,
  },
  saveButton: {
    backgroundColor: '#28a745',
  },
  cancelButton: {
    backgroundColor: colors.red,
  },
  logoutButton: {
    backgroundColor: colors.red,
  },
  feedbackSection: {
    marginTop: 40,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  sendButton: {
  backgroundColor: colors.orange,
  marginTop: 12,   
  marginBottom: 0, 
},

});
