import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { mockAvatarData } from "../data/data";

interface Props {
    avatarId: string,
    showCircle: boolean,
    avatarSize: 14 | 22
}

export default function Avatar({ avatarId, showCircle, avatarSize }: Props) {
    // Ska troligtvis hämtas ut på annat ställe
    const avatarList = mockAvatarData;

    const avatar = avatarList.find(a => a.id === avatarId);
    if (showCircle) {
        return (
            <View style={[styles.avatarPosition, styles.root, { backgroundColor: avatar?.backgroundColor }]}>
                <Text style={[{ fontSize: avatarSize }]}>{avatar?.avatar}</Text>
            </View>
        )
    }
    else {
        return <Text style={[{ fontSize: avatarSize }]}>{avatar?.avatar}</Text>
    }
}

const styles = StyleSheet.create({
    root: {
        height: 40,
        width: 40,
        borderRadius: 100,
        marginTop: 1
    },
    avatarPosition: {
        justifyContent: 'center',
        alignItems: 'center'
    },
});