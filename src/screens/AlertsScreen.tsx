import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import api from '../services/api';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateOccurrence'>;

interface Alerta {
  idOcorrencia: number;
  tipoOcorrencia: { dsTipoOcorrencia: string };
  regiao: { nmRegiao: string };
  nivelUrgencia: { dsNivelUrgencia: string; idNivelUrgencia: number };
  dsOcorrencia: string;
  statusOcorrencia: { idStatusOcorrencia: number };
}

const colors = {
  darkBlue: '#031C26',
  cardBg: '#0b3043',
  offWhite: '#F2F2F0',
  gold: '#D9C359',
  riscoLeve: '#28a745',
  riscoModerado: '#ffc107',
  riscoGrave: '#dc3545',
};

export default function AlertsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarAlertas() {
      try {
        const resposta = await api.get('/ocorrencias');
        setAlertas(resposta.data);
      } catch (error) {
        console.error('Erro ao buscar alertas:', error);
        Alert.alert('Erro', 'Não foi possível carregar os alertas.');
      } finally {
        setLoading(false);
      }
    }

    carregarAlertas();
  }, []);

  const getRiscoColor = (descricao: string) => {
    const risco = descricao.toLowerCase();
    if (risco.includes('leve')) return colors.riscoLeve;
    if (risco.includes('moderado')) return colors.riscoModerado;
    if (risco.includes('grave')) return colors.riscoGrave;
    return colors.offWhite;
  };

  const handleEditar = (ocorrencia: Alerta) => {
    navigation.navigate('CreateOccurrence', { ocorrencia });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.gold} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Alertas Ativos</Text>
        <FlatList
          data={alertas}
          keyExtractor={(item) => item.idOcorrencia.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.card,
                {
                  borderLeftColor: getRiscoColor(item.nivelUrgencia.dsNivelUrgencia),
                },
              ]}
            >
              <Text style={styles.tipo}>{item.tipoOcorrencia.dsTipoOcorrencia}</Text>
              <Text style={styles.regiao}>{item.regiao.nmRegiao}</Text>
              <Text
                style={[
                  styles.riscoText,
                  { color: getRiscoColor(item.nivelUrgencia.dsNivelUrgencia) },
                ]}
              >
                Risco: {item.nivelUrgencia.dsNivelUrgencia.toUpperCase()}
              </Text>
              <Text style={styles.regiao}>{item.dsOcorrencia}</Text>

              <TouchableOpacity onPress={() => handleEditar(item)}>
                <Text style={styles.editButton}>✏️ Editar</Text>
              </TouchableOpacity>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.gold,
    textAlign: 'center',
    marginBottom: 15,
  },
  card: {
    backgroundColor: colors.cardBg,
    padding: 15,
    marginBottom: 12,
    borderRadius: 8,
    borderLeftWidth: 8,
    elevation: 3,
  },
  tipo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.offWhite,
  },
  regiao: {
    fontSize: 14,
    color: colors.offWhite,
    marginBottom: 6,
  },
  riscoText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  editButton: {
    marginTop: 10,
    color: colors.gold,
    fontWeight: 'bold',
  },
});
