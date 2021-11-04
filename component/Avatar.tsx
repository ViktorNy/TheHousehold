import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { avatarData } from '../data/data';

interface Props {
    avatarId: string;
    showCircle?: boolean;
    avatarSize: 14 | 22 | 32;
}

export default function Avatar({ avatarId, showCircle, avatarSize }: Props) {
    const avatarList = avatarData;
    const avatar = avatarList.find((a) => a.id === avatarId);

    if (showCircle) {
        return (
            <View style={[styles.avatarPosition, styles.root, { backgroundColor: avatar?.backgroundColor }]}>
                <Text style={[{ fontSize: avatarSize }]}>{avatar?.avatar}</Text>
            </View>
        );
    } else {
        return <Text style={[{ fontSize: avatarSize }]}>{avatar?.avatar}</Text>;
    }
}

const styles = StyleSheet.create({
    root: {
        height: 40,
        width: 40,
        borderRadius: 100
    },
    avatarPosition: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});
