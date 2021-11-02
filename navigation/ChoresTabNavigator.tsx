import { createMaterialTopTabNavigator, MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import React from 'react';
import AllChoresScreen from '../screens/profileChores/AllChoresScreen';
import MonthChoresScreen from '../screens/profileChores/MonthChoresScreen';
import TodayChoresScreen from '../screens/profileChores/TodayChoresScreen';
import WeekChoresScreen from '../screens/profileChores/WeekChoresScreen';
import CustomHeader from './CustomHeader';

interface Props {
    householdId?: string;
    memberId?: string;
}

export type ParamList = {
    All: Props;
    Today: Props;
    Week: Props;
    Month: Props;
};

export type ChoreTabScreenProps<Screen extends keyof ParamList> = MaterialTopTabScreenProps<ParamList, Screen>;

const Tab = createMaterialTopTabNavigator<ParamList>();

function ChoresTabNavigator() {
    return (
        <Tab.Navigator tabBar={(props) => <CustomHeader {...props} />}>
            <Tab.Screen name="Today" component={TodayChoresScreen} initialParams={{ memberId: undefined, householdId: undefined }} />
            <Tab.Screen name="All" component={AllChoresScreen} initialParams={{ memberId: undefined, householdId: undefined }} />
            <Tab.Screen name="Week" component={WeekChoresScreen} initialParams={{ memberId: undefined, householdId: undefined }} />
            <Tab.Screen name="Month" component={MonthChoresScreen} initialParams={{ memberId: undefined, householdId: undefined }} />
        </Tab.Navigator>
    );
}

export default ChoresTabNavigator;
