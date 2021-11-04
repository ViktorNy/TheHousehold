import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomNavigateButton } from '../component/CustomNavigateButton';
import { RootStackScreenProps } from '../navigation/RootStackNavigator';
import { useAppDispatch } from '../store/store';
import { loginUser } from '../store/user/userActions';

export default function LoginScreen({ navigation }: RootStackScreenProps<'Login'>) {
    const { colors } = useTheme();
    const [userText, onUserTextChange] = useState('');
    const [userPassword, onUserPasswordChange] = useState('');
    const dispatch = useAppDispatch();

    function checkUserInfo() {
        dispatch(loginUser(userText, userPassword)).then((isSuccessfull) => {
            isSuccessfull ? navigation.navigate('Household') : Alert.alert('Ajdå, något gick fel', 'Felaktigt användarnamn, email eller lösenord');
        });
    }

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
