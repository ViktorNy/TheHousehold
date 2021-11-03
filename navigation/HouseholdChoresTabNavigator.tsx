import { createMaterialTopTabNavigator, MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import React from 'react';
import HouseholdChoresAllScreen from '../screens/householdChores/HouseholdChoresAllScreen';
import HouseholdChoresMonthScreen from '../screens/householdChores/HouseholdChoresMonthScreen';
import HouseholdChoresTodayScreen from '../screens/householdChores/HouseholdChoresTodayScreen';
import HouseholdChoresWeekScreen from '../screens/householdChores/HouseholdChoresWeekScreen';
import StatisticsHeader from './TabDateHeader';

export type HouseholdChoresParamList = {
    HouseholdChoresAll: undefined;
    HouseholdChoresToday: undefined;
    HouseholdChoresWeek: undefined;
    HouseholdChoresMonth: undefined;
};

export type HouseholdChoresTabScreenProx<Screen extends keyof HouseholdChoresParamList> = MaterialTopTabScreenProps<HouseholdChoresParamList, Screen>;

const Tab = createMaterialTopTabNavigator<HouseholdChoresParamList>();

function HouseholdChoresTabNavigator() {
    return (
        <Tab.Navigator tabBar={(props) => <StatisticsHeader props={{ ...props }} headline={'Alla sysslor'} />}>
            <Tab.Screen name="HouseholdChoresAll" options={{ title: 'Alla' }} component={HouseholdChoresAllScreen} />
            <Tab.Screen name="HouseholdChoresToday" options={{ title: 'Idag' }} component={HouseholdChoresTodayScreen} />
            <Tab.Screen name="HouseholdChoresWeek" options={{ title: 'Denna veckan' }} component={HouseholdChoresWeekScreen} />
            <Tab.Screen name="HouseholdChoresMonth" options={{ title: 'Denna månad' }} component={HouseholdChoresMonthScreen} />
        </Tab.Navigator>
    );
}

export default HouseholdChoresTabNavigator;
