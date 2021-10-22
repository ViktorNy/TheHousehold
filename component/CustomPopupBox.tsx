import Modal from 'react-native-modal';
import React, { useState } from 'react';
import { LayoutChoice } from './LayoutChoice';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, Text, Pressable, View, TextInput, Appearance } from 'react-native';

interface Props {
  id: string
  modalCase: string
}

export function CustomPopupBox({id, modalCase}: Props) {
    const [modalVisible, setModalVisible] = useState(true);
    const [userInput, onUserInputChange] = useState('');
    const layoutChoices = LayoutChoice(modalCase, id)
    const { colors } = useTheme();
    const iconColor = colors.text

    return (
      <View>
        <Modal
          animationIn='fadeIn'
          backdropColor='#303030'
          coverScreen={true}
          isVisible={modalVisible}
          statusBarTranslucent={true}
          onBackButtonPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={[styles.modalView, { backgroundColor: colors.background }, styles.centeredView]}>
              <View style={[styles.headerStyle, { backgroundColor: colors.primary }, styles.centeredView]}>
                <Text style={[ styles.textStyle, styles.headerTextStyle, { color: colors.text } ]}>{layoutChoices.modalTitle}</Text>
              </View>
              <View style={[{ backgroundColor: colors.primary}, styles.inputInfoStyle]}>
                <TextInput 
                onChangeText={onUserInputChange}
                style={[styles.middleTextStyle, {color: colors.text}]}
                value={userInput}
                placeholder={layoutChoices.modalPlaceholder}
                placeholderTextColor={colors.notification}
                selectionColor={iconColor}
                editable={layoutChoices.modalInputActive}
                multiline={true}
                />
              </View>
              <View style={[styles.rowStyle, { backgroundColor: colors.primary }]}>
              <Pressable
                style={[styles.rowStyle, styles.button, { backgroundColor: colors.primary }, styles.centeredView]}
                onPress={() => setModalVisible(!modalVisible)}
              >
              <AntDesign name='pluscircleo' size={24} color={iconColor} />
              <Text style={[styles.textStyle, { color: colors.text }]}>  {layoutChoices.ModalLeft}</Text>
              </Pressable>
              <Pressable
                style={[styles.rowStyle, styles.button, styles.buttonRightStyle, { backgroundColor: colors.primary }, styles.centeredView]}
                onPress={() => setModalVisible(!modalVisible)}
              >
              <AntDesign name='closecircleo' size={24} color={iconColor} />
              <Text style={[styles.textStyle, { color: colors.text }]}>  {layoutChoices.modalRight}</Text>
              </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
  );
};

const styles = StyleSheet.create({
    centeredView: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    textStyle: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalView: {
      height: '55%',
      width: '100%',
      maxWidth: 380,
      maxHeight: 240,
      borderRadius: 20,
      overflow: 'hidden',
    },
    headerStyle: {
      elevation: 2,
      width: '100%',
      height: '30%',
    },
    headerTextStyle: {
      fontSize: 24,
    },
    inputInfoStyle: {
      margin: '4%',
      elevation: 5,
      height: '28%',
      minWidth: '93%',
      borderRadius: 10,
      justifyContent: 'center',
    },
    middleTextStyle: {
      fontSize: 20,
      marginLeft: 20,
    },
    rowStyle: {
      height: '30%',
      flexDirection: 'row',
    },
    button: {
      elevation: 2,
      width: '50%',
      height: '100%',
    },
    buttonRightStyle: {
      elevation: 5,
    },
});