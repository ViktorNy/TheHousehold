import React from 'react';
import { View } from 'react-native';
import ChoresPieCharts from '../../component/pieChartComponents/ChoresPieCharts';
import { useAppSelector } from '../../store/store';

export default function PieChartAllScreen() {
    const currentHousehold = useAppSelector(state => state.household.currentHousehold);
    const memberList = useAppSelector(state => state.member.memberList.filter(m => m.householdId === currentHousehold?.id));

    if (currentHousehold) {
        return <ChoresPieCharts memberList={memberList} currentHouseholdChores={currentHousehold.chores} />;
    } else return <View></View>;
}