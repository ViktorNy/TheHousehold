import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { choreStyles } from '../../style/choreDetailStyle';

export default function ValueContainer() {
    const { colors } = useTheme();
    return (
        <View style={[{ backgroundColor: colors.popupOverlayColor }, choreStyles.energyContainer]}>
            <View style={choreStyles.columnStyle}>
                <Text style={[{ color: colors.text }, choreStyles.text]}>Värde: </Text>
                <Text style={[choreStyles.valueDescription]}>Hur energikrävande är sysslan?</Text>
            </View>
            <View style={choreStyles.energyNrContainer}>
                <Text style={choreStyles.energyText}>5</Text>
            </View>
        </View>
    );
}
