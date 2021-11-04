import React from 'react';
import { View } from 'react-native';
import deepcopy from 'ts-deepcopy';
import ChoresPieCharts from '../../component/pieChartComponents/ChoresPieCharts';
import { Chore } from '../../data/data';
import { useAppSelector } from '../../store/store';

export default function PieChartWeekScreen() {
    const currentHousehold = useAppSelector(state => state.household.householdList.find(h => h.id === state.household.currentHouseholdId));
    const memberList = useAppSelector(state => state.member.memberList.filter(m => m.householdId === currentHousehold?.id));

    const today = new Date();
    const weekday = (today.getDay() === 0) ? 7 : today.getDay();
    const startOfWeek = today.getTime() - (weekday * 1000 * 3600 * 24);

    const chores = currentHousehold?.chores.map(chore => {
        const returnChore = deepcopy(chore);
        returnChore.doneBy = returnChore.doneBy.filter(db => new Date(db.date).getTime() >= startOfWeek);
        return returnChore;
    });
    const filteredChores: Chore[] = chores?.filter(c => c !== undefined) as Chore[];

    if (currentHousehold && chores) {
        return <ChoresPieCharts memberList={memberList} currentHouseholdChores={filteredChores} />;
    }
    return <View></View>;
}