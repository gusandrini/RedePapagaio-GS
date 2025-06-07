import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { navigationRef } from './src/services/navigationService';
import StackNavigator from './src/navigation/StackNavigator';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#000" />
      <NavigationContainer ref={navigationRef} theme={BlackTheme}>
        <StackNavigator />
      </NavigationContainer>
    </View>
  );
}

const BlackTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#000', // fundo preto
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // fundo preto fora do navegador
  },
});
