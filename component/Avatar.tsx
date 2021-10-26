import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { mockAvatarData } from '../data/data';

interface Props {
    avatarId: string;
    showCircle?: boolean;
    avatarSize: 14 | 22 | 32;
}

export default function Avatar({ avatarId, showCircle, avatarSize }: Props) {
    // Ska troligtvis hämtas ut på annat ställe
    const avatarList = mockAvatarData;

    const avatar = avatarList.find((a) => a.id === avatarId);

    if (showCircle) {
        return (
            <TouchableOpacity
                style={[styles.avatarPosition, styles.root, { backgroundColor: avatar?.backgroundColor }]}
            >
                <Text style={[{ fontSize: 32 }]}>{avatar?.avatar}</Text>
            </TouchableOpacity>
        );
    } else {
        return <Text style={[{ fontSize: avatarSize }]}>{avatar?.avatar}</Text>;
    }
}

export function AvatarChoice({ avatarId, avatarSize }: Props) {
    const avatarList = mockAvatarData;
    // const [chosenAvatar, setChosenAvatar] = useState('');
    const avatar = avatarList.find((a) => a.id === avatarId);

    // const pressedAvatar = (selectedAvatar: string) => {
    //     setChosenAvatar(selectedAvatar);
    //     console.log(selectedAvatar);
    // };

    return (
        <View
            // onPress={() => pressedAvatar(avatar!.id)}
            style={[
                // chosenAvatar === avatar?.id ? styles.selectedAvatar : {},
                styles.avatarPosition,
                styles.root,
                { backgroundColor: avatar?.backgroundColor }
            ]}
        >
            <Text style={[{ fontSize: avatarSize }]}>{avatar?.avatar}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        height: 50,
        width: 50,
        borderRadius: 100
    },
    avatarPosition: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    unavailableAvatar: {
        textDecorationLine: 'line-through'
    },
    selectedAvatar: {
        borderColor: 'blue',
        borderWidth: 2
    }
});
