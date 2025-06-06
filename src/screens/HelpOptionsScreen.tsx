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
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

interface Ocorrencia {
  idOcorrencia: number;
  dsOcorrencia: string;
}

interface TipoAjuda {
  idTipoAjuda: number;
  nmTipoAjuda: string;
}

const colors = {
  darkBlue: '#031C26',
  offWhite: '#F2F2F0',
  gold: '#D9C359',
  orange: '#F2811D',
  red: '#BF1515',
  grayLight: '#ccc',
};

export default function HelpOptionsScreen() {
  const [usuarioId, setUsuarioId] = useState<string | null>(null);
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [tiposAjuda, setTiposAjuda] = useState<TipoAjuda[]>([]);

  const [ocorrenciaSelecionada, setOcorrenciaSelecionada] = useState<number | undefined>(undefined);
  const [tipoAjudaSelecionado, setTipoAjudaSelecionado] = useState<number | undefined>(undefined);
  const [descricao, setDescricao] = useState('');

  const [modalOcorrenciaVisivel, setModalOcorrenciaVisivel] = useState(false);
  const [modalTipoAjudaVisivel, setModalTipoAjudaVisivel] = useState(false);

  useEffect(() => {
    async function carregarDados() {
      try {
        const id = await AsyncStorage.getItem('usuarioId');
        if (id) {
          setUsuarioId(id);
        } else {
          Alert.alert('Erro', 'Usuário não encontrado.');
        }

        const ocorrenciasResp = await api.get('/ocorrencias/todas');
        setOcorrencias(ocorrenciasResp.data);

        const tiposAjudaResp = await api.get('/tipos_ajudas/todos');
        setTiposAjuda(tiposAjudaResp.data);
      } catch (error) {
        Alert.alert('Erro', 'Falha ao carregar dados iniciais.');
        console.error(error);
      }
    }

    carregarDados();
  }, []);

  const handleEnviarAjuda = async () => {
    if (!usuarioId || !ocorrenciaSelecionada || !tipoAjudaSelecionado || !descricao.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    const hoje = new Date();
    const dataFormatada = hoje.toLocaleDateString('sv-SE'); // Formato de data no padrão ISO

    const payload = {
      usuario: { idUsuario: Number(usuarioId) },
      ocorrencia: { idOcorrencia: ocorrenciaSelecionada },
      tipoAjuda: { idTipoAjuda: tipoAjudaSelecionado },
      dsAjuda: descricao,
      dtAjuda: dataFormatada,
    };

    try {
      await api.post('/ajudas/inserir', payload);
      Alert.alert('Sucesso', 'Ajuda registrada com sucesso!');
      // Limpa os campos após sucesso
      setOcorrenciaSelecionada(undefined);
      setTipoAjudaSelecionado(undefined);
      setDescricao('');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao registrar ajuda.');
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Registrar Ajuda</Text>

        <Text style={styles.label}>Ocorrência:</Text>
        <TouchableOpacity style={styles.selectBox} onPress={() => setModalOcorrenciaVisivel(true)}>
          <Text style={styles.selectText}>
            {ocorrenciaSelecionada
              ? ocorrencias.find((o) => o.idOcorrencia === ocorrenciaSelecionada)?.dsOcorrencia
              : 'Selecione uma ocorrência'}
          </Text>
        </TouchableOpacity>

        <Modal isVisible={modalOcorrenciaVisivel} onBackdropPress={() => setModalOcorrenciaVisivel(false)}>
          <View style={styles.modalContent}>
            {ocorrencias.map((oc) => (
              <TouchableOpacity
                key={oc.idOcorrencia}
                onPress={() => {
                  setOcorrenciaSelecionada(oc.idOcorrencia);
                  setModalOcorrenciaVisivel(false);
                }}
                style={styles.modalItem}
              >
                <Text style={styles.modalItemText}>{oc.dsOcorrencia}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>

        <Text style={styles.label}>Tipo de Ajuda:</Text>
        <TouchableOpacity style={styles.selectBox} onPress={() => setModalTipoAjudaVisivel(true)}>
          <Text style={styles.selectText}>
            {tipoAjudaSelecionado
              ? tiposAjuda.find((t) => t.idTipoAjuda === tipoAjudaSelecionado)?.nmTipoAjuda.replace(/_/g, ' ')
              : 'Selecione um tipo de ajuda'}
          </Text>
        </TouchableOpacity>

        <Modal isVisible={modalTipoAjudaVisivel} onBackdropPress={() => setModalTipoAjudaVisivel(false)}>
          <View style={styles.modalContent}>
            {tiposAjuda.map((tipo) => (
              <TouchableOpacity
                key={tipo.idTipoAjuda}
                onPress={() => {
                  setTipoAjudaSelecionado(tipo.idTipoAjuda);
                  setModalTipoAjudaVisivel(false);
                }}
                style={styles.modalItem}
              >
                <Text style={styles.modalItemText}>{tipo.nmTipoAjuda.replace(/_/g, ' ')}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>

        <Text style={styles.label}>Descrição:</Text>
        <TextInput
          style={styles.input}
          placeholder="Descreva a ajuda prestada"
          placeholderTextColor={colors.grayLight}
          value={descricao}
          onChangeText={setDescricao}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.button} onPress={handleEnviarAjuda}>
          <Text style={styles.buttonText}>Enviar Ajuda</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.darkBlue },
  container: { flexGrow: 1, padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.gold,
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    color: colors.offWhite,
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gold,
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#14394d',
    color: colors.offWhite,
    textAlignVertical: 'top',
  },
  selectBox: {
    borderWidth: 1,
    borderColor: colors.gold,
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#14394d',
    marginBottom: 10,
  },
  selectText: {
    color: colors.offWhite,
  },
  button: {
    backgroundColor: colors.orange,
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 20,
  },
  buttonText: {
    color: colors.offWhite,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  modalContent: {
    backgroundColor: colors.darkBlue,
    padding: 20,
    borderRadius: 10,
  },
  modalItem: {
    paddingVertical: 12,
  },
  modalItemText: {
    color: colors.offWhite,
    fontSize: 16,
  },
});
