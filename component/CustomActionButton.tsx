import { useTheme } from 'react-native-paper';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Avatar from './Avatar';

interface Props {
    action: () => void;
    buttonText?: string;
    singleAvatarId?: string;
}

export function CustomActionButton({ action, buttonText, singleAvatarId }: Props) {
    const { colors } = useTheme();
    if (singleAvatarId) {
        return (
            <TouchableOpacity
                style={[styles.rootAvatar, { backgroundColor: colors.primary }, { borderColor: colors.border }, { borderWidth: 1 }]}
                onPress={action}
            >
                <Avatar avatarId={singleAvatarId} showCircle={true} avatarSize={22} />
                <Text style={[styles.textpadding, { color: colors.text }]}>{buttonText}</Text>
            </TouchableOpacity>
        );
    } else {
        return (
            <TouchableOpacity
                style={[styles.root, { backgroundColor: colors.primary }, { borderColor: colors.border }, { borderWidth: 1 }]}
                onPress={action}
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    rootAvatar: {
        padding: 15,
        height: 50,
        borderRadius: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    buttonText: {
        fontWeight: 'bold'
    },
    textpadding: {
        paddingLeft: 20
    }
});
