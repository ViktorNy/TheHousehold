import React from 'react';
import { useTheme } from 'react-native-paper';
import { Text, View } from 'react-native';
import { PieChart, PieChartData } from 'react-native-svg-charts';
import PieChartLabel from '../../component/pieChartComponents/PieChartLabel';
import { Chore, Member, mockAvatarData } from '../../data/data';

interface allGraphicData {
    renderDataAllChores: PieChartData[]
    subChores: {
        choreName: string
        renderDataListChore: PieChartData[]
    }[]
}

interface Props {
    currentHouseholdChores: Chore[]
    memberList: Member[]
}
export default function ChoresPieCharts({ currentHouseholdChores, memberList }: Props) {
    const avtarList = mockAvatarData;
    const graphicDataForChoresList: allGraphicData = { renderDataAllChores: [], subChores: [] };
    const { colors } = useTheme();

    for (const chore of currentHouseholdChores) {
        let renderData: PieChartData[] = [];
        for (const member of memberList) {
            const memberAvatar = avtarList.find(a => a.id === member.avatar);
            const memberDoneChoreCount = chore.doneBy.filter(doneBy => doneBy.memberId === member.id).length;
            if (memberAvatar && memberDoneChoreCount > 0) {
                renderData = [
                    ...renderData,
                    {
                        value: memberDoneChoreCount * chore.score,
                        key: memberAvatar.avatar,
                        svg: { fill: memberAvatar.backgroundColor }
                    }];
            }
        }
        if (renderData.length > 0) {
            graphicDataForChoresList.subChores = [
                ...graphicDataForChoresList.subChores,
                { choreName: chore.name, renderDataListChore: renderData }
            ];
        } else {
            graphicDataForChoresList.subChores = [
                ...graphicDataForChoresList.subChores,
                { choreName: chore.name, renderDataListChore: [{ value: 1, key: '', svg: { fill: '#ACE1AF' } }] }
            ];
        }
    }
    for (const member of memberList) {
        let totalCount = 0;
        const memberAvatar = avtarList.find(a => a.id === member.avatar);
        for (const subChore of graphicDataForChoresList.subChores) {
            for (const pieData of subChore.renderDataListChore) {
                if (memberAvatar && pieData.key === memberAvatar.avatar) totalCount += Number(pieData.value);
            }
        }
        // Should be fixed
        if (memberAvatar) graphicDataForChoresList.renderDataAllChores = [...graphicDataForChoresList.renderDataAllChores, { value: totalCount, key: memberAvatar.avatar, svg: { fill: memberAvatar.backgroundColor } }];
    }

    return (
        <View>
            <View>
                <PieChart style={{ height: 180 }} data={graphicDataForChoresList.renderDataAllChores} innerRadius={0} padAngle={0}>
                    <PieChartLabel />
                </PieChart>
                <Text style={{ alignSelf: 'center', color: colors.text }}>Totalt</Text>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {graphicDataForChoresList.subChores.map(subChore => {
                    return (
                        <View key={subChore.choreName} style={{ width: '33%' }}>
                            <PieChart style={{ height: 100 }} data={subChore.renderDataListChore} innerRadius={0} padAngle={0} />
                            <Text style={{ alignSelf: 'center', color: colors.text }}>{subChore.choreName}</Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
}