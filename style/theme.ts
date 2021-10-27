import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const DefaultCustomTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'rgb(255, 255, 255)',
        popupBackground: '#F2F2F2',
        popupOverlayColor: 'rgb(255, 255, 255)',
        grayedOutText: 'rgb(100, 100, 100)',
        avatarOutline: '#001f3f',
        passedDueBy: 'black' // för Emelie
    }
};

export const DarkCustomTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        primary: 'rgb(50, 50, 50)',
        popupOverlay: 'rgb(50, 50, 50)',
        background: 'rgb(0, 0, 0)',
        popupBackground: '#000',
        popupOverlayColor: 'rgb(50, 50, 50)',
        grayedOutText: 'rgb(130, 130, 130)',
        avatarOutline: '#B10DC9',
        passedDueBy: 'white' // för Emelie
    }
};