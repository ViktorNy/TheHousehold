import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import AllChoresScreen from '../screens/AllChoresScreen';
import TodayChoresScreen from '../screens/TodayChoresScreen';
import CustomHeader from './CustomHeader';

type ParamList = {
  Today: undefined;
  All: undefined;
};

export type RootStackScreenProps<Screen extends keyof ParamList> = NativeStackScreenProps<
  ParamList,
  Screen
>;

const Tab = createMaterialTopTabNavigator<ParamList>();

function ChoresTabNavigator(props: ) {
    return (

        <Tab.Navigator tabBar={(props) => <CustomHeader {...props}/>}>
            <Tab.Screen
                name="All"
                component={AllChoresScreen}
                initialParams= {}
            />
            <Tab.Screen
                name="Today"
                component={TodayChoresScreen}
                initialParams= {}
            />

        </Tab.Navigator>

    );
}

export default ChoresTabNavigator;
