// import React, { useEffect, useState } from 'react';
// import {
//   SafeAreaView,
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import api from '../services/api'; // Ajuste esse caminho conforme sua estrutura

// interface Notificacao {
//   id: string;
//   cidade: string;
//   estado: string;
//   problema: string;
// }

// type RootStackParamList = {
//   HelpOptions: { cidade: string; problema: string };
// };

// type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'HelpOptions'>;

// const colors = {
//   darkBlue: '#031C26',
//   offWhite: '#F2F2F0',
//   gold: '#D9C359',
//   buttonBg: '#F2811D',
//   cardBg: '#0b3043',
// };

// export default function NotificationsScreen() {
//   const navigation = useNavigation<NavigationProp>();
//   const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
//   const [carregando, setCarregando] = useState(true);

//   useEffect(() => {
//     const carregarNotificacoes = async () => {
//       try {
//         const response = await api.get<Notificacao[]>('/ocorrencias');
//         setNotificacoes(response.data);
//       } catch (error) {
//         Alert.alert('Erro', 'Não foi possível carregar as notificações.');
//       } finally {
//         setCarregando(false);
//       }
//     };

//     carregarNotificacoes();
//   }, []);

//   const renderItem = ({ item }: { item: Notificacao }) => (
//     <View style={styles.card}>
//       <Text style={styles.cardText}>
//         {item.cidade} ({item.estado}): {item.problema}
//       </Text>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() =>
//           navigation.navigate('HelpOptions', {
//             cidade: item.cidade,
//             problema: item.problema,
//           })
//         }
//       >
//         <Text style={styles.buttonText}>Ajudar</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.container}>
//         <Text style={styles.title}>Pedidos por Cidade</Text>

//         {carregando ? (
//           <ActivityIndicator size="large" color={colors.buttonBg} />
//         ) : (
//           <FlatList
//             data={notificacoes}
//             keyExtractor={(item) => item.id.toString()}
//             renderItem={renderItem}
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={{ paddingBottom: 20 }}
//           />
//         )}
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
//     padding: 20,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: colors.gold,
//     textAlign: 'center',
//     marginBottom: 15,
//   },
//   card: {
//     backgroundColor: colors.cardBg,
//     padding: 15,
//     marginBottom: 12,
//     borderRadius: 8,
//     elevation: 3,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   cardText: {
//     color: colors.offWhite,
//     fontSize: 16,
//     flex: 1,
//     marginRight: 10,
//   },
//   button: {
//     backgroundColor: colors.buttonBg,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 6,
//   },
//   buttonText: {
//     color: colors.offWhite,
//     fontWeight: 'bold',
//   },
// });
