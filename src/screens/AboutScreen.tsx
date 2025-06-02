import React from 'react';
import { SafeAreaView, ScrollView, Text, StyleSheet } from 'react-native';

const colors = {
  darkBlue: '#031C26',
  offWhite: '#F2F2F0',
  gold: '#D9C359',
  orange: '#F2811D',
};

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Sobre a RedePapagaio</Text>

        <Text style={styles.text}>
          A <Text style={styles.highlight}>RedePapagaio</Text> é uma plataforma solidária criada para oferecer respostas rápidas, organizadas e humanas em situações de emergência — como enchentes, deslizamentos, incêndios e outros desastres naturais.
        </Text>

        <Text style={styles.text}>
          Nosso sistema conecta <Text style={styles.highlight}>pessoas afetadas</Text> a <Text style={styles.highlight}>voluntários</Text>, <Text style={styles.highlight}>ONGs</Text> e <Text style={styles.highlight}>instituições de apoio</Text>, utilizando recursos como geolocalização, alertas em tempo real, classificação de risco e um assistente inteligente via chat IA.
        </Text>

        <Text style={styles.text}>
          O nome foi inspirado no <Text style={styles.highlight}>papagaio-cinzento africano</Text>, conhecido por sua capacidade rara de ajudar outros sem esperar nada em troca — um símbolo de empatia verdadeira que representa nossos valores.
        </Text>

        <Text style={styles.text}>
          Criamos funcionalidades como:
          {'\n'}• Distribuição inteligente de ONGs pelo mapa nacional
          {'\n'}• Registro de ocorrências com detalhes de urgência
          {'\n'}• Cadastro de ajuda realizada vinculada à necessidade de cada local
          {'\n'}• Integração futura com WhatsApp e notificações
        </Text>

        <Text style={styles.text}>
          Este projeto foi desenvolvido por estudantes da FIAP como parte do desafio <Text style={styles.highlight}>Global Solution</Text>, reforçando nosso compromisso com a <Text style={styles.highlight}>inovação social</Text>, <Text style={styles.highlight}>solidariedade</Text> e o <Text style={styles.highlight}>uso ético da tecnologia</Text>.
        </Text>

        <Text style={styles.footer}>🦜 Empatia que voa longe.</Text>
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
    padding: 24,
    backgroundColor: colors.darkBlue,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: colors.gold,
  },
  text: {
    fontSize: 16,
    marginBottom: 18,
    color: colors.offWhite,
    textAlign: 'justify',
    lineHeight: 24,
  },
  highlight: {
    color: colors.gold,
    fontWeight: '600',
  },
  footer: {
    marginTop: 30,
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    color: colors.orange,
  },
});
