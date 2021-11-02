import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { Text, useTheme } from 'react-native-paper';
import { choreStyles } from '../../style/choreDetailStyle';
import { modalStyles } from '../../style/modalStyle';
import { LayoutChoice } from './popupLayoutChoice';

interface Props {
    memberId: string;
    modalCase: string;
    isShowing: boolean;
    toggleModal: (toggle: boolean) => void;
}

export function CreateChoreModal({ memberId, modalCase, isShowing, toggleModal }: Props) {
    const [userInput, onUserInputChange] = useState('');
    const [userSecondaryInput, onUserSecondaryInputChange] = useState('');
    const [recurringPressed, onRecurringPressedChange] = useState(false);
    const [chosenDay, setChosenDay] = useState(Number);
    const [valuePressed, onValuePressedChange] = useState(false);
    const [chosenValue, setChosenValue] = useState(Number);
    const layoutChoices = LayoutChoice(modalCase, memberId);
    const { colors } = useTheme();
    const iconColor = colors.text;
    const days = new Array(31).fill(null).map((_, i) => i + 1);
    const values = [1, 2, 4, 6, 8];

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
                <View style={modalStyles.choreContainer}>
                    <View
                        style={[
                            modalStyles.choreContainer,
                            { backgroundColor: colors.popupBackground },
                            modalStyles.centeredView,
                            { borderRadius: 20 },
                            { overflow: 'hidden' }
                        ]}
                    >
                        <View
                            style={[
                                modalStyles.choreHeaderStyle,
                                { backgroundColor: colors.popupOverlayColor },
                                modalStyles.centeredView,
                                { top: 0 },
                                { position: 'absolute' }
                            ]}
                        >
                            <Text style={[modalStyles.textStyle, modalStyles.headerTextStyle, { color: colors.text }]}>
                                {layoutChoices.modalTitle}
                            </Text>
                        </View>
                        <View style={[{ backgroundColor: colors.popupOverlayColor }, modalStyles.choreStyle]}>
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
                        <View style={[{ backgroundColor: colors.popupOverlayColor }, modalStyles.choreDescStyle]}>
                            <TextInput
                                onChangeText={onUserSecondaryInputChange}
                                style={[modalStyles.middleTextStyle, { color: colors.text }, { margin: 10 }]}
                                value={userSecondaryInput}
                                placeholder={layoutChoices.modalSecondaryPlaceholder}
                                placeholderTextColor={colors.grayedOutText}
                                selectionColor={iconColor}
                                editable={layoutChoices.modalInputActive}
                                multiline={true}
                            />
                        </View>
                        {/* eslint-disable-next-line multiline-ternary */}
                        {recurringPressed === true ? (
                            <View style={[{ backgroundColor: colors.popupOverlayColor }, choreStyles.frequencyContainer]}>
                                <ScrollView horizontal={true}>
                                    {days.map((day) => (
                                        <TouchableOpacity
                                            key={day}
                                            style={[
                                                { backgroundColor: colors.popupOverlayColor },
                                                modalStyles.middleContainer,
                                                { borderRadius: 100 },
                                                { backgroundColor: '#181818' }
                                            ]}
                                            onPress={() => {
                                                onRecurringPressedChange(!recurringPressed);
                                                setChosenDay(day);
                                            }}
                                        >
                                            <Text>{day}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        ) : (
                            <TouchableOpacity
                                style={[{ backgroundColor: colors.popupOverlayColor }, choreStyles.frequencyContainer]}
                                onPress={() => onRecurringPressedChange(!recurringPressed)}
                            >
                                <View style={choreStyles.middleContainer}>
                                    <View>
                                        <Text style={[{ color: colors.text }, choreStyles.recurrenceText]}>Återkommer: </Text>
                                    </View>
                                    <View style={choreStyles.innerContainer}>
                                        <View>
                                            <Text style={[{ color: colors.text }]}> var </Text>
                                        </View>
                                        <View style={choreStyles.freqNrContainer}>
                                            <Text style={[choreStyles.frequencyNumberText, { color: colors.text }]}>{chosenDay}</Text>
                                        </View>
                                        <View>
                                            <Text style={[{ color: colors.text }]}> dag </Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        {/* eslint-disable-next-line multiline-ternary */}
                        {valuePressed === true ? (
                            <View style={[{ backgroundColor: colors.popupOverlayColor }, choreStyles.frequencyContainer]}>
                                <ScrollView horizontal={true}>
                                    {values.map((value) => (
                                        <TouchableOpacity
                                            key={value}
                                            style={[
                                                { backgroundColor: colors.popupOverlayColor },
                                                modalStyles.valueContainer,
                                                { borderRadius: 100 },
                                                { backgroundColor: colors.border }
                                            ]}
                                            onPress={() => {
                                                onValuePressedChange(!valuePressed);
                                                setChosenValue(value);
                                            }}
                                        >
                                            <Text style={{ color: colors.text }}>{value}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        ) : (
                            <TouchableOpacity
                                style={[{ backgroundColor: colors.popupOverlayColor }, choreStyles.energyContainer]}
                                onPress={() => onValuePressedChange(!valuePressed)}
                            >
                                <View style={choreStyles.columnStyle}>
                                    <Text style={[{ color: colors.text }, choreStyles.text]}>Värde: </Text>
                                    <Text style={[choreStyles.valueDescription]}>Hur energikrävande är sysslan?</Text>
                                </View>
                                <View style={[choreStyles.energyNrContainer, { backgroundColor: colors.border }]}>
                                    <Text style={[choreStyles.energyText, { color: colors.text }]}>{chosenValue}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        <View style={choreStyles.buttonContainer}></View>
                        <View
                            style={[
                                modalStyles.choreRowStyle,
                                { backgroundColor: colors.popupOverlayColor },
                                { bottom: 0 },
                                { position: 'absolute' },
                                { width: '100%' }
                            ]}
                        >
                            <Pressable
                                style={[
                                    modalStyles.rowStyle,
                                    modalStyles.button,
                                    { backgroundColor: colors.popupOverlayColor },
                                    modalStyles.centeredView
                                ]}
                                onPress={() => {
                                    toggleModal(false);
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
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
