import { RootStackScreenProps } from "../navigation/RootStackNavigator";
import { FlatList, Text, View } from 'react-native';
import React from "react";
import { membersOfHouseholdSelector } from "../store/household/householdSelectors";
import { useAppSelector } from "../store/store";

export default function MemberScreen({ route }: RootStackScreenProps<'Member'> ){
  const  memberList = useAppSelector(state => membersOfHouseholdSelector(state, route.params.householdId))
    return (
        <View>
            <FlatList
        data={memberList}
        renderItem={({ item }) => (
          <Text>{item.userId}</Text>
          ) }
      />
        </View>
    )
}