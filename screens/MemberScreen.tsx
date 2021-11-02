import React from 'react';
import { FlatList, View } from 'react-native';
import { CustomNavigateButton } from '../component/CustomNavigateButton';
import { RootStackScreenProps } from '../navigation/RootStackNavigator';
import { getMembersOfHouseholdSelector } from '../store/member/memberSelector';
import { useAppSelector } from '../store/store';

export default function MemberScreen({ navigation, route }: RootStackScreenProps<'Member'>) {
    const memberList = useAppSelector((state) => getMembersOfHouseholdSelector(state, route.params.householdId));

    return (
        <View>
            <FlatList data={memberList} renderItem={
                ({ item }) => {
                    return <CustomNavigateButton buttonText={item.memberName} singleAvatarId={item.avatar} goto={() => navigation.navigate('MemeberDetailScreen', { memberId: item.id })} />;
                }
            } />
        </View>
    );
}
