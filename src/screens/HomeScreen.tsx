import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation<any>(); // Simplifica navegação entre Stack e Tabs

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>Bem-vindo(a) à RedePapagaio 🦜</Text>
      <Text style={styles.subtext}>Conectando ajuda em situações extremas</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChatIA')}>
        <Text style={styles.buttonText}>💬 Chat com IA</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Alertas')}>
        <Text style={styles.buttonText}>🚨 Alertas Climáticos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Notificacoes')}>
        <Text style={styles.buttonText}>📢 Pedidos de Ajuda</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Perfil')}>
        <Text style={styles.buttonText}>👤 Meu Perfil</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  text: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  subtext: { fontSize: 16, color: '#555', marginBottom: 30, textAlign: 'center' },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginVertical: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
