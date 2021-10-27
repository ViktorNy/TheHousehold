import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface Props {
    onChange: (data: displayChoreSelection) => void;
}

export type displayChoreSelection = 'Alla'| 'Idag' | 'Denna vecka' | 'Denna månad';
export function ChoresSlider({ onChange }: Props) {
    const { colors } = useTheme();
    const [displayOption, setDisplayOption] = useState<displayChoreSelection>('Alla');

    const pressedArrow = (goTo: 'right' | 'left', currentState: displayChoreSelection) => {
        switch (currentState) {
        case 'Alla':
            if (goTo === 'right') {
                setDisplayOption('Idag');
            } else { setDisplayOption('Denna månad'); };
            break;
        case 'Idag':
            if (goTo === 'right') setDisplayOption('Denna vecka');
            else setDisplayOption('Alla');
            break;
        case 'Denna vecka':
            if (goTo === 'right') setDisplayOption('Denna månad');
            else setDisplayOption('Idag');

            break;
        case 'Denna månad':
            if (goTo === 'right') setDisplayOption('Alla');
            else setDisplayOption('Denna vecka');
        }
        onChange(displayOption);
    };

    return <View style={[styles.root, { backgroundColor: colors.primary }]}>
        <Text style={{ color: colors.text }}>Sysslor</Text>
        <View style={styles.selectionRow}>
            <TouchableOpacity onPress= {() => { pressedArrow('left', displayOption); }}>
                <AntDesign name="left" size={18} color={colors.text} />
            </TouchableOpacity>
            <Text style={{ color: colors.text, fontWeight: 'bold' }}>{displayOption}</Text>
            <TouchableOpacity onPress= {() => { pressedArrow('right', displayOption); }}>
                <AntDesign name="right" size={18} color={colors.text} />
            </TouchableOpacity>
        </View>
    </View>;
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