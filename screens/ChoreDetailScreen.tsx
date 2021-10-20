import { Text, View } from 'react-native';
import React from 'react';
import { RootStackScreenProps } from '../navigation/RootStackNavigator';
import { useAppSelector } from '../store/store';
import { getChoreByIdSelector } from '../store/household/householdSelectors';
import { useTheme } from '@react-navigation/native';

export default function ChoreDetailScreen({ navigation, route }: RootStackScreenProps<"ChoreDetail">) {
    const { colors } = useTheme();
    const chore = useAppSelector(state => getChoreByIdSelector( state, route.params.choreId, route.params.householdId ))
    return (
        <View>
            <Text style={[{ color: colors.text }]}>Chore screen</Text>
            <Text style={[{ color: colors.text }]}>{chore?.description}</Text>
            <Text style={[{ color: colors.text }]}>{chore?.doneBy.length}</Text>
            <Text style={[{ color: colors.text }]}>{chore?.frequency}</Text>
            <Text style={[{ color: colors.text }]}>{chore?.id}</Text>
            <Text style={[{ color: colors.text }]}>{chore?.lastDone?.length}</Text>
            <Text style={[{ color: colors.text }]}>{chore?.name}</Text>
            <Text style={[{ color: colors.text }]}>{chore?.score}</Text>
            <Text style={[{ color: colors.text }]}>{chore?.signedToUserId}</Text>
        </View>
    )
}