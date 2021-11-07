import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import moment from 'moment';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { useTheme } from 'react-native-paper';
import { Household, Member, User } from '../data/data';
import { useAppDispatch } from '../store/store';
import Avatar from './Avatar';

interface Props {
    isShowingMenu: boolean,
    toggleIsShowing: (toggleValue: boolean) => void,
    rootStackProps: MaterialTopTabBarProps,
    householdList: Household[],
    memberList: Member[],
    user: User
    isHouseholdSelected: boolean
    toggleExternalModal: (toggle: boolean, modalCase?: string) => void;
}

export default function SelectHouseholdMenu({ isShowingMenu, toggleIsShowing, rootStackProps, householdList, memberList: memberListConnectedToUser, user, isHouseholdSelected, toggleExternalModal }: Props) {
    const { colors } = useTheme();
    const dispatch = useAppDispatch();
    return (
        <Modal
            animationIn="slideInUp"
            backdropColor="#181818"
            coverScreen={true}
            isVisible={isShowingMenu}
            statusBarTranslucent={true}
            onBackButtonPress={() => {
                toggleIsShowing(false);
            }}
            onBackdropPress={() => toggleIsShowing(false)}
        >
            <View
                style={[styles.centeredView]}
            >
                <View style={[styles.modalView, { backgroundColor: colors.primary }]}>
                    <TouchableOpacity
                        onPress={() => {
                            toggleIsShowing(!isShowingMenu);
                            dispatch({ type: 'SETHOUSEHOLD', payload: '' });
                            rootStackProps.navigation.navigate('Household');
                        }
                        }>
                        <View style={styles.householdRow}>
                            <View style={[styles.circle, { borderColor: colors.text }]} />
                            <Text style={[styles.modalText, { color: colors.text }]}>Min Sida</Text>
                        </View>
                    </TouchableOpacity>

                    {householdList.map(household => {
                        let isDisabled = false;
                        const member = memberListConnectedToUser.find(m => m.householdId === household.id);
                        if (member) {
                            for (const paused of member?.pausedHistory) {
                                if (Date.parse(paused.toDate) > Date.parse(moment(new Date()).format('YYYY-MM-DD'))) {
                                    isDisabled = true;
                                    break;
                                }
                            }
                            if (member.memberType === 'pending') {
                                isDisabled = true;
                            }
                        }
                        return (
                            <TouchableOpacity
                                key={household.id}
                                disabled={isDisabled}
                                onPress={() => {
                                    toggleIsShowing(!isShowingMenu);
                                    dispatch({ type: 'SETHOUSEHOLD', payload: household.id });
                                    rootStackProps.navigation.navigate('Household', { householdId: household.id });
                                }
                                }>
                                <View style={[styles.householdRow, isDisabled ? { opacity: 0.2 } : { opacity: 1 }]}>
                                    {member && <Avatar avatarId={member.avatar} showCircle={true} avatarSize={22} />}
                                    <Text style={[styles.modalText, { color: colors.text }]}>{household.name}</Text>
                                    {isDisabled && <Text style={[styles.modalText, { color: colors.text }]}>Väntar på svar</Text>}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                    <TouchableOpacity
                        onPress={() => {
                            toggleIsShowing(!isShowingMenu);
                            toggleExternalModal(true, 'CH');
                        }
                        }>
                        <View style={styles.householdRow}>
                            <View style={[styles.circle, { borderColor: colors.text }]}>
                                <Text style={[{ color: colors.text }]}>+</Text>
                            </View>
                            <Text style={[styles.modalText, { color: colors.text }]}>Skapa nytt hushåll</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            toggleIsShowing(!isShowingMenu);
                            toggleExternalModal(true, 'JH');
                        }
                        }>
                        <View style={styles.householdRow}>
                            <View style={[styles.circle, { borderColor: colors.text }]}>
                                <Text style={[{ color: colors.text }]}>+</Text>
                            </View>
                            <Text style={[styles.modalText, { color: colors.text }]}>Gå med i hushåll</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal >
    );
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
        borderRadius: 20,
        padding: 15,
        alignItems: 'flex-start',
        shadowColor: '#000',
        width: '100%'
    },
    modalText: {
        textAlign: 'center',
        paddingLeft: 20
    },
    circle: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        borderWidth: 1,
        height: 40,
        width: 40
    },
    householdRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 5
    }
});