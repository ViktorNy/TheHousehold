import { useTheme } from "@react-navigation/native";
import moment from "moment";
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
        // const today = new Date();
        // today.setHours(0,0,0,0);
        const today = moment(new Date()).format('YYYY-MM-DD');
        // const date = (chore.lastDone? new Date(chore.lastDone): new Date(chore.createdDate));
        // date.setHours(0,0,0,0);
        const date = (chore.lastDone? moment(new Date(chore.lastDone)).format('YYYY-MM-DD'): moment(new Date(chore.createdDate)).format('YYYY-MM-DD'));

        const doneNextByDate = moment(date).add(chore.frequency, 'day').format('YYYY-MM-DD');

        console.log("today:" + today)
        console.log("chore.lastDone:" + chore.lastDone)
        console.log("lastDone:" + date)
        console.log("doneNextDate:" + doneNextByDate)

        if(today === date) {
            // TODO: Query to get avatar by using UserId and HouseholdId... ?
            return(
                <Text>avatars</Text>
                );
                //if chore is created today and have no match in doneBy[] --> present GREY number
      } else {
            //check doneNewxtByDate
            if(true) {
                //Days left to due date
                return <Text>GREY 5</Text>
            } else {
                //Days past due date
                return <Text>RED 5</Text>
            }
            //TODO: Is case should be done today coverd correctly?
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