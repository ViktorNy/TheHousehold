import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { useColorScheme } from "react-native";
import { User } from "../data/data";
import ChoreDetailScreen from "../screens/ChoreDetailScreen";
import DistributeChoreScreen from "../screens/DistributeChoreScreen";
import HouseholdChoresScreen from "../screens/HouseholdChoresScreen";
import HouseholdScreen from "../screens/HouseholdScreen";
import MemberScreen from "../screens/MemberScreen";
import StartScreen from "../screens/StartScreen";

type RootStackParamList = {
  // undefined behöver antagligen ändras :)
  Start: undefined;
  Household: { user: User, householdId?: string  };
  DistributeChore: undefined;
  ChoreDetail: {choreId: string, householdId: string};
  Member: {householdId: string};
  HouseholdChores: {householdId: string};
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, Screen>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStackNavigator() {
  const colorScheme = useColorScheme();

  // const MyTheme = {
  //   ...DarkTheme,
  //   colors: {
  //     ...DarkTheme.colors,
  //     text: 'rgb(255, 255, 255)',
  //   },
  // };

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Household" component={HouseholdScreen} />
        <Stack.Screen
          name="DistributeChore"
          component={DistributeChoreScreen}
        />
        <Stack.Screen name="ChoreDetail" component={ChoreDetailScreen} />
        <Stack.Screen name="Member" component={MemberScreen} />
        <Stack.Screen name="HouseholdChores" component={HouseholdChoresScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStackNavigator;