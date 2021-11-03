import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useColorScheme } from 'react-native';
import { DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import RootStackNavigator from './navigation/RootStackNavigator';
import { store } from './store/store';

declare global {
    // eslint-disable-next-line no-unused-vars
    namespace ReactNativePaper {
        // eslint-disable-next-line no-unused-vars
        interface ThemeColors {
            popupBackground: string;
            popupOverlayColor: string;
            grayedOutText: string;
            avatarOutline: string;
            passedDueBy: string;
            border: string;
        }
    }
}

const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
        ...NavigationDefaultTheme.colors,
        ...PaperDefaultTheme.colors,
        primary: 'rgb(255, 255, 255)',
        popupBackground: '#F2F2F2',
        popupOverlayColor: 'rgb(255, 255, 255)',
        grayedOutText: 'rgb(100, 100, 100)',
        avatarOutline: '#001f3f',
        passedDueBy: 'black', // för Emelie
        border: 'rgb(200, 200, 200)',
        appearanceSwitchButton: 'rgb(210, 210, 210)',
        appearanceButtonText: 'rgb(0, 0, 0)',
        appearanceSwithContainer: 'rgb(150, 150, 150)',
        notSelectedAppearance: 'rgb(150, 150, 150)'
    }
};

const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
        ...NavigationDarkTheme.colors,
        ...PaperDarkTheme.colors,
        primary: 'rgb(50, 50, 50)',
        background: 'rgb(0, 0, 0)',
        popupBackground: '#000',
        popupOverlayColor: 'rgb(50, 50, 50)',
        grayedOutText: 'rgb(130, 130, 130)',
        avatarOutline: '#B10DC9',
        passedDueBy: 'white', // för Emelie
        border: 'rgb(20, 20, 20)',
        appearanceSwitchButton: 'rgb(40, 40, 40)',
        appearanceButtonText: 'rgb(210, 210, 210)',
        appearanceSwithContainer: 'rgb(0, 0, 0)',
        notSelectedAppearance: 'rgb(0, 0, 0)'
    }
};

export default function App() {
    const scheme = useColorScheme();
    return (
        <Provider store={store}>
            <PaperProvider theme={scheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme}>
                <SafeAreaProvider>
                    <RootStackNavigator />
                    <StatusBar style="auto" />
                </SafeAreaProvider>
            </PaperProvider>
        </Provider>
    );
}
