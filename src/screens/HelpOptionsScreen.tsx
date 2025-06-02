import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import api from '../services/api';

type HelpOptionsRouteProp = RouteProp<
  { params: { cidade: string; problema: string } },
  'params'
>;

const tipoAjudaSubopcoes: Record<string, string[]> = {
  DOAR_ITENS: ['ALIMENTOS', 'ROUPAS', 'HIGIENE', 'DOAR_DINHEIRO'],
  AJUDAR_NO_LOCAL: ['PRIMEIROS_SOCORROS', 'SUPRIMENTOS', 'REMOCAO_ENTULHO'],
};

const enderecosPorCidade: Record<string, string> = {
  Niterói: 'Av. Solidariedade, 123',
  Osasco: 'Rua da Esperança, 456',
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

  const [tiposAjuda, setTiposAjuda] = useState<string[]>([]);
  const [etapa, setEtapa] = useState(1);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState('');
  const [subOpcao, setSubOpcao] = useState('');

  useEffect(() => {
    api
      .get<string[]>('/tipos-ajuda/enums')
      .then((res) => setTiposAjuda(res.data))
      .catch(() => Alert.alert('Erro', 'Não foi possível carregar os tipos de ajuda.'));
  }, []);

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

            {tiposAjuda.map((opcao) => (
              <TouchableOpacity
                key={opcao}
                style={styles.option}
                onPress={() => handlePrimeiraEscolha(opcao)}
              >
                <Text style={styles.optionText}>{opcao.replace(/_/g, ' ')}</Text>
              </TouchableOpacity>
            ))}
          </>
        )}

        {etapa === 2 && (
          <>
            <Text style={styles.title}>
              Escolha uma forma de {opcaoSelecionada.replace(/_/g, ' ').toLowerCase()}
            </Text>

            {tipoAjudaSubopcoes[opcaoSelecionada]?.map((sub, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.option}
                onPress={() => handleSubOpcao(sub)}
              >
                <Text style={styles.optionText}>{sub.replace(/_/g, ' ')}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.backButton} onPress={handleVoltar}>
              <Text style={styles.backText}>Voltar</Text>
            </TouchableOpacity>
          </>
        )}

        {etapa === 3 && (
          <>
            {subOpcao === 'DOAR_DINHEIRO' ? (
              <>
                <Text style={styles.title}>Doação via Pix</Text>
                <View style={styles.card}>
                  <Text style={styles.cardText}>Envie sua contribuição para:</Text>
                  <Text style={[styles.cardText, { fontWeight: 'bold', fontSize: 18 }]}>
                    ajuda@redepapagaio.org
                  </Text>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.title}>Compareça ao local indicado</Text>
                <Text style={styles.subtitle}>
                  Para realizar a ação: <Text style={{ fontWeight: 'bold' }}>{subOpcao.replace(/_/g, ' ')}</Text>
                </Text>

                <View style={styles.card}>
                  <Text style={styles.cardText}>Endereço:</Text>
                  <Text style={styles.cardText}>
                    {enderecosPorCidade[cidade] || 'Endereço não disponível'}
                  </Text>
                  <Text style={styles.cardText}>{cidade} - Centro</Text>
                  <Text style={styles.cardText}>Atendimento: 08h às 18h</Text>
                </View>
              </>
            )}

            <TouchableOpacity style={styles.backButton} onPress={handleVoltar}>
              <Text style={styles.backText}>Voltar</Text>
            </TouchableOpacity>
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
