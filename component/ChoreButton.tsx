import { useTheme } from "@react-navigation/native";
import moment from "moment";
import React from "react";
import { PressableProps, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Chore } from "../data/data";
import Avatar from "./Avatar";

interface Props {
    goto: () => void;
    chore: Chore;
    avatarIdList: string[];
}

export function ChoreButton({ goto, chore, avatarIdList }: Props) {
    // TODO: Imporve theme colos to be used for this component ?
    const { colors } = useTheme();
    const today = moment(new Date()).format("YYYY-MM-DD");

    function setIconLastDone(chore: Chore, avatarIdList: string[]) {
        const lastDoneDate = chore.lastDone
            ? moment(new Date(chore.lastDone)).format("YYYY-MM-DD")
            : moment(new Date(chore.createdDate)).format("YYYY-MM-DD");

        const doneNextByDate = moment(lastDoneDate).add(chore.frequency, "day").format("YYYY-MM-DD");

        var differenceInDays = (new Date(today).getTime() - new Date(doneNextByDate).getTime()) / (1000 * 3600 * 24);

        console.log("difference in day: " + differenceInDays);
        console.log("today:" + today);
        console.log("chore.lastDone:" + chore.lastDone);
        console.log("lastDone:" + lastDoneDate);
        console.log("doneNextDate:" + doneNextByDate);

        if (today === lastDoneDate && avatarIdList) {
            return (
                <View style={{ flexDirection: "row" }}>
                    {avatarIdList.map((id) => {
                        return <Avatar avatarId={id} showCircle={false} avatarSize={22} />;
                    })}
                </View>
            );
        } else {
            if (differenceInDays === 0) {
                return (
                    <View>
                        <Text style={{ fontStyle: "italic", color: colors.text }}>Ska göras idag!</Text>
                    </View>
                );
            } else if (differenceInDays > 0) {
                return (
                    <View style={[styles.circle, { backgroundColor: "red" }]}>
                        <Text style={{ color: colors.text }}>{differenceInDays}</Text>
                    </View>
                );
            } else if (differenceInDays < 0) {
                return (
                    <View style={[styles.circle, { backgroundColor: colors.border }]}>
                        <Text style={{ color: colors.text }}>{differenceInDays}</Text>
                    </View>
                );
            }
        }
    }
    return (
        <TouchableOpacity
            style={[
                styles.root,
                { backgroundColor: colors.primary },
                { borderColor: colors.border },
                { borderWidth: 1 },
            ]}
            onPress={goto}
        >
            <Text style={[{ color: colors.text }]}>{chore.name}</Text>
            {setIconLastDone(chore, avatarIdList)}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    root: {
        height: 50,
        borderRadius: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        alignItems: "center",
        flexDirection: "row",
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: "space-between",
    },
    circle: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        height: 30,
        width: 30,
    },
});
