import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    // TODO: Fråga David om det går att få med typer för label ('All' | 'Today' | 'Week' | 'Month')
    label: string | ((props: { focused: boolean; color: string }) => ReactNode);
    headline: string;
    onLeftPress: () => void;
    onRightPress: () => void;
}

export function StatisticsSlider({ headline, label, onLeftPress, onRightPress }: Props) {
    const { colors } = useTheme();

    let name = '';
    switch (label) {
    case 'PieAll':
        name = 'Alla';
        break;
    case 'PieToday':
        name = 'Idag';
        break;
    case 'PieWeek':
        name = 'Vecka';
        break;
    case 'PieMonth':
        name = 'Månad';
        break;
    }

    return (
        <View style={[styles.root, { backgroundColor: colors.card }]}>
            <Text style={{ color: colors.text }}>{headline}</Text>
            <View style={styles.selectionRow}>
                <View>
                    {label !== 'PieAll' && (
                        <TouchableOpacity onPress={onLeftPress}>
                            <AntDesign name="left" size={18} color={colors.text} />
                        </TouchableOpacity>
                    )}
                </View>
                <Text style={{ color: colors.text, fontWeight: 'bold' }}>{name}</Text>
                <View>
                    {label !== 'PieMonth' && (
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
