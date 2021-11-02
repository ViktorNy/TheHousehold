import { useTheme } from 'react-native-paper';
import moment from 'moment';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Chore } from '../../data/data';
import Avatar from '../Avatar';
import { AntDesign } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { CreateChoreModal } from '../customPopupBox/CreateChoreModal';

interface Props {
    goto: () => void;
    chore: Chore;
    avatarIdList: string[];
    editChore?: boolean | undefined;
}

export function ChoreButton({ goto, chore, avatarIdList, editChore }: Props) {
    const { colors } = useTheme();
    const today = moment(new Date()).format('YYYY-MM-DD');
    const currentHouseholdId = useAppSelector((state) => state.household.currentHouseholdId);
    const dispatch = useAppDispatch();
    const [isShowingEditModal, setIsShowingEditModal] = useState(false);

    function setIconLastDone(chore: Chore, avatarIdList: string[], editChore?: boolean) {
        const lastDoneDate = chore.lastDone
            ? moment(new Date(chore.lastDone)).format('YYYY-MM-DD')
            : moment(new Date(chore.createdDate)).format('YYYY-MM-DD');

        const doneNextByDate = moment(lastDoneDate).add(chore.frequency, 'day').format('YYYY-MM-DD');
        console.log();
        const differenceInDays = (new Date(today).getTime() - new Date(doneNextByDate).getTime()) / (1000 * 3600 * 24);
        if (editChore) {
            // TODO: on press need to lead to right popup by chore.id...
            return (
                <View style={[{ flexDirection: 'row' }]}>
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => {
                            dispatch({ type: 'REMOVE_CHORE_FROM_HOUSEHOLD', payload: { chore: chore, householdId: currentHouseholdId! } });
                        }}
                    >
                        <AntDesign name="delete" size={20} color={colors.text} />
                    </TouchableOpacity>
                    <TouchableOpacity style={(styles.icon, { paddingLeft: 10 })} onPress={() => setIsShowingEditModal(!isShowingEditModal)}>
                        <AntDesign name="edit" size={20} color={colors.text} />
                    </TouchableOpacity>
                    <CreateChoreModal
                        modalCase={'CC'}
                        isShowing={isShowingEditModal}
                        toggleModal={() => setIsShowingEditModal(!isShowingEditModal)}
                        chore={chore}
                    />
                </View>
            );
        } else if (today === lastDoneDate && avatarIdList) {
            return (
                <View style={{ flexDirection: 'row' }}>
                    {avatarIdList.map((id) => {
                        return <Avatar key={id} avatarId={id} showCircle={false} avatarSize={22} />;
                    })}
                </View>
            );
        } else {
            if (differenceInDays === 0) {
                return (
                    <View>
                        <Text style={{ fontStyle: 'italic', color: colors.text }}>Ska göras idag!</Text>
                    </View>
                );
            } else if (differenceInDays > 0) {
                return (
                    // TODO: use theme colors for red + text should be white in both light and dark theme
                    <View style={[styles.circle, { backgroundColor: 'red' }]}>
                        <Text style={{ color: colors.text }}>{differenceInDays}</Text>
                    </View>
                );
            } else if (differenceInDays < 0) {
                return (
                    <View style={[styles.circle, { backgroundColor: colors.border }]}>
                        <Text style={{ color: colors.text }}>{differenceInDays * -1}</Text>
                    </View>
                );
            }
        }
    }
    return (
        <TouchableOpacity
            style={[styles.root, { backgroundColor: colors.primary }, { borderColor: colors.border }, { borderWidth: 1 }]}
            onPress={goto}
            disabled={editChore}
        >
            <Text style={[{ color: colors.text }]}>{chore.name}</Text>
            {setIconLastDone(chore, avatarIdList, editChore)}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    root: {
        height: 50,
        borderRadius: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'space-between'
    },
    circle: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        height: 30,
        width: 30
    },
    icon: {
        justifyContent: 'center'
    }
});
