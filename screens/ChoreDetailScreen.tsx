import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Menu } from 'react-native-paper';
import Avatar from '../component/Avatar';
import { avatarData } from '../data/data';
import { RootStackScreenProps } from '../navigation/RootStackNavigator';
import { getChoreByIdSelector } from '../store/household/householdSelectors';
import { getMembersOfHouseholdSelector } from '../store/member/memberSelector';
import { useAppSelector, useAppDispatch } from '../store/store';
import { choreStyles } from '../style/choreDetailStyle';
import moment from 'moment';
import deepcopy from 'ts-deepcopy';

export default function ChoreDetailScreen({ navigation, route }: RootStackScreenProps<'ChoreDetail'>) {
    const [menuVisible, setMenuVisible] = useState(false);
    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const dispatch = useAppDispatch();
    const chore = useAppSelector((state) => getChoreByIdSelector(state, route.params.choreId, route.params.householdId));
    const allMembers = useAppSelector((state) => getMembersOfHouseholdSelector(state, route.params.householdId));
    const user = useAppSelector((state) => state.user.user);
    const currentMember = useAppSelector((state) => state.member.memberList.find((m) => m.userId === user?.id && m.householdId === route.params.householdId));

    const { colors } = useTheme();
    const avatars = avatarData;

    useEffect(() => {
        navigation.setOptions({ title: chore?.name });
    }, []);

    const setChoreAsDone = () => {
        const newChoreLastDoneDate = moment(new Date()).format('YYYY-MM-DD');

        const newChore = deepcopy(chore);

        newChore!.lastDone = newChoreLastDoneDate;

        newChore!.doneBy = [
            ...newChore!.doneBy,
            {
                choreId: newChore!.id,
                memberId: currentMember!.id,
                date: newChoreLastDoneDate,
                score: newChore!.score
            }
        ];

        dispatch({ type: 'EDIT_CHORELIST_IN_HOUSEHOLD', payload: { chore: newChore!, householdId: route.params.householdId } });
        navigation.goBack();
    };

    return (
        <View style={[{ backgroundColor: colors.background }, choreStyles.root]}>
            <View style={[{ width: '95%' }, { top: 0 }, { position: 'absolute' }]}>
                <Text style={[{ color: colors.text }, { margin: 5 }]}>Tilldelade</Text>
                <Menu
                    style={{ width: '95%' }}
                    visible={menuVisible}
                    onDismiss={closeMenu}
                    anchor={
                        <Button
                            onPress={openMenu}
                            style={[{ backgroundColor: colors.card }, { width: '100%' }, { borderRadius: 10 }]}
                            contentStyle={{ alignSelf: 'flex-start' }}
                        >
                            {/* eslint-disable-next-line array-callback-return */}
                            {avatars.map((avatar) => {
                                const usersSignedToChore = chore?.signedToUserId.map((signedId) => {
                                    return allMembers.find((m) => m.userId === signedId);
                                });

                                const activeMember = usersSignedToChore?.find((usc) => usc?.avatar === avatar.id);

                                if (activeMember?.avatar === avatar.id) {
                                    return <Avatar key={avatar.id} avatarId={avatar.id} avatarSize={22} />;
                                }
                            })}
                        </Button>
                    }
                >
                    {/* eslint-disable-next-line array-callback-return */}
                    {avatars.map((avatar) => {
                        const usersSignedToChore = chore?.signedToUserId.map((signedId) => {
                            return allMembers.find((m) => m.userId === signedId);
                        });

                        const activeMember = usersSignedToChore?.find((usc) => usc?.avatar === avatar.id);

                        if (activeMember?.avatar === avatar.id) {
                            return (
                                <View key={avatar.id} style={[{ flexDirection: 'row' }, { alignItems: 'center' }, { margin: 5 }]}>
                                    <Avatar key={avatar.id} avatarId={avatar.id} avatarSize={14} showCircle={true} />
                                    <Text style={[{ color: colors.text }, { marginLeft: 5 }]}>{activeMember.memberName}</Text>
                                </View>
                            );
                        }
                    })}
                </Menu>
            </View>

            <Text
                style={[
                    {
                        color: colors.text,
                        backgroundColor: colors.card
                    },
                    choreStyles.descriptionContainer,
                    choreStyles.bottomMargin
                ]}
            >
                {chore?.description}
            </Text>

            <View style={[{ backgroundColor: colors.card }, choreStyles.frequencyContainer]}>
                <View style={choreStyles.middleContainer}>
                    <View>
                        <Text style={[{ color: colors.text }, choreStyles.recurrenceText]}>Återkommer: </Text>
                    </View>
                    <View style={choreStyles.innerContainer}>
                        <View>
                            <Text style={[{ color: colors.text }]}> var </Text>
                        </View>
                        <View style={choreStyles.freqNrContainer}>
                            <Text style={choreStyles.frequencyNumberText}>{chore?.frequency}</Text>
                        </View>
                        <View>
                            <Text style={[{ color: colors.text }]}> dag </Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={[{ backgroundColor: colors.card }, choreStyles.energyContainer]}>
                <View style={choreStyles.columnStyle}>
                    <Text style={[{ color: colors.text }, choreStyles.text]}>Värde: </Text>
                    <Text style={[choreStyles.valueDescription]}>Hur energikrävande är sysslan?</Text>
                </View>
                <View style={choreStyles.energyNrContainer}>
                    <Text style={choreStyles.energyText}>{chore?.score}</Text>
                </View>
            </View>
            <View style={choreStyles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.root, { backgroundColor: colors.card }, { borderColor: colors.border }, { borderWidth: 1 }]}
                    onPress={ setChoreAsDone}
                >
                    <Text style={[styles.buttonText, { color: colors.text }]}>Klarmarkera syssla</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontWeight: 'bold'
    }
});
