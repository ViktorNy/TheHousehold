import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { mockAvatarData } from "../../data/data";
import { modalStyles } from "../../style/modalStyle";
import Avatar from "../Avatar";
import { ColorGetter } from "../themeColorGetter";
import { LayoutChoice } from "./popupLayoutChoice";

interface Props {
    id: string;
    modalCase: string;
}

export function CustomPopupBox({ id, modalCase }: Props) {
    const [modalVisible, setModalVisible] = useState(true);
    const [userInput, onUserInputChange] = useState("");
    const layoutChoices = LayoutChoice(modalCase, id);
    const avatarArray = mockAvatarData;

    const [chosenAvatar, setChosenAvatar] = useState("");

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
                                modalStyles.centeredView,
                            ]}
                        >
                            <View
                                style={[
                                    modalStyles.headerStyle,
                                    { backgroundColor: colors.popupOverlayColor },
                                    modalStyles.centeredView,
                                ]}
                            >
                                <Text
                                    style={[modalStyles.textStyle, modalStyles.headerTextStyle, { color: colors.text }]}
                                >
                                    {layoutChoices.modalTitle}
                                </Text>
                            </View>
                            <View style={modalStyles.avatarContainerStyle}>
                                {avatarArray.map((avatar) => (
                                    <TouchableOpacity
                                        key={avatar.id}
                                        onPress={() => pressedAvatar(avatar.id)}
                                        style={[
                                            chosenAvatar === avatar.id ? modalStyles.chosenAvatar : {},
                                            modalStyles.avatarStyle,
                                            { backgroundColor: avatar?.backgroundColor },
                                        ]}
                                    >
                                        <Avatar avatarId={avatar.id} avatarSize={32} showCircle={false} />
                                    </TouchableOpacity>
                                ))}
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
                                modalStyles.centeredView,
                            ]}
                        >
                            <View
                                style={[
                                    modalStyles.headerStyle,
                                    { backgroundColor: colors.popupOverlayColor },
                                    modalStyles.centeredView,
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
                                        modalStyles.centeredView,
                                    ]}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <AntDesign name="pluscircleo" size={24} color={iconColor} />
                                    <Text style={[modalStyles.textStyle, { color: colors.text }]}>
                                        {" "}
                                        {layoutChoices.ModalLeft}
                                    </Text>
                                </Pressable>
                                <Pressable
                                    style={[
                                        modalStyles.rowStyle,
                                        modalStyles.button,
                                        modalStyles.buttonRightStyle,
                                        { backgroundColor: colors.popupOverlayColor },
                                        modalStyles.centeredView,
                                    ]}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <AntDesign name="closecircleo" size={24} color={iconColor} />
                                    <Text style={[modalStyles.textStyle, { color: colors.text }]}>
                                        {" "}
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
