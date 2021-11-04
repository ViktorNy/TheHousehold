import { ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { useTheme } from 'react-native-paper';
import ChoreDetailScreen from '../screens/ChoreDetailScreen';
import MemberDetailScreen from '../screens/MemberDetailScreen';
import MemberScreen from '../screens/MemberScreen';
import NoHouseholdScreen from '../screens/NoHouseholdScreen';
import LoginScreen from '../screens/start/LoginScreen';
import RegisterScreen from '../screens/start/RegisterScreen';
import StartScreen from '../screens/start/StartScreen';
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
    MemberDetailScreen: { memberId: string };
    PieChart: { screen: string; params: { householdId?: string; memberId?: string } };
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList = string> = NativeStackScreenProps<RootStackParamList, Screen>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStackNavigator() {
    const { colors } = useTheme();

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
            <Stack.Screen name="ChoreDetail" component={ChoreDetailScreen} />
            <Stack.Screen
                name="Member"
                component={MemberScreen}
                options={{
                    headerTitle: 'Medlemmar'
                }}
            />
            <Stack.Screen name="HouseholdChores" component={HouseholdChoresTabNavigator} options={{
                headerTitle: 'Hushållets sysslor'
            }} />
            <Stack.Screen name="MemberDetailScreen" options={{ headerShown: false }} component={MemberDetailScreen} />
            <Stack.Screen name="PieChart" component={PieChartTabNavigator} options={{ headerTitle: 'Statistik' }} />
        </Stack.Navigator>
    );
}

export default RootStackNavigator;
