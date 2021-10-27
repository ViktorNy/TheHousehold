import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native";
import { DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from "react-native-paper";

declare global {
    namespace ReactNativePaper {
        interface ThemeColors {
            popupBackground: string;
            popupOverlayColor: string;
            grayedOutText: string;
            avatarOutline: string;
            passedDueBy: string;
        }
    }
}

export const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
        ...NavigationDefaultTheme.colors,
        ...PaperDefaultTheme.colors,
        primary: "rgb(255, 255, 255)",
        popupBackground: "#F2F2F2",
        popupOverlayColor: "rgb(255, 255, 255)",
        grayedOutText: "rgb(100, 100, 100)",
        avatarOutline: "#001f3f",
        passedDueBy: "black", // för Emelie
    },
};

export const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
        ...NavigationDarkTheme.colors,
        ...PaperDarkTheme.colors,
        primary: "rgb(50, 50, 50)",
        background: "rgb(0, 0, 0)",
        popupBackground: "#000",
        popupOverlayColor: "rgb(50, 50, 50)",
        grayedOutText: "rgb(130, 130, 130)",
        avatarOutline: "#B10DC9",
        passedDueBy: "white", // för Emelie
    },
};
