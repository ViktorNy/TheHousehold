import { StatusBar } from "expo-status-bar";
import React from "react";
import { useColorScheme } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import RootStackNavigator from "./navigation/RootStackNavigator";
import { store } from "./store/store";
import { CustomDarkTheme, CustomDefaultTheme } from "./style/themes";

export default function App() {
    const scheme = useColorScheme();
    return (
        <Provider store={store}>
            <PaperProvider theme={scheme === "dark" ? CustomDarkTheme : CustomDefaultTheme}>
                <SafeAreaProvider>
                    <RootStackNavigator />
                    <StatusBar style="auto" />
                </SafeAreaProvider>
            </PaperProvider>
        </Provider>
    );
}
