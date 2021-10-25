import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { CustomNavigateButton } from '../component/CustomNavigateButton';
import HamburgerMenu from '../component/HamburgerMenu';
import { ProfileHeader } from '../component/ProfileHeader';
import { RootStackScreenProps } from '../navigation/RootStackNavigator';
import { getAllHouseholdsByUserIdSelector } from '../store/household/householdSelectors';
import { useAppSelector } from '../store/store';

export default function HouseholdScreen({ navigation, route }: RootStackScreenProps<'Household'>) {
    const { colors } = useTheme();
    const [isShowingModal, setIsShowingModal] = useState(false);
    const userHousehold = useAppSelector((state) => getAllHouseholdsByUserIdSelector(state, route.params.user.id));
    const currentHousehold = useAppSelector((state) =>
        state.household.householdList.find((h) => h.id === route.params.householdId)
    );
    const userMemberInfo = useAppSelector((state) =>
        state.member.memberList.find((m) => m.userId === route.params.user.id && m.householdId === currentHousehold?.id)
    );

    if (currentHousehold) {
        const houseHoldChores = currentHousehold.chores.filter((item) =>
            item.signedToUserId.filter((item) => item === route.params.user.id)
        );
        return (
            <View>
                <HamburgerMenu
                    isShowingMenu={isShowingModal}
                    toggleIsShowing={setIsShowingModal}
                    rootStackProps={{ navigation, route }}
                    householdID={currentHousehold.id}
                    currentMember={userMemberInfo}
                />
                <ProfileHeader
                    household={currentHousehold}
                    userInformation={{ user: route.params.user, member: userMemberInfo }}
                    openMenu={setIsShowingModal}
                />
                <Text style={[{ color: colors.text }]}>{currentHousehold.name}</Text>
                <FlatList
                    data={houseHoldChores}
                    renderItem={({ item }) => (
                        <CustomNavigateButton
                            buttonText={item.name}
                            goto={() =>
                                navigation.navigate('ChoreDetail', {
                                    choreId: item.id,
                                    householdId: currentHousehold.id
                                })
                            }
                        />
                    )}
                />
            </View>
        );
    } else {
        return (
            <View>
                <HamburgerMenu
                    isShowingMenu={isShowingModal}
                    toggleIsShowing={setIsShowingModal}
                    rootStackProps={{ navigation, route }}
                />
                <ProfileHeader
                    userInformation={{ user: route.params.user }}
                    openMenu={setIsShowingModal}
                />
                <Text style={[{ color: colors.text }]}>Welcome {route.params.user.username}</Text>
                <FlatList
                    data={userHousehold}
                    renderItem={({ item }) => (
                        <View>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.push('Household', { user: route.params.user, householdId: item.id })
                                }
                            >
                                <Text style={[{ color: colors.text }]}>{item.name}</Text>
                            </TouchableOpacity>

                            {item.chores.map((chore) => {
                                return (
                                    <CustomNavigateButton
                                        key={chore.id}
                                        buttonText={chore.name}
                                        goto={() =>
                                            navigation.navigate('ChoreDetail', {
                                                choreId: chore.id,
                                                householdId: item.id
                                            })
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