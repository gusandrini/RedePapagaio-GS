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
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

interface Ocorrencia {
  idOcorrencia: number;
  dsOcorrencia: string;
}

interface TipoAjuda {
  idTipoAjuda: number;
  nmTipoAjuda: string; // Enum textual
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

  const [ocorrenciaSelecionada, setOcorrenciaSelecionada] = useState<number | null>(null);
  const [tipoAjudaSelecionado, setTipoAjudaSelecionado] = useState<number | null>(null);
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    async function carregarDados() {
      try {
        const id = await AsyncStorage.getItem('usuarioId');
        setUsuarioId(id);

        const ocorrenciasResp = await api.get('/ocorrencias/todas');
        setOcorrencias(ocorrenciasResp.data);

        const tiposAjudaResp = await api.get('/tipos_ajudas/todos'); // ✅ Correção aqui
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

    const payload = {
      usuario: { idUsuario: Number(usuarioId) },
      ocorrencia: { idOcorrencia: ocorrenciaSelecionada },
      tipoAjuda: { idTipoAjuda: tipoAjudaSelecionado },
      dsAjuda: descricao,
      dtAjuda: new Date().toISOString().split('T')[0], // yyyy-MM-dd
    };

    try {
      await api.post('/ajudas/inserir', payload);
      Alert.alert('Sucesso', 'Ajuda registrada com sucesso!');
      setOcorrenciaSelecionada(null);
      setTipoAjudaSelecionado(null);
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
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={ocorrenciaSelecionada}
            onValueChange={(value) => setOcorrenciaSelecionada(value)}
            style={styles.picker}
            dropdownIconColor={colors.gold}
          >
            <Picker.Item label="Selecione uma ocorrência..." value={null} />
            {ocorrencias.map((oc) => (
              <Picker.Item
                key={oc.idOcorrencia}
                label={`#${oc.idOcorrencia} - ${oc.dsOcorrencia}`}
                value={oc.idOcorrencia}
              />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Tipo de Ajuda:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={tipoAjudaSelecionado}
            onValueChange={(value) => setTipoAjudaSelecionado(value)}
            style={styles.picker}
            dropdownIconColor={colors.gold}
          >
            <Picker.Item label="Selecione o tipo de ajuda..." value={null} />
            {tiposAjuda.map((tipo) => (
              <Picker.Item
                key={tipo.idTipoAjuda}
                label={tipo.nmTipoAjuda.replace('_', ' ')}
                value={tipo.idTipoAjuda}
              />
            ))}
          </Picker>
        </View>

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
  pickerWrapper: {
    borderWidth: 1,
    borderColor: colors.gold,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#14394d',
    marginBottom: 10,
  },
  picker: {
    color: colors.offWhite,
    height: 44,
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
});
