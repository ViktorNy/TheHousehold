import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomNavigateButton } from '../component/CustomNavigateButton';
import { RootStackScreenProps } from '../navigation/RootStackNavigator';
import { useAppDispatch } from '../store/store';
import { createUser } from '../store/user/userActions';

export default function RegisterUserNameScreen({ navigation, route }: RootStackScreenProps<'RegisterUserName'>) {
    const { colors } = useTheme();
    const [username, onUsernameChange] = useState('');
    const dispatch = useAppDispatch();

    return (
        <SafeAreaView style={[{ backgroundColor: colors.background }]}>
            <Text style={[styles.loginText, { color: colors.text }]}>Registrera</Text>
            <TextInput
                style={[styles.input, { marginBottom: 0, backgroundColor: colors.primary, color: colors.text }]}
                value={username}
                onChangeText={onUsernameChange}
                placeholder="Användarnamn"
                textAlign="center"
                placeholderTextColor={colors.text}
            />
            <View style={styles.viewStyle}>
                <CustomNavigateButton
                    buttonText="Registrera användare"
                    goto={() => {
                        dispatch(createUser(username, route.params.email, route.params.password)).then((isSuccessfull) => {
                            isSuccessfull ? navigation.navigate('Household') : Alert.alert('Ajdå, något gick fel', 'Kunde inte komma åt API');
                        });
                    }}
                />
            </View>
            <Text style={[styles.approvalText, { color: colors.text }]}>
                Genom att klicka “Registrera användare” godkänner du
                <Text style={[styles.underlineText, { color: colors.text }]}> Hemmets användarvillkor</Text>.
            </Text>
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
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    approvalText: {
        margin: 10
    },
    underlineText: {
        textDecorationLine: 'underline'
    }
});
