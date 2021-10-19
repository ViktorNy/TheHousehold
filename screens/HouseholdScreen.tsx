import React from "react";
import { Button, FlatList, Text, TouchableOpacity, View } from "react-native";
import { RootStackScreenProps } from "../navigation/RootStackNavigator";
import { getAllHouseholdsByUserIdSelector } from "../store/household/householdSelectors";
import { useAppSelector } from "../store/store";

export default function HouseholdScreen({ navigation, route }: RootStackScreenProps<"Household">) {
    const userHousehold = useAppSelector((state) => getAllHouseholdsByUserIdSelector(state, route.params.user.id));
    const currentHousehold = useAppSelector((state) =>
        state.household.householdList.find((h) => h.id === route.params.householdId)
    );

    if (currentHousehold) {
        const houseHoldChores = currentHousehold.chores.filter((item) =>
            item.signedToUserId.filter((item) => item === route.params.user.id)
        );
        return (
            <View>
                <Text>{currentHousehold.name}</Text>
                <FlatList
                    data={houseHoldChores}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("ChoreDetail", { choreId: item.id, householdId: currentHousehold.id })
                            }
                        >
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
                <Button
                    title="Medlemmar"
                    onPress={() => navigation.navigate("Member", { householdId: currentHousehold.id })}
                />
            </View>
        );
    } else {
        return (
            <View>
                <Text>Welcome {route.params.user.username}</Text>
                <FlatList
                    data={userHousehold}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.push("Household", { user: route.params.user, householdId: item.id })
                            }
                        >
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }
}
