import React from 'react';
import { View } from 'react-native';
import deepcopy from 'ts-deepcopy';
import ChoresPieCharts from '../../component/pieChartComponents/ChoresPieCharts';
import { Chore } from '../../data/data';
import { useAppSelector } from '../../store/store';

export default function PieChartPrevMonthScreen() {
    const currentHousehold = useAppSelector(state => state.household.householdList.find(h => h.id === state.household.currentHouseholdId));
    const memberList = useAppSelector(state => state.member.memberList.filter(m => m.householdId === currentHousehold?.id));
    const chores = currentHousehold?.chores.map(chore => {
        const thisMonth = new Date().getMonth();
        const returnChore = deepcopy(chore);
        returnChore.doneBy = returnChore.doneBy.filter(db => {
            const dbMonth = new Date(db.date).getMonth();
            if (thisMonth === 0) return dbMonth === 11;
            return dbMonth === (thisMonth - 1);
        });
        return returnChore;
    });
    const filteredChores: Chore[] = chores?.filter(c => c !== undefined) as Chore[];

    if (currentHousehold && chores) {
        return <ChoresPieCharts memberList={memberList} currentHouseholdChores={filteredChores} />;
    }
    return (<View></View>);
}