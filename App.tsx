import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useColorScheme } from 'react-native';
import { DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import RootStackNavigator from './navigation/RootStackNavigator';
import { store } from './store/store';
// eslint-disable-next-line no-use-before-define
declare global {
    // eslint-disable-next-line no-use-before-define
    namespace ReactNativePaper {
        // eslint-disable-next-line no-use-before-define
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
        border: 'rgb(200, 200, 200)'
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
        border: 'rgb(20, 20, 20)'
    }
};

export default function App() {
    const scheme = useColorScheme();
    return (
        <Provider store={store}>
            <PaperProvider theme={scheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme}>
                <SafeAreaProvider>
                    <RootStackNavigator colorScheme={scheme} />
                    <StatusBar style="auto" />
                </SafeAreaProvider>
            </PaperProvider>
        </Provider>
    );
}
