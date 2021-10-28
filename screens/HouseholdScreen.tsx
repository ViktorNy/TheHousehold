import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CustomPlusButton } from '../component/CustomPlusButton';
import HamburgerMenu from '../component/HamburgerMenu';
import { RootStackScreenProps } from '../navigation/RootStackNavigator';
import { useAppSelector } from '../store/store';
import { ChoreButton } from '../component/choreComponent/ChoreButton';
import { Chore } from '../data/data';
import moment from 'moment';
import { getAllHouseholdsByUserIdSelector } from '../store/household/householdSelectors';

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
                <Text style={[{ color: colors.text }]}>{currentHousehold.name}</Text>
                <FlatList
                    data={houseHoldChores}
                    renderItem={({ item }) => (
                        <ChoreButton
                            key={item.id}
                            chore={item}
                            avatarIdList={getAvatarIdList(item)}
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
    } else if (userHousehold.length > 0) {
        // present active user all housholds + chores
        return (
            <View>
                <HamburgerMenu
                    isShowingMenu={isShowingModal}
                    toggleIsShowing={setIsShowingModal}
                    rootStackProps={{ navigation, route }}
                />
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
                                // Check if date match Chore slider selection
                                // Red days applies with chores today
                                // Grey days applies to this week/month + red days included
                                return (
                                    <ChoreButton
                                        key={chore.id}
                                        chore={chore}
                                        avatarIdList={getAvatarIdList(chore)}
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
    } else {
        // present info for user with no household
        return (
            <View>
                <HamburgerMenu
                    isShowingMenu={isShowingModal}
                    toggleIsShowing={setIsShowingModal}
                    rootStackProps={{ navigation, route }}
                />
                <View style={styles.conatiner}>
                    <Text style={[{ color: colors.text }, styles.simplifyText]}>Förenkla din vardag </Text>
                    <Text style={[{ color: colors.text }, styles.pitchText]}>
                        Få koll på era sysslor, fördela och engagera. Att glömma bort blir nu ett minne blott!
                    </Text>
                    <Text style={[{ color: colors.text }, styles.notMemberText]}>
                        Du är inte medlem i något hushåll, för att komma vidare skapa ett ny eller gå med i ett.{' '}
                    </Text>
                    <View style={styles.buttonContainer}>
                        <CustomPlusButton buttonText="Skapa nytt" goto={() => {}} />
                        <CustomPlusButton buttonText="Gå med i" goto={() => {}} />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        margin: 0,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '100%'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: '#F194FF'
    },
    buttonClose: {
        backgroundColor: '#2196F3'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 170,
        width: '100%',
        justifyContent: 'space-evenly'
    },
    conatiner: {
        alignItems: 'center',
        marginTop: 100,
        width: '100%'
    },
    simplifyText: {
        fontWeight: 'bold',
        fontSize: 20,
        marginRight: 150
    },
    pitchText: {
        marginLeft: 30,
        marginRight: 80,
        marginTop: 10
    },
    notMemberText: {
        alignSelf: 'center',
        marginTop: 10,
        marginLeft: 30,
        marginRight: 70
    }
});
