import { useTheme } from "@react-navigation/native";
import React from "react";
import { PressableProps, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props{
    goto: () => void,
    buttonText: string
}

export function CustomNavigateButton({goto, buttonText}: Props) {
    const { colors } = useTheme();
    return (
        <TouchableOpacity style={[styles.root, { backgroundColor: colors.primary }, { borderColor: colors.border }, { borderWidth: 1 }]}
            onPress={goto}>
            <Text style={{ color: colors.text }}>{buttonText}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    root: {
        height: 50,
        borderRadius: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});