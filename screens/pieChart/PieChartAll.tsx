import React from 'react';
import { View, Text } from 'react-native';
import { PieChart, PieChartData } from 'react-native-svg-charts';
import PieChartLabel from '../../component/pieChartComponents/PieChartLabel';
import { mockAvatarData } from '../../data/data';
import { PieTabScreenProx } from '../../navigation/PieChartTabNavigator';
import { getHouseholdByIdSelector } from '../../store/household/householdSelectors';
import { useAppSelector } from '../../store/store';

interface allGraphicData {
    renderDataAllChores: PieChartData[]
    subChores: {
        choreName: string
        renderDataListChore: PieChartData[]
    }[]
}

export default function PieChartAll({ navigation, route }: PieTabScreenProx<'PieAll'>) {
    const avtarList = mockAvatarData;
    const graphicDataForChoresList: allGraphicData = { renderDataAllChores: [], subChores: [] };
    const currentHousehold = useAppSelector(state => getHouseholdByIdSelector(state, route.params.householdId));
    const memberList = useAppSelector(state => state.member.memberList.filter(m => m.householdId === route.params.householdId));

    if (currentHousehold) {
        for (const chore of currentHousehold?.chores) {
            let renderData: PieChartData[] = [];
            for (const member of memberList) {
                const memberAvatar = avtarList.find(a => a.id === member.avatar);
                if (memberAvatar) {
                    renderData = [
                        ...renderData,
                        {
                            value: chore.doneBy.filter(doneBy => doneBy.memberId === member.id).length,
                            key: memberAvatar.avatar,
                            svg: { fill: memberAvatar.backgroundColor }
                        }];
                }
            }
            graphicDataForChoresList.subChores = [
                ...graphicDataForChoresList.subChores,
                { choreName: chore.name, renderDataListChore: renderData }
            ];
        }
        const data: PieChartData[] = [
            { value: 10, key: 'a', svg: { fill: 'black' } },
            { value: 20, key: 'b', svg: { fill: 'red' } },
            { value: 5, key: 'c', svg: { fill: 'green' } }
        ];

        console.log(data);

        // for (const member of memberList) {
        //     let totalCount = 0;
        //     const memberAvatar = avtarList.find(a => a.id === member.avatar);
        //     if (currentHousehold) {
        //         for (const chore of currentHousehold?.chores) {
        //             totalCount += chore.doneBy.filter(doneBy => doneBy.memberId === member.id).length;
        //             let renderData: PieChartData[] = [];
        //             if (memberAvatar) {
        //                 renderData = [...renderData, { value }];
        //             }
        //         }
        //         // should always be true
        //         if (memberAvatar) graphicDataForChoresList.renderDataAllChores = [...graphicDataForChoresList.renderDataAllChores, { value: totalCount, key: memberAvatar.avatar, svg: { fill: memberAvatar.backgroundColor } }];
        //     }
        // }

        return (
            <View style={{ alignItems: 'center' }}>
                <PieChart style={{ height: 180 }} data={data} innerRadius={0} padAngle={0}>
                    {/* works but shows error */}
                    <PieChartLabel />
                </PieChart>
                <Text>Totalt</Text>
            </View>

        );
    }
}