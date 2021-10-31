import { createMaterialTopTabNavigator, MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import React from 'react';
import MonthChoresScreen from '../screens/MonthChoresScreen';
import PieChartAll from '../screens/pieChart/PieChartAll';
import PieChartToday from '../screens/pieChart/PieChartToday';
import WeekChoresScreen from '../screens/WeekChoresScreen';
import StatisticsHeader from './StatisticsHeader';

interface Props {
    householdId?: string;
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
        <Tab.Navigator tabBar={(props) => <StatisticsHeader {...props} />}>
            <Tab.Screen name="PieAll" component={PieChartAll} initialParams={{ householdId: undefined }} />
            <Tab.Screen name="PieToday" component={PieChartToday} initialParams={{ householdId: undefined }}/>
            <Tab.Screen name="PieWeek" component={WeekChoresScreen} initialParams={undefined} />
            <Tab.Screen name="PieMonth" component={MonthChoresScreen} initialParams={undefined} />
        </Tab.Navigator>
    );
}

export default PieChartTabNavigator;