import React from 'react';
import { SafeAreaView, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const colors = {
  darkBlue: '#031C26',
  offWhite: '#F2F2F0',
  gold: '#D9C359',
  orange: '#F2811D',
  red: '#BF1515',
};

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Bem-vindo(a) à RedePapagaio 🦜</Text>
        <Text style={styles.subtitle}>Conectando ajuda em situações extremas</Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChatIA')}>
          <Text style={styles.buttonText}>Chat de Emergência com IA</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('OngDetail', {
              id: '0',
              nome: 'ONG Exemplo',
              cidade: 'São Paulo',
            })
          }
        >
          <Text style={styles.buttonText}>Visualizar ONG (exemplo)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Mapa')}>
          <Text style={styles.buttonText}>Ver ONGs no mapa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('HelpOptions', {
              cidade: 'Cidade Exemplo',
              problema: 'Enchente',
            })
          }
        >
          <Text style={styles.buttonText}>Quero Ajudar Agora</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: colors.offWhite,
  },
  subtitle: {
    fontSize: 18,
    color: colors.gold,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '600',
  },
  button: {
    backgroundColor: colors.orange,
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    width: '100%',
    shadowColor: colors.darkBlue,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: colors.offWhite,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
