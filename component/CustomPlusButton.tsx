import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface Props {
    goto: () => void;
    buttonText?: string;
    avatarIdList?: string[];
    singleAvatarId?: string; // for future use
}

export function CustomPlusButton({ goto, buttonText }: Props) {
    const { colors } = useTheme();

    return (
        <TouchableOpacity
            style={[
                styles.root,
                { backgroundColor: colors.primary },
                { borderColor: colors.border },
                { borderWidth: 1 }
            ]}
            onPress={goto}
        >

            <AntDesign name="pluscircleo" size={24} color="black" />
            <Text style={[styles.buttonText, { color: colors.text }]}>{buttonText}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    root: {
        height: 52,
        width: 140,
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
