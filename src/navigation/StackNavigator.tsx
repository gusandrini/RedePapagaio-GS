import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import TabNavigator from './TabNavigator';
import HelpOptionsScreen from '../screens/HelpOptionsScreen';
import OngDetailScreen from '../screens/OngDetailScreen';
import ChatIAScreen from '../screens/ChatIAScreen';
// import FeedbackScreen from '../screens/FeedbackScreen';
import AboutScreen from '../screens/AboutScreen';
import MapScreen from '../screens/MapScreen';
import AlertsScreen from '../screens/AlertsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import CreateOccurrenceScreen from '../screens/CreateOccurrenceScreen';
import ProfileScreen from '../screens/ProfileScreen';

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
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Home" component={TabNavigator} />
      <Stack.Screen name="HelpOptions" component={HelpOptionsScreen} />
      <Stack.Screen name="OngDetail" component={OngDetailScreen} />
      <Stack.Screen name="ChatIA" component={ChatIAScreen} />
      {/* <Stack.Screen name="Feedback" component={FeedbackScreen} /> */}
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="Mapa" component={MapScreen} />
      <Stack.Screen name="Alertas" component={AlertsScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="CreateOccurrence" component={CreateOccurrenceScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
