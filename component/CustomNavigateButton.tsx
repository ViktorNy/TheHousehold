import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Avatar from "./Avatar";

interface Props {
    goto: () => void,
    buttonText?: string,
    avatarIdList?: string[]
    singleAvatarId?: string
}

export function CustomNavigateButton({ goto, buttonText, avatarIdList, singleAvatarId }: Props) {
    const { colors } = useTheme();
    if (singleAvatarId) {
        return (
            <TouchableOpacity style={[styles.root, { backgroundColor: colors.primary }, { borderColor: colors.border }, { borderWidth: 1 }]}
                onPress={goto}>
                <Avatar avatarId={singleAvatarId} showCircle={true} avatarSize={22} />
                <Text style={[styles.textpadding, { color: colors.text }]}>{buttonText}</Text>
            </TouchableOpacity>
        )
    } else{
        return (
            <TouchableOpacity style={[styles.root, { backgroundColor: colors.primary }, { borderColor: colors.border }, { borderWidth: 1 }]}
                onPress={goto}>
                <Text style={{ color: colors.text }}>{buttonText}</Text>
            </TouchableOpacity>
        )
    }
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
        paddingRight: 20
    },
    textpadding: {
        paddingLeft: 20
    }
});