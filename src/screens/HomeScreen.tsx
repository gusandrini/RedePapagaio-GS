import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList, TabParamList } from '../types/navigation';

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;

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
        <Text style={styles.subtitle}>Conectando ajuda em situações extremas</Text>

        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate({
                name: 'HelpOptions',
                params: {
                  cidade: 'São Paulo',
                  problema: 'Desabamento',
                },
              })
            }
          >
            <Text style={styles.buttonText}>🆘 Preciso de Ajuda</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate({ name: 'Mapa', params: undefined })}
          >
            <Text style={styles.buttonText}>🤝 Quero Ajudar (Ver ONGs)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate({ name: 'Alertas', params: undefined })}
          >
            <Text style={styles.buttonText}>⚠️ Alertas Atuais</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate({ name: 'WhatsApp', params: undefined })}
          >
            <Text style={styles.buttonText}>📱 Comunidade (WhatsApp)</Text>
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
  buttonText: {
    color: colors.offWhite,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
