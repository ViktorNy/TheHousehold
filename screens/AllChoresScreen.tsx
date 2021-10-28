import { useTheme } from '@react-navigation/native';
import moment from 'moment';
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { ChoreButton } from '../component/choreComponent/ChoreButton';
import HamburgerMenu from '../component/HamburgerMenu';
import { ProfileHeader } from '../component/ProfileHeader';
import { Chore } from '../data/data';
import { ChoreTabScreenProps } from '../navigation/ChoresTabNavigator';
import { getAllHouseholdsByUserIdSelector } from '../store/household/householdSelectors';
import { useAppSelector } from '../store/store';

export default function AllChoresScreen({ navigation, route }: ChoreTabScreenProps<'All'>) {
    const { colors } = useTheme();
    const [isShowingModal, setIsShowingModal] = useState(false);
    const user = useAppSelector((state) => state.user.userList.find((u) => u.id === route.params.userId));
    const userHousehold = useAppSelector((state) => getAllHouseholdsByUserIdSelector(state, route.params.userId));
    const currentHousehold = useAppSelector((state) =>
        state.household.householdList.find((h) => h.id === route.params.householdId)
    );
    const userMemberInfo = useAppSelector((state) =>
        state.member.memberList.find((m) => m.userId === route.params.userId && m.householdId === currentHousehold?.id)
    );

    console.log('userId: ', route.params.userId);
    console.log(route.params.memberId);
    console.log(route.params.householdId);

    function getAvatarIdList(chore: Chore) {
        const result: string[] = [];
        for (const db of chore.doneBy) {
            const member = members.find((m) => m.id === db.memberId);
            if (member && db.date === moment(new Date()).format('YYYY-MM-DD')) {
                result.push(member.avatar);
            }
        }
        return result;
    }

    const members = useAppSelector((state) => state.member.memberList);

    if (currentHousehold) {
        const houseHoldChores = currentHousehold.chores.filter((item) =>
            item.signedToUserId.filter((item) => item === route.params.userId)
        );

        return (
            <View>
                {/* <HamburgerMenu
                    isShowingMenu={isShowingModal}
                    toggleIsShowing={setIsShowingModal}
                    rootStackProps={{ navigation, route }}
                    householdID={currentHousehold.id}
                    currentMember={userMemberInfo}
                /> */}
                {/* TODO: Fixa nedan check med user snyggare */}
                {user && (
                    <ProfileHeader
                        household={currentHousehold}
                        userInformation={{ user: user, member: userMemberInfo }}
                        openMenu={setIsShowingModal}
                    />
                )}
                <Text style={[{ color: colors.text }]}>{currentHousehold.name}</Text>
                <FlatList
                    data={houseHoldChores}
                    renderItem={({ item }) => (
                        <ChoreButton
                            key={item.id}
                            chore={item}
                            avatarIdList={getAvatarIdList(item)}
                            goto={
                                () => {}
                                // TODO: RASMUS !
                                // navigation.navigate('ChoreDetail', {
                                //     choreId: item.id,
                                //     householdId: currentHousehold.id
                                // })
                            }
                        />
                    )}
                />
            </View>
        );
    } else {
        // present active user all housholds + chores
        return (
            <View>
                {/* <HamburgerMenu
                    isShowingMenu={isShowingModal}
                    toggleIsShowing={setIsShowingModal}
                    rootStackProps={{ navigation, route }}
                /> */}
                {user && <ProfileHeader userInformation={{ user: user }} openMenu={setIsShowingModal} />}
                <FlatList
                    data={userHousehold}
                    renderItem={({ item }) => (
                        <View>
                            <TouchableOpacity
                                onPress={() =>
                                    // TODO: RASMUS !
                                    // navigation.push('Household', { user: user, householdId: item.id })
                                    () => {}}
                            >
                                <Text style={[{ color: colors.text }]}>{item.name}</Text>
                            </TouchableOpacity>

                            {item.chores.map((chore) => {
                                // Check if date match Chore slider selection
                                // Red days applies with chores today
                                // Grey days applies to this week/month + red days included
                                return (
                                    <ChoreButton
                                        key={chore.id}
                                        chore={chore}
                                        avatarIdList={getAvatarIdList(chore)}
                                        goto={
                                            () => {}
                                            // TODO: RASMUS !
                                            // navigation.navigate('ChoreDetail', {
                                            //     choreId: chore.id,
                                            //     householdId: item.id
                                            // })
                                        }
                                    />
                                );
                            })}
                        </View>
                    )}
                />
            </View>
        );
    }
}
