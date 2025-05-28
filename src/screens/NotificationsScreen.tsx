import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
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

const colors = {
  darkBlue: '#031C26',
  offWhite: '#F2F2F0',
  gold: '#D9C359',
  orange: '#F2811D',
  cardBg: '#0b3043',
  buttonBg: '#F2811D',
  pickerBg: '#14394d',
  pickerBorder: '#244b6b',
};

export default function NotificationsScreen() {
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const navigation = useNavigation<NavigationProp>();

  const notificacoesFiltradas = estadoSelecionado
    ? mockNotificacoes.filter((n) => n.estado === estadoSelecionado)
    : mockNotificacoes;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Pedidos por Cidade</Text>

        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={estadoSelecionado}
            onValueChange={(value) => setEstadoSelecionado(value)}
            style={styles.picker}
            dropdownIconColor={colors.gold}
            dropdownIconRippleColor={colors.gold}
          >
            <Picker.Item label="Filtrar por estado" value="" color={colors.offWhite} />
            <Picker.Item label="SP" value="SP" color={colors.offWhite} />
            <Picker.Item label="RJ" value="RJ" color={colors.offWhite} />
            <Picker.Item label="MG" value="MG" color={colors.offWhite} />
          </Picker>
        </View>

        <FlatList
          data={notificacoesFiltradas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardText}>
                {item.cidade} ({item.estado}): {item.problema}
              </Text>
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
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
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
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.gold,
    textAlign: 'center',
    marginBottom: 15,
  },
  pickerWrapper: {
    backgroundColor: colors.pickerBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.pickerBorder,
    marginBottom: 15,
    overflow: 'hidden',
  },
  picker: {
    color: colors.offWhite,
    height: 44,
  },
  card: {
    backgroundColor: colors.cardBg,
    padding: 15,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    color: colors.offWhite,
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  button: {
    backgroundColor: colors.buttonBg,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: colors.offWhite,
    fontWeight: 'bold',
  },
});
