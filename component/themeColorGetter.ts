import { useColorScheme } from "react-native";
import { DarkCustomTheme, DefaultCustomTheme } from "../style/theme";

export function ThemeGetter() {
    const colorScheme = useColorScheme();
    const theme = colorScheme === "dark" ? DarkCustomTheme : DefaultCustomTheme;
    return theme
}

export function ColorGetter() {
    const colorScheme = useColorScheme();
    const theme = colorScheme === "dark" ? DarkCustomTheme : DefaultCustomTheme;
    const colors = theme.colors;
    return colors
}