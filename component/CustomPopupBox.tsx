import React, { useState } from 'react';
import { StyleSheet, Text, Pressable, View, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { useAppSelector } from '../store/store';
import { getAllUsersSelector } from '../store/user/userSelector';
import { useTheme } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

let modalTitle = '';
let ModalLeft = '';
let modalRight = '';
let modalPlaceholder = '';

interface Props{
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
            <View style={[styles.modalView, { backgroundColor: colors.card }]}>
              <View style={[styles.headerStyle, { backgroundColor: colors.primary }]}>
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
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={() => setModalVisible(!modalVisible)}
              >
              <AntDesign name='pluscircleo' size={24} color={iconColor} />
              <Text style={[styles.textStyle, { color: colors.text }]}>  {ModalLeft}</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonRightStyle, { backgroundColor: colors.primary }]}
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
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      borderRadius: 20,
      minHeight: 210,
      height: '28%',
      width: '100%',
      alignItems: 'center',
      elevation: 20,
    },
    rowStyle: {
        flexDirection: 'row',
        overflow: 'hidden',
        width: '100%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        height: '30%',
    },
    button: {
      flexDirection: 'row',
      width: '50%',
      elevation: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonRightStyle: {
        elevation: 5,
    },
    textStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 20
    },
    middleTextStyle: {
        textAlign: 'left',
        marginLeft: 20,
        fontSize: 20
    },
    inputInfoStyle: {
      margin: 15,
      borderRadius: 10,
      height: '30%',
      width: '90%',
      elevation: 5,
      justifyContent: 'center',
    },
    headerTextStyle: {
      fontSize: 24
    },
    headerStyle: {
      width: '100%',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      height: '30%',
      elevation: 2,
    },
});