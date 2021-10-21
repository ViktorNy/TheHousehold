import React, { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';

export function CustomPopupBox() {
    const [modalVisible, setModalVisible] = useState(false);
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.headerStyle}>
                <Text style={styles.headerTextStyle}>Gå med i hushåll</Text>
              </View>
              <View style={styles.inputInfoStyle}>
                <Text style={styles.middleTextStyle}>Hushållskod</Text>
              </View>
              <View style={styles.rowStyle}>
              <Pressable
                style={[styles.buttonLeft, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
              <AntDesign name="pluscircleo" size={24} color="black" />
              <Text style={styles.textStyle}>  Gå med</Text>
              </Pressable>
              <Pressable
                style={[styles.buttonRight, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
              <AntDesign name="closecircleo" size={24} color="black" />
              <Text style={styles.textStyle}>  Avbryt</Text>
              </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <Pressable                                    //för att visa modalen, endast i testsyften
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
        </Pressable>
      </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "#F2F2F2",
      borderRadius: 20,
      height: '28%',
      width: '90%',
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 20,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        marginLeft: 0,
        elevation: 2
      },
    buttonLeft: {
      borderBottomLeftRadius: 20,
      flexDirection: 'row',
      width: '50%',
      elevation: 2,
      justifyContent: "center",
      alignItems: "center",
      overflow: 'hidden'
    },
    buttonRight: {
        borderBottomRightRadius: 20,
        flexDirection: 'row',
        width: '50%',
        elevation: 5,
        justifyContent: "center",
        alignItems: "center",
        overflow: 'hidden'
      },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#FFF",
    },
    textStyle: {
      color: "black",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 20
    },
    headerTextStyle: {
      color: "black",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 24
    },
    modalText: {
      justifyContent: 'center',
      textAlign: "center"
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
    middleTextStyle: {
        color: "gray",
        textAlign: "left",
        marginLeft: 20,
        fontSize: 20
    }
  });