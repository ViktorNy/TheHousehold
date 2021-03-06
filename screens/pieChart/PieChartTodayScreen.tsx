import moment from 'moment';
import React from 'react';
import { View } from 'react-native';
import deepcopy from 'ts-deepcopy';
import ChoresPieCharts from '../../component/pieChartComponents/ChoresPieCharts';
import { Chore } from '../../data/data';
import { useAppSelector } from '../../store/store';

export default function PieChartTodayScreen() {
    const currentHousehold = useAppSelector(state => state.household.householdList.find(h => h.id === state.household.currentHouseholdId));
    const memberList = useAppSelector((state) => state.member.memberList.filter((m) => m.householdId === currentHousehold?.id));
    const chores = currentHousehold?.chores.map((chore) => {
        const today = moment(new Date()).format('YYYY-MM-DD');
        const returnChore = deepcopy(chore);
        returnChore.doneBy = returnChore.doneBy.filter((db) => db.date === today);
        return returnChore;
    });
    const filteredChores: Chore[] = chores?.filter((c) => c !== undefined) as Chore[];
    const user = useAppSelector((state) => state.user.user);
    const houseHoldChores = currentHousehold?.chores.filter((item) => item.signedToUserId.filter((item) => item === user?.id));

    if (currentHousehold && houseHoldChores) {
        return <ChoresPieCharts memberList={memberList} currentHouseholdChores={filteredChores} />;
    }
    return <View></View>;
}
