import { AntDesign } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import React, { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    label: string | ((props: { focused: boolean; color: string }) => ReactNode);
    headline: string;
    onLeftPress: () => void;
    onRightPress: () => void;
}

export function TabDateSlider({ headline, label, onLeftPress, onRightPress }: Props) {
    const { colors } = useTheme();

    return (
        <View style={[styles.root, { backgroundColor: colors.primary }]}>
            <Text style={{ color: colors.text }}>{headline}</Text>
            <View style={styles.selectionRow}>
                <View>
                    {label !== 'Alla' && (
                        <TouchableOpacity onPress={onLeftPress}>
                            <AntDesign name="left" size={18} color={colors.text} />
                        </TouchableOpacity>
                    )}
                </View>
                <Text style={{ color: colors.text, fontWeight: 'bold' }}>{label}</Text>
                <View>
                    {label !== 'Denna månad' && (
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
