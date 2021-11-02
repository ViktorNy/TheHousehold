import { createMaterialTopTabNavigator, MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import React from 'react';
import HouseholdChoresAllScreen from '../screens/householdChores/HouseholdChoresAllScreen';
import HouseholdChoresMonthScreen from '../screens/householdChores/HouseholdChoresMonthScreen';
import HouseholdChoresTodayScreen from '../screens/householdChores/HouseholdChoresTodayScreen';
import HouseholdChoresWeekScreen from '../screens/householdChores/HouseholdChoresWeekScreen';
import StatisticsHeader from './StatisticsHeader';

interface Props {
    householdId?: string;
    // ?? det som behövs inne på screen för rätt info..
}

export type HouseholdChoresParamList = {
    HouseholdChoresAll: Props;
    HouseholdChoresToday: Props;
    HouseholdChoresWeek: Props;
    HouseholdChoresMonth: Props;
};

// export type PieTabScreenProx<Screen extends keyof PieParamList> = MaterialTopTabScreenProps<PieParamList, Screen>;
export type HouseholdChoresTabScreenProx<Screen extends keyof HouseholdChoresParamList> = MaterialTopTabScreenProps<HouseholdChoresParamList, Screen>;

const Tab = createMaterialTopTabNavigator<HouseholdChoresParamList>();

// TODO: Ersätt StatisticsHeader with new file or refactor code to work at both senarios

function HouseholdChoresTabNavigator() {
    return (
        <Tab.Navigator tabBar={(props) => <StatisticsHeader {...props} />}>
            <Tab.Screen name="HouseholdChoresAll" component={HouseholdChoresAllScreen} initialParams={{ householdId: undefined }} />
            <Tab.Screen name="HouseholdChoresToday" component={HouseholdChoresTodayScreen} initialParams={{ householdId: undefined }} />
            <Tab.Screen name="HouseholdChoresWeek" component={HouseholdChoresWeekScreen} initialParams={{ householdId: undefined }} />
            <Tab.Screen name="HouseholdChoresMonth" component={HouseholdChoresMonthScreen} initialParams={{ householdId: undefined }} />
        </Tab.Navigator>
    );
}

export default HouseholdChoresTabNavigator;
