import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { Member, mockAvatarData } from '../../data/data';
import { getMemberByIdSelector, getMembersOfHouseholdSelector } from '../../store/member/memberSelector';
import { useAppSelector } from '../../store/store';
import { modalStyles } from '../../style/modalStyle';
import Avatar from '../Avatar';
import { ColorGetter } from '../themeColorGetter';
import { LayoutChoice } from './popupLayoutChoice';

interface Props {
    memberId: string;
    modalCase: string;
}

export function CustomPopupBox({ memberId, modalCase }: Props) {
    const [modalVisible, setModalVisible] = useState(true);
    const [userInput, onUserInputChange] = useState('');
    const layoutChoices = LayoutChoice(modalCase, memberId);

    const avatarArray = mockAvatarData;

    // 1. Hitta rätt member
    const member = useAppSelector((state) => getMemberByIdSelector(state, memberId));

    // 2. Hitta alla andra members i det hushållet
    const members: Member[] = useAppSelector((state) => getMembersOfHouseholdSelector(state, member!.householdId));

    // 3. Kolla om "vår" member redan har en avatar och välj den i så fall
    const [chosenAvatar, setChosenAvatar] = useState(() => {
        if (memberId) {
            return memberId;
        } else {
            return '';
        }
    });

    let memberObject; // håll ett öga på den här

    const pressedAvatar = (avatar: string) => {
        setChosenAvatar(avatar);
    };

    const colors = ColorGetter();
    const iconColor = colors.text;

    if (layoutChoices.avatar === true) {
        return (
            <View>
                <Modal
                    animationIn="fadeIn"
                    backdropColor="#181818"
                    coverScreen={true}
                    isVisible={modalVisible}
                    statusBarTranslucent={true}
                    onBackButtonPress={() => {
                        setModalVisible(false);
                    }}
                    style={modalStyles.avatarContainerPosition}
                >
                    <View style={modalStyles.avatarContainerPosition}>
                        <View
                            style={[
                                modalStyles.modalView,
                                { backgroundColor: colors.popupBackground },
                                modalStyles.centeredView
                            ]}
                        >
                            <View
                                style={[
                                    modalStyles.headerStyle,
                                    { backgroundColor: colors.popupOverlayColor },
                                    modalStyles.centeredView
                                ]}
                            >
                                <Text
                                    style={[modalStyles.textStyle, modalStyles.headerTextStyle, { color: colors.text }]}
                                >
                                    {layoutChoices.modalTitle}
                                </Text>
                            </View>
                            <View style={modalStyles.avatarContainerStyle}>
                                {avatarArray.map(
                                    (avatar) => (
                                        // eslint-disable-next-line no-sequences
                                        (memberObject = members.find((a) => a.avatar === avatar.id)),
                                        (
                                            <TouchableOpacity
                                                disabled={avatar.id === memberObject?.avatar}
                                                key={avatar.id}
                                                onPress={() => pressedAvatar(avatar.id)}
                                                style={[
                                                    chosenAvatar === avatar.id ? modalStyles.chosenAvatar : {},
                                                    avatar.id === memberObject?.avatar ? modalStyles.avatarOpacity : {},
                                                    modalStyles.avatarStyle,
                                                    { backgroundColor: avatar?.backgroundColor }
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
            </View>
        );
    } else {
        return (
            <View>
                <Modal
                    animationIn="fadeIn"
                    backdropColor="#181818"
                    coverScreen={true}
                    isVisible={modalVisible}
                    statusBarTranslucent={true}
                    onBackButtonPress={() => {
                        setModalVisible(false);
                    }}
                >
                    <View style={modalStyles.centeredView}>
                        <View
                            style={[
                                modalStyles.modalView,
                                { backgroundColor: colors.popupBackground },
                                modalStyles.centeredView
                            ]}
                        >
                            <View
                                style={[
                                    modalStyles.headerStyle,
                                    { backgroundColor: colors.popupOverlayColor },
                                    modalStyles.centeredView
                                ]}
                            >
                                <Text
                                    style={[modalStyles.textStyle, modalStyles.headerTextStyle, { color: colors.text }]}
                                >
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
                                    onPress={() => setModalVisible(false)}
                                >
                                    <AntDesign name="pluscircleo" size={24} color={iconColor} />
                                    <Text style={[modalStyles.textStyle, { color: colors.text }]}>
                                        {' '}
                                        {layoutChoices.ModalLeft}
                                    </Text>
                                </Pressable>
                                <Pressable
                                    style={[
                                        modalStyles.rowStyle,
                                        modalStyles.button,
                                        modalStyles.buttonRightStyle,
                                        { backgroundColor: colors.popupOverlayColor },
                                        modalStyles.centeredView
                                    ]}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <AntDesign name="closecircleo" size={24} color={iconColor} />
                                    <Text style={[modalStyles.textStyle, { color: colors.text }]}>
                                        {' '}
                                        {layoutChoices.modalRight}
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
