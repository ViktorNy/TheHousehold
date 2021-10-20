import React from "react";
import { Button, Text, View } from "react-native";
import { mockedUserData } from "../data/data";
import { RootStackScreenProps } from "../navigation/RootStackNavigator";

export default function StartScreen({ navigation }: RootStackScreenProps<"Start">) {
    const newUser = mockedUserData[1];
    return (

        <Button title="Gå till hushåll" onPress={() => navigation.navigate("Household", { user: newUser })}></Button>
    );
}
