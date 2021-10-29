import { CompositeScreenProps } from '@react-navigation/native';
import React from 'react';
import RenderChores from '../component/choreComponent/RenderChores';
import { ChoreTabScreenProps } from '../navigation/ChoresTabNavigator';
import { RootStackScreenProps } from '../navigation/RootStackNavigator';
import { getAllHouseholdsByUserIdSelector } from '../store/household/householdSelectors';
import { useAppSelector } from '../store/store';

type Props = CompositeScreenProps<ChoreTabScreenProps<'All'>, RootStackScreenProps>;

export default function AllChoresScreen({ navigation, route }: Props) {
    // Vet inte om rätt
    const user = useAppSelector(state => state.user.user);

    const userHousehold = useAppSelector((state) => getAllHouseholdsByUserIdSelector(state, user?.id));
    const currentHousehold = useAppSelector((state) =>
        state.household.householdList.find((h) => h.id === route.params.householdId)
    );
    const members = useAppSelector((state) => state.member.memberList);
    return (
        <RenderChores prop={{ navigation, route }} userHousehold={userHousehold} currentHousehold={currentHousehold} members={members} />
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
