import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View, Image, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomNavigateButton } from "../component/CustomNavigateButton";
import { RootStackScreenProps } from "../navigation/RootStackNavigator";

export default function LoginScreen({ navigation }: RootStackScreenProps<"Login">) {
    const { colors } = useTheme();
    const [userText, onUserTextChange] = useState('');
    const [userPassword, onUserPasswordChange] = useState('');

    return (
        <SafeAreaView style={[{ backgroundColor: colors.background }]}>
            <Text style={styles.loginText}>Logga in</Text>
            <TextInput
                onChangeText={onUserTextChange}
                style={styles.input}
                value={userText}
                placeholder='Epost / användarnamn'
            />
            <TextInput
                style={styles.input}
                value={userPassword}
                onChangeText={onUserPasswordChange}
                placeholder='Lösenord'
                secureTextEntry={true}
            />
            <View style={styles.viewStyle}>
                <CustomNavigateButton buttonText="Logga in" goto={() => { }} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    loginText: {
        marginTop: 100,
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
