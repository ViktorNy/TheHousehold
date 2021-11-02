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
        margin: '2%',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 100
    },
    avatarContainerPosition: {
        alignContent: 'flex-end',
        justifyContent: 'flex-end'
    },
    chosenAvatar: {
        borderWidth: 2,
        borderRadius: 100,
        opacity: 1
    },
    avatarOpacity: {
        opacity: 0.15
    },
    choreContainer: {
        flexDirection: 'row',
        height: 500,
        width: '100%',
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: 'center'
    },
    choreStyle: {
        margin: '2%',
        width: '95%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 10
    },
    choreDescStyle: {
        width: '95%',
        height: 150,
        borderRadius: 10,
        marginBottom: 15
    },
    choreContainerPosition: {
        alignContent: 'flex-end',
        justifyContent: 'flex-end'
    },
    choreHeaderStyle: {
        elevation: 2,
        width: '100%',
        height: '12%'
    },
    choreRowStyle: {
        height: '12%',
        flexDirection: 'row'
    },
    middleContainer: {
        borderRadius: 10,
        height: 30,
        width: 30,
        margin: 5,
        marginTop: 13,
        marginBottom: 13,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    valueContainer: {
        borderRadius: 10,
        height: 30,
        width: 30,
        margin: 5,
        marginTop: 13,
        marginBottom: 13,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }
});
