import { useTheme } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { Household, Member, User } from '../data/data';
import { RootStackScreenProps } from '../navigation/RootStackNavigator';
import Avatar from './Avatar';
import moment from 'moment';
import Modal from 'react-native-modal';

interface Props {
    isShowingMenu: boolean,
    toggleIsShowing: (toggleValue: boolean) => void,
    rootStackProps: RootStackScreenProps<'Household'>,
    householdList: Household[],
    memberList: Member[],
    user: User
    isHouseholdSelected: boolean
}

export default function SelectHouseholdMenu({ isShowingMenu, toggleIsShowing, rootStackProps, householdList, memberList: memberListConnectedToUser, user, isHouseholdSelected }: Props) {
    const { colors } = useTheme();
    return (
        <Modal
            // animationType="slide"
            // transparent={true}
            // visible={isShowingMenu}
            animationIn="fadeIn"
            backdropColor="#181818"
            coverScreen={true}
            isVisible={isShowingMenu}
            statusBarTranslucent={true}
            onBackButtonPress={() => {
                toggleIsShowing(false);
            }}
        >
            <TouchableOpacity
                style={[styles.centeredView]}
                onPressOut={() => { toggleIsShowing(false); }}
            >
                <View style={[styles.modalView, { backgroundColor: colors.primary }]}>
                    <TouchableOpacity
                        onPress={() => {
                            toggleIsShowing(!isShowingMenu);
                            isHouseholdSelected
                                ? rootStackProps.navigation.pop(1)
                                : rootStackProps.navigation.navigate('Household', { user: user });
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
                        }
                        return (
                            <TouchableOpacity
                                key={household.id}
                                disabled={isDisabled}
                                onPress={() => {
                                    toggleIsShowing(!isShowingMenu);
                                    isHouseholdSelected
                                        ? rootStackProps.navigation.navigate('Household', { user: user, householdId: household.id })
                                        : rootStackProps.navigation.push('Household', { user: user, householdId: household.id });
                                }
                                }>
                                <View style={[styles.householdRow, isDisabled ? { opacity: 0.2 } : { opacity: 1 }]}>
                                    {member && <Avatar avatarId={member.avatar} showCircle={true} avatarSize={22} />}
                                    <Text style={[styles.modalText, { color: colors.text }]}>{household.name}</Text>
                                    {isDisabled && <Text style={[styles.modalText, { color: colors.text }]}>Pausad</Text>}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                    <TouchableOpacity
                        onPress={() => {
                            toggleIsShowing(!isShowingMenu);
                            // Should open modal here
                        }
                        }>
                        <View style={styles.householdRow}>
                            <View style={[styles.circle, { borderColor: colors.text }]}>
                                <Text style={[{ color: colors.text }]}>+</Text>
                            </View>
                            <Text style={[styles.modalText, { color: colors.text }]}>Skapa/Gå med i hushåll</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
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