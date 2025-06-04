import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import api from '../services/api';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateOccurrence'>;

interface Alerta {
  idOcorrencia: number;
  tipoOcorrencia: {
    idTipoOcorrencia: number;
    nmTipoOcorrencia: string;
  };
  regiao: {
    idRegiao: number;
    nmRegiao: string;
  };
  nivelUrgencia: {
    idNivelUrgencia: number;
    nmNivel: string;
  };
  statusOcorrencia: {
    idStatusOcorrencia: number;
  };
  dsOcorrencia: string;
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
        const resposta = await api.get('/ocorrencias/todas');
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

  const getRiscoColor = (nivel: string) => {
    switch (nivel) {
      case 'LEVE':
        return colors.riscoLeve;
      case 'MODERADO':
        return colors.riscoModerado;
      case 'GRAVE':
        return colors.riscoGrave;
      default:
        return colors.offWhite;
    }
  };

  const formatarStatus = (idStatus: number) => {
    switch (idStatus) {
      case 1:
        return 'Pendente';
      case 2:
        return 'Em andamento';
      case 3:
        return 'Concluído';
      default:
        return `Status ${idStatus}`;
    }
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
        <Text style={styles.title}>Ocorrências</Text>
        <FlatList
          data={alertas}
          keyExtractor={(item) => item.idOcorrencia.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.card,
                { borderLeftColor: getRiscoColor(item.nivelUrgencia.nmNivel) },
              ]}
            >
              <Text style={styles.id}>ID: {item.idOcorrencia}</Text>
              <Text style={styles.tipo}>Tipo: {item.tipoOcorrencia.nmTipoOcorrencia.replace(/_/g, ' ')}</Text>
              <Text style={styles.regiao}>Região: {item.regiao.nmRegiao}</Text>
              <Text style={styles.regiao}>
                Status: {formatarStatus(item.statusOcorrencia.idStatusOcorrencia)}
              </Text>
              <Text
                style={[
                  styles.riscoText,
                  { color: getRiscoColor(item.nivelUrgencia.nmNivel) },
                ]}
              >
                Nível: {item.nivelUrgencia.nmNivel}
              </Text>
              <Text style={styles.regiao}>Descrição: {item.dsOcorrencia}</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.darkBlue },
  container: { flex: 1, padding: 20 },
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
  id: { color: colors.offWhite, fontWeight: 'bold' },
  tipo: { fontSize: 18, fontWeight: 'bold', color: colors.offWhite },
  regiao: { fontSize: 14, color: colors.offWhite, marginBottom: 4 },
  riscoText: { fontWeight: 'bold', fontSize: 14 },
});
