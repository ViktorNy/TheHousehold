import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Member } from "../data/data";
import { RootStackScreenProps } from "../navigation/RootStackNavigator";
import { getAllHouseholdsByUserIdSelector, getAllHouseholdsSelector, membersOfHouseholdSelector } from "../store/household/householdSelectors";
import { useAppSelector } from "../store/store";

export default function HouseholdScreen({navigation,route}: RootStackScreenProps<"Household">) {
  const userHouseHold = useAppSelector((state ) => 
    getAllHouseholdsByUserIdSelector(state, route.params.user.id)
  );
  const currentHousehold = route.params.houseHold;
  let memberList: Member[] = [];

  // Todo: Fråga david om detta är en korrekt lösning?
  if (currentHousehold) {
    memberList = useAppSelector(state => membersOfHouseholdSelector(state, currentHousehold.id))
  }
  else {
    memberList = useAppSelector(membersOfHouseholdSelector)
  };
  
  if (currentHousehold) {
    const houseHoldChores = currentHousehold.chores.filter(item => item.signedToUserId.filter(item => item === route.params.user.id));
    return(
      <View>
        <Text>{currentHousehold.name}</Text>
        <FlatList
        data={houseHoldChores}
        renderItem={({ item }) => (
          <Text>{item.name}</Text>
          ) }
      />
      <FlatList
        data={memberList}
        renderItem={({ item }) => (
          <Text>{item.userId}</Text>
          ) }
      />
      </View>
    )
  }
  else {
      return (
    <View>
      <Text>Welcome {route.params.user.username}</Text>
      <FlatList
        data={userHouseHold}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => 
          navigation.navigate('Household', {user: route.params.user, houseHold: item})}>
          <Text>{item.name}</Text>
          </TouchableOpacity>) }
      />
    </View>
  );
  }
}
