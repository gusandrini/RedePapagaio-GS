import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList } from 'react-native';

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
  const [alertas, setAlertas] = useState<Alerta[]>([]);

  useEffect(() => {
    setAlertas(mockAlertas);
  }, []);

  const getRiscoColor = (risco: Alerta['risco']) => {
    switch (risco) {
      case 'leve':
        return colors.riscoLeve;
      case 'moderado':
        return colors.riscoModerado;
      case 'grave':
        return colors.riscoGrave;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Alertas Ativos</Text>
        <FlatList
          data={alertas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.card, { borderLeftColor: getRiscoColor(item.risco) }]}>
              <Text style={styles.tipo}>{item.tipo}</Text>
              <Text style={styles.regiao}>{item.regiao}</Text>
              <Text style={[styles.riscoText, { color: getRiscoColor(item.risco) }]}>
                Risco: {item.risco.toUpperCase()}
              </Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
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
    padding: 20,
  },
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
  tipo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.offWhite,
  },
  regiao: {
    fontSize: 14,
    color: colors.offWhite,
    marginBottom: 6,
  },
  riscoText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});
