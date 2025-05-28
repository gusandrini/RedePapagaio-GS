import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Notificacao {
  id: string;
  cidade: string;
  estado: string;
  problema: string;
}

type RootStackParamList = {
  HelpOptions: { cidade: string; problema: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'HelpOptions'>;

const mockNotificacoes: Notificacao[] = [
  { id: '1', cidade: 'Cidade A', estado: 'SP', problema: 'Enchente' },
  { id: '2', cidade: 'Cidade B', estado: 'RJ', problema: 'Calor extremo' },
  { id: '3', cidade: 'Cidade C', estado: 'MG', problema: 'Deslizamento' },
];

export default function NotificationsScreen() {
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const navigation = useNavigation<NavigationProp>();

  const notificacoesFiltradas = estadoSelecionado
    ? mockNotificacoes.filter((n) => n.estado === estadoSelecionado)
    : mockNotificacoes;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedidos por Cidade</Text>

      <Picker
        selectedValue={estadoSelecionado}
        onValueChange={(value) => setEstadoSelecionado(value)}
        style={styles.picker}
      >
        <Picker.Item label="Filtrar por estado" value="" />
        <Picker.Item label="SP" value="SP" />
        <Picker.Item label="RJ" value="RJ" />
        <Picker.Item label="MG" value="MG" />
      </Picker>

      <FlatList
        data={notificacoesFiltradas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.cidade} ({item.estado}): {item.problema}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate('HelpOptions', {
                  cidade: item.cidade,
                  problema: item.problema,
                })
              }
            >
              <Text style={styles.buttonText}>Ajudar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  picker: { marginBottom: 15 },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
