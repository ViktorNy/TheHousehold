import moment from 'moment';
import React from 'react';
import { View } from 'react-native';
import deepcopy from 'ts-deepcopy';
import ChoresPieCharts from '../../component/pieChartComponents/ChoresPieCharts';
import { Chore } from '../../data/data';
import { useAppSelector } from '../../store/store';

export default function PieChartMonthScreen() {
    const currentHousehold = useAppSelector(state => state.household.currentHousehold);
    const memberList = useAppSelector(state => state.member.memberList.filter(m => m.householdId === currentHousehold?.id));
    const chores = currentHousehold?.chores.map(chore => {
        const thisMonth = moment(new Date()).format('YYYY-MM');
        const returnChore = deepcopy(chore);
        returnChore.doneBy = returnChore.doneBy.filter(db => {
            const dbMonth = moment(new Date(db.date)).format('YYYY-MM');
            return dbMonth === thisMonth;
        });
        return returnChore;
    });
    const filteredChores: Chore[] = chores?.filter(c => c !== undefined) as Chore[];

    if (currentHousehold && chores) {
        return <ChoresPieCharts memberList={memberList} currentHouseholdChores={filteredChores} />;
    }
    return (<View></View>);
}