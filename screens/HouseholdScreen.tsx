import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { mockedHouseholdData } from "../data/data";
import { RootStackScreenProps } from "../navigation/RootStackNavigator";

export default function HouseholdScreen({navigation,route}: RootStackScreenProps<"Household">) {
  const houseHolds = mockedHouseholdData;
  const userHouseHold = houseHolds.filter((item) =>
    item.members.filter((item) => item.userId === route.params.user.id)
  );
  
  if (route.params.houseHold) {
    const houseHoldChores = route.params.houseHold.chores.filter(item => item.signedToUserId.filter(item => item === route.params.user.id));
    return(
      <View>
        <Text>{route.params.houseHold.name}</Text>
        <FlatList
        data={houseHoldChores}
        renderItem={({ item }) => (
          <Text>{item.name}</Text>
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
