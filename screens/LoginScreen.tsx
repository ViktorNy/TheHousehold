import { useTheme } from 'react-native-paper';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomNavigateButton } from '../component/CustomNavigateButton';
import { mockedUserData } from '../data/data';
import { RootStackScreenProps } from '../navigation/RootStackNavigator';
import { useAppDispatch } from '../store/store';

export default function LoginScreen({ navigation }: RootStackScreenProps<'Login'>) {
    const { colors } = useTheme();
    const [userText, onUserTextChange] = useState('');
    const [userPassword, onUserPasswordChange] = useState('');
    const dispatch = useAppDispatch();

    // REMOVE THIS LATER
    // const households = useAppSelector(state => state.household.householdList);

    const user = mockedUserData[0];

    // Needs to be revised. Now only works if you log in with user info:
    // Username: s
    // Password: s
    // Otherwise logs out 'faulty user' in console
    function checkUserInfo() {
        if (user.email === userText || (user.username === userText && user.password === userPassword)) {
            dispatch({ type: 'SET_USER', payload: user.id });
            navigation.navigate('Household');

            // JUST FOR TESTING PURPOSES
            // const chosenMember = members.find(m => m.userId === user.id);
            // const choseHousehold = households.find(h => h.id === chosenMember?.householdId);
            // chosenMember && dispatch({ type: 'SETHOUSEHOLD', payload: chosenMember.householdId });
            // navigation.navigate('PieChart', { screen: 'PieAll', params: { householdId: choseHousehold?.id } });
        } else {
            console.log('Faulty user');
        }
    }

    // comment for testing

    return (
        <SafeAreaView style={[{ backgroundColor: colors.background }]}>
            <Text style={[styles.loginText, { color: colors.text }]}>Logga in</Text>
            <TextInput
                style={[styles.input, { backgroundColor: colors.primary, color: colors.text }]}
                value={userText}
                onChangeText={onUserTextChange}
                placeholder="Epost / användarnamn"
                textAlign="center"
                placeholderTextColor={colors.text}
            />
            <TextInput
                style={[styles.input, { marginTop: 0, backgroundColor: colors.primary, color: colors.text }]}
                value={userPassword}
                onChangeText={onUserPasswordChange}
                secureTextEntry={true}
                placeholder="Lösenord"
                textAlign="center"
                placeholderTextColor={colors.text}
            />
            <View style={styles.viewStyle}>
                <CustomNavigateButton buttonText="Logga in" goto={checkUserInfo} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    loginText: {
        fontSize: 40,
        marginLeft: 10,
        marginBottom: 10
    },
    viewStyle: {
        marginTop: 12,
        margin: 10
    },
    input: {
        height: 50,
        margin: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white'
    }
});
