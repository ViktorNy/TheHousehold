import React from "react";
import { FlatList, View } from "react-native";
import { CustomNavigateButton } from "../component/CustomNavigateButton";
import { RootStackScreenProps } from "../navigation/RootStackNavigator";
import { getMembersOfHouseholdSelector } from "../store/member/memberSelector";
import { useAppSelector } from "../store/store";
import { getAllUsersSelector } from "../store/user/userSelector";

export default function MemberScreen({ navigation, route }: RootStackScreenProps<"Member">) {
    const memberList = useAppSelector((state) => getMembersOfHouseholdSelector(state, route.params.householdId));
    const allUsers = useAppSelector(getAllUsersSelector);

    return (
        <View>
            <FlatList data={memberList} renderItem={
                ({ item }) => {
                    const username = allUsers.find(u => u.id === item.userId)?.username;
                    return <CustomNavigateButton buttonText={username} singleAvatarId={item.avatar} goto={() => navigation.navigate("MemeberDetailScreen", { memberId: item.id })} />
                }
            } />
        </View>
    );
}
