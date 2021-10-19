import React from "react";
import { FlatList, Text, View } from "react-native";
import { RootStackScreenProps } from "../navigation/RootStackNavigator";
import { getMembersOfHouseholdSelector } from "../store/member/memberSelector";
import { useAppSelector } from "../store/store";

export default function MemberScreen({ route }: RootStackScreenProps<"Member">) {
    const memberList =  useAppSelector((state) => getMembersOfHouseholdSelector(state, route.params.householdId));
    
    return (
        <View>
            { memberList&& <FlatList data={memberList} renderItem={({ item }) => <Text>{item.userId}</Text>} />}
        </View>
    );
}
