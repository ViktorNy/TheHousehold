/* eslint-disable indent */
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import React, { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    // TODO: Fråga David om det går att få med typer för label ('All' | 'Today' | 'Week' | 'Month')
    label: string | ((props: { focused: boolean; color: string }) => ReactNode);
    headline: string;
    onLeftPress: () => void;
    onRightPress: () => void;
}

export type labelCaseChoreSlider = 'All' | 'Today' | 'Week' | 'Month';

export function ChoresSlider({ headline, label, onLeftPress, onRightPress }: Props) {
    const { colors } = useTheme();

    let name = '';
    switch (label) {
        case 'All':
            name = 'Alla';
            break;
        case 'Today':
            name = 'Idag';
            break;
        case 'Week':
            name = 'Vecka';
            break;
        case 'Month':
            name = 'Månad';
            break;
    }

    return (
        <View style={[styles.root, { backgroundColor: colors.primary }]}>
            <Text style={{ color: colors.text }}>{headline}</Text>
            <View style={styles.selectionRow}>
                <View>
                    {label !== 'Today' && (
                        <TouchableOpacity onPress={onLeftPress}>
                            <AntDesign name="left" size={18} color={colors.text} />
                        </TouchableOpacity>
                    )}
                </View>
                <Text style={{ color: colors.text, fontWeight: 'bold' }}>{name}</Text>
                <View>
                    {label !== 'Month' && (
                        <TouchableOpacity onPress={onRightPress}>
                            <AntDesign name="right" size={18} color={colors.text} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        padding: 10,
        marginTop: 3,
        marginBottom: 3,
        alignItems: 'center'
    },
    selectionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        marginTop: 10
    }
});
