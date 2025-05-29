import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import TabNavigator from './TabNavigator';
import HelpOptionsScreen from '../screens/HelpOptionsScreen';
import OngDetailScreen from '../screens/OngDetailScreen';
import ChatIAScreen from '../screens/ChatIAScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import AboutScreen from '../screens/AboutScreen'; 
import MapScreen from '../screens/MapScreen'; 
import { RootStackParamList } from '../types/navigation';
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
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }} // esconder header na tela de login
      />
      <Stack.Screen name="Home" component={TabNavigator} />
      <Stack.Screen name="HelpOptions" component={HelpOptionsScreen} />
      <Stack.Screen name="OngDetail" component={OngDetailScreen} />
      <Stack.Screen name="ChatIA" component={ChatIAScreen} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="Mapa" component={MapScreen} />
    </Stack.Navigator>
  );
}
