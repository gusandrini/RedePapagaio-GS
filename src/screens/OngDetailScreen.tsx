import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
// import api from '../api/api'; // Habilite quando for integrar com backend

type RootStackParamList = {
  OngDetail: { id: string; nome: string; cidade: string };
};

type OngDetailRouteProp = RouteProp<RootStackParamList, 'OngDetail'>;

interface OngDetalhada {
  id: string;
  nome: string;
  cidade: string;
  descricao: string;
  telefone: string;
  email: string;
}

const colors = {
  darkBlue: '#031C26',
  offWhite: '#F2F2F0',
  orange: '#F2811D',
  gold: '#D9C359',
  grayLight: '#999',
};

export default function OngDetailScreen() {
  const route = useRoute<OngDetailRouteProp>();
  const { id, nome, cidade } = route.params;

  const [detalhes, setDetalhes] = useState<OngDetalhada | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // Exemplo de chamada real:
        // const response = await api.get(`/ongs/${id}`);
        // setDetalhes(response.data);

        // Mock simulado:
        setTimeout(() => {
          setDetalhes({
            id,
            nome,
            cidade,
            descricao: 'ONG atuante em causas sociais e emergenciais.',
            telefone: '(11) 98765-4321',
            email: 'contato@ongvidaplena.org',
          });
          setCarregando(false);
        }, 1000);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os dados da ONG.');
      }
    })();
  }, []);

  if (carregando || !detalhes) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.orange} />
      </SafeAreaView>
    );
  }

  const handleContato = () => {
    Alert.alert('Contato', `Email: ${detalhes.email}\nTelefone: ${detalhes.telefone}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>{detalhes.nome}</Text>
        <Text style={styles.subtitle}>{detalhes.cidade}</Text>
        <Text style={styles.description}>{detalhes.descricao}</Text>

        <TouchableOpacity style={styles.button} onPress={handleContato}>
          <Text style={styles.buttonText}>Ver contato</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert('Em breve!', 'Funcionalidade em desenvolvimento.')}
        >
          <Text style={styles.buttonText}>Mais detalhes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: colors.gold,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    color: colors.offWhite,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: colors.grayLight,
  },
  button: {
    backgroundColor: colors.orange,
    marginVertical: 10,
    paddingVertical: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.offWhite,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
