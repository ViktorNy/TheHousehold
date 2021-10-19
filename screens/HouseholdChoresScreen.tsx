import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { RootStackScreenProps } from "../navigation/RootStackNavigator";
import { getHouseholdByIdSelector } from "../store/household/householdSelectors";
import { useAppSelector } from "../store/store";

export default function HouseholdChoresScreen({ navigation, route }: RootStackScreenProps<"HouseholdChores">) {
    const household = useAppSelector((state) => getHouseholdByIdSelector(state, route.params.householdId));
    if (household) {
        return (
            <View>
                <Text>Chores for: {household.name}</Text>
                <FlatList
                    data={household.chores}
                    renderItem={({ item }) => (
                        <View>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("ChoreDetail", { choreId: item.id, householdId: household.id })
                                }
                            >
                                <Text>{item.name}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        );
    } else {
        return <Text>Nothing here!</Text>;
    }
}
