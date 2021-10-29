import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { ProfileHeader } from '../component/ProfileHeader';
import { RootStackScreenProps } from '../navigation/RootStackNavigator';
import { getMemeberByIdSelector } from '../store/member/memberSelector';
import { useAppSelector } from '../store/store';

export default function MemberDetailScreen({ route }: RootStackScreenProps<'MemeberDetailScreen'>) {
    const memberData = useAppSelector((state) => getMemeberByIdSelector(state, route.params.memberId));
    const user = useAppSelector((state) => state.user.user);
    const householdData = useAppSelector((state) =>
        state.household.householdList.find((h) => h.id === memberData?.householdId)
    );

    const { colors } = useTheme();

    return (
        <View>
            <ProfileHeader
                household={householdData}
                visitMember={{ member: memberData, userName: user?.username }}
            />
            <Text style={[{ color: colors.text }]}>{user?.username}</Text>
            <Text style={[{ color: colors.text }]}>{memberData?.memberType}</Text>
            <Text style={[{ color: colors.text }]}>{memberData?.joinData}</Text>
            <Text style={[{ color: colors.text }]}>{memberData?.pausedHistory}</Text>
        </View>
    );
}
