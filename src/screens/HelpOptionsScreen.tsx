import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

type HelpOptionsRouteProp = RouteProp<
  { params: { cidade: string; problema: string } },
  'params'
>;

const optionsMap: Record<string, string[]> = {
  'Doar itens': ['Alimentos', 'Roupas', 'Produtos de higiene', 'Doar dinheiro'],
  'Ajudar no local': ['Primeiros Socorros', 'Distribuição de Suprimentos', 'Remoção de Entulho'],
  'Compartilhar alerta': ['WhatsApp', 'Facebook', 'Instagram'],
};

export default function HelpOptionsScreen() {
  const route = useRoute<HelpOptionsRouteProp>();
  const { cidade, problema } = route.params;

  const [etapa, setEtapa] = useState(1);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState('');
  const [subOpcao, setSubOpcao] = useState('');

  const handlePrimeiraEscolha = (opcao: string) => {
    setOpcaoSelecionada(opcao);
    setEtapa(2);
  };

  const handleSubOpcao = (sub: string) => {
    setSubOpcao(sub);
    setEtapa(3);

    if (sub === 'Doar dinheiro') {
      Alert.alert(
        'Chave Pix para doação',
        'Envie sua contribuição para: ajuda@redepapagaio.org'
      );
    }
  };

  const handleVoltar = () => {
    if (etapa === 2) {
      setEtapa(1);
      setOpcaoSelecionada('');
    } else if (etapa === 3) {
      setEtapa(2);
      setSubOpcao('');
    }
  };

  return (
    <View style={styles.container}>
      {etapa === 1 && (
        <>
          <Text style={styles.title}>Como você deseja ajudar?</Text>
          <Text style={styles.subtitle}>
            {cidade} — {problema}
          </Text>

          {Object.keys(optionsMap).map((opcao, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.option}
              onPress={() => handlePrimeiraEscolha(opcao)}
            >
              <Text style={styles.optionText}>{opcao}</Text>
            </TouchableOpacity>
          ))}
        </>
      )}

      {etapa === 2 && (
        <>
          <Text style={styles.title}>
            Escolha uma forma de {opcaoSelecionada.toLowerCase()}
          </Text>

          {optionsMap[opcaoSelecionada].map((sub, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.option}
              onPress={() => handleSubOpcao(sub)}
            >
              <Text style={styles.optionText}>{sub}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.backButton} onPress={handleVoltar}>
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>
        </>
      )}

      {etapa === 3 && subOpcao !== 'Doar dinheiro' && (
        <>
          <Text style={styles.title}>Compareça ao local indicado</Text>
          <Text style={styles.subtitle}>
            Para realizar a ação: <Text style={{ fontWeight: 'bold' }}>{subOpcao}</Text>
          </Text>

          <View style={styles.card}>
            <Text style={styles.cardText}>Endereço:</Text>
            <Text style={styles.cardText}>Av. Solidariedade, 123</Text>
            <Text style={styles.cardText}>{cidade} - Centro</Text>
            <Text style={styles.cardText}>Atendimento: 08h às 18h</Text>
          </View>

          <TouchableOpacity style={styles.backButton} onPress={handleVoltar}>
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20, justifyContent: 'center' },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
  },
  option: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderColor: '#333',
    borderWidth: 1,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  backButton: {
    alignSelf: 'center',
    padding: 10,
  },
  backText: {
    color: '#888',
    fontSize: 14,
  },
});
