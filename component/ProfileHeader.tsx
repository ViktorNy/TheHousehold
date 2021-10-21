import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Household, Member, User } from "../data/data";
import Avatar from "./Avatar";
import { Entypo } from "@expo/vector-icons";

interface Props {
    household?: Household;
    user: User;
    visitMember?: Member;
}

export function ProfileHeader({ household, user, visitMember }: Props) {
    const { colors } = useTheme();

    function ShowProfile(household?: Household) {
        if (visitMember) {
            //visit another member profile
            return (
                <TouchableOpacity style={styles.row}>
                    <Entypo name="arrow-long-left" size={20} color={colors.text} />
                    <Text style={[styles.title, { paddingLeft: 10, color: colors.text }]}>{visitMember.userId}</Text>
                </TouchableOpacity>
            );
        } else if (household) {
            //visit one of youre households
            return (
                <TouchableOpacity style={styles.row}>
                    <Text style={[styles.title, { color: colors.text }]}>{household.name}</Text>
                    <Entypo name="chevron-small-down" size={24} color={colors.text} />
                </TouchableOpacity>
            );
        } else {
            //visit youre page "min sida"
            return (
                <TouchableOpacity style={styles.row}>
                    <Text style={[styles.title, { color: colors.text }]}>Min sida</Text>
                    <Entypo name="chevron-small-down" size={24} color={colors.text} />
                </TouchableOpacity>
            );
        }
    }

    function DisplayScore(description: string, score?: number) {
        if (!score) score = 0;
        return (
            <View style={styles.score}>
                <View style={[styles.circle, { borderColor: colors.border }]}>
                    <Text style={{ color: colors.text }}>{score}</Text>
                </View>
                <Text style={{ color: colors.text }}>{description}</Text>
            </View>
        );
    }

    function DisplayUser(user: User, household?: Household, visitMember?: Member) {
        if (visitMember) {
            //visit another member profile
            // TODO: hämta rätt info
            return (
                <View style={styles.user}>
                    <View style={[styles.circle]}>
                        <Text style={{ color: colors.text }}>{visitMember.avatar}</Text>
                    </View>
                    <Text style={{ color: colors.text }}>{visitMember.memberType}</Text>
                </View>
            );
        } else if (household) {
            //visit one of youre households
            // TODO: hämta rätt info
            return (
                <View style={styles.user}>
                    <View style={[styles.circle]}>
                        <Text style={{ color: colors.text }}>todo avatar</Text>
                    </View>
                    <Text style={{ color: colors.text }}>{user.username}</Text>
                    <Text style={{ color: colors.text }}>todo memberType</Text>
                </View>
            );
        } else {
            //visit youre page "min sida"
            //TODO: Hämta rätt info
            return (
                <View style={styles.user}>
                    <View style={[styles.circle]}>
                        <Text style={{ color: colors.text }}>todo avatar</Text>
                    </View>
                    <Text style={{ color: colors.text }}>{user.username}</Text>
                </View>
            );
        }
    }

    return (
        <View style={[styles.root, { backgroundColor: colors.primary }]}>
            {/* Row 1: household + menu */}
            <View style={[styles.row, styles.spaceBetween]}>
                {ShowProfile(household)}
                <TouchableOpacity>
                    <Entypo name="menu" size={24} color={colors.text} />
                </TouchableOpacity>
            </View>
            {/* Row 2: circles + text */}
            <View style={styles.rowTwo}>
                {/*  */}
                {DisplayUser(user, household)}
                <View style={{ alignItems: "center" }}>
                    <View style={[styles.row, styles.spaceBetween]}>
                        {DisplayScore("Att göra", 0)}
                        {DisplayScore("Avklarade", 10)}
                        {DisplayScore("Poäng")}
                    </View>
                    <Text style={{ color: colors.border }}>För nuvarande månad</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        padding: 10,
    },
    row: {
        flexDirection: "row",
    },
    spaceBetween: {
        justifyContent: "space-between",
    },
    rowTwo: {
        //backgroundColor: "pink",
        justifyContent: "space-between",
        paddingRight: 20,
        paddingTop: 5,
        flexDirection: "row",
        width: "100%",
    },
    user: {
        alignItems: "center",
    },
    score: {
        alignItems: "center",
        paddingLeft: 10,
    },
    circle: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        borderWidth: 1,
        height: 40,
        width: 40,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
});
