import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartScreen from "../screens/StartScreen";
import React from 'react';

const Stack = createNativeStackNavigator();

function RootStackNavigator () {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                name='Start'
                component={StartScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStackNavigator;