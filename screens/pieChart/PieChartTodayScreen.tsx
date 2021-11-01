import { CompositeScreenProps } from '@react-navigation/native';
import moment from 'moment';
import React, { Props, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import deepcopy from 'ts-deepcopy';
import { ChoreButton, EditChore } from '../../component/choreComponent/ChoreButton';
import displayChore from '../../component/choreComponent/displayChore';
import RenderChores from '../../component/choreComponent/RenderChores';
import ChoresPieCharts from '../../component/pieChartComponents/ChoresPieCharts';
import { Chore } from '../../data/data';
import { ChoreTabScreenProps } from '../../navigation/ChoresTabNavigator';
import { RootStackScreenProps } from '../../navigation/RootStackNavigator';
import { useAppSelector } from '../../store/store';

// EJ RÄTT, ngt likanade behlvs !
type Props = CompositeScreenProps<ChoreTabScreenProps<'Today'>, RootStackScreenProps>;

export default function PieChartTodayScreen({ navigation, route }: Props) {
    const currentHousehold = useAppSelector((state) => state.household.currentHousehold);
    const memberList = useAppSelector((state) => state.member.memberList.filter((m) => m.householdId === currentHousehold?.id));
    // const chores = currentHousehold?.chores.map((chore) => {
    //     const today = moment(new Date()).format('YYYY-MM-DD');
    //     const returnChore = deepcopy(chore);
    //     returnChore.doneBy = returnChore.doneBy.filter((db) => db.date === today);
    //     return returnChore;
    // });
    // const filteredChores: Chore[] = chores?.filter((c) => c !== undefined) as Chore[];
    const user = useAppSelector((state) => state.user.user);
    const houseHoldChores = currentHousehold?.chores.filter((item) => item.signedToUserId.filter((item) => item === user?.id));

    const [toggleEdit, setToggleEdit] = useState<boolean>(false);

    console.log('toggleEdit: ' + toggleEdit);

    if (currentHousehold && houseHoldChores) {
        // return <ChoresPieCharts memberList={memberList} currentHouseholdChores={filteredChores} />;
        // return <RenderChores label={'Today'} prop={{ navigation, route }} currentHousehold={currentHousehold} members={memberList} />;
        return (
            <View>
                <RenderChores
                    label={'Today'}
                    prop={{ navigation, route }}
                    currentHousehold={currentHousehold}
                    members={memberList}
                    editChore={toggleEdit}
                />
                {!toggleEdit && (
                    <View>
                        <TouchableOpacity>
                            <Text>Lägg till</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setToggleEdit(!toggleEdit)}>
                            <Text>Ändra</Text>
                        </TouchableOpacity>
                    </View>
                )}
                {toggleEdit && (
                    <View>
                        <TouchableOpacity onPress={() => setToggleEdit(!toggleEdit)}>
                            <Text>Avbryt</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    }
    return <View></View>;
}
