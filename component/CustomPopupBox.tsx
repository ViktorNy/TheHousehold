import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

export function CustomPopupBox() {
    const [modalVisible, setModalVisible] = useState(false);
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <View style={styles.rowStyle}>
              <Pressable
                style={[styles.buttonLeft, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Accept</Text>
              </Pressable>
              <Pressable
                style={[styles.buttonRight, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Reject</Text>
              </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Show Modal</Text>
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
      backgroundColor: "white",
      borderRadius: 20,
      padding:55,
      height: '30%',
      width: '90%',
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        marginLeft: 0,
        elevation: 2
      },
    buttonLeft: {
      borderBottomLeftRadius: 20,
      borderColor: 'gray',
      borderWidth: 1,
      padding: 10,
      width: '71%',
      marginLeft: 0,
      elevation: 2,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonRight: {
        borderBottomRightRadius: 20,
        borderColor: 'gray',
        borderWidth: 1,
        flexDirection: 'row',
        padding: 10,
        width: '71%',
        marginLeft: 0,
        elevation: 2,
        justifyContent: "center",
        alignItems: "center",
      },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    rowStyle: {
        flexDirection: 'row',
        marginTop: 95
    }
  });