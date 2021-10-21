import { useTheme } from "@react-navigation/native";
import React from "react";
import { Button, StyleSheet, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomNavigateButton } from "../component/CustomNavigateButton";
import { RootStackScreenProps } from "../navigation/RootStackNavigator";
// import ladyTrashcan from '../assets'

export default function StartScreen({ navigation }: RootStackScreenProps<"Start">) {
    const { colors } = useTheme();
    return (
        <SafeAreaView style={[{ backgroundColor: colors.background }]}>
            <Text style={styles.homeTextStyle}>Hemmet</Text>

            <Text style={styles.simplifyText}>Förenkla din vardag</Text>
            <Text style={styles.pitchText}>
                Få koll på era sysslor, fördela, engagera och glöm bort blir nu ett minne blott!
            </Text>
            <Image style={styles.imageStyle}  source={require('../assets/ladyontrashcan.png')}/>
            <View style={styles.viewStyle}>
                <CustomNavigateButton buttonText="Logga in" goto={() => {}} />

                <Text style={styles.notMemberText}>Är du inte medlem?</Text>

                <CustomNavigateButton buttonText="Registrera" goto={() => {}} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    homeTextStyle: {
        marginTop: 100,
        fontSize: 40,
        marginLeft: 30,
    },
    simplifyText: {
        fontSize: 15,
        marginLeft: 30,
        marginTop: 100,
        fontWeight: "bold",
    },
    pitchText: {
        marginLeft: 30,
        marginRight: 100,
        marginTop: 10
    },
    notMemberText: {
        alignSelf: "center",
        marginTop: 10
    },
    viewStyle: {
        marginTop: 50,
        margin: 10
    },
    imageStyle: {
        width: 100,
        height: 150,
        marginLeft: 250,
        marginTop: 30
    }
});
