import { Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { RootStackScreenProps } from "../navigation/RootStackNavigator";
import { useAppSelector } from "../store/store";
import { getMemeberByIdSelector } from "../store/member/memberSelector";
import { getUserByIdSelector } from "../store/user/userSelector";
import { ProfileHeader } from "../component/ProfileHeader";

export default function MemberDetailScreen({ route }: RootStackScreenProps<"MemeberDetailScreen">) {
    const memberData = useAppSelector((state) => getMemeberByIdSelector(state, route.params.memberId));
    const userData = useAppSelector((state) => getUserByIdSelector(state, memberData?.userId));
    const householdData = useAppSelector((state) =>
        state.household.householdList.find((h) => h.id === memberData?.householdId)
    );

    const { colors } = useTheme();

    return (
        <View>
            <ProfileHeader
                household={householdData}
                visitMember={{ member: memberData, userName: userData?.username }}
            />
            <Text style={[{ color: colors.text }]}>{userData?.username}</Text>
            <Text style={[{ color: colors.text }]}>{memberData?.memberType}</Text>
            <Text style={[{ color: colors.text }]}>{memberData?.joinData}</Text>
            <Text style={[{ color: colors.text }]}>{memberData?.pausedHistory}</Text>
        </View>
    );
}
