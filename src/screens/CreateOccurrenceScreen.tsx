import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import api from '../services/api';

type CreateOccurrenceRouteProp = RouteProp<RootStackParamList, 'CreateOccurrence'>;

export default function CreateOccurrenceScreen() {
  const navigation = useNavigation();
  const route = useRoute<CreateOccurrenceRouteProp>();

  const isEditando = !!route.params?.ocorrencia;

  const [tipo, setTipo] = useState('');
  const [regiao, setRegiao] = useState('');
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    const ocorrencia = route.params?.ocorrencia;
    if (ocorrencia) {
      setTipo(ocorrencia.tipoOcorrencia.dsTipoOcorrencia);
      setRegiao(ocorrencia.regiao.nmRegiao);
      setDescricao(ocorrencia.dsOcorrencia);
    }
  }, [route.params]);

  async function salvarOcorrencia() {
    if (!tipo || !regiao || !descricao) {
      Alert.alert('Campos obrigatórios', 'Preencha todos os campos.');
      return;
    }

    const payload = {
      tipoOcorrencia: { dsTipoOcorrencia: tipo },
      regiao: { nmRegiao: regiao },
      dsOcorrencia: descricao,
      statusOcorrencia: { idStatusOcorrencia: 1 },
      nivelUrgencia: { idNivelUrgencia: 2 },
    };

    try {
      const ocorrencia = route.params?.ocorrencia;
      if (isEditando && ocorrencia) {
        await api.put(`/ocorrencias/${ocorrencia.idOcorrencia}`, payload);
        Alert.alert('Sucesso', 'Ocorrência atualizada com sucesso!');
      } else {
        await api.post('/ocorrencias', payload);
        Alert.alert('Sucesso', 'Ocorrência cadastrada com sucesso!');
      }

      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar ocorrência:', error);
      Alert.alert('Erro', 'Falha ao salvar ocorrência.');
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {isEditando ? 'Editar Ocorrência' : 'Nova Ocorrência'}
        </Text>

        <TextInput
          placeholder="Tipo de ocorrência"
          style={styles.input}
          value={tipo}
          onChangeText={setTipo}
        />
        <TextInput
          placeholder="Região"
          style={styles.input}
          value={regiao}
          onChangeText={setRegiao}
        />
        <TextInput
          placeholder="Descrição"
          style={[styles.input, { height: 80 }]}
          multiline
          value={descricao}
          onChangeText={setDescricao}
        />

        <Button
          title={isEditando ? 'Salvar Alterações' : 'Cadastrar Ocorrência'}
          onPress={salvarOcorrencia}
          color="#D9C359"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#031C26' },
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D9C359',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
});
