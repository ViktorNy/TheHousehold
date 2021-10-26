import { Text } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';

export default function DistributeChoreScreen() {
    const { colors } = useTheme();
    return (
        <Text style={[{ color: colors.text }]}>Distribute chore screen</Text>
    );
}