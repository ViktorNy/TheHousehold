import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomNavigateButton } from "../component/CustomNavigateButton";
import { mockedUserData } from '../data/data';
import { RootStackScreenProps } from "../navigation/RootStackNavigator";

export default function LoginScreen({ navigation }: RootStackScreenProps<"Login">) {
    const { colors } = useTheme();
    const [userText, onUserTextChange] = useState('');
    const [userPassword, onUserPasswordChange] = useState('');
    const user = mockedUserData[0];

    return (
        <SafeAreaView style={[{ backgroundColor: colors.background }]}>
            <Text style={styles.loginText}>Logga in</Text>
            <TextInput
                style={styles.input}
                value={userText}
                onChangeText={onUserTextChange}
                placeholder='Epost / användarnamn'
            />
            <TextInput
                style={styles.input}
                value={userPassword}
                onChangeText={onUserPasswordChange}
                secureTextEntry={true}
                placeholder='Lösenord'
            />
            <View style={styles.viewStyle}>
                <CustomNavigateButton buttonText="Logga in" goto={() => navigation.navigate('Household', {user})} />
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
        borderRadius: 10
    },
});
