import { createMaterialTopTabNavigator, MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import React from 'react';
import MonthChoresScreen from '../screens/MonthChoresScreen';
import PieChartAll from '../screens/pieChart/PieChartAll';
import PieChartToday from '../screens/pieChart/PieChartToday';
import WeekChoresScreen from '../screens/WeekChoresScreen';
import CustomHeader from './CustomHeader';

interface Props {
    householdId: string;
    memberId: string;
    // ?? det som behövs inne på screen för rätt info..
}

export type PieParamList = {
    PieAll: Props;
    PieToday: Props;
    PieWeek: Props;
    PieMonth: Props;
};

export type PieTabScreenProx<Screen extends keyof PieParamList> = MaterialTopTabScreenProps<PieParamList, Screen>;

const Tab = createMaterialTopTabNavigator<PieParamList>();

function PieChartTabNavigator() {
    return (
        <Tab.Navigator tabBar={(props) => <CustomHeader {...props} />}>
            <Tab.Screen name="PieAll" component={PieChartAll} />
            <Tab.Screen name="PieToday" component={PieChartToday} />
            <Tab.Screen name="PieWeek" component={WeekChoresScreen} initialParams={undefined} />
            <Tab.Screen name="PieMonth" component={MonthChoresScreen} initialParams={undefined} />
        </Tab.Navigator>
    );
}

export default PieChartTabNavigator;