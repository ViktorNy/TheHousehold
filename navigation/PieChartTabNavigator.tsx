import { createMaterialTopTabNavigator, MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import React from 'react';
import PieChartAllScreen from '../screens/pieChart/PieChartAllScreen';
import PieChartMonthScreen from '../screens/pieChart/PieChartMonthScreen';
import PieChartTodayScreen from '../screens/pieChart/PieChartTodayScreen';
import PieChartWeekScreen from '../screens/pieChart/PieChartWeekScreen';
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
            <Tab.Screen name="PieAll" component={PieChartAllScreen} initialParams={{ householdId: undefined }} />
            <Tab.Screen name="PieToday" component={PieChartTodayScreen} initialParams={{ householdId: undefined }}/>
            <Tab.Screen name="PieWeek" component={PieChartWeekScreen} initialParams={undefined} />
            <Tab.Screen name="PieMonth" component={PieChartMonthScreen} initialParams={undefined} />
        </Tab.Navigator>
    );
}

export default PieChartTabNavigator;