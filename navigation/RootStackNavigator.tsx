import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartScreen from "../screens/StartScreen";
import React from 'react';
import HouseholdScreen from "../screens/HouseholdScreen";
import DistributeChoreScreen from "../screens/DistributeChoreScreen";
import ChoreScreen from "../screens/ChoreScreen";

const Stack = createNativeStackNavigator();

function RootStackNavigator () {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                name='Start'
                component={StartScreen}
                />
                <Stack.Screen 
                name='Household'
                component={HouseholdScreen}
                />
                <Stack.Screen 
                name='DistributeChore'
                component={DistributeChoreScreen}
                />
                <Stack.Screen 
                name='Chore'
                component={ChoreScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStackNavigator;