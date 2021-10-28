import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Member } from '../data/data';
import { RootStackScreenProps } from '../navigation/RootStackNavigator';
import Modal from 'react-native-modal';

interface Props {
    isShowingMenu: boolean,
    toggleIsShowing: (toggleValue: boolean) => void,
    rootStackProps: RootStackScreenProps<'Household'>,
    householdID?: string,
    currentMember?: Member
}

export default function HamburgerMenu({ isShowingMenu, toggleIsShowing, rootStackProps, householdID, currentMember }: Props) {
    const { colors } = useTheme();
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
                            <Text style={[styles.modalText, { color: colors.text }]}>Bjud in medlem, kod: 1337</Text>)}

                        <Text style={[styles.modalText, { color: colors.text }]}>Byt avatar</Text>

                        <TouchableOpacity
                            onPress={() => {
                                toggleIsShowing(!isShowingMenu);
                                rootStackProps.navigation.navigate('Member', { householdId: householdID });
                            }}>
                            <Text style={[styles.modalText, { color: colors.text }]}>Visa medlemmar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                toggleIsShowing(!isShowingMenu);
                                rootStackProps.navigation.navigate('HouseholdChores', { householdId: householdID });
                            }}>
                            <Text style={[styles.modalText, { color: colors.text }]}>Visa sysslor</Text>
                        </TouchableOpacity>

                        <Text style={[styles.modalText, { color: colors.text }]}>Visa statestik</Text>

                        <Text style={[styles.modalText, { color: colors.text }]}>Lämna hushållet</Text>

                        {currentMember?.memberType === 'owner' && (
                            <Text style={[styles.modalText, { color: colors.text }]}>Visa förfrågningar</Text>)}

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