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

interface TipoOcorrencia {
  idTipoOcorrencia: number;
  nmTipoOcorrencia: string;
}

interface Regiao {
  idRegiao: number;
  nmRegiao: string;
}

interface NivelUrgencia {
  idNivelUrgencia: number;
  nmNivel: string;
}

export default function CreateOccurrenceScreen() {
  const navigation = useNavigation();
  const route = useRoute<CreateOccurrenceRouteProp>();
  const isEditando = !!route.params?.ocorrencia;

  const [descricao, setDescricao] = useState('');
  const [tipos, setTipos] = useState<TipoOcorrencia[]>([]);
  const [tipoSelecionado, setTipoSelecionado] = useState<number | null>(null);

  const [regioes, setRegioes] = useState<Regiao[]>([]);
  const [regiaoSelecionada, setRegiaoSelecionada] = useState<number | null>(null);

  const [niveis, setNiveis] = useState<NivelUrgencia[]>([]);
  const [nivelSelecionado, setNivelSelecionado] = useState<number | null>(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [resTipos, resRegioes, resNiveis] = await Promise.all([
          api.get<TipoOcorrencia[]>('/tipos-ocorrencias/todos'),
          api.get<Regiao[]>('/regioes/todas'),
          api.get<NivelUrgencia[]>('/niveis-urgencia/todos'),
        ]);
        setTipos(resTipos.data);
        setRegioes(resRegioes.data);
        setNiveis(resNiveis.data);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os dados.');
      }

      const ocorrencia = route.params?.ocorrencia;
      if (ocorrencia) {
        setDescricao(ocorrencia.dsOcorrencia);
        setTipoSelecionado(ocorrencia.tipoOcorrencia?.idTipoOcorrencia || null);
        setRegiaoSelecionada(ocorrencia.regiao?.idRegiao || null);
        setNivelSelecionado(ocorrencia.nivelUrgencia?.idNivelUrgencia || null);
      }
    }

    carregarDados();
  }, [route.params]);

  async function salvarOcorrencia() {
    if (!tipoSelecionado || !regiaoSelecionada || !nivelSelecionado || !descricao.trim()) {
      Alert.alert('Campos obrigatórios', 'Preencha todos os campos.');
      return;
    }

    const payload = {
      tipoOcorrencia: { idTipoOcorrencia: tipoSelecionado },
      regiao: { idRegiao: regiaoSelecionada },
      nivelUrgencia: { idNivelUrgencia: nivelSelecionado },
      statusOcorrencia: { idStatusOcorrencia: 1 }, // Status padrão: "pendente"
      dsOcorrencia: descricao,
    };

    try {
      const ocorrencia = route.params?.ocorrencia;
      if (isEditando && ocorrencia) {
        await api.put(`/ocorrencias/atualizar/${ocorrencia.idOcorrencia}`, payload);
        Alert.alert('Sucesso', 'Ocorrência atualizada com sucesso!');
      } else {
        await api.post('/ocorrencias/inserir', payload);
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
                key={tipo.idTipoOcorrencia}
                label={tipo.nmTipoOcorrencia.replace(/_/g, ' ')}
                value={tipo.idTipoOcorrencia}
              />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Região</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={regiaoSelecionada}
            onValueChange={(itemValue) => setRegiaoSelecionada(itemValue)}
          >
            <Picker.Item label="Selecione a região" value={null} />
            {regioes.map((regiao) => (
              <Picker.Item
                key={regiao.idRegiao}
                label={regiao.nmRegiao}
                value={regiao.idRegiao}
              />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Nível de Urgência</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={nivelSelecionado}
            onValueChange={(itemValue) => setNivelSelecionado(itemValue)}
          >
            <Picker.Item label="Selecione o nível" value={null} />
            {niveis.map((nivel) => (
              <Picker.Item
                key={nivel.idNivelUrgencia}
                label={nivel.nmNivel.charAt(0).toUpperCase() + nivel.nmNivel.slice(1).toLowerCase()}
                value={nivel.idNivelUrgencia}
              />
            ))}
          </Picker>
        </View>

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
