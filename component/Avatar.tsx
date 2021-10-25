import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { mockAvatarData } from '../data/data';

interface Props {
    avatarId: string,
    showCircle: boolean,
    avatarSize: 14 | 22 | 32
}

export default function Avatar({ avatarId, showCircle, avatarSize }: Props) {
    // Ska troligtvis hämtas ut på annat ställe
    const avatarList = mockAvatarData;
    const colors = useTheme();
    const [chosenAvatar, setChosenAvatar] = useState(false)

    const avatar = avatarList.find(a => a.id === avatarId);
    if (showCircle) {
        return (
            <TouchableOpacity onPress={()=>setChosenAvatar(!chosenAvatar)} style={[chosenAvatar ? styles.selectedAvatar : {}, styles.avatarPosition, styles.root, { backgroundColor: avatar?.backgroundColor }]}>
                <Text style={[{ fontSize: 32 }]}>{avatar?.avatar}</Text>
            </TouchableOpacity>
        );
    } else {
        return <Text style={[{ fontSize: avatarSize }]}>{avatar?.avatar}</Text>;
    }
}

const styles = StyleSheet.create({
    root: {
        height: 50,
        width: 50,
        borderRadius: 100,
        marginTop: 1,
    },
    avatarPosition: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    unavailableAvatar: {

    },
    selectedAvatar: {
        borderColor: 'blue',
        borderWidth: 5
    }
});