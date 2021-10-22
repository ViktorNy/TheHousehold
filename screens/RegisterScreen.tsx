import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomNavigateButton } from "../component/CustomNavigateButton";
import { RootStackScreenProps } from "../navigation/RootStackNavigator";

export default function RegisterScreen({ navigation }: RootStackScreenProps<"Register">) {
    const { colors } = useTheme();
    const [userEmail, onUserEmailChange] = useState('');
    const [userPassword, onUserPasswordChange] = useState('');

    return (
        <SafeAreaView style={[{ backgroundColor: colors.background }]}>
            <Text style={styles.loginText}>Registrera</Text>
            <TextInput
                style={styles.input}
                value={userEmail}
                onChangeText={onUserEmailChange}
                placeholder='E-mail'
                textAlign='center'
            />
            <TextInput
                style={[styles.input, {marginTop: 0}]}
                value={userPassword}
                onChangeText={onUserPasswordChange}
                secureTextEntry={true}
                placeholder='Lösenord'
                textAlign='center'
            />
            <View style={styles.viewStyle}>
                <CustomNavigateButton buttonText="Spara" goto={() => navigation.navigate('RegisterUserName', {email: userEmail, password: userPassword})} />
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
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white'
    },
});
