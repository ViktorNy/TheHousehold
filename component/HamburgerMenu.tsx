import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { useTheme } from 'react-native-paper';
import { Household, Member } from '../data/data';

interface Props {
    isShowingMenu: boolean,
    toggleIsShowing: (toggleValue: boolean) => void,
    rootStackProps: MaterialTopTabBarProps,
    currentHousehold?: Household,
    currentMember?: Member,
    toggleExternalModal: (toggle: boolean, modalCase?: string) => void;
}

export default function HamburgerMenu({ isShowingMenu, toggleIsShowing, rootStackProps, currentHousehold, currentMember, toggleExternalModal }: Props) {
    const { colors } = useTheme();
    if (currentHousehold) {
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
                            <Text style={[styles.modalText, { color: colors.text }]}>Bjud in medlem, kod: {currentHousehold?.codeToJoin}</Text>
                        )}
                        {currentMember?.memberType === 'owner' &&
                            <TouchableOpacity
                                onPress={() => {
                                    toggleIsShowing(!isShowingMenu);
                                    toggleExternalModal(true, 'CHN');
                                }}
                            >
                                <Text style={[styles.modalText, { color: colors.text }]}>Byt namn på hushållet</Text>
                            </TouchableOpacity>
                        }

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
                                rootStackProps.navigation.navigate('HouseholdChores', { householdId: currentHousehold.id });
                            }}
                        >
                            <Text style={[styles.modalText, { color: colors.text }]}>Visa sysslor</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                toggleIsShowing(!isShowingMenu);
                                rootStackProps.navigation.navigate('PieChart', { householdId: currentHousehold.id });
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
    }
});
