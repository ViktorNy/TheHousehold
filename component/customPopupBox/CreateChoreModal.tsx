import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';
import { Text, useTheme } from 'react-native-paper';
import { Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger } from 'react-native-popup-menu';
import { choreStyles } from '../../style/choreDetailStyle';
import { modalStyles } from '../../style/modalStyle';
import { LayoutChoice } from './popupLayoutChoice';
import ScrollingButtonMenu from 'react-native-scroll-menu';

interface Props {
    memberId: string;
    modalCase: string;
    isShowing: boolean;
    toggleModal: (toggle: boolean) => void;
}

export function CreateChoreModal({ memberId, modalCase, isShowing, toggleModal }: Props) {
    const [userInput, onUserInputChange] = useState('');
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
                <MenuProvider style={modalStyles.choreContainer}>
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
                                    onChangeText={onUserInputChange}
                                    style={[modalStyles.middleTextStyle, { color: colors.text }, { margin: 10 }]}
                                    value={userInput}
                                    placeholder={layoutChoices.modalSecondaryPlaceholder}
                                    placeholderTextColor={colors.grayedOutText}
                                    selectionColor={iconColor}
                                    editable={layoutChoices.modalInputActive}
                                    multiline={true}
                                />
                            </View>
                            <View style={{ width: '95%' }}>
                                <Menu
                                    style={[
                                        { backgroundColor: colors.popupOverlayColor },
                                        { width: '100%' },
                                        { borderRadius: 10 },
                                        { height: 60 },
                                        choreStyles.columnStyle
                                    ]}
                                    // eslint-disable-next-line no-undef
                                    onSelect={(value) => alert(`Selected number: ${value}`)}
                                >
                                    <MenuTrigger>
                                        <View style={[choreStyles.columnStyle, { marginLeft: 10 }]}>
                                            <Text style={[{ color: colors.text }, { fontSize: 24 }]}>Värde: </Text>
                                            <Text style={[choreStyles.valueDescription]}>Hur energikrävande är sysslan?</Text>
                                        </View>
                                    </MenuTrigger>
                                    <MenuOptions>
                                        <View style={{ width: 500 }}>
                                            <MenuOption value={2} style={{ width: 500 }}>
                                                <Text style={[{ color: 'red' }, { width: 500 }]}>Two</Text>
                                            </MenuOption>
                                        </View>
                                    </MenuOptions>
                                </Menu>
                            </View>
                            <View style={[{ width: '95%' }, { marginBottom: 30 }, choreStyles.columnStyle]}>
                                <ScrollingButtonMenu
                                    items={[
                                        {
                                            id: '1',
                                            name: 'Sekizli'
                                        },
                                        {
                                            id: '2',
                                            name: 'Penguen'
                                        },
                                        {
                                            id: '3',
                                            name: 'Ermec'
                                        },
                                        {
                                            id: '4',
                                            name: 'Emre'
                                        },
                                        {
                                            id: '5',
                                            name: 'Hasan'
                                        },
                                        {
                                            id: '6',
                                            name: 'Elif'
                                        },
                                        {
                                            id: '7',
                                            name: 'Vegin'
                                        },
                                        {
                                            id: '8',
                                            name: 'Sevim'
                                        }
                                    ]}
                                    onPress={(e) => {
                                        console.log(e);
                                    }}
                                    selected={7}
                                    activeColor={'red'}
                                />
                            </View>
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
                                    onPress={() => toggleModal(false)}
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
                </MenuProvider>
            </Modal>
        </View>
    );
}
