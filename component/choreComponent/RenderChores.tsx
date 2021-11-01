import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { CompositeScreenProps, useTheme } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { Chore, Household, Member, User } from '../../data/data';
import { ParamList } from '../../navigation/ChoresTabNavigator';
import { RootStackScreenProps } from '../../navigation/RootStackNavigator';
import { useAppSelector } from '../../store/store';
import { ChoreButton } from './ChoreButton';
import { labelCaseChoreSlider } from './ChoresSlider';
import displayChore from './displayChore';

interface Props {
    prop: CompositeScreenProps<MaterialTopTabScreenProps<ParamList, keyof ParamList>, RootStackScreenProps>;
    userHousehold?: Household[];
    currentHousehold?: Household;
    members: Member[];
    label: labelCaseChoreSlider;
}

export default function RenderChores({ prop, userHousehold, currentHousehold, members, label }: Props) {
    const { colors } = useTheme();
    const user = useAppSelector(state => state.user.user) as User;
    // const userHousehold = useAppSelector((state) => getAllHouseholdsByUserIdSelector(state, prop.route.params.userId));
    // const currentHousehold = useAppSelector((state) =>
    //     state.household.householdList.find((h) => h.id === prop.route.params.householdId)
    // );

    function getAvatarIdList(chore: Chore) {
        const result: string[] = [];
        for (const db of chore.doneBy) {
            const member = members.find((m) => m.id === db.memberId);
            if (member && db.date === moment(new Date()).format('YYYY-MM-DD')) {
                if (!result.find((r) => r === member.avatar)) {
                    result.push(member.avatar);
                }
            }
        }
        return result;
    }

    // const members = useAppSelector((state) => state.member.memberList);

    if (currentHousehold) {
        const houseHoldChores = currentHousehold.chores.filter((item) =>
            item.signedToUserId.filter((item) => item === user.id)
        );

        return (
            <View>
                <Text style={[{ color: colors.text }]}>{currentHousehold.name}</Text>
                <FlatList
                    data={houseHoldChores}
                    renderItem={({ item }) => (
                        <ChoreButton
                            key={item.id}
                            chore={item}
                            avatarIdList={getAvatarIdList(item)}
                            goto={() =>
                                prop.navigation.navigate('ChoreDetail', {
                                    choreId: item.id,
                                    householdId: currentHousehold.id
                                })
                            }
                        />
                    )}
                />
            </View>
        );
    } else {
        return (
            <View>
                <FlatList
                    data={userHousehold}
                    renderItem={({ item }) => (
                        <View>
                            <Text style={[{ color: colors.text }]}>{item.name}</Text>

                            {item.chores.map((chore) => {
                                if (displayChore(label, chore)) {
                                    return (
                                        <ChoreButton
                                            key={chore.id}
                                            chore={chore}
                                            avatarIdList={getAvatarIdList(chore)}
                                            goto={
                                                () => {
                                                    prop.navigation.navigate('ChoreDetail', {
                                                        choreId: chore.id,
                                                        householdId: item.id
                                                    });
                                                }
                                            }
                                        />
                                    );
                                } else return null;
                            })}
                        </View>
                    )}
                />
            </View>
        );
    }
}