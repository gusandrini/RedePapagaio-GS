// src/screens/FeedbackScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FeedbackScreen() {
  const [estrelas, setEstrelas] = useState(0);
  const [comentario, setComentario] = useState('');

  const enviarFeedback = () => {
    if (estrelas === 0) {
      Alert.alert('Aviso', 'Por favor, selecione uma nota.');
      return;
    }

    // Aqui você pode enviar para API, se quiser
    console.log('Feedback enviado:', { estrelas, comentario });
    Alert.alert('Obrigado!', 'Sua avaliação foi registrada.');
    setEstrelas(0);
    setComentario('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Avalie sua experiência</Text>

      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setEstrelas(star)}>
            <Ionicons
              name={star <= estrelas ? 'star' : 'star-outline'}
              size={36}
              color={star <= estrelas ? '#f5c518' : '#ccc'}
            />
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Escreva um comentário (opcional)"
        multiline
        numberOfLines={4}
        value={comentario}
        onChangeText={setComentario}
      />

      <TouchableOpacity style={styles.button} onPress={enviarFeedback}>
        <Text style={styles.buttonText}>Enviar avaliação</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
