import React from 'react';
import { Text } from 'react-native';
import { PieTabScreenProx } from '../../navigation/PieChartTabNavigator';

export default function PieChartToday({ navigation, route }: PieTabScreenProx<'PieToday'>) {
    return (
        <Text style={[{ color: 'white' }]}>PIE TODAY</Text>
    );
}