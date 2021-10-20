import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { RootStackScreenProps } from "../navigation/RootStackNavigator";

export default function StartScreen({ navigation }: RootStackScreenProps<"Start">) {
    return (
        <SafeAreaView>
            <View style={styles.root}>
                <Text style={styles.homeTextStyle}>Hemmet</Text>

                <View style={styles.styleSecondview}>
                    <Text style={styles.secondText}>Förenkla din vardag</Text>
                    <Text style={styles.thirdText}>Få koll på era sysslor, fördela engagwera och glöm bort blir nu ett minne blott!</Text>
                </View>

                <Text>Är du inte medlem?</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#E4E4E4",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    homeTextStyle: {
        fontSize: 30,
        marginRight: 250,
    },
    secondText: {
        fontSize: 15,
        marginRight: 150,
        fontWeight: "bold",
    },
    thirdText: {
        marginRight: 100,
        marginLeft: 50
    },
    styleSecondview: {
        alignItems: "center",
        justifyContent: 'center'
        // justifyContent: "space-evenly",
    }
});
