import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { Text, useTheme } from 'react-native-paper';
import { Chore, ChoreScore } from '../../data/data';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { choreStyles } from '../../style/choreDetailStyle';
import { modalStyles } from '../../style/modalStyle';
import { LayoutChoice } from './popupLayoutChoice';

interface Props {
    chore?: Chore;
    modalCase: string;
    isShowing: boolean;
    toggleModal: (toggle: boolean) => void;
}

export function CreateChoreModal({ modalCase, isShowing, toggleModal, chore }: Props) {
    const [userInput, onUserInputChange] = useState('');
    const currentHousehold = useAppSelector((state) => state.household.householdList.find((h) => h.id === state.household.currentHouseholdId));
    const [userSecondaryInput, onUserSecondaryInputChange] = useState('');
    const [recurringPressed, onRecurringPressedChange] = useState(false);
    const [chosenDay, setChosenDay] = useState(Number);
    const [valuePressed, onValuePressedChange] = useState(false);
    const layoutChoices = LayoutChoice(modalCase);
    const { colors } = useTheme();
    const iconColor = colors.text;
    const days = new Array(31).fill(null).map((_, i) => i + 1);
    const values: ChoreScore[] = [1, 2, 4, 6, 8];
    const dispatch = useAppDispatch();
    const [chosenValue, setChosenValue] = useState<ChoreScore>(1);
    const [choreName, onChoreNameChange] = useState(chore?.name);
    const [choreDesc, onChoreDescChange] = useState(chore?.description);
    const [choreDays, setChosenChoreDay] = useState(chore?.frequency);
    const [choreValue, setChosenChoreValue] = useState(chore?.score);

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
                                onChangeText={chore ? onChoreNameChange : onUserInputChange}
                                style={[modalStyles.titleTextStyle, { color: colors.text }]}
                                value={chore ? choreName : userInput}
                                placeholder={layoutChoices.modalPlaceholder}
                                placeholderTextColor={colors.grayedOutText}
                                selectionColor={iconColor}
                                editable={layoutChoices.modalInputActive}
                                multiline={true}
                            />
                        </View>
                        <View style={[{ backgroundColor: colors.popupOverlayColor }, modalStyles.choreDescStyle]}>
                            <TextInput
                                onChangeText={chore ? onChoreDescChange : onUserSecondaryInputChange}
                                style={[modalStyles.middleTextStyle, { color: colors.text }, { margin: 10 }]}
                                value={chore ? choreDesc : userSecondaryInput}
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
                                                chore ? setChosenChoreDay(day) : setChosenDay(day);
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
                                            <Text style={[choreStyles.frequencyNumberText, { color: colors.text }]}>
                                                {chore ? choreDays : chosenDay}
                                            </Text>
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
                                                chore ? setChosenChoreValue(value) : setChosenValue(value);
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
                                    <Text style={[choreStyles.energyText, { color: colors.text }]}>{chore ? choreValue : chosenValue}</Text>
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
                                    if (chore) {
                                        dispatch({
                                            type: 'EDIT_CHORE_IN_HOUSEHOLD',
                                            payload: {
                                                chore: {
                                                    id: chore.id,
                                                    name: choreName!,
                                                    description: choreDesc!,
                                                    frequency: choreValue!,
                                                    lastDone: chore.lastDone,
                                                    createdDate: chore.createdDate,
                                                    doneBy: chore.doneBy,
                                                    score: choreValue!,
                                                    signedToUserId: chore.signedToUserId
                                                },
                                                householdId: currentHousehold!.id
                                            }
                                        });
                                    } else {
                                        dispatch({
                                            type: 'CREATE_CHORE_IN_HOUSEHOLD',
                                            payload: {
                                                chore: {
                                                    name: userInput,
                                                    description: userSecondaryInput,
                                                    frequency: chosenDay,
                                                    score: chosenValue
                                                },
                                                householdId: currentHousehold!.id
                                            }
                                        });
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
