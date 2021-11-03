import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { CustomPlusButton } from '../component/CustomPlusButton';
import HouseholdModal from '../component/customPopupBox/HouseholdModal';
import { RootStackScreenProps } from '../navigation/RootStackNavigator';

export default function NoHouseholdScreen({ navigation, route }: RootStackScreenProps<'NoHousehold'>) {
    const { colors } = useTheme();

    const [isShowJoinHouseholdModal, setIsShowJoinHouseholdModal] = useState(false);

    // present info for user with no household
    return (
        <SafeAreaView>

            <View style={styles.conatiner}>
                <Text style={[{ color: colors.text }, styles.simplifyText]}>Förenkla din vardag </Text>
                <Text style={[{ color: colors.text }, styles.pitchText]}>
                        Få koll på era sysslor, fördela och engagera. Att glömma bort blir nu ett minne blott!
                </Text>
                <Text style={[{ color: colors.text }, styles.notMemberText]}>
                        Du är inte medlem i något hushåll, för att komma vidare skapa ett ny eller gå med i ett.
                </Text>
                <View style={styles.buttonContainer}>
                    <CustomPlusButton buttonText="Skapa nytt" goto={() => {
                        setIsShowJoinHouseholdModal(!isShowJoinHouseholdModal);
                        navigation.navigate('Household');
                    }} />
                    <CustomPlusButton buttonText="Gå med i" goto={() => { }} />

                </View>
            </View>
            {/* Should be changed for correct madol */}
            <HouseholdModal modalCase={'CH'} isShowing={isShowJoinHouseholdModal} toggleModal={setIsShowJoinHouseholdModal} />

        </SafeAreaView>
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
