import { Text, View } from 'react-native';
import React from 'react';
import { RootStackScreenProps } from '../navigation/RootStackNavigator';
import { useAppSelector } from '../store/store';
import { getChoreByIdSelector } from '../store/household/householdSelectors';

export default function ChoreDetailScreen({ navigation, route }: RootStackScreenProps<"ChoreDetail">) {
    const chore = useAppSelector(state => getChoreByIdSelector( state, route.params.choreId, route.params.householdId ))
    return (
        <View>
        <Text>Chore screen</Text>
        <Text>{chore?.description}</Text>
        <Text>{chore?.doneBy.length}</Text>
        <Text>{chore?.frequency}</Text>
        <Text>{chore?.id}</Text>
        <Text>{chore?.lastDone?.length}</Text>
        <Text>{chore?.name}</Text>
        <Text>{chore?.score}</Text>
        <Text>{chore?.signedToUserId}</Text>
        </View>
    )
}