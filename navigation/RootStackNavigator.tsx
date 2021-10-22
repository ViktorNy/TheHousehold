import { DarkTheme, DefaultTheme, NavigationContainer, useTheme } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { User } from "../data/data";
import ChoreDetailScreen from "../screens/ChoreDetailScreen";
import DistributeChoreScreen from "../screens/DistributeChoreScreen";
import HouseholdChoresScreen from "../screens/HouseholdChoresScreen";
import HouseholdScreen from "../screens/HouseholdScreen";
import LoginScreen from "../screens/LoginScreen";
import MemberDetailScreen from "../screens/MemberDetailScreen";
import MemberScreen from "../screens/MemberScreen";
import RegisterScreen from "../screens/RegisterScreen";
import RegisterUserNameScreen from "../screens/RegisterUserNameScreen";
import StartScreen from "../screens/StartScreen";

type RootStackParamList = {
  Start: undefined; // Tar inte in några parametrerar
  Login: undefined; // Tar inte in några parametrerar
  Register: undefined; // Tar inte in några parametrerar
  RegisterUserName: {email: string, password: string};
  Household: { user: User, householdId?: string };
  DistributeChore: undefined;
  ChoreDetail: { choreId: string, householdId: string };
  Member: { householdId: string };
  HouseholdChores: { householdId: string };
  MemeberDetailScreen: { memberId: string };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
    RootStackParamList,
    Screen
>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStackNavigator() {
  const colorScheme = useColorScheme();
  const { colors } = useTheme();

  const DefaultCustomTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgb(255, 255, 255)'
    },
  };

  const DarkCutomTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: 'rgb(50, 50, 50)'
    },
  };

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkCutomTheme : DefaultCustomTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Start"
          options={{ headerShown: false }}
          component={StartScreen}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: '',
            headerStyle: { backgroundColor: colors.background }, headerShadowVisible: false
          }}
        />
         <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            title: '',
            headerStyle: { backgroundColor: colors.background }, headerShadowVisible: false
          }}
        />
        <Stack.Screen
          name="RegisterUserName"
          component={RegisterUserNameScreen}
          options={{
            title: '',
            headerStyle: { backgroundColor: colors.background }, headerShadowVisible: false
          }}
        />
        <Stack.Screen
          name="Household"
          component={HouseholdScreen}
        />
        <Stack.Screen
          name="DistributeChore"
          component={DistributeChoreScreen}
        />
        <Stack.Screen
          name="ChoreDetail"
          component={ChoreDetailScreen}
        />
              <Stack.Screen
                    name="Member"
                    component={MemberScreen}
                    options={{
                        headerTitle: "Medlemmar",
                    }}
                />
        <Stack.Screen
          name="HouseholdChores"
          component={HouseholdChoresScreen}
        />
        <Stack.Screen
          name="MemeberDetailScreen"
          component={MemberDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStackNavigator;
