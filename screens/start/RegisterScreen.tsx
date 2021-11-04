import { useTheme } from 'react-native-paper';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomNavigateButton } from '../../component/CustomNavigateButton';
import { RootStackScreenProps } from '../../navigation/RootStackNavigator';
import { useAppDispatch } from '../../store/store';
import { createUser } from '../../store/user/userActions';

export default function RegisterScreen({ navigation }: RootStackScreenProps<'Register'>) {
    const { colors } = useTheme();
    const [userEmail, onUserEmailChange] = useState('');
    const [userName, onUserNameChange] = useState('');
    const [userPassword, onUserPasswordChange] = useState('');
    const dispatch = useAppDispatch();

    return (
        <SafeAreaView style={[{ backgroundColor: colors.background }]}>
            <Text style={[styles.loginText, { color: colors.text }]}>Registrera</Text>
            <TextInput
                style={[styles.input, { marginTop: 30, color: colors.text }, { backgroundColor: colors.primary }]}
                value={userName}
                onChangeText={onUserNameChange}
                placeholder="Användarnamn"
                textAlign="center"
                placeholderTextColor={colors.text}
            />
            <TextInput
                style={[styles.input, { color: colors.text }, { backgroundColor: colors.primary }]}
                value={userEmail}
                onChangeText={onUserEmailChange}
                placeholder="E-mail"
                textAlign="center"
                placeholderTextColor={colors.text}
            />
            <TextInput
                style={[styles.input, { color: colors.text }, { backgroundColor: colors.primary }]}
                value={userPassword}
                onChangeText={onUserPasswordChange}
                secureTextEntry={true}
                placeholder="Lösenord"
                textAlign="center"
                placeholderTextColor={colors.text}
            />
            <View style={styles.viewStyle}>
                <CustomNavigateButton
                    buttonText="Spara"
                    goto={() => {
                        dispatch(createUser(userName, userEmail, userPassword)).then((isSuccessfull) => {
                            isSuccessfull ? navigation.navigate('Household') : Alert.alert('Ajdå, något gick fel', 'Kunde inte komma åt API');
                        });
                    }}
                />
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
        margin: 5,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    }
});
