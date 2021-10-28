import { CompositeScreenProps, useTheme } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { ChoreButton } from '../component/choreComponent/ChoreButton';
import RenderChores from '../component/choreComponent/RenderChores';
import { Chore } from '../data/data';
import { ChoreTabScreenProps } from '../navigation/ChoresTabNavigator';
import { RootStackScreenProps } from '../navigation/RootStackNavigator';
import { getAllHouseholdsByUserIdSelector } from '../store/household/householdSelectors';
import { useAppSelector } from '../store/store';

type Props = CompositeScreenProps<ChoreTabScreenProps<'All'>, RootStackScreenProps>;

export default function AllChoresScreen({ navigation, route }: Props) {
    const userHousehold = useAppSelector((state) => getAllHouseholdsByUserIdSelector(state, route.params.userId));
    const currentHousehold = useAppSelector((state) =>
        state.household.householdList.find((h) => h.id === route.params.householdId)
    );
    const members = useAppSelector((state) => state.member.memberList);
    return (
        <RenderChores prop={{ navigation, route }} userHousehold={userHousehold} currentHousehold={currentHousehold} members={members}/>
    );
    // const { colors } = useTheme();
    // const userHousehold = useAppSelector((state) => getAllHouseholdsByUserIdSelector(state, route.params.userId));
    // const currentHousehold = useAppSelector((state) =>
    //     state.household.householdList.find((h) => h.id === route.params.householdId)
    // );

    // function getAvatarIdList(chore: Chore) {
    //     const result: string[] = [];
    //     for (const db of chore.doneBy) {
    //         const member = members.find((m) => m.id === db.memberId);
    //         if (member && db.date === moment(new Date()).format('YYYY-MM-DD')) {
    //             result.push(member.avatar);
    //         }
    //     }
    //     return result;
    // }

    // const members = useAppSelector((state) => state.member.memberList);

    // if (currentHousehold) {
    //     const houseHoldChores = currentHousehold.chores.filter((item) =>
    //         item.signedToUserId.filter((item) => item === route.params.userId)
    //     );

    //     return (
    //         <View>
    //             <Text style={[{ color: colors.text }]}>{currentHousehold.name}</Text>
    //             <FlatList
    //                 data={houseHoldChores}
    //                 renderItem={({ item }) => (
    //                     <ChoreButton
    //                         key={item.id}
    //                         chore={item}
    //                         avatarIdList={getAvatarIdList(item)}
    //                         goto={() =>
    //                             navigation.navigate('ChoreDetail', {
    //                                 choreId: item.id,
    //                                 householdId: currentHousehold.id
    //                             })
    //                         }
    //                     />
    //                 )}
    //             />
    //         </View>
    //     );
    // } else {
    //     return (
    //         <View>
    //             <RenderChores test={{ navigation, route }}/>
    //             <FlatList
    //                 data={userHousehold}
    //                 renderItem={({ item }) => (
    //                     <View>
    //                         <Text style={[{ color: colors.text }]}>{item.name}</Text>

    //                         {item.chores.map((chore) => {
    //                             return (
    //                                 <ChoreButton
    //                                     key={chore.id}
    //                                     chore={chore}
    //                                     avatarIdList={getAvatarIdList(chore)}
    //                                     goto={
    //                                         () => {
    //                                             navigation.navigate('ChoreDetail', {
    //                                                 choreId: chore.id,
    //                                                 householdId: item.id
    //                                             });
    //                                         }
    //                                     }
    //                                 />
    //                             );
    //                         })}
    //                     </View>
    //                 )}
    //             />
    //         </View>
    //     );
    // }
}
