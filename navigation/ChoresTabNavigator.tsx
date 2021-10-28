import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AllChoresScreen from '../screens/AllChoresScreen';
import TodayChoresScreen from '../screens/TodayChoresScreen';
import CustomHeader from './CustomHeader';
import WeekChoresScreen from '../screens/WeekChoresScreen';
import MonthChoresScreen from '../screens/MonthChoresScreen';

type ParamList = {
    Today: undefined;
    All: undefined;
    Week: undefined;
    Month: undefined;
};

export type RootStackScreenProps<Screen extends keyof ParamList> = NativeStackScreenProps<ParamList, Screen>;

const Tab = createMaterialTopTabNavigator<ParamList>();

function ChoresTabNavigator(props: any) {
    return (
        <Tab.Navigator tabBar={(props) => <CustomHeader {...props} />}>
            <Tab.Screen name="All" component={AllChoresScreen} initialParams={undefined} />
            <Tab.Screen name="Today" component={TodayChoresScreen} initialParams={undefined} />
            <Tab.Screen name="Week" component={WeekChoresScreen} initialParams={undefined} />
            <Tab.Screen name="Month" component={MonthChoresScreen} initialParams={undefined} />
        </Tab.Navigator>
    );
}

export default ChoresTabNavigator;
