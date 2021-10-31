import React from 'react';
import ChoresPieCharts from '../../component/pieChartComponents/ChoresPieCharts';
import { PieTabScreenProx } from '../../navigation/PieChartTabNavigator';
import { getHouseholdByIdSelector } from '../../store/household/householdSelectors';
import { useAppSelector } from '../../store/store';

export default function PieChartAll({ route }: PieTabScreenProx<'PieAll'>) {
    const currentHousehold = useAppSelector(state => getHouseholdByIdSelector(state, route.params.householdId));
    const memberList = useAppSelector(state => state.member.memberList.filter(m => m.householdId === route.params.householdId));

    if (currentHousehold) {
        return <ChoresPieCharts memberList={memberList} currentHouseholdChores={currentHousehold.chores} />;
    }
}