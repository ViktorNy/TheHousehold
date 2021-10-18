import React from "react";
import { FlatList, Text, View } from "react-native";
import { mockedHouseholdData } from "../data/data";
import { RootStackScreenProps } from "../navigation/RootStackNavigator";

export default function HouseholdScreen({navigation,route,}: RootStackScreenProps<"Household">) {
  const houseHolds = mockedHouseholdData;
  const userHouseHold = houseHolds.filter((item) =>
    item.members.filter((item) => item.userId === route.params.user.id)
  );
  return (
    <View>
      <Text>Welcome {route.params.user.username}</Text>
      <FlatList
        data={userHouseHold}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
}
