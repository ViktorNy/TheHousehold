import { createMaterialTopTabNavigator, MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import React from 'react';
import AllChoresScreen from '../screens/AllChoresScreen';
import MonthChoresScreen from '../screens/MonthChoresScreen';
import TodayChoresScreen from '../screens/TodayChoresScreen';
import WeekChoresScreen from '../screens/WeekChoresScreen';
import CustomHeader from './CustomHeader';

interface Props {
    userId?: string;
    householdId?: string;
    memberId?: string;
    // ?? det som behövs inne på screen för rätt info..
}

export type ParamList = {
    All: Props;
    Today: Props;
    Week: Props;
    Month: Props;
};

export type ChoreTabScreenProps<Screen extends keyof ParamList> = MaterialTopTabScreenProps<ParamList, Screen>;

const Tab = createMaterialTopTabNavigator<ParamList>();

function ChoresTabNavigator(props: Props) {
    return (
        <Tab.Navigator tabBar={(props) => <CustomHeader {...props} />}>
            <Tab.Screen name="All" component={AllChoresScreen} />
            <Tab.Screen name="Today" component={TodayChoresScreen} initialParams={{ householdId: undefined, memberId: undefined }} />
            <Tab.Screen name="Week" component={WeekChoresScreen} initialParams={undefined} />
            <Tab.Screen name="Month" component={MonthChoresScreen} initialParams={undefined} />
        </Tab.Navigator>
    );
}

export default ChoresTabNavigator;
