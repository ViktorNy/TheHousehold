import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { CustomNavigateButton } from '../component/CustomNavigateButton';
import { CustomPlusButton } from '../component/CustomPlusButton';
import HamburgerMenu from '../component/HamburgerMenu';
import { ProfileHeader } from '../component/ProfileHeader';
import SelectHouseholdMenu from '../component/SelectHouseholdMenu';
import { RootStackScreenProps } from '../navigation/RootStackNavigator';
import { getAllHouseholdsByUserIdSelector } from '../store/household/householdSelectors';
import { useAppSelector } from '../store/store';

export default function HouseholdScreen({ navigation, route }: RootStackScreenProps<'Household'>) {
    const { colors } = useTheme();
    const [isShowingMenuModal, setIsShowingMainMenuModal] = useState(false);
    const [isShowingHouseholdModal, setIsShowingHouseholdModal] = useState(false);
    const allHouseholdsConnectedToUser = useAppSelector((state) => getAllHouseholdsByUserIdSelector(state, route.params.user.id));
    const allMemberInfoOnUser = useAppSelector((state) => state.member.memberList.filter(m => m.userId === route.params.user.id));
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
                    isShowingMenu={isShowingMenuModal}
                    toggleIsShowing={setIsShowingMainMenuModal}
                    rootStackProps={{ navigation, route }}
                    householdID={currentHousehold.id}
                    currentMember={userMemberInfo}
                />
                <SelectHouseholdMenu
                    isShowingMenu={isShowingHouseholdModal}
                    toggleIsShowing={setIsShowingHouseholdModal}
                    rootStackProps={{ navigation, route }}
                    householdList={allHouseholdsConnectedToUser}
                    user={route.params.user}
                    memberList={allMemberInfoOnUser}
                    isHouseholdSelected={true}
                />
                <ProfileHeader
                    household={currentHousehold}
                    userInformation={{ user: route.params.user, member: userMemberInfo }}
                    openMainMenu={setIsShowingMainMenuModal}
                    openHouseholdMenu={setIsShowingHouseholdModal}
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
                    isShowingMenu={isShowingMenuModal}
                    toggleIsShowing={setIsShowingMainMenuModal}
                    rootStackProps={{ navigation, route }}
                />
                <SelectHouseholdMenu
                    isShowingMenu={isShowingHouseholdModal}
                    toggleIsShowing={setIsShowingHouseholdModal}
                    rootStackProps={{ navigation, route }}
                    householdList={allHouseholdsConnectedToUser}
                    user={route.params.user}
                    memberList={allMemberInfoOnUser}
                    isHouseholdSelected={false}
                />
                <ProfileHeader userInformation={{ user: route.params.user }}
                    openMainMenu={setIsShowingMainMenuModal}
                    openHouseholdMenu={setIsShowingHouseholdModal}
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
                        <CustomPlusButton buttonText="Skapa nytt" goto={() => { }} />
                        <CustomPlusButton buttonText="Gå med i" goto={() => { }} />
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
