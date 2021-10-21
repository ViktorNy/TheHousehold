import React, { useState } from "react";
import { StyleSheet, Text, Pressable, View, TextInput, StatusBar } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Modal from "react-native-modal";








export function CustomPopupBox() {
    const [modalVisible, setModalVisible] = useState(true);
    let userText;
    let onUserTextChange;
    return (
      <View>
        <Modal
          animationIn="fadeIn"
          coverScreen={true}
          isVisible={modalVisible}
          statusBarTranslucent={true}
          onBackButtonPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.headerStyle}>
                <Text style={[ styles.textStyle, styles.headerTextStyle ]}>Gå med i hushåll</Text>
              </View>
              <View style={styles.inputInfoStyle}>
                <TextInput 
                onChangeText={onUserTextChange}
                style={styles.middleTextStyle}
                value={userText}
                placeholder='Hushållskod'
                />
              </View>
              <View style={styles.rowStyle}>
              <Pressable
                style={styles.button}
                onPress={() => setModalVisible(!modalVisible)}
              >
              <AntDesign name="pluscircleo" size={24} color="black" />
              <Text style={styles.textStyle}>  Gå med</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonRightStyle]}
                onPress={() => setModalVisible(!modalVisible)}
              >
              <AntDesign name="closecircleo" size={24} color="black" />
              <Text style={styles.textStyle}>  Avbryt</Text>
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
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      backgroundColor: "#F2F2F2",
      borderRadius: 20,
      minHeight: 210,
      height: '28%',
      width: '100%',
      alignItems: "center",
      elevation: 20,
    },
    button: {
      flexDirection: 'row',
      width: '50%',
      elevation: 2,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FFF"
    },
    buttonRightStyle: {
        elevation: 5,
    },
    textStyle: {
      color: "black",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 20
    },
    middleTextStyle: {
        color: "gray",
        textAlign: "left",
        marginLeft: 20,
        fontSize: 20
    },
    headerTextStyle: {
      fontSize: 24
    },
    headerStyle: {
      flexDirection: 'row',
      width: '100%',
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      height: '30%',
      elevation: 2,
    },
    rowStyle: {
        flexDirection: 'row',
        overflow: 'hidden',
        width: '100%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        height: '30%',
    },
    inputInfoStyle: {
      margin: 15,
      backgroundColor: "#FFF",
      borderRadius: 10,
      height: '30%',
      width: '90%',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      justifyContent: 'center',
    },
  });