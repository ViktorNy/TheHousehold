import { StyleSheet } from 'react-native';

export const modalStyles = StyleSheet.create({
    centeredView: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalView: {
        height: '55%',
        width: '100%',
        maxWidth: 380,
        maxHeight: 240,
        borderRadius: 20,
        overflow: 'hidden'
    },
    headerStyle: {
        elevation: 2,
        width: '100%',
        height: '30%'
    },
    headerTextStyle: {
        fontSize: 24
    },
    inputInfoStyle: {
        margin: '4%',
        elevation: 5,
        height: '28%',
        minWidth: '93%',
        borderRadius: 10,
        justifyContent: 'center'
    },
    middleTextStyle: {
        fontSize: 20,
        marginLeft: 20
    },
    rowStyle: {
        height: '30%',
        flexDirection: 'row'
    },
    button: {
        elevation: 2,
        width: '50%',
        height: '100%'
    },
    buttonRightStyle: {
        elevation: 5
    },
    avatarContainerStyle: {
        flexDirection: 'row',
        height: '70%',
        width: '100%',
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: 'center'
    },
    avatarStyle: {
        padding: 5,
        width: '20%',
        alignItems: 'center'
    },
    avatarContainerPosition: {
        alignContent: 'flex-end',
        justifyContent: 'flex-end'
    }
});