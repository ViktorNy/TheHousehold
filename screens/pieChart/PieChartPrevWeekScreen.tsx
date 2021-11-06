import React from 'react';
import { View } from 'react-native';
import deepcopy from 'ts-deepcopy';
import ChoresPieCharts from '../../component/pieChartComponents/ChoresPieCharts';
import { Chore } from '../../data/data';
import { useAppSelector } from '../../store/store';

export default function PieChartPrevWeekScreen() {
    const currentHousehold = deepcopy(useAppSelector(state => state.household.householdList.find(h => h.id === state.household.currentHouseholdId)));
    const memberList = deepcopy(useAppSelector(state => state.member.memberList.filter(m => m.householdId === currentHousehold?.id)));

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weekday = (today.getDay() === 0) ? 7 : today.getDay();
    const aDayInMiliseconds = 1000 * 3600 * 24;
    const timeSinceLastSundayInMiliseconds = weekday * aDayInMiliseconds;
    const endOfPrevWeek = today.getTime() - timeSinceLastSundayInMiliseconds;
    const startOfPrevWeek = today.getTime() - 6 * aDayInMiliseconds - timeSinceLastSundayInMiliseconds;

    const chores = currentHousehold?.chores.map(chore => {
        const returnChore = chore;
        returnChore.doneBy = returnChore.doneBy.filter(db => {
            return new Date(db.date).getTime() >= startOfPrevWeek &&
                new Date(db.date).getTime() <= endOfPrevWeek;
        });
        return returnChore;
    });
    const filteredChores: Chore[] = chores?.filter(c => c !== undefined) as Chore[];

    if (currentHousehold && chores) {
        return <ChoresPieCharts memberList={memberList} currentHouseholdChores={filteredChores} />;
    }
    return <View></View>;
}