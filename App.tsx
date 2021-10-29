import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import RootStackNavigator from './navigation/RootStackNavigator';
import { store } from './store/store';

export default function App() {
    return (
        <Provider store={store}>
            <SafeAreaProvider >
                <RootStackNavigator />
                <StatusBar style="auto" />
            </SafeAreaProvider>
        </Provider>
    );
}
