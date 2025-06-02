import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
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
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Bem-vindo(a) à RedePapagaio 🦜</Text>
        <Text style={styles.subtitle}>Conectando ajuda em situações extremas</Text>

        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('HelpOptions', {
                cidade: 'São Paulo',
                problema: 'Desabamento',
              })
            }
            accessibilityLabel="Solicitar ou oferecer ajuda"
          >
            <Text style={styles.buttonText}>Preciso de Ajuda</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Mapa')}
            accessibilityLabel="Ver ONGs no mapa"
          >
            <Text style={styles.buttonText}>Quero Ajudar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Alertas')}
            accessibilityLabel="Ver alertas recentes"
          >
            <Text style={styles.buttonText}>Ver Alertas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => navigation.navigate('Notifications')}
            accessibilityLabel="Ver pedidos por cidade"
          >
            <Text style={styles.buttonText}>Pedidos por Cidade</Text>
          </TouchableOpacity>
        </View>
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
    padding: 24,
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
    marginBottom: 40,
    fontWeight: '600',
  },
  menuContainer: {
    width: '100%',
    maxWidth: 400,
  },
  button: {
    backgroundColor: colors.orange,
    paddingVertical: 16,
    borderRadius: 25,
    marginVertical: 10,
    shadowColor: colors.darkBlue,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  primaryButton: {
    backgroundColor: colors.red,
  },
  buttonText: {
    color: colors.offWhite,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
