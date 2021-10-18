import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootStackNavigator from './navigation/RootStackNavigator';

export default function App() {
  return (
    <SafeAreaProvider >
      <RootStackNavigator/>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
