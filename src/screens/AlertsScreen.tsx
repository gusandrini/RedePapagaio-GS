import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

interface Alerta {
  id: string;
  tipo: string;
  regiao: string;
  risco: 'leve' | 'moderado' | 'grave';
}

const mockAlertas: Alerta[] = [
  { id: '1', tipo: 'Enchente', regiao: 'São Paulo - SP', risco: 'grave' },
  { id: '2', tipo: 'Calor Extremo', regiao: 'Rio de Janeiro - RJ', risco: 'moderado' },
  { id: '3', tipo: 'Deslizamento', regiao: 'Belo Horizonte - MG', risco: 'leve' },
];

export default function AlertsScreen() {
  const [alertas, setAlertas] = useState<Alerta[]>([]);

  useEffect(() => {
    // Simula chamada à API para popular os alertas
    setAlertas(mockAlertas);
  }, []);

  const getRiscoColor = (risco: Alerta['risco']) => {
    switch (risco) {
      case 'leve':
        return '#28a745'; 
      case 'moderado':
        return '#ffc107'; 
      case 'grave':
        return '#dc3545'; 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alertas Ativos</Text>
      <FlatList
        data={alertas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { borderLeftColor: getRiscoColor(item.risco) }]}>
            <Text style={styles.tipo}>{item.tipo}</Text>
            <Text style={styles.regiao}>{item.regiao}</Text>
            <Text style={{ color: getRiscoColor(item.risco), fontWeight: 'bold' }}>
              Risco: {item.risco.toUpperCase()}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderLeftWidth: 8,
    elevation: 2,
  },
  tipo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  regiao: {
    fontSize: 14,
    color: '#555',
  },
});
