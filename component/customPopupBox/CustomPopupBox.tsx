import Modal from 'react-native-modal';
import React, { useState } from 'react';
import { LayoutChoice } from './popupLayoutChoice';
import { AntDesign } from '@expo/vector-icons';
import { Text, Pressable, View, TextInput, useColorScheme, FlatList, Touchable, TouchableOpacity } from 'react-native';
import { DarkCustomTheme, DefaultCustomTheme } from "../../style/theme";
import { modalStyles } from '../../style/modalStyle';
import { mockAvatarData } from '../../data/data';
import Avatar from '../Avatar';

interface Props {
  id: string
  modalCase: string
}

export function CustomPopupBox({ id, modalCase }: Props) {
    const [modalVisible, setModalVisible] = useState(true);
    const [userInput, onUserInputChange] = useState('');
    const layoutChoices = LayoutChoice(modalCase, id)
    const colorScheme = useColorScheme();
    const theme = (colorScheme === 'dark') ? DarkCustomTheme : DefaultCustomTheme;
    const colors = theme.colors;
    const iconColor = colors.text;
    const avatarArray = mockAvatarData

  if (layoutChoices.avatar === true) {
    return (
      <View>
        <Modal
          animationIn='fadeIn'
          backdropColor='#181818'
          coverScreen={true}
          isVisible={modalVisible}
          statusBarTranslucent={true}
          onBackButtonPress={() => {
            setModalVisible(false);
          }}
          style={modalStyles.avatarContainerPosition}
          >
          <View style={modalStyles.avatarContainerPosition}>
            <View style={[modalStyles.modalView, { backgroundColor: colors.popupBackground }, modalStyles.centeredView]}>
              <View style={[modalStyles.headerStyle, { backgroundColor: colors.popupOverlayColor }, modalStyles.centeredView]}>
                <Text style={[ modalStyles.textStyle, modalStyles.headerTextStyle, { color: colors.text } ]}>{layoutChoices.modalTitle}</Text>
              </View>
              <View style={modalStyles.avatarContainerStyle}>
              {avatarArray.map((avatar) => (
                <TouchableOpacity style={modalStyles.avatarStyle}>
                  <Avatar avatarId={avatar.id} showCircle={true} avatarSize={32} />
                </TouchableOpacity>
              ))}
              </View>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
  else {
    return (
      <View>
        <Modal
          animationIn='fadeIn'
          backdropColor='#181818'
          coverScreen={true}
          isVisible={modalVisible}
          statusBarTranslucent={true}
          onBackButtonPress={() => {
            setModalVisible(false);
          }}>
          <View style={modalStyles.centeredView}>
            <View style={[modalStyles.modalView, { backgroundColor: colors.popupBackground }, modalStyles.centeredView]}>
              <View style={[modalStyles.headerStyle, { backgroundColor: colors.popupOverlayColor }, modalStyles.centeredView]}>
                <Text style={[ modalStyles.textStyle, modalStyles.headerTextStyle, { color: colors.text } ]}>{layoutChoices.modalTitle}</Text>
              </View>
              <View style={[{ backgroundColor: colors.popupOverlayColor}, modalStyles.inputInfoStyle]}>
                <TextInput 
                onChangeText={onUserInputChange}
                style={[modalStyles.middleTextStyle, {color: colors.text}]}
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
                style={[modalStyles.rowStyle, modalStyles.button, { backgroundColor: colors.popupOverlayColor }, modalStyles.centeredView]}
                onPress={() => setModalVisible(false)}
              >
              <AntDesign name='pluscircleo' size={24} color={iconColor} />
              <Text style={[modalStyles.textStyle, { color: colors.text }]}>  {layoutChoices.ModalLeft}</Text>
              </Pressable>
              <Pressable
                style={[modalStyles.rowStyle, modalStyles.button, modalStyles.buttonRightStyle, { backgroundColor: colors.popupOverlayColor }, modalStyles.centeredView]}
                onPress={() => setModalVisible(false)}
              >
              <AntDesign name='closecircleo' size={24} color={iconColor} />
              <Text style={[modalStyles.textStyle, { color: colors.text }]}>  {layoutChoices.modalRight}</Text>
              </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
};