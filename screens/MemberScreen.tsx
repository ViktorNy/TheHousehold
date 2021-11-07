import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { CustomActionButton } from '../component/CustomActionButton';
import { RootStackScreenProps } from '../navigation/RootStackNavigator';
import { getMembersOfHouseholdSelector } from '../store/member/memberSelector';
import { useAppSelector } from '../store/store';
import deepcopy from 'ts-deepcopy';

export default function MemberScreen({ navigation, route }: RootStackScreenProps<'Member'>) {
    const memberList = deepcopy(useAppSelector((state) => getMembersOfHouseholdSelector(state, route.params.householdId)));

    const user = useAppSelector(state => state.user.user);

    const indexOfUser = memberList.findIndex((u) => u.userId === user!.id);

    memberList.splice(indexOfUser, 1);

    return (
        <View style={styles.root}>
            <FlatList data={memberList} renderItem={
                ({ item }) => {
                    if (item.memberType !== 'pending') {
                        return (
                            <View style={styles.memberContainer}>
                                <CustomActionButton
                                    buttonText={item.memberName}
                                    singleAvatarId={item.avatar}
                                    action={
                                        () => navigation.navigate('MemberDetailScreen', { memberId: item.id })
                                    }
                                />
                            </View>
                        );
                    } else {
                        return (null);
                    }
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
