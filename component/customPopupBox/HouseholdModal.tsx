/* eslint-disable indent */
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';
import { useTheme } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { modalStyles } from '../../style/modalStyle';
import { LayoutChoice } from './popupLayoutChoice';
import uuid from 'react-native-uuid';
import { User } from '../../data/data';
import deepcopy from 'ts-deepcopy';

interface Props {
    memberId?: string;
    modalCase: string;
    isShowing: boolean;
    toggleModal: (toggle: boolean) => void;
    navigationTo?: () => void;
}

export default function HouseholdModal({ memberId, modalCase, isShowing, toggleModal, navigationTo }: Props) {
    const [userInput, onUserInputChange] = useState('');
    const [secondaryUserInput, onSecondaryUserInputChange] = useState('');
    const layoutChoices = LayoutChoice(modalCase, memberId);
    const { colors } = useTheme();
    const iconColor = colors.text;
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user.user) as User;
    const allHouseHolds = useAppSelector((state) => state.household.householdList);

    const fieldsAreEmpty = () => {
        if (!userInput || !secondaryUserInput) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <View>
            <Modal
                animationIn="fadeIn"
                backdropColor="#181818"
                coverScreen={true}
                avoidKeyboard={true}
                deviceHeight={10000}
                isVisible={isShowing}
                statusBarTranslucent={true}
                onBackButtonPress={() => {
                    onUserInputChange('');
                    onSecondaryUserInputChange('');
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
                                onPress={() => {
                                    onUserInputChange('');
                                    onSecondaryUserInputChange('');
                                    toggleModal(false);
                                    switch (modalCase) {
                                        case 'CH':
                                            // eslint-disable-next-line no-case-declarations
                                            if (fieldsAreEmpty()) {
                                                Alert.alert('Vänligen fyll i alla fält och försök igen!');
                                            } else {
                                                const newHouseholdId = uuid.v4().toString();
                                                dispatch({
                                                    type: 'CREATE_HOUSEHOLD',
                                                    payload: { householdName: userInput, householdId: newHouseholdId }
                                                });
                                                dispatch({
                                                    type: 'CREATE_MEMBER',
                                                    payload: {
                                                        householdId: newHouseholdId,
                                                        memberName: secondaryUserInput,
                                                        userId: user.id,
                                                        memberType: 'owner'
                                                    }
                                                });
                                                dispatch({
                                                    type: 'SETHOUSEHOLD',
                                                    payload: newHouseholdId
                                                });
                                                navigationTo!();
                                            }
                                            break;
                                        case 'JH':
                                            if (userInput) {
                                                const householdToJoin = deepcopy(allHouseHolds.find((h) => h.codeToJoin === userInput));
                                                if (householdToJoin) {
                                                    dispatch({
                                                        type: 'CREATE_MEMBER',
                                                        payload: {
                                                            householdId: householdToJoin.id,
                                                            memberName: secondaryUserInput,
                                                            userId: user.id,
                                                            memberType: 'member'
                                                        }
                                                    });
                                                    dispatch({
                                                        type: 'SETHOUSEHOLD',
                                                        payload: householdToJoin.id
                                                    });
                                                    navigationTo!();
                                                }
                                            }
                                            break;
                                        default:
                                            break;
                                    }
                                }}
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
                                onPress={() => {
                                    onUserInputChange('');
                                    onSecondaryUserInputChange('');
                                    toggleModal(false);
                                }}
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
