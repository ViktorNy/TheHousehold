import { useTheme } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { CustomActionButton } from '../component/CustomNavigateButton';
import { ProfileHeader } from '../component/ProfileHeader';
import { RootStackScreenProps } from '../navigation/RootStackNavigator';
import { getMemberByIdSelector } from '../store/member/memberSelector';
import { useAppDispatch, useAppSelector } from '../store/store';
import deepcopy from 'ts-deepcopy';

export default function MemberDetailScreen({ route, navigation }: RootStackScreenProps<'MemberDetailScreen'>) {
    const memberData = useAppSelector((state) => getMemberByIdSelector(state, route.params.memberId));
    const householdData = useAppSelector((state) => state.household.householdList.find((h) => h.id === memberData?.householdId));
    const currentHousehold = useAppSelector((state) => state.household.householdList.find((h) => h.id === state.household.currentHouseholdId));
    const userMemberType = useAppSelector((state) => state.member.memberList.find(m => m.userId === state.user.user?.id && m.householdId === currentHousehold?.id))?.memberType;
    const dispatch = useAppDispatch();
    const { colors } = useTheme();

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
        <View>
            <ProfileHeader onGoBack={goBack} household={householdData} visitMember={{ member: memberData, userName: memberData?.memberName }} />
            <View style={styles.displayInfo}>
                <Text style={[styles.headline, { color: colors.text }]}>{currentHousehold?.name}</Text>
                <Text style={[{ color: colors.text }]}>Medlem: {memberData?.memberName}</Text>
                <Text style={[{ color: colors.text }]}>Medlem sedan: {memberData?.joinData}</Text>
                <Text style={[{ color: colors.text }]}>Medlemstyp: {(memberData?.memberType === 'owner') ? 'Ägare' : 'Medlem'}</Text>
                <Text style={[styles.headline, { color: colors.text }]}>Utförda sysslor:</Text>
                <FlatList
                    data={choresDone}
                    renderItem={({ item, index }) => (
                        <Text key={index} style={[{ color: colors.text }]}>
                            {item.date} | Poäng: {item.score} | {item.name}
                        </Text>
                    )}
                />
                {(userMemberType === 'owner') && (
                    <CustomActionButton
                        buttonText={(memberData?.memberType === 'member') ? 'Sätt som ägare' : 'Ta bort som ägare'}
                        action={() => {
                            const memberToSetMembertype = deepcopy(memberData)!;
                            memberToSetMembertype.memberType = (memberToSetMembertype?.memberType === 'member') ? 'owner' : 'member';
                            dispatch({ type: 'EDIT_MEMBER', payload: memberToSetMembertype });
                        }}
                    />
                )}
            </View>
        </View>
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
