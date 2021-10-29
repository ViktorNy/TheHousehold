import { StyleSheet } from 'react-native';

export const choreStyles = StyleSheet.create({
    root: {
        height: '100%',
        alignItems: 'center'
    },
    middleContainer: {
        width: '95%',
        borderRadius: 10,
        margin: 10,
        marginLeft: -10,
        marginRight: -2,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    recurrenceText: {
        margin: 5,
        fontSize: 20,
        fontWeight: 'bold'
    },
    descriptionContainer: {
        width: '95%',
        height: '20%',
        borderRadius: 10,
        padding: 5,
        elevation: 10,
        fontSize: 20,
        marginTop: 90
    },
    frequencyContainer: {
        width: '95%',
        borderRadius: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        elevation: 5,
        marginBottom: 15
    },
    energyContainer: {
        width: '95%',
        borderRadius: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        elevation: 5,
        marginBottom: 15
    },
    text: {
        margin: 5,
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 4,
        paddingRight: 4,
        paddingLeft: 4
    },
    frequencyText: {
        margin: 5,
        fontSize: 20,
        padding: 4
    },
    frequencyNumberText: {
        fontSize: 15
    },
    freqNrContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        borderRadius: 100,
        backgroundColor: '#cd5d6f',
        width: 30,
        height: 30
    },
    energyText: {
        fontSize: 15,
        color: 'black'
    },
    energyNrContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        marginRight: 15,
        alignSelf: 'center',
        padding: 4,
        borderRadius: 100,
        backgroundColor: '#F2F2F2',
        width: 30,
        height: 30
    },
    bottomMargin: {
        marginBottom: 60
    },
    valueDescription: {
        fontSize: 12,
        color: 'grey',
        marginTop: -10,
        margin: 10
    },
    columnStyle: {
        justifyContent: 'center',
        flexDirection: 'column'
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonContainer: {
        margin: 10,
        width: '95%',
        borderRadius: 100,
        elevation: 5,
        bottom: 0,
        position: 'absolute'
    }
});
