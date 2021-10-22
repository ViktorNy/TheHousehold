import { StyleSheet, Text, Pressable, View, TextInput } from 'react-native';
import { getAllUsersSelector } from '../store/user/userSelector';
import { useTheme } from '@react-navigation/native';
import { useAppSelector } from '../store/store';
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import Modal from 'react-native-modal';

let modalTitle = '';
let ModalLeft = '';
let modalRight = '';
let modalPlaceholder = '';

interface Props {
  id: string
  modalCase: string
}

export function CustomPopupBox({modalCase, id}: Props) {
    const [modalVisible, setModalVisible] = useState(true);
    const [userInput, onUserInputChange] = useState('');

    const allUsers = useAppSelector(getAllUsersSelector);
    const username = allUsers.find(u => u.id === id)?.username;

    const { colors } = useTheme();
    const iconColor = colors.text

    if (modalCase === 'JH') {
      modalTitle = 'Gå med i Hushåll'
      ModalLeft = 'Gå med'
      modalRight = 'Avbryt'
      modalPlaceholder = 'Hushållskod'
    } 
    else if (modalCase === 'CH') {
      modalTitle = 'Skapa Hushåll'
      ModalLeft = 'Skapa'
      modalRight = 'Avbryt'
      modalPlaceholder = 'Namn'
    }
    else if (modalCase === 'MO') {
      modalTitle = 'Gör till ägare'
      ModalLeft = 'Acceptera'
      modalRight = 'Avbryt'
      modalPlaceholder = 'Gör ' + username + ' till ägare'
    }
    else if (modalCase === 'RUFH') {
      modalTitle = 'Ta bort från hushåll'
      ModalLeft = 'Ja'
      modalRight = 'Avbryt'
      modalPlaceholder = 'Vill du verkligen ta bort' + username + '?'
    }
    else if (modalCase === 'AR') {
      modalTitle = 'Besvara förfrågan'
      ModalLeft = 'Acceptera'
      modalRight = 'Avslå'
      modalPlaceholder = username + ' vill gå med'
    }

    return (
      <View>
        <Modal
          animationIn='fadeIn'
          coverScreen={true}
          isVisible={modalVisible}
          statusBarTranslucent={true}
          onBackButtonPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={[styles.modalView, { backgroundColor: colors.card }, styles.centeredView]}>
              <View style={[styles.headerStyle, { backgroundColor: colors.primary }, styles.centeredView]}>
                <Text style={[ styles.textStyle, styles.headerTextStyle, { color: colors.text } ]}>{modalTitle}</Text>
              </View>
              <View style={[{ backgroundColor: colors.primary}, styles.inputInfoStyle]}>
                <TextInput 
                onChangeText={onUserInputChange}
                style={[styles.middleTextStyle, {color: colors.text}]}
                value={userInput}
                placeholder={modalPlaceholder}
                placeholderTextColor={colors.notification}
                selectionColor={iconColor}
                />
              </View>
              <View style={[styles.rowStyle, { backgroundColor: colors.primary }]}>
              <Pressable
                style={[styles.rowStyle, styles.button, { backgroundColor: colors.primary }, styles.centeredView]}
                onPress={() => setModalVisible(!modalVisible)}
              >
              <AntDesign name='pluscircleo' size={24} color={iconColor} />
              <Text style={[styles.textStyle, { color: colors.text }]}>  {ModalLeft}</Text>
              </Pressable>
              <Pressable
                style={[styles.rowStyle, styles.button, styles.buttonRightStyle, { backgroundColor: colors.primary }, styles.centeredView]}
                onPress={() => setModalVisible(!modalVisible)}
              >
              <AntDesign name='closecircleo' size={24} color={iconColor} />
              <Text style={[styles.textStyle, { color: colors.text }]}>  {modalRight}</Text>
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
      elevation: 20,
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