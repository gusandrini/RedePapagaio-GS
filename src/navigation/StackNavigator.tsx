import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import LoginScreen from '../screens/LoginScreen';
import TabNavigator from './TabNavigator';
import HelpOptionsScreen from '../screens/HelpOptionsScreen';
import OngDetailScreen from '../screens/OngDetailScreen';
import ChatIAScreen from '../screens/ChatIAScreen';
import MapScreen from '../screens/MapScreen';
import WhatsAppScreen from '../screens/WhatsAppScreen';

import AppHeader from '../components/AppHeader';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: { backgroundColor: '#031C26' },
        headerTitle: () => <AppHeader />,
        headerTitleAlign: 'center',
        headerTintColor: '#F2F2F0',
        headerLeft: () => null, // Remover o botão de voltar globalmente
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerLeft: () => null }}
      />
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerLeft: () => null }} // Garantindo que o botão de voltar esteja removido também na tela Home
      />
      <Stack.Screen
        name="HelpOptions"
        component={HelpOptionsScreen}
        options={{ headerLeft: () => null }} // Remover botão de voltar
      />
      <Stack.Screen
        name="OngDetail"
        component={OngDetailScreen}
        options={{ headerLeft: () => null }} // Remover botão de voltar
      />
      <Stack.Screen
        name="ChatIA"
        component={ChatIAScreen}
        options={{ headerLeft: () => null }} // Remover botão de voltar
      />
      <Stack.Screen
        name="Mapa"
        component={MapScreen}
        options={{ headerLeft: () => null }} // Remover botão de voltar
      />
      <Stack.Screen
        name="WhatsApp"
        component={WhatsAppScreen}
        options={{ headerLeft: () => null }} // Remover botão de voltar
      />
    </Stack.Navigator>
  );
}
