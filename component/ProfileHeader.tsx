import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Household, Member, User } from '../data/data';
import Avatar from './Avatar';
import { useAppSelector } from '../store/store';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    household?: Household;
    userInformation?: {
        user: User;
        member?: Member;
    };
    visitMember?: {
        member?: Member;
        userName?: string;
    };
    openMainMenu?: (open: boolean) => void;
    openHouseholdMenu?: (open: boolean) => void;
    onGoBack?: () => void;
}

export function ProfileHeader({ household, userInformation, visitMember, openMainMenu, openHouseholdMenu, onGoBack }: Props) {
    const { colors } = useTheme();

    let done = 0;
    let score = 0;
    const user = useAppSelector((state) => state.user.user);
    const userMemberList = useAppSelector((state) => state.member.memberList.filter((m) => m.userId === user?.id));
    const householdList = useAppSelector((state) => state.household.householdList); // TODO: simplify

    function ShowProfile(household?: Household) {
        if (visitMember) {
            // visit another member profile
            // TODO: namn på member ?
            return (
                <TouchableOpacity style={styles.row} onPress={() => onGoBack!()}>
                    <Entypo name="arrow-long-left" size={20} color={colors.text} />
                    <Text style={[styles.title, { paddingLeft: 10, color: colors.text }]}>{visitMember.userName}</Text>
                </TouchableOpacity>
            );
        } else if (household) {
            // visit one of youre households
            return (
                <TouchableOpacity
                    style={styles.row}
                    onPress={() => {
                        openHouseholdMenu && openHouseholdMenu(true);
                    }}
                >
                    <Text style={[styles.title, { color: colors.text }]}>{household.name}</Text>
                    <Entypo name="chevron-small-down" size={24} color={colors.text} />
                </TouchableOpacity>
            );
        } else {
            // visit youre page "min sida"
            return (
                <TouchableOpacity
                    style={styles.row}
                    onPress={() => {
                        openHouseholdMenu && openHouseholdMenu(true);
                    }}
                >
                    <Text style={[styles.title, { color: colors.text }]}>Min sida</Text>
                    <Entypo name="chevron-small-down" size={24} color={colors.text} />
                </TouchableOpacity>
            );
        }
    }

    function DisplayScore(description: string, score?: number) {
        if (!score) score = 0;
        return (
            <View style={styles.score}>
                <View style={[styles.circle, { borderColor: colors.text }]}>
                    <Text style={{ color: colors.text }}>{score}</Text>
                </View>
                <Text style={{ color: colors.text }}>{description}</Text>
            </View>
        );
    }

    function DisplayUser({ household, userInformation, visitMember }: Props) {
        if (visitMember) {
            // visit another member profile
            for (const chore of household!.chores) {
                const choresDone = chore.doneBy.filter((db) => db.memberId === visitMember.member?.id).length;
                done += choresDone;
                score += choresDone * chore.score;
            }
            return (
                <View style={styles.user}>
                    <View style={[styles.circle]}>
                        {visitMember.member && <Avatar avatarId={visitMember.member.avatar} showCircle={true} avatarSize={22} />}
                    </View>
                    <Text style={{ color: colors.text }}>{visitMember.member?.memberType}</Text>
                </View>
            );
        } else if (household) {
            for (const chore of household.chores) {
                const choresDone = chore.doneBy.filter((db) => db.memberId === userInformation?.member?.id).length;
                done += choresDone;
                score += choresDone * chore.score;
            }
            // visit one of youre households
            return (
                <View style={styles.user}>
                    <View style={[styles.circle]}>
                        {userInformation?.member && <Avatar avatarId={userInformation.member.avatar} showCircle={true} avatarSize={22} />}
                    </View>
                    <Text style={{ color: colors.text }}>{userInformation?.member?.memberName}</Text>
                    <Text style={{ color: colors.text }}>{userInformation?.member?.memberType}</Text>
                </View>
            );
        } else {
            // visit youre page "min sida"
            for (const house of householdList) {
                const memberConnectedToHousehold = userMemberList.find((m) => m.householdId === house.id);
                for (const chore of house.chores) {
                    const choresDone = chore.doneBy.filter((db) => db.memberId === memberConnectedToHousehold?.id).length;
                    done += choresDone;
                    score += choresDone * chore.score;
                }
            }
            return (
                <View style={styles.user}>
                    <View style={[styles.circle, { borderColor: colors.text }]}>{/* <Text style={{ color: colors.text }}></Text> */}</View>
                    <Text style={{ color: colors.text }}>{userInformation?.user.username}</Text>
                </View>
            );
        }
    }

    return (
        <SafeAreaView>
            <View style={[styles.root, { backgroundColor: colors.primary }]}>
                {/* Row 1: household + menu */}
                <View style={[styles.row, styles.spaceBetween]}>
                    {ShowProfile(household)}
                    {!visitMember && (
                        <TouchableOpacity onPress={() => openMainMenu && openMainMenu(true)}>
                            <Entypo name="menu" size={24} color={colors.text} />
                        </TouchableOpacity>
                    )}
                </View>
                {/* Row 2: circles + text */}
                <View style={styles.rowTwo}>
                    {/*  */}
                    {DisplayUser({ userInformation, household, visitMember, openMainMenu: openMainMenu })}
                    <View style={{ alignItems: 'center' }}>
                        <View style={[styles.row, styles.spaceBetween]}>
                            {DisplayScore('Avklarade', done)}
                            {DisplayScore('Poäng', score)}
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: {
        padding: 10
    },
    row: {
        flexDirection: 'row'
    },
    spaceBetween: {
        justifyContent: 'space-between'
    },
    rowTwo: {
        // backgroundColor: "pink",
        justifyContent: 'space-between',
        paddingRight: 20,
        paddingTop: 5,
        flexDirection: 'row',
        width: '100%'
    },
    user: {
        alignItems: 'center'
    },
    score: {
        alignItems: 'center',
        paddingLeft: 10
    },
    circle: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        borderWidth: 1,
        height: 40,
        width: 40
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
