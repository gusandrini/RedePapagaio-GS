import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

type RootStackParamList = {
  OngDetail: { id: string; nome: string; cidade: string };
};

type OngDetailRouteProp = RouteProp<RootStackParamList, 'OngDetail'>;

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

  // Geração dinâmica de dados simulados
  const email = `contato@${nome.toLowerCase().replace(/\s/g, '')}.org`;
  const telefone = `(11) 9${id.padStart(4, '0')}000-0000`;
  const descricao = 'ONG atuante em causas sociais, emergenciais e apoio comunitário em situações extremas.';

  const handleContato = () => {
    Alert.alert('Contato', `Email: ${email}\nTelefone: ${telefone}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>{nome}</Text>
        <Text style={styles.subtitle}>{cidade}</Text>
        <Text style={styles.description}>{descricao}</Text>

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
