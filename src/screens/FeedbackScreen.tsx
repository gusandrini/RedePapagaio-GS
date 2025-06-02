// import React, { useState } from 'react';
// import {
//   SafeAreaView,
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   Alert,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// const colors = {
//   darkBlue: '#031C26',
//   offWhite: '#F2F2F0',
//   gold: '#D9C359',
//   orange: '#F2811D',
//   grayLight: '#ccc',
// };

// export default function FeedbackScreen() {
//   const [estrelas, setEstrelas] = useState(0);
//   const [comentario, setComentario] = useState('');

//   const enviarFeedback = () => {
//     if (estrelas === 0) {
//       Alert.alert('Aviso', 'Por favor, selecione uma nota.');
//       return;
//     }

//     // Aqui você pode enviar para API, se quiser
//     console.log('Feedback enviado:', { estrelas, comentario });
//     Alert.alert('Obrigado!', 'Sua avaliação foi registrada.');
//     setEstrelas(0);
//     setComentario('');
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.container}>
//         <Text style={styles.title}>Avalie sua experiência</Text>

//         <View style={styles.starsContainer}>
//           {[1, 2, 3, 4, 5].map((star) => (
//             <TouchableOpacity key={star} onPress={() => setEstrelas(star)}>
//               <Ionicons
//                 name={star <= estrelas ? 'star' : 'star-outline'}
//                 size={36}
//                 color={star <= estrelas ? colors.gold : colors.grayLight}
//               />
//             </TouchableOpacity>
//           ))}
//         </View>

//         <TextInput
//           style={styles.input}
//           placeholder="Escreva um comentário (opcional)"
//           placeholderTextColor={colors.offWhite}
//           multiline
//           numberOfLines={4}
//           value={comentario}
//           onChangeText={setComentario}
//           textAlignVertical="top"
//         />

//         <TouchableOpacity style={styles.button} onPress={enviarFeedback}>
//           <Text style={styles.buttonText}>Enviar avaliação</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: colors.darkBlue,
//   },
//   container: {
//     flex: 1,
//     padding: 30,
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//     color: colors.offWhite,
//   },
//   starsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   input: {
//     backgroundColor: '#14394d', // tom mais escuro azul para input
//     borderRadius: 8,
//     padding: 12,
//     borderColor: colors.gold,
//     borderWidth: 1,
//     marginBottom: 20,
//     color: colors.offWhite,
//     fontSize: 16,
//   },
//   button: {
//     backgroundColor: colors.orange,
//     paddingVertical: 14,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: colors.offWhite,
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });
