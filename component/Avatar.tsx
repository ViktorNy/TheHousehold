import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { mockAvatarData } from "../data/data";

interface Props {
    avatarId: string,
    showCircle: boolean,
    avatarSize: 14 | 22 | 32
}

export default function Avatar({ avatarId, showCircle, avatarSize }: Props) {
    // Ska troligtvis hämtas ut på annat ställe
    const avatarList = mockAvatarData;
    const colors = useTheme();

    const avatar = avatarList.find(a => a.id === avatarId);
    if (showCircle) {
        return (
            <View style={[styles.avatarPosition, styles.root, { backgroundColor: avatar?.backgroundColor, borderColor: colors.colors.primary }]}>
                <Text style={[{ fontSize: 32 }]}>{avatar?.avatar}</Text>
            </View>
        )
    }
    else {
        return <Text style={[{ fontSize: avatarSize }]}>{avatar?.avatar}</Text>
    }
}

const styles = StyleSheet.create({
    root: {
        height: 50,
        width: 50,
        borderRadius: 100,
        marginTop: 1,
        borderWidth: 2
    },
    avatarPosition: {
        justifyContent: 'center',
        alignItems: 'center'
    },
});