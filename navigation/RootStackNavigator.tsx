import { ParamListBase, useTheme } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
// import { useTheme } from 'react-native-paper';
import ChoreDetailScreen from '../screens/ChoreDetailScreen';
import DistributeChoreScreen from '../screens/DistributeChoreScreen';
import LoginScreen from '../screens/LoginScreen';
import MemberDetailScreen from '../screens/MemberDetailScreen';
import MemberScreen from '../screens/MemberScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RegisterUserNameScreen from '../screens/RegisterUserNameScreen';
import StartScreen from '../screens/StartScreen';
import ChoresTabNavigator from './ChoresTabNavigator';
import HouseholdChoresTabNavigator from './HouseholdChoresTabNavigator';
import PieChartTabNavigator from './PieChartTabNavigator';

// declare global {
//     namespace ReactNavigation {
//         interface RootParamList extends RootStackParamList { }
//     }
// }

export interface RootStackParamList extends ParamListBase {
    Start: undefined; // Tar inte in några parametrerar
    Login: undefined; // Tar inte in några parametrerar
    Register: undefined; // Tar inte in några parametrerar
    RegisterUserName: { email: string; password: string };
    Household: undefined;
    DistributeChore: undefined;
    ChoreDetail: { choreId: string; householdId: string };
    Member: { householdId: string };
    HouseholdChores: { householdId: string };
    MemeberDetailScreen: { memberId: string };
    PieChart: { screen: string; params: { householdId?: string; memberId?: string } };
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList = string> = NativeStackScreenProps<RootStackParamList, Screen>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStackNavigator() {
    const theme = useTheme();

    const colors = theme.colors;

    return (
        <Stack.Navigator>
            <Stack.Screen name="Start" options={{ headerShown: false }} component={StartScreen} />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    title: '',
                    headerStyle: { backgroundColor: colors.background },
                    headerShadowVisible: false
                }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{
                    title: '',
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: colors.background }
                }}
            />
            <Stack.Screen
                name="RegisterUserName"
                component={RegisterUserNameScreen}
                options={{
                    title: '',
                    headerStyle: { backgroundColor: colors.background },
                    headerShadowVisible: false
                }}
            />
            <Stack.Screen name="Household" component={ChoresTabNavigator} />
            <Stack.Screen name="DistributeChore" component={DistributeChoreScreen} />
            <Stack.Screen
                name="ChoreDetail"
                component={ChoreDetailScreen}
            />
            <Stack.Screen
                name="Member"
                component={MemberScreen}
                options={{
                    headerTitle: 'Medlemmar'
                }}
            />
            <Stack.Screen name="HouseholdChores" component={HouseholdChoresTabNavigator} />
            <Stack.Screen name="MemeberDetailScreen" component={MemberDetailScreen} />
            <Stack.Screen name="PieChart" component={PieChartTabNavigator} />
        </Stack.Navigator>
    );
}

export default RootStackNavigator;
