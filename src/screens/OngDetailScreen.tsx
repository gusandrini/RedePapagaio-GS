import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, ActivityIndicator } from 'react-native';
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  const handleContato = () => {
    Alert.alert('Contato', `Email: ${detalhes.email}\nTelefone: ${detalhes.telefone}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{detalhes.nome}</Text>
      <Text style={styles.subtitle}>{detalhes.cidade}</Text>
      <Text style={styles.description}>{detalhes.descricao}</Text>

      <View style={styles.button}>
        <Button title="Ver contato" onPress={handleContato} />
      </View>

      <View style={styles.button}>
        <Button
          title="Mais detalhes"
          onPress={() => Alert.alert('Em breve!', 'Funcionalidade em desenvolvimento.')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, justifyContent: 'center', backgroundColor: '#f2f2f2' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 18, textAlign: 'center', marginBottom: 10, color: '#555' },
  description: { fontSize: 16, textAlign: 'center', marginBottom: 20, color: '#666' },
  button: { marginVertical: 10 },
});
