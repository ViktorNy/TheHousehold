import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Menu } from 'react-native-paper';
import Avatar from '../component/Avatar';
import { CustomNavigateButton } from '../component/CustomNavigateButton';
import { mockAvatarData } from '../data/data';
import { RootStackScreenProps } from '../navigation/RootStackNavigator';
import { getChoreByIdSelector } from '../store/household/householdSelectors';
import { getMemberByIdSelector } from '../store/member/memberSelector';
import { useAppSelector } from '../store/store';
import { getUserByIdSelector } from '../store/user/userSelector';
import { choreStyles } from '../style/choreDetailStyle';

export default function ChoreDetailScreen({ navigation, route }: RootStackScreenProps<'ChoreDetail'>) {
    const [menuVisible, setMenuVisible] = useState(false);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const { colors } = useTheme();

    const chore = useAppSelector((state) => getChoreByIdSelector(state, route.params.choreId, route.params.householdId));

    useEffect(() => {
        navigation.setOptions({ title: chore?.name });
    }, []);

    const avatars = mockAvatarData;

    return (
        <View style={[{ backgroundColor: colors.background }, choreStyles.root]}>
            <View style={[{ width: '95%' }, { top: 0 }, { position: 'absolute' }]}>
                <Text style={[{ color: colors.text }, { margin: 5 }]}>Tilldelade</Text>
                <Menu
                    style={{ width: '95%' }}
                    visible={menuVisible}
                    onDismiss={closeMenu}
                    anchor={
                        <Button onPress={openMenu} style={[{ backgroundColor: colors.card }, { width: '100%' }, { borderRadius: 10 }]}>
                            {/* eslint-disable-next-line array-callback-return */}
                            {avatars.map((avatar) => {
                                const userId = chore?.signedToUserId.map((signed) => {
                                    return signed;
                                });
                                const activeMember = useAppSelector((state) => getMemberByIdSelector(state, userId!.toString()));
                                if (activeMember?.avatar === avatar.id) {
                                    return <Avatar key={avatar.id} avatarId={avatar.id} avatarSize={22} />;
                                }
                            })}
                        </Button>
                    }
                >
                    {/* eslint-disable-next-line array-callback-return */}
                    {avatars.map((avatar) => {
                        const userId = chore?.signedToUserId.map((signed) => {
                            return signed;
                        });

                        const activeMember = useAppSelector((state) => getMemberByIdSelector(state, userId!.toString()));
                        const memberName = useAppSelector((state) => getUserByIdSelector(state, activeMember?.userId));
                        if (activeMember?.avatar === avatar.id) {
                            return (
                                <View key={avatar.id} style={[{ flexDirection: 'row' }, { alignItems: 'center' }, { margin: 5 }]}>
                                    <Avatar key={avatar.id} avatarId={avatar.id} avatarSize={14} showCircle={true} />
                                    <Text style={{ marginLeft: 5 }}>{memberName?.username}</Text>
                                </View>
                            );
                        }
                    })}
                </Menu>
            </View>

            <Text
                style={[
                    {
                        color: colors.text,
                        backgroundColor: colors.card
                    },
                    choreStyles.descriptionContainer,
                    choreStyles.bottomMargin
                ]}
            >
                {chore?.description}
            </Text>

            <View style={[{ backgroundColor: colors.card }, choreStyles.frequencyContainer]}>
                <View style={choreStyles.middleContainer}>
                    <View>
                        <Text style={[{ color: colors.text }, choreStyles.recurrenceText]}>Återkommer: </Text>
                    </View>
                    <View style={choreStyles.innerContainer}>
                        <View>
                            <Text style={[{ color: colors.text }]}> var </Text>
                        </View>
                        <View style={choreStyles.freqNrContainer}>
                            <Text style={choreStyles.frequencyNumberText}>{chore?.frequency}</Text>
                        </View>
                        <View>
                            <Text style={[{ color: colors.text }]}> dag </Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={[{ backgroundColor: colors.card }, choreStyles.energyContainer]}>
                <View style={choreStyles.columnStyle}>
                    <Text style={[{ color: colors.text }, choreStyles.text]}>Värde: </Text>
                    <Text style={[choreStyles.valueDescription]}>Hur energikrävande är sysslan?</Text>
                </View>
                <View style={choreStyles.energyNrContainer}>
                    <Text style={choreStyles.energyText}>{chore?.frequency}</Text>
                </View>
            </View>
            <View style={choreStyles.buttonContainer}>
                <CustomNavigateButton goto={() => navigation.goBack()} buttonText="Klar" />
            </View>
        </View>
    );
}
