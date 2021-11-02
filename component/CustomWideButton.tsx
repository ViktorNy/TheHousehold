import { useTheme } from 'react-native-paper';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Props {
    goto: () => void;
    buttonText?: string;
    // avatarIdList?: string[];
    // singleAvatarId?: string; // for future use
}

export function CustomWideButton({ goto, buttonText }: Props) {
    const { colors } = useTheme();

    return (
        <TouchableOpacity
            style={[styles.root, { backgroundColor: colors.primary }, { borderColor: colors.border }, { borderWidth: 1 }]}
            onPress={goto}
        >
            <Text style={[styles.buttonText, { color: colors.text }]}>{buttonText}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    root: {
        height: 52,
        width: '100%',
        borderRadius: 25,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row'
    },
    buttonText: {
        fontWeight: 'bold'
    },
    textpadding: {
        paddingLeft: 20
    }
});
