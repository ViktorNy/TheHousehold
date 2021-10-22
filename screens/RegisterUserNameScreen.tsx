import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomNavigateButton } from "../component/CustomNavigateButton";
import { RootStackScreenProps } from "../navigation/RootStackNavigator";

export default function RegisterUserNameScreen({ navigation, route }: RootStackScreenProps<"RegisterUserName">) {
    const { colors } = useTheme();
    const [username, onUsernameChange] = useState('');

    return (
        <SafeAreaView style={[{ backgroundColor: colors.background }]}>
            <Text style={styles.loginText}>Registrera</Text>
            <TextInput
                style={[styles.input, {marginBottom: 0}]}
                value={username}
                onChangeText={onUsernameChange}
                placeholder='Användarnamn'
                textAlign='center'
            />
            <View style={styles.viewStyle}>
                <CustomNavigateButton buttonText="Registrera användare" goto={() => {}} />
            </View>
            <Text style={styles.approvalText}>Genom att klicka “Registrera användare” godkänner du
            <Text style={styles.underlineText}> Hemmets användarvillkor</Text>
            .</Text>
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
