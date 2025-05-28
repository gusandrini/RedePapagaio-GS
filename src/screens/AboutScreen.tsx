import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sobre a RedePapagaio</Text>

      <Text style={styles.text}>
        A RedePapagaio nasceu com a missão de conectar pessoas em situações extremas — como desastres naturais — a voluntários, ONGs e redes de apoio em tempo real.
      </Text>

      <Text style={styles.text}>
        O nome foi inspirado no papagaio-cinzento africano, uma das poucas espécies conhecidas por demonstrar altruísmo verdadeiro: ele ajuda outros membros da sua espécie sem esperar nada em troca. Assim como eles, acreditamos na empatia como motor de transformação social.
      </Text>

      <Text style={styles.text}>
        Combinando tecnologia, geolocalização, chat com IA e integração com instituições sérias, a RedePapagaio busca oferecer respostas rápidas e humanas em momentos críticos.
      </Text>

      <Text style={styles.text}>
        Este projeto foi desenvolvido por estudantes da FIAP como parte do desafio Global Solution — e reflete nosso compromisso com a inovação social, a solidariedade e o uso consciente da tecnologia.
      </Text>

      <Text style={styles.footer}>🦜 Empatia que voa longe.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#007bff',
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
    color: '#333',
    textAlign: 'justify',
    lineHeight: 24,
  },
  footer: {
    marginTop: 30,
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#555',
  },
});
