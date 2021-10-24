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
        const today = moment(new Date()).format('YYYY-MM-DD');
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
                //TODO: if chore is created today and have no match in doneBy[] --> present GREY number
      } else {
            //check doneNewxtByDate
            var Difference_In_Days = (new Date(today).getTime() - new Date(doneNextByDate).getTime()) / (1000 * 3600 * 24);
            console.log(Difference_In_Days)

            const notPasedDoneNextBy = Date.parse(today) < Date.parse(doneNextByDate);
            if (notPasedDoneNextBy) {
                //Days left to due date
                return <Text>GREY {Difference_In_Days}</Text>
            } else {
                //Days past due date
                return <Text>RED {Difference_In_Days}</Text>
                //TODO: In case it should be done today? Number 0 will appeare here
            }
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