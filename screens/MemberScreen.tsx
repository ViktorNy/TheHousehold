import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { CustomNavigateButton } from '../component/CustomNavigateButton';
import { RootStackScreenProps } from '../navigation/RootStackNavigator';
import { getMembersOfHouseholdSelector } from '../store/member/memberSelector';
import { useAppSelector } from '../store/store';

export default function MemberScreen({ navigation, route }: RootStackScreenProps<'Member'>) {
    const memberList = useAppSelector((state) => getMembersOfHouseholdSelector(state, route.params.householdId));

    return (
        <View style={styles.root}>
            <FlatList data={memberList} renderItem={
                ({ item }) => {
                    return (
                        <View style={styles.memberContainer}>
                            <CustomNavigateButton
                                buttonText={item.memberName}
                                singleAvatarId={item.avatar}
                                goto={
                                    () => navigation.navigate('MemberDetailScreen', { memberId: item.id })
                                }
                            />
                        </View>
                    );
                }
            } />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        margin: 5
    },
    memberContainer: {
        marginBottom: 5
    }
});
