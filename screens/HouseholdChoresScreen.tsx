import { useTheme } from "@react-navigation/native";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { RootStackScreenProps } from "../navigation/RootStackNavigator";
import { getHouseholdByIdSelector } from "../store/household/householdSelectors";
import { useAppSelector } from "../store/store";

export default function HouseholdChoresScreen({ navigation, route }: RootStackScreenProps<"HouseholdChores">) {
    const { colors } = useTheme();
    const household = useAppSelector((state) => getHouseholdByIdSelector(state, route.params.householdId));
    if (household) {
        return (
            <View>
                <Text style={[{ color: colors.text }]}>Chores for: {household.name}</Text>
                <FlatList
                    data={household.chores}
                    renderItem={({ item }) => (
                        <View>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("ChoreDetail", { choreId: item.id, householdId: household.id })
                                }
                            >
                                <Text style={[{ color: colors.text }]}>{item.name}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        );
    } else {
        return <Text style={[{ color: colors.text }]}>Nothing here!</Text>;
    }
}
