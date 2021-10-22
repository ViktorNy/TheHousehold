import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { useColorScheme } from "react-native";
import { User } from "../data/data";
import ChoreDetailScreen from "../screens/ChoreDetailScreen";
import DistributeChoreScreen from "../screens/DistributeChoreScreen";
import HouseholdChoresScreen from "../screens/HouseholdChoresScreen";
import HouseholdScreen from "../screens/HouseholdScreen";
import MemberDetailScreen from "../screens/MemberDetailScreen";
import MemberScreen from "../screens/MemberScreen";
import StartScreen from "../screens/StartScreen";

type RootStackParamList = {
  // undefined behöver antagligen ändras :)
  Start: undefined;
  Household: { user: User, householdId?: string };
  DistributeChore: undefined;
  ChoreDetail: { choreId: string, householdId: string };
  Member: { householdId: string };
  HouseholdChores: { householdId: string };
  MemeberDetailScreen: { memberId: string};
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, Screen>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStackNavigator() {
  const colorScheme = useColorScheme();

  const DefaultCustomTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgb(255, 255, 255)',
      card: '#F2F2F2',
      notification: 'rgb(100, 100, 100)',
    },
  };

  const DarkCutomTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: 'rgb(50, 50, 50)',
      notification: 'rgb(200, 200, 200)',
    },
  };

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkCutomTheme : DefaultCustomTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Household" component={HouseholdScreen} />
        <Stack.Screen name="DistributeChore" component={DistributeChoreScreen} />
        <Stack.Screen name="ChoreDetail" component={ChoreDetailScreen} />
        <Stack.Screen name="Member" component={MemberScreen} />
        <Stack.Screen name="HouseholdChores" component={HouseholdChoresScreen} />
        <Stack.Screen name="MemeberDetailScreen" component={MemberDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStackNavigator;
