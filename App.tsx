import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useColorScheme } from 'react-native';
import { DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import RootStackNavigator from './navigation/RootStackNavigator';
import { store, useAppSelector } from './store/store';

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
            passedDueByText: string;
            border: string;
            appearanceSwitchButton: string;
            appearanceButtonText: string;
            appearanceSwithContainer: string;
            notSelectedAppearance: string;
            textFieldBackground: string;
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
        passedDueBy: 'red',
        passedDueByText: 'white',
        border: 'rgb(200, 200, 200)',
        appearanceSwitchButton: 'rgb(210, 210, 210)',
        appearanceButtonText: 'rgb(0, 0, 0)',
        appearanceSwithContainer: 'rgb(150, 150, 150)',
        notSelectedAppearance: 'rgb(150, 150, 150)',
        textFieldBackground: 'rgb(210, 210, 210)'
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
        passedDueBy: 'red',
        passedDueByText: 'white',
        border: 'rgb(20, 20, 20)',
        appearanceSwitchButton: 'rgb(40, 40, 40)',
        appearanceButtonText: 'rgb(210, 210, 210)',
        appearanceSwithContainer: 'rgb(0, 0, 0)',
        notSelectedAppearance: 'rgb(0, 0, 0)',
        textFieldBackground: 'rgb(100, 100, 100)'
    }
};

export default function App() {
    return (
        <Provider store={store}>
            <AppInside />
        </Provider>
    );
}

function AppInside() {
    const scheme = useColorScheme();
    const appearance = useAppSelector((state) => state.user.appearance);

    let theme = scheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme;

    if (appearance === 'light') {
        theme = CustomDefaultTheme;
    } else if (appearance === 'dark') {
        theme = CustomDarkTheme;
    }

    return (
        <NavigationContainer theme={theme}>
            <PaperProvider theme={theme}>
                <SafeAreaProvider>
                    <RootStackNavigator />
                    <StatusBar style="auto" />
                </SafeAreaProvider>
            </PaperProvider>
        </NavigationContainer>
    );
}
