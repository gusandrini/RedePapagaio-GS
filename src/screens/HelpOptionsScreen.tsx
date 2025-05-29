import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

type HelpOptionsRouteProp = RouteProp<
  { params: { cidade: string; problema: string } },
  'params'
>;

const optionsMap: Record<string, string[]> = {
  'Doar itens': ['Alimentos', 'Roupas', 'Produtos de higiene', 'Doar dinheiro'],
  'Ajudar no local': ['Primeiros Socorros', 'Distribuição de Suprimentos', 'Remoção de Entulho'],
  'Compartilhar alerta': ['WhatsApp', 'Facebook', 'Instagram'],
};

const enderecosPorCidade: Record<string, string> = {
  'Niterói': 'Av. Solidariedade, 123',
  'Osasco': 'Rua da Esperança, 456',
  'Ouro Preto': 'Praça da União, 789',
};

const colors = {
  darkBlue: '#031C26',
  offWhite: '#F2F2F0',
  gold: '#D9C359',
  orange: '#F2811D',
  grayLight: '#888',
  cardBg: '#0b3043',
  optionBg: '#14394d',
  optionBorder: '#244b6b',
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
    <SafeAreaView style={styles.safeArea}>
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

        {etapa === 3 && (
          <>
            {subOpcao === 'Doar dinheiro' ? (
              <>
                <Text style={styles.title}>Doação via Pix</Text>
                <View style={styles.card}>
                  <Text style={styles.cardText}>Envie sua contribuição para:</Text>
                  <Text style={[styles.cardText, { fontWeight: 'bold', fontSize: 18 }]}>
                    ajuda@redepapagaio.org
                  </Text>
                </View>
                <TouchableOpacity style={styles.backButton} onPress={handleVoltar}>
                  <Text style={styles.backText}>Voltar</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.title}>Compareça ao local indicado</Text>
                <Text style={styles.subtitle}>
                  Para realizar a ação: <Text style={{ fontWeight: 'bold' }}>{subOpcao}</Text>
                </Text>

                <View style={styles.card}>
                  <Text style={styles.cardText}>Endereço:</Text>
                  <Text style={styles.cardText}>
                    {enderecosPorCidade[cidade] || 'Endereço não disponível'}
                  </Text>
                  <Text style={styles.cardText}>{cidade} - Centro</Text>
                  <Text style={styles.cardText}>Atendimento: 08h às 18h</Text>
                </View>

                <TouchableOpacity style={styles.backButton} onPress={handleVoltar}>
                  <Text style={styles.backText}>Voltar</Text>
                </TouchableOpacity>
              </>
            )}
          </>
        )}
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
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.gold,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.offWhite,
    textAlign: 'center',
    marginBottom: 20,
  },
  option: {
    backgroundColor: colors.optionBg,
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderColor: colors.optionBorder,
    borderWidth: 1,
  },
  optionText: {
    color: colors.offWhite,
    fontSize: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.cardBg,
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
  },
  cardText: {
    color: colors.offWhite,
    fontSize: 16,
    marginBottom: 5,
  },
  backButton: {
    alignSelf: 'center',
    padding: 10,
  },
  backText: {
    color: colors.grayLight,
    fontSize: 14,
  },
});
