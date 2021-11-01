import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { ProfileHeader } from '../component/ProfileHeader';
import { RootStackScreenProps } from '../navigation/RootStackNavigator';
import { useAppSelector } from '../store/store';
import { getMemberByIdSelector } from '../store/member/memberSelector';

export default function MemberDetailScreen({ route }: RootStackScreenProps<'MemeberDetailScreen'>) {
    const memberData = useAppSelector((state) => getMemberByIdSelector(state, route.params.memberId));
    const householdData = useAppSelector((state) =>
        state.household.householdList.find((h) => h.id === memberData?.householdId)
    );
    const { colors } = useTheme();

    return (
        <View>
            <ProfileHeader
                household={householdData}
                visitMember={{ member: memberData, userName: memberData?.memberName }}
            />
            <Text style={[{ color: colors.text }]}>{memberData?.memberName }</Text>
            <Text style={[{ color: colors.text }]}>{memberData?.memberType}</Text>
            <Text style={[{ color: colors.text }]}>{memberData?.joinData}</Text>
            <Text style={[{ color: colors.text }]}>{memberData?.pausedHistory}</Text>
        </View>
    );
}
