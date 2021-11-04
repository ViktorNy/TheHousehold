import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { ProfileHeader } from '../component/ProfileHeader';
import { RootStackScreenProps } from '../navigation/RootStackNavigator';
import { useAppSelector } from '../store/store';
import { getMemberByIdSelector } from '../store/member/memberSelector';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MemberDetailScreen({ route, navigation }: RootStackScreenProps<'MemeberDetailScreen'>) {
    const memberData = useAppSelector((state) => getMemberByIdSelector(state, route.params.memberId));
    const householdData = useAppSelector((state) => state.household.householdList.find((h) => h.id === memberData?.householdId));
    const { colors } = useTheme();
    const currentHousehold = useAppSelector((state) => state.household.householdList.find((h) => h.id === state.household.currentHouseholdId));

    const choresDone: { name: string; date: string; score: number }[] = [];
    for (const chore of currentHousehold!.chores) {
        for (const db of chore.doneBy) {
            if (db.memberId === memberData?.id) {
                choresDone.push({ name: chore.name, date: db.date, score: db.score });
            }
        }
    }

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView>
            <ProfileHeader onGoBack={goBack} household={householdData} visitMember={{ member: memberData, userName: memberData?.memberName }} />
            <View style={styles.displayInfo}>
                <Text style={[styles.headline, { color: colors.text }]}>{currentHousehold?.name}</Text>
                <Text style={[{ color: colors.text }]}>Medlem: {memberData?.memberName}</Text>
                <Text style={[{ color: colors.text }]}>Medlem sedan: {memberData?.joinData}</Text>
                <Text style={[{ color: colors.text }]}>Medlemstyp: {memberData?.memberType}</Text>
                <Text style={[styles.headline, { color: colors.text }]}>Utförda sysslor:</Text>
                <FlatList
                    data={choresDone}
                    renderItem={({ item, index }) => (
                        <Text key={index} style={[{ color: colors.text }]}>
                            {item.date} | {item.score} | {item.name}
                        </Text>
                    )}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    displayInfo: {
        paddingLeft: 10,
        paddingRight: 10
    },
    headline: {
        paddingTop: 10,
        fontWeight: 'bold'
    }
});
