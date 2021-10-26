import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
            <View
                style={[styles.avatarPosition, styles.root, { backgroundColor: avatar?.backgroundColor }]}
            >
                <Text style={[{ fontSize: 32 }]}>{avatar?.avatar}</Text>
            </View>
        );
    } else {
        return <Text style={[{ fontSize: avatarSize }]}>{avatar?.avatar}</Text>;
    }
}

// export function AvatarChoice({ avatarId, avatarSize }: Props) {
//     const avatarList = mockAvatarData;
//     const avatar = avatarList.find((a) => a.id === avatarId);

//     return (
//         <View
//             style={[
//                 styles.avatarPosition,
//                 styles.root,
//                 { backgroundColor: avatar?.backgroundColor }
//             ]}
//         >
//             <Text style={[{ fontSize: avatarSize }]}>{avatar?.avatar}</Text>
//         </View>
//     );
// }

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
