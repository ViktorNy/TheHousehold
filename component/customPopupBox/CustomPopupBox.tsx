import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { Member, mockAvatarData, User } from '../../data/data';
import { getMemberByIdSelector, getMembersOfHouseholdSelector } from '../../store/member/memberSelector';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { modalStyles } from '../../style/modalStyle';
import Avatar from '../Avatar';
import { LayoutChoice } from './popupLayoutChoice';
import { useTheme } from 'react-native-paper';
import uuid from 'react-native-uuid';
import deepcopy from 'ts-deepcopy';

interface Props {
    memberId?: string
    modalCase: string
    isShowing: boolean
    toggleModal: (toggle: boolean, modalCase?: string) => void
}

export function CustomPopupBox({ memberId, modalCase, isShowing, toggleModal }: Props) {
    const user = useAppSelector(state => state.user.user) as User;
    const allHouseHolds = useAppSelector(state => state.household.householdList);
    const currentHousehold = useAppSelector(state => state.household.currentHousehold);
    const [userInput, onUserInputChange] = useState('');
    const layoutChoices = LayoutChoice(modalCase, memberId);
    const { colors } = useTheme();
    const iconColor = colors.text;
    let memberObject: Member | undefined;
    const avatarArray = mockAvatarData;
    const activeMember = useAppSelector((state) => getMemberByIdSelector(state, memberId));
    const allMembersOfCurrentHousehold: Member[] = useAppSelector((state) => getMembersOfHouseholdSelector(state, activeMember?.householdId));

    // Kolla om det finns ett snyggare sätt för if-satsen - Nils
    const [currentlyChosenAvatar, setCurrentlyChosenAvatar] = useState(() => {
        if (memberId) return memberId;
        else return '';
    });

    const onAvatarPress = (avatar: string) => {
        setCurrentlyChosenAvatar(avatar);
    };

    const dispatch = useAppDispatch();

    if (layoutChoices.avatar === true) {
        return (
            <View>
                <Modal
                    animationIn="fadeIn"
                    backdropColor="#181818"
                    coverScreen={true}
                    isVisible={isShowing}
                    statusBarTranslucent={true}
                    onBackButtonPress={() => {
                        toggleModal(false);
                    }
                    }
                    style={modalStyles.avatarContainerPosition}
                >
                    <View style={modalStyles.avatarContainerPosition}>
                        <View style={[modalStyles.modalView, { backgroundColor: colors.popupBackground }, modalStyles.centeredView]}>
                            <View style={[modalStyles.headerStyle, { backgroundColor: colors.popupOverlayColor }, modalStyles.centeredView]}>
                                <Text style={[modalStyles.textStyle, modalStyles.headerTextStyle, { color: colors.text }]}>
                                    {layoutChoices.modalTitle}
                                </Text>
                            </View>
                            <View style={modalStyles.avatarContainerStyle}>
                                {avatarArray.map(
                                    (avatar) => (
                                        // eslint-disable-next-line no-sequences
                                        (memberObject = allMembersOfCurrentHousehold.find((member) => member.avatar === avatar.id)),
                                        (
                                            <TouchableOpacity
                                                disabled={avatar.id === memberObject?.avatar && avatar.id !== activeMember?.avatar}
                                                key={avatar.id}
                                                onPress={() => onAvatarPress(avatar.id)}
                                                style={[
                                                    avatar.id === memberObject?.avatar && avatar.id !== activeMember?.avatar
                                                        ? modalStyles.avatarOpacity
                                                        : {},
                                                    currentlyChosenAvatar === avatar.id ? modalStyles.chosenAvatar : {},
                                                    modalStyles.avatarStyle,
                                                    {
                                                        backgroundColor: avatar?.backgroundColor,
                                                        borderColor: colors.avatarOutline
                                                    }
                                                ]}
                                            >
                                                <Avatar avatarId={avatar.id} avatarSize={32} showCircle={false} />
                                            </TouchableOpacity>
                                        )
                                    )
                                )}
                            </View>
                        </View>
                    </View>
                </Modal>
            </View >
        );
    } else {
        return (
            <View>
                <Modal
                    animationIn="fadeIn"
                    backdropColor="#181818"
                    coverScreen={true}
                    isVisible={isShowing}
                    statusBarTranslucent={true}
                    onBackButtonPress={() => {
                        toggleModal(false);
                    }
                    }
                >
                    <View style={modalStyles.centeredView}>
                        <View style={[modalStyles.modalView, { backgroundColor: colors.popupBackground }, modalStyles.centeredView]}>
                            <View style={[modalStyles.headerStyle, { backgroundColor: colors.popupOverlayColor }, modalStyles.centeredView]}>
                                <Text style={[modalStyles.textStyle, modalStyles.headerTextStyle, { color: colors.text }]}>
                                    {layoutChoices.modalTitle}
                                </Text>
                            </View>
                            <View style={[{ backgroundColor: colors.popupOverlayColor }, modalStyles.inputInfoStyle]}>
                                <TextInput
                                    onChangeText={onUserInputChange}
                                    style={[modalStyles.middleTextStyle, { color: colors.text }]}
                                    value={userInput}
                                    placeholder={layoutChoices.modalPlaceholder}
                                    placeholderTextColor={colors.grayedOutText}
                                    selectionColor={iconColor}
                                    editable={layoutChoices.modalInputActive}
                                    multiline={true}
                                />
                            </View>
                            <View style={[modalStyles.rowStyle, { backgroundColor: colors.popupOverlayColor }]}>
                                <Pressable
                                    style={[
                                        modalStyles.rowStyle,
                                        modalStyles.button,
                                        { backgroundColor: colors.popupOverlayColor },
                                        modalStyles.centeredView
                                    ]}
                                    onPress={() => {
                                        toggleModal(false);
                                        switch (modalCase) {
                                        case 'CH':
                                            // eslint-disable-next-line no-case-declarations
                                            const newHouseholdId = uuid.v4().toString();
                                            dispatch({ type: 'CREATE_HOUSEHOLD', payload: { householdName: userInput, householdId: newHouseholdId } });
                                            dispatch({ type: 'CREATE_MEMBER', payload: { householdId: newHouseholdId, memberName: user.username, userId: user.id, memberType: 'owner' } });
                                            break;
                                        case 'CHN':
                                            if (userInput && currentHousehold) {
                                                const newHousehold = deepcopy(currentHousehold);
                                                newHousehold.name = userInput;
                                                dispatch({ type: 'EDIT_HOUSEHOLD', payload: newHousehold });
                                            }
                                            break;
                                        case 'JH':
                                            if (userInput) {
                                                const householdToJoid = deepcopy(allHouseHolds.find(h => h.codeToJoin === userInput));
                                                if (householdToJoid) {
                                                    dispatch({ type: 'CREATE_MEMBER', payload: { householdId: householdToJoid.id, memberName: user.username, userId: user.id, memberType: 'member' } });
                                                }
                                            }
                                            break;
                                        default:
                                            break;
                                        }
                                    }}
                                >
                                    <AntDesign name="pluscircleo" size={24} color={iconColor} />
                                    <Text style={[modalStyles.textStyle, { color: colors.text }]}> {layoutChoices.ModalLeft}</Text>
                                </Pressable>
                                <Pressable
                                    style={[
                                        modalStyles.rowStyle,
                                        modalStyles.button,
                                        modalStyles.buttonRightStyle,
                                        { backgroundColor: colors.popupOverlayColor },
                                        modalStyles.centeredView
                                    ]}
                                    onPress={() => toggleModal(false)}
                                >
                                    <AntDesign name="closecircleo" size={24} color={iconColor} />
                                    <Text style={[modalStyles.textStyle, { color: colors.text }]}> {layoutChoices.modalRight}</Text>
                                </Pressable>
                            </View >
                        </View >
                    </View >
                </Modal >
            </View >
        );
    }
}
