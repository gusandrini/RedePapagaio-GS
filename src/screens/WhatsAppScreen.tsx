import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const colors = {
  darkBlue: '#031C26',
  offWhite: '#F2F2F0',
  gold: '#D9C359',
  green: '#25D366',
};

export default function WhatsAppScreen() {
  const whatsappGroupLink = 'https://chat.whatsapp.com/SEU_LINK_DO_GRUPO_AQUI';

  const entrarNoGrupo = async () => {
    const supported = await Linking.canOpenURL(whatsappGroupLink);
    if (supported) {
      await Linking.openURL(whatsappGroupLink);
    } else {
      alert('Não foi possível abrir o link do WhatsApp.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FontAwesome name="whatsapp" size={80} color={colors.green} style={styles.icon} />

        <Text style={styles.title}>Comunidade RedePapagaio</Text>

        <Text style={styles.text}>
          Participe do nosso grupo no WhatsApp e conecte-se com voluntários, ONGs e pessoas que
          compartilham da mesma vontade de ajudar em situações extremas.
        </Text>

        <Text style={styles.text}>
          Lá você recebe atualizações, pode oferecer ou pedir ajuda e ficar por dentro das ações
          da RedePapagaio em tempo real.
        </Text>

        <TouchableOpacity style={styles.button} onPress={entrarNoGrupo}>
          <Text style={styles.buttonText}>Entrar no grupo do WhatsApp</Text>
        </TouchableOpacity>
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
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: colors.gold,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: colors.offWhite,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 22,
  },
  button: {
    backgroundColor: colors.green,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
