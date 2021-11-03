import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { useTheme } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../store/store';
import { Household, Member } from '../data/data';

interface Props {
    isShowingMenu: boolean;
    toggleIsShowing: (toggleValue: boolean) => void;
    rootStackProps: MaterialTopTabBarProps;
    currentHousehold?: Household;
    currentMember?: Member;
    toggleExternalModal: (toggle: boolean, modalCase?: string) => void;
}

export default function HamburgerMenu({
    isShowingMenu,
    toggleIsShowing,
    rootStackProps,
    currentHousehold,
    currentMember,
    toggleExternalModal
}: Props) {
    const { colors } = useTheme();

    const currentChoice = useAppSelector((state) => state.user.appearance);
    const dispatch = useAppDispatch();

    const setAppearance = (appearance: string) => {
        dispatch({ type: 'CHANGE_APPEARANCE', payload: appearance });
    };

    const unselectCurrentHousehold = () => {
        dispatch({ type: 'SETHOUSEHOLD', payload: '' });
    };

    if (currentHousehold) {
        return (
            <Modal
                animationIn="slideInUp"
                backdropColor="#181818"
                coverScreen={true}
                deviceHeight={10000}
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
                            <Text style={[styles.modalText, { color: colors.text }]}>Bjud in medlem, kod: {currentHousehold?.codeToJoin}</Text>
                        )}
                        {currentMember?.memberType === 'owner' && (
                            <TouchableOpacity
                                onPress={() => {
                                    toggleIsShowing(!isShowingMenu);
                                    toggleExternalModal(true, 'CHN');
                                }}
                            >
                                <Text style={[styles.modalText, { color: colors.text }]}>Byt namn på hushållet</Text>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity
                            onPress={() => {
                                toggleIsShowing(!isShowingMenu);
                                toggleExternalModal(true, 'AI');
                            }}
                        >
                            <Text style={[styles.modalText, { color: colors.text }]}>Byt avatar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                toggleIsShowing(!isShowingMenu);
                                rootStackProps.navigation.navigate('Member', { householdId: currentHousehold.id });
                            }}
                        >
                            <Text style={[styles.modalText, { color: colors.text }]}>Visa medlemmar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                toggleIsShowing(!isShowingMenu);
                                rootStackProps.navigation.navigate('HouseholdChores');
                            }}
                        >
                            <Text style={[styles.modalText, { color: colors.text }]}>Visa sysslor</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                toggleIsShowing(!isShowingMenu);
                                rootStackProps.navigation.navigate('PieChart');
                            }}
                        >
                            <Text style={[styles.modalText, { color: colors.text }]}>Visa statestik</Text>
                        </TouchableOpacity>

                        <Text style={[styles.modalText, { color: colors.text }]}>Lämna hushållet</Text>

                        {currentMember?.memberType === 'owner' && <Text style={[styles.modalText, { color: colors.text }]}>Visa förfrågningar</Text>}

                        <TouchableOpacity
                            onPress={() => {
                                unselectCurrentHousehold();
                                rootStackProps.navigation.navigate('Start');
                            }}
                        >
                            <Text style={[styles.modalText, { color: colors.text }]}>Logga ut</Text>
                        </TouchableOpacity>

                        <View style={[styles.appearanceChoiceContainer, { backgroundColor: colors.appearanceSwithContainer }]}>
                            <TouchableOpacity
                                style={[
                                    styles.appearanceChoice,
                                    currentChoice === 'auto'
                                        ? { backgroundColor: colors.appearanceSwitchButton }
                                        : { backgroundColor: colors.notSelectedAppearance }
                                ]}
                                onPress={() => setAppearance('auto')}
                            >
                                <Text style={[currentChoice === 'auto' ? { color: colors.appearanceButtonText } : { color: colors.text }]}>Auto</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.appearanceChoice,
                                    currentChoice === 'light'
                                        ? { backgroundColor: colors.appearanceSwitchButton }
                                        : { backgroundColor: colors.notSelectedAppearance }
                                ]}
                                onPress={() => setAppearance('light')}
                            >
                                <Text style={[currentChoice === 'light' ? { color: colors.appearanceButtonText } : { color: colors.text }]}>
                                    Light
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.appearanceChoice,
                                    currentChoice === 'dark'
                                        ? { backgroundColor: colors.appearanceSwitchButton }
                                        : { backgroundColor: colors.notSelectedAppearance }
                                ]}
                                onPress={() => setAppearance('dark')}
                            >
                                <Text style={[currentChoice === 'dark' ? { color: colors.appearanceButtonText } : { color: colors.text }]}>Dark</Text>
                            </TouchableOpacity>
                        </View>
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
                        <TouchableOpacity
                            onPress={() => {
                                toggleIsShowing(!isShowingMenu);
                                rootStackProps.navigation.navigate('Start');
                            }}
                        >
                            <Text style={[styles.modalText, { color: colors.text }]}>Logga ut</Text>
                        </TouchableOpacity>
                        <View style={[styles.appearanceChoiceContainer, { backgroundColor: colors.appearanceSwithContainer }]}>
                            <TouchableOpacity
                                style={[
                                    styles.appearanceChoice,
                                    currentChoice === 'auto'
                                        ? { backgroundColor: colors.appearanceSwitchButton }
                                        : { backgroundColor: colors.notSelectedAppearance }
                                ]}
                                onPress={() => setAppearance('auto')}
                            >
                                <Text style={[currentChoice === 'auto' ? { color: colors.appearanceButtonText } : { color: colors.text }]}>Auto</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.appearanceChoice,
                                    currentChoice === 'light'
                                        ? { backgroundColor: colors.appearanceSwitchButton }
                                        : { backgroundColor: colors.notSelectedAppearance }
                                ]}
                                onPress={() => setAppearance('light')}
                            >
                                <Text style={[currentChoice === 'light' ? { color: colors.appearanceButtonText } : { color: colors.text }]}>
                                    Light
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.appearanceChoice,
                                    currentChoice === 'dark'
                                        ? { backgroundColor: colors.appearanceSwitchButton }
                                        : { backgroundColor: colors.notSelectedAppearance }
                                ]}
                                onPress={() => setAppearance('dark')}
                            >
                                <Text style={[currentChoice === 'dark' ? { color: colors.appearanceButtonText } : { color: colors.text }]}>Dark</Text>
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
