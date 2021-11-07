import { createMaterialTopTabNavigator, MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import React from 'react';
import PieChartAllScreen from '../screens/pieChart/PieChartAllScreen';
import PieChartMonthScreen from '../screens/pieChart/PieChartMonthScreen';
import PieChartPrevMonthScreen from '../screens/pieChart/PieChartPrevMonthScreen';
import PieChartPrevWeekScreen from '../screens/pieChart/PieChartPrevWeekScreen';
import PieChartTodayScreen from '../screens/pieChart/PieChartTodayScreen';
import PieChartWeekScreen from '../screens/pieChart/PieChartWeekScreen';
import TabDateHeader from './TabDateHeader';

export type PieParamList = {
    PieAll: undefined;
    PieToday: undefined;
    PieWeek: undefined;
    PieMonth: undefined;
    PiePrevWeek: undefined;
    PiePrevMonth: undefined;
};

export type PieTabScreenProx<Screen extends keyof PieParamList> = MaterialTopTabScreenProps<PieParamList, Screen>;

const Tab = createMaterialTopTabNavigator<PieParamList>();

function PieChartTabNavigator() {
    return (
        <Tab.Navigator tabBar={(props) => <TabDateHeader props={{ ...props }} headline={'Statistik Sysslor'} />}>
            <Tab.Screen name="PieAll" component={PieChartAllScreen} options={{ title: 'Alla' }} />
            <Tab.Screen name="PieToday" component={PieChartTodayScreen} options={{ title: 'Idag' }} />
            <Tab.Screen name="PiePrevWeek" component={PieChartPrevWeekScreen} options={{ title: 'Förra veckan' }} />
            <Tab.Screen name="PiePrevMonth" component={PieChartPrevMonthScreen} options={{ title: 'Förra månaden' }} />
            <Tab.Screen name="PieWeek" component={PieChartWeekScreen} options={{ title: 'Denna veckan' }} />
            <Tab.Screen name="PieMonth" component={PieChartMonthScreen} options={{ title: 'Denna månad' }} />
        </Tab.Navigator>
    );
}

export default PieChartTabNavigator;
