import React from 'react';
import { Text } from 'react-native-svg';
import { PieChart, PieChartData } from 'react-native-svg-charts';
import PieChartLabel from '../../component/pieChartComponents/PieChartLabel';
import { mockAvatarData } from '../../data/data';
import { PieTabScreenProx } from '../../navigation/PieChartTabNavigator';
import { getHouseholdByIdSelector } from '../../store/household/householdSelectors';
import { useAppSelector } from '../../store/store';

export default function PieChartAll({ navigation, route }: PieTabScreenProx<'PieAll'>) {
    const avtarList = mockAvatarData;
    let graphicDataList: PieChartData[] = [];
    const currentHousehold = useAppSelector(state => getHouseholdByIdSelector(state, route.params.householdId));
    const memberList = useAppSelector(state => state.member.memberList.filter(m => m.householdId === route.params.householdId));

    for (const member of memberList) {
        let count = 0;
        const memberAvatar = avtarList.find(a => a.id === member.avatar);
        if (currentHousehold) {
            for (const chore of currentHousehold?.chores) {
                count += chore.doneBy.filter(doneBy => doneBy.memberId === member.id).length;
            }
            // should always be true
            if (memberAvatar) graphicDataList = [...graphicDataList, { value: count, key: memberAvatar.avatar, svg: { fill: memberAvatar.backgroundColor } }];
        }
    }

    return (
        <PieChart style={{ height: 200 }} data={graphicDataList} innerRadius={0} padAngle={0}>
            <PieChartLabel />
        </PieChart>
    );
}