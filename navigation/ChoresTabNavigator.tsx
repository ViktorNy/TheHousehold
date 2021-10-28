import React from 'react';
import { createMaterialTopTabNavigator, MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import AllChoresScreen from '../screens/AllChoresScreen';
import TodayChoresScreen from '../screens/TodayChoresScreen';
import CustomHeader from './CustomHeader';
import WeekChoresScreen from '../screens/WeekChoresScreen';
import MonthChoresScreen from '../screens/MonthChoresScreen';

interface Props {
    userId: string;
    householdId?: string;
    memberId?: string;
    // ?? det som behövs inne på screen för rätt info..
}

type ParamList = {
    All: Props;
    Today: Props;
    Week: Props;
    Month: Props;
};

export type ChoreTabScreenProps<Screen extends keyof ParamList> = MaterialTopTabScreenProps<ParamList, Screen>;

const Tab = createMaterialTopTabNavigator<ParamList>();

function ChoresTabNavigator(props: Props) {
    console.log('choreTab: ' + props.userId);
    return (
        <Tab.Navigator tabBar={(props) => <CustomHeader {...props} />}>
            <Tab.Screen name="All" component={AllChoresScreen} initialParams={{ userId: props.userId }} />
            <Tab.Screen name="Today" component={TodayChoresScreen} initialParams={undefined} />
            <Tab.Screen name="Week" component={WeekChoresScreen} initialParams={undefined} />
            <Tab.Screen name="Month" component={MonthChoresScreen} initialParams={undefined} />
        </Tab.Navigator>
    );
}

export default ChoresTabNavigator;
