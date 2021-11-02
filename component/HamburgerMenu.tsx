import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { useTheme } from 'react-native-paper';
import { Member } from '../data/data';
import { useAppDispatch, useAppSelector } from '../store/store';

interface Props {
    isShowingMenu: boolean,
    toggleIsShowing: (toggleValue: boolean) => void,
    rootStackProps: MaterialTopTabBarProps,
    householdID?: string,
    currentMember?: Member
}

export default function HamburgerMenu({ isShowingMenu, toggleIsShowing, rootStackProps, householdID, currentMember }: Props) {
    const { colors } = useTheme();

    const currentChoice = useAppSelector((state) => state.user.appearance);
    const dispatch = useAppDispatch();

    const setAppearance = (appearance: string) => {
        dispatch({ type: 'CHANGE_APPEARANCE', payload: appearance });
    };

    if (householdID) {
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
                <View style={[styles.centeredView]}>
                    <View style={[styles.modalView, { backgroundColor: colors.primary }]}>
                        {currentMember?.memberType === 'owner' && (
                            <Text style={[styles.modalText, { color: colors.text }]}>Bjud in medlem, kod: 1337</Text>
                        )}

                        <Text style={[styles.modalText, { color: colors.text }]}>Byt avatar</Text>

                        <TouchableOpacity
                            onPress={() => {
                                toggleIsShowing(!isShowingMenu);
                                rootStackProps.navigation.navigate('Member', { householdId: householdID });
                            }}
                        >
                            <Text style={[styles.modalText, { color: colors.text }]}>Visa medlemmar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                toggleIsShowing(!isShowingMenu);
                                rootStackProps.navigation.navigate('HouseholdChores', { householdId: householdID });
                            }}
                        >
                            <Text style={[styles.modalText, { color: colors.text }]}>Visa sysslor</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                toggleIsShowing(!isShowingMenu);
                                rootStackProps.navigation.navigate('PieChart', { householdId: householdID });
                            }}
                        >
                            <Text style={[styles.modalText, { color: colors.text }]}>Visa statestik</Text>
                        </TouchableOpacity>

                        <Text style={[styles.modalText, { color: colors.text }]}>Lämna hushållet</Text>

                        {currentMember?.memberType === 'owner' && <Text style={[styles.modalText, { color: colors.text }]}>Visa förfrågningar</Text>}

                        <Text style={[styles.modalText, { color: colors.text }]}>Logga ut</Text>
                    </View>
                </View>
            </Modal>
        );
    } else {
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
                <View style={[styles.centeredView]}>
                    <View style={[styles.modalView, { backgroundColor: colors.primary }]}>
                        <Text style={[styles.modalText, { color: colors.text }]}>Logga ut</Text>
                        <View style={[styles.appearanceChoiceContainer, { backgroundColor: colors.appearanceSwithContainer }]}>
                            <TouchableOpacity
                                style={[styles.appearanceChoice, currentChoice === 'auto' ? { backgroundColor: colors.lightModeButton } : { backgroundColor: colors.notSelectedAppearance }]}
                                onPress={() => setAppearance('auto')
                                }
                            >
                                <Text style={[currentChoice === 'auto' ? { color: colors.lightModeButtonText } : { color: colors.text }]}>Auto</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.appearanceChoice, currentChoice === 'light' ? { backgroundColor: colors.lightModeButton } : { backgroundColor: colors.notSelectedAppearance }]}
                                onPress={() => setAppearance('light')}
                            >
                                <Text style={[currentChoice === 'light' ? { color: colors.lightModeButtonText } : { color: colors.text }]}>Light</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.appearanceChoice, currentChoice === 'dark' ? { backgroundColor: colors.lightModeButton } : { backgroundColor: colors.notSelectedAppearance }]}
                                onPress={() => setAppearance('dark')}
                            >
                                <Text style={[currentChoice === 'dark' ? { color: colors.lightModeButtonText } : { color: colors.text }]}>Dark</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
        borderRadius: 20,
        padding: 35,
        alignItems: 'flex-start',
        shadowColor: '#000',
        width: '100%'
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center'
    },
    appearanceChoiceContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        backgroundColor: '#f2f2f2',
        borderRadius: 100
    },
    appearanceChoice: {
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100
    },
    appearanceChosenColor: {
        borderColor: 'black'
    },
    appearanceNotChosenColor: {
        borderColor: 'red'
    }
});
