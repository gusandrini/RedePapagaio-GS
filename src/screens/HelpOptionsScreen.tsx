import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

type HelpOptionsRouteProp = RouteProp<{ params: { cidade: string; problema: string } }, 'params'>;

export default function HelpOptionsScreen() {
  const route = useRoute<HelpOptionsRouteProp>();
  const { cidade, problema } = route.params;

  const handleOption = (tipo: string) => {
    Alert.alert('Ação registrada', `Você escolheu "${tipo}" para ${cidade}.`);
    // Aqui futuramente enviar para API
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Como você deseja ajudar?</Text>
      <Text style={styles.subtitle}>{cidade} — {problema}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Doar itens" onPress={() => handleOption('Doar itens')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Ajudar no local" onPress={() => handleOption('Ajudar no local')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Compartilhar alerta" onPress={() => handleOption('Compartilhar alerta')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 30 },
  buttonContainer: { marginBottom: 15 },
});
