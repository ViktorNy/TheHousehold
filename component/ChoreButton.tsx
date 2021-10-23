import { useTheme } from "@react-navigation/native";
import React from "react";
import { PressableProps, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Chore } from "../data/data";
import Avatar from "./Avatar";

interface Props {
    goto: () => void,
    chore: Chore,
}

export function ChoreButton({ goto, chore }: Props) {
    const { colors } = useTheme();

    function setIconLastDone(chore: Chore) {
        const today = new Date();
        console.log("today:" + today)
        const date = (chore.lastDone? new Date(chore.lastDone): new Date(chore.createdDate));
        console.log("chore.lastDone:" + chore.lastDone)
        console.log("lastDone:" + date)
        const frequency = chore.frequency;
        if(true) {
            //if today === chore.lastDone  --> gå till DoneBye och hämta alla objekt med matchande datum --> plocka ut UserId (???) för att få tag på avatar
            // Är vägen för att få tag på avatar rätt i data.ts ?
            return(
                <Text>5</Text>
            );
        } else {
            //skapa datum för "const souldBeDoneNextDate = lastDone + frequency"
            // har datumet paserat ?
            // Skapa if-sats
            return(
                {}
            );
        }
    }
        return (
            <TouchableOpacity style={[styles.root, { backgroundColor: colors.primary }, { borderColor: colors.border }, { borderWidth: 1 }]}
                onPress={goto}>
                <Text style={[{ color: colors.text }]}>{chore.name}</Text>
                {setIconLastDone(chore)}
                {/* <Avatar avatarId={singleAvatarId} showCircle={false} avatarSize={22} /> */}
            </TouchableOpacity>
        )
}

const styles = StyleSheet.create({
    root: {
        height: 50,
        borderRadius: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        flexDirection: "row",
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: "space-between",
    }
});