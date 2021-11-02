import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';
import { useTheme } from 'react-native-paper';
import { modalStyles } from '../../style/modalStyle';
import { LayoutChoice } from './popupLayoutChoice';

interface Props {
    memberId?: string;
    modalCase: string;
    isShowing: boolean;
    toggleModal: (toggle: boolean) => void;
}

export default function HouseholdModal({ memberId, modalCase, isShowing, toggleModal }: Props) {
    const [userInput, onUserInputChange] = useState('');
    const [secondaryUserInput, onSecondaryUserInputChange] = useState('');
    const layoutChoices = LayoutChoice(modalCase, memberId);
    const { colors } = useTheme();
    const iconColor = colors.text;

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
                }}
            >
                <View style={modalStyles.centeredView}>
                    <View style={[modalStyles.modalHouseholdView, { backgroundColor: colors.popupBackground }, modalStyles.centeredView]}>
                        <View style={[modalStyles.headerHouseholdStyle, { backgroundColor: colors.popupOverlayColor }, modalStyles.centeredView]}>
                            <Text style={[modalStyles.textStyle, modalStyles.headerTextStyle, { color: colors.text }]}>
                                {layoutChoices.modalTitle}
                            </Text>
                        </View>
                        <View style={[{ backgroundColor: colors.popupOverlayColor }, modalStyles.inputInfoHouseholdStyle]}>
                            <TextInput
                                onChangeText={onUserInputChange}
                                style={[modalStyles.middleTextStyle, { color: colors.text }]}
                                value={userInput}
                                placeholder={layoutChoices.modalPlaceholder}
                                placeholderTextColor={colors.grayedOutText}
                                selectionColor={iconColor}
                                editable={layoutChoices.modalInputActive}
                            />
                        </View>
                        <View style={[{ backgroundColor: colors.popupOverlayColor }, modalStyles.inputInfoHouseholdStyle]}>
                            <TextInput
                                onChangeText={onSecondaryUserInputChange}
                                style={[modalStyles.middleTextStyle, { color: colors.text }]}
                                value={secondaryUserInput}
                                placeholder={layoutChoices.modalSecondaryPlaceholder}
                                placeholderTextColor={colors.grayedOutText}
                                selectionColor={iconColor}
                                editable={layoutChoices.modalInputActive}
                            />
                        </View>
                        <View style={[modalStyles.rowHouseholdStyle, { backgroundColor: colors.popupOverlayColor }]}>
                            <Pressable
                                style={[
                                    modalStyles.rowStyle,
                                    modalStyles.button,
                                    { backgroundColor: colors.popupOverlayColor },
                                    modalStyles.centeredView
                                ]}
                                onPress={() => toggleModal(false)}
                            >
                                <AntDesign name="pluscircleo" size={24} color={iconColor} />
                                <Text style={[modalStyles.textStyle, { color: colors.text }]}> {layoutChoices.modalLeft}</Text>
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
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}