import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  OngDetail: { id: string; nome: string; cidade: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'OngDetail'>;

interface Ong {
  id: string;
  nome: string;
  latitude: number;
  longitude: number;
  cidade: string;
}

export default function MapScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [region, setRegion] = useState<Region | null>(null);
  const [ongs, setOngs] = useState<Ong[]>([]);
  const [carregando, setCarregando] = useState(true);

  const gerarOngsProporcionais = () => {
    const estados = [
      { sigla: 'SP', cidade: 'São Paulo', base: [-23.55, -46.63], peso: 4 },
      { sigla: 'RJ', cidade: 'Rio de Janeiro', base: [-22.90, -43.17], peso: 2 },
      { sigla: 'MG', cidade: 'Belo Horizonte', base: [-19.92, -43.94], peso: 3 },
      { sigla: 'BA', cidade: 'Salvador', base: [-12.97, -38.51], peso: 3 },
      { sigla: 'AM', cidade: 'Manaus', base: [-3.11, -60.02], peso: 5 },
      { sigla: 'SE', cidade: 'Aracaju', base: [-10.91, -37.07], peso: 1 },
      { sigla: 'RS', cidade: 'Porto Alegre', base: [-30.03, -51.23], peso: 2 },
      { sigla: 'PA', cidade: 'Belém', base: [-1.46, -48.48], peso: 2 },
      { sigla: 'PE', cidade: 'Recife', base: [-8.05, -34.9], peso: 2 },
      { sigla: 'CE', cidade: 'Fortaleza', base: [-3.73, -38.52], peso: 2 },
    ];

    let idCounter = 1;
    const novasOngs: Ong[] = [];

    estados.forEach((estado) => {
      const quantidade = Math.max(1, estado.peso);
      for (let i = 0; i < quantidade; i++) {
        const deslocLat = (Math.random() - 0.5) * 0.2;
        const deslocLng = (Math.random() - 0.5) * 0.2;

        novasOngs.push({
          id: String(idCounter++),
          nome: `ONG ${estado.sigla} ${i + 1}`,
          cidade: estado.cidade,
          latitude: estado.base[0] + deslocLat,
          longitude: estado.base[1] + deslocLng,
        });
      }
    });

    setOngs(novasOngs);
  };

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permissão negada', 'Permissão para acessar localização foi negada.');
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        setRegion({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });

        gerarOngsProporcionais();
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar o mapa ou as ONGs.');
      } finally {
        setCarregando(false);
      }
    })();
  }, []);

  if (!region || carregando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Voltar</Text>
      </TouchableOpacity>

      <MapView style={styles.map} region={region} showsUserLocation>
        {ongs.map((ong) => (
          <Marker
            key={ong.id}
            coordinate={{ latitude: ong.latitude, longitude: ong.longitude }}
            title={ong.nome}
            description={ong.cidade}
            onCalloutPress={() =>
              navigation.navigate('OngDetail', {
                id: ong.id,
                nome: ong.nome,
                cidade: ong.cidade,
              })
            }
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    backgroundColor: '#000000aa',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
