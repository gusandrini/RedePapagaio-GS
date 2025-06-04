// import React, { useEffect, useState } from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   Alert,
//   TouchableOpacity,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { useNavigation } from '@react-navigation/native';
// import api from '../services/api';

// const colors = {
//   darkBlue: '#031C26',
//   cardBg: '#0b3043',
//   offWhite: '#F2F2F0',
//   gold: '#D9C359',
// };

// interface TipoOcorrencia {
//   idTipoOcorrencia: number;
//   nmTipoOcorrencia: string;
// }

// interface Regiao {
//   idRegiao: number;
//   nmRegiao: string;
// }

// interface NivelUrgencia {
//   idNivelUrgencia: number;
//   nmNivel: string;
// }

// export default function NovaOcorrenciaScreen() {
//   const navigation = useNavigation();

//   const [descricao, setDescricao] = useState('');
//   const [tipos, setTipos] = useState<TipoOcorrencia[]>([]);
//   const [tipoSelecionado, setTipoSelecionado] = useState<number | null>(null);
//   const [regioes, setRegioes] = useState<Regiao[]>([]);
//   const [regiaoSelecionada, setRegiaoSelecionada] = useState<number | null>(null);
//   const [niveis, setNiveis] = useState<NivelUrgencia[]>([]);
//   const [nivelSelecionado, setNivelSelecionado] = useState<number | null>(null);

//   useEffect(() => {
//     async function carregarDados() {
//       try {
//         const [resTipos, resRegioes, resNiveis] = await Promise.all([
//           api.get('/tipos_ocorrencias/todos'),
//           api.get('/regioes/todas'),
//           api.get('/niveis_urgencias/todos'),
//         ]);
//         setTipos(resTipos.data);
//         setRegioes(resRegioes.data);
//         setNiveis(resNiveis.data);
//       } catch (error) {
//         Alert.alert('Erro', 'Não foi possível carregar os dados.');
//       }
//     }

//     carregarDados();
//   }, []);

//   async function salvarOcorrencia() {
//     if (!descricao || !tipoSelecionado || !regiaoSelecionada || !nivelSelecionado) {
//       Alert.alert('Campos obrigatórios', 'Preencha todos os campos.');
//       return;
//     }

//     if (descricao.length > 100) {
//       Alert.alert('Limite de caracteres', 'A descrição deve ter no máximo 100 caracteres.');
//       return;
//     }

//     const payload = {
//       tipoOcorrencia: { idTipoOcorrencia: tipoSelecionado },
//       regiao: { idRegiao: regiaoSelecionada },
//       nivelUrgencia: { idNivelUrgencia: nivelSelecionado },
//       statusOcorrencia: { idStatusOcorrencia: 1 },
//       dsOcorrencia: descricao.trim(),
//     };

//     try {
//       await api.post('/ocorrencias/inserir', payload);
//       Alert.alert('Sucesso', 'Ocorrência cadastrada com sucesso!');
//       navigation.goBack();
//     } catch (error: any) {
//       console.error('Erro ao salvar:', error.response?.data || error.message);
//       Alert.alert('Erro', 'Falha ao salvar ocorrência.');
//     }
//   }

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView contentContainerStyle={styles.container}>
//         <Text style={styles.title}>Nova Ocorrência</Text>

//         <Text style={styles.label}>Tipo de Ocorrência</Text>
//         <View style={styles.picker}>
//           <Picker
//             selectedValue={tipoSelecionado}
//             onValueChange={(value) => setTipoSelecionado(value)}
//           >
//             <Picker.Item label="Selecione" value={null} />
//             {tipos.map((tipo) => (
//               <Picker.Item
//                 key={tipo.idTipoOcorrencia}
//                 label={tipo.nmTipoOcorrencia.replace(/_/g, ' ')}
//                 value={tipo.idTipoOcorrencia}
//               />
//             ))}
//           </Picker>
//         </View>

//         <Text style={styles.label}>Região</Text>
//         <View style={styles.picker}>
//           <Picker
//             selectedValue={regiaoSelecionada}
//             onValueChange={(value) => setRegiaoSelecionada(value)}
//           >
//             <Picker.Item label="Selecione" value={null} />
//             {regioes.map((regiao) => (
//               <Picker.Item
//                 key={regiao.idRegiao}
//                 label={regiao.nmRegiao}
//                 value={regiao.idRegiao}
//               />
//             ))}
//           </Picker>
//         </View>

//         <Text style={styles.label}>Nível de Urgência</Text>
//         <View style={styles.picker}>
//           <Picker
//             selectedValue={nivelSelecionado}
//             onValueChange={(value) => setNivelSelecionado(value)}
//           >
//             <Picker.Item label="Selecione" value={null} />
//             {niveis.map((nivel) => (
//               <Picker.Item
//                 key={nivel.idNivelUrgencia}
//                 label={nivel.nmNivel}
//                 value={nivel.idNivelUrgencia}
//               />
//             ))}
//           </Picker>
//         </View>

//         <Text style={styles.label}>Descrição</Text>
//         <TextInput
//           placeholder="Ex: Inundação em SP"
//           style={styles.input}
//           value={descricao}
//           onChangeText={setDescricao}
//           multiline
//         />

//         <TouchableOpacity style={styles.button} onPress={salvarOcorrencia}>
//           <Text style={styles.buttonText}>Cadastrar Ocorrência</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: colors.darkBlue },
//   container: { padding: 20, flexGrow: 1 },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: colors.gold,
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   label: {
//     color: colors.offWhite,
//     fontSize: 16,
//     marginBottom: 6,
//   },
//   picker: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     marginBottom: 15,
//   },
//   input: {
//     backgroundColor: '#fff',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 20,
//     height: 100,
//     textAlignVertical: 'top',
//   },
//   button: {
//     backgroundColor: colors.gold,
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   buttonText: {
//     fontWeight: 'bold',
//     color: '#000',
//     fontSize: 16,
//   },
// });
