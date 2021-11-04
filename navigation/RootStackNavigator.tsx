import { DarkTheme, DefaultTheme, ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { useColorScheme } from 'react-native';
import ChoreDetailScreen from '../screens/ChoreDetailScreen';
import DistributeChoreScreen from '../screens/DistributeChoreScreen';
import LoginScreen from '../screens/LoginScreen';
import MemberDetailScreen from '../screens/MemberDetailScreen';
import MemberScreen from '../screens/MemberScreen';
import NoHouseholdScreen from '../screens/NoHouseholdScreen';
import RegisterScreen from '../screens/RegisterScreen';
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
    NoHousehold: undefined;
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
    const colorScheme = useColorScheme();

    const DefaultCustomTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: 'rgb(255, 255, 255)',
            notification: 'rgb(100, 100, 100)'
        }
    };

    const DarkCustomTheme = {
        ...DarkTheme,
        colors: {
            ...DarkTheme.colors,
            primary: 'rgb(50, 50, 50)',
            notification: 'rgb(200, 200, 200)',
            background: 'rgb(0, 0, 0)'
        }
    };

    const theme = colorScheme === 'dark' ? DarkCustomTheme : DefaultCustomTheme;
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
                name="NoHousehold"
                component={NoHouseholdScreen}
                options={{
                    title: '',
                    headerStyle: { backgroundColor: colors.background },
                    headerShadowVisible: false
                }}
            />
            <Stack.Screen name="Household" options={{ headerShown: false }} component={ChoresTabNavigator} />
            <Stack.Screen name="DistributeChore" component={DistributeChoreScreen} />
            <Stack.Screen name="ChoreDetail" component={ChoreDetailScreen} />
            <Stack.Screen
                name="Member"
                component={MemberScreen}
                options={{
                    headerTitle: 'Medlemmar'
                }}
            />
            <Stack.Screen name="HouseholdChores" component={HouseholdChoresTabNavigator} />
            <Stack.Screen name="MemeberDetailScreen" options={{ headerShown: false }} component={MemberDetailScreen} />
            <Stack.Screen name="PieChart" component={PieChartTabNavigator} options={{ headerTitle: 'Statistik' }} />
        </Stack.Navigator>
    );
}

export default RootStackNavigator;
