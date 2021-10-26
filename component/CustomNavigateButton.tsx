import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Avatar from "./Avatar";

interface Props {
    goto: () => void;
    buttonText?: string;
    avatarIdList?: string[];
    singleAvatarId?: string; // for future use
}

export function CustomNavigateButton({ goto, buttonText, avatarIdList, singleAvatarId }: Props) {
    const { colors } = useTheme();
    if (singleAvatarId) {
        return (
            <TouchableOpacity
                style={[
                    styles.rootAvatar,
                    { backgroundColor: colors.primary },
                    { borderColor: colors.border },
                    { borderWidth: 1 },
                ]}
                onPress={goto}
            >
                <Avatar avatarId={singleAvatarId} showCircle={true} avatarSize={22} />
                <Text style={[styles.textpadding, { color: colors.text }]}>{buttonText}</Text>
            </TouchableOpacity>
        );
    } else {
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
                <Text style={[styles.buttonText, { color: colors.text }]}>{buttonText}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    rootAvatar: {
        padding: 15,
        height: 50,
        borderRadius: 10,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
    },
    buttonText: {
        fontWeight: "bold",
    },
    textpadding: {
        paddingLeft: 20,
    },
});
