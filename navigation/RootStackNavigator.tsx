import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import StartScreen from "../screens/StartScreen";
import React from "react";
import HouseholdScreen from "../screens/HouseholdScreen";
import DistributeChoreScreen from "../screens/DistributeChoreScreen";
import ChoreScreen from "../screens/ChoreScreen";
import { User } from "../data/data";

type RootStackParamList = {
  // undefined behöver antagligen ändras :)
  Start: undefined;
  Household: { user: User };
  DistributeChore: undefined;
  Chore: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, Screen>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Household" component={HouseholdScreen} />
        <Stack.Screen
          name="DistributeChore"
          component={DistributeChoreScreen}
        />
        <Stack.Screen name="Chore" component={ChoreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStackNavigator;
