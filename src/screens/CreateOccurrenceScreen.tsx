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
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import api from '../services/api';

type CreateOccurrenceRouteProp = RouteProp<RootStackParamList, 'CreateOccurrence'>;

export default function CreateOccurrenceScreen() {
  const navigation = useNavigation();
  const route = useRoute<CreateOccurrenceRouteProp>();

  const isEditando = !!route.params?.ocorrencia;

  const [descricao, setDescricao] = useState('');
  const [regiao, setRegiao] = useState('');
  const [tipos, setTipos] = useState<string[]>([]);
  const [tipoSelecionado, setTipoSelecionado] = useState<string | null>(null);

  useEffect(() => {
    // Busca os valores do enum
    api.get<string[]>('/tipos-ocorrencia/enums')
      .then((res) => setTipos(res.data))
      .catch(() => Alert.alert('Erro', 'Não foi possível carregar os tipos de ocorrência.'));

    const ocorrencia = route.params?.ocorrencia;
    if (ocorrencia) {
      setDescricao(ocorrencia.dsOcorrencia);
      setRegiao(ocorrencia.regiao.nmRegiao);
      setTipoSelecionado(
        ocorrencia.tipoOcorrencia.nmTipoOcorrencia ?? ocorrencia.tipoOcorrencia.dsTipoOcorrencia
      );
    }
  }, [route.params]);

  async function salvarOcorrencia() {
    if (!tipoSelecionado || !regiao.trim() || !descricao.trim()) {
      Alert.alert('Campos obrigatórios', 'Preencha todos os campos.');
      return;
    }

    const payload = {
      tipoOcorrencia: {
        nmTipoOcorrencia: tipoSelecionado!,
        dsTipoOcorrencia: tipoSelecionado!.replace(/_/g, ' '),
      },
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

        <Text style={styles.label}>Tipo de Ocorrência</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={tipoSelecionado}
            onValueChange={(itemValue) => setTipoSelecionado(itemValue)}
          >
            <Picker.Item label="Selecione o tipo" value={null} />
            {tipos.map((tipo) => (
              <Picker.Item
                key={tipo}
                label={tipo.replace(/_/g, ' ')}
                value={tipo}
              />
            ))}
          </Picker>
        </View>

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
  label: {
    color: '#F2F2F0',
    fontSize: 16,
    marginBottom: 6,
  },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
});
