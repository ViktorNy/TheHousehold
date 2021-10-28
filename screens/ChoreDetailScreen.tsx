import { Text, View, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { RootStackScreenProps } from '../navigation/RootStackNavigator';
import { useAppSelector } from '../store/store';
import { getChoreByIdSelector } from '../store/household/householdSelectors';
import { useTheme } from '@react-navigation/native';
import { CustomNavigateButton } from '../component/CustomNavigateButton';

export default function ChoreDetailScreen({ navigation, route }: RootStackScreenProps<'ChoreDetail'>) {
    const { colors } = useTheme();
    const chore = useAppSelector((state) => getChoreByIdSelector(state, route.params.choreId, route.params.householdId));

    // Update page title to chore name
    useEffect(() => {
        navigation.setOptions({ title: chore?.name });
    }, []);

    return (
        <View style={[{ backgroundColor: colors.border }, styles.root]}>
            <Text
                style={[
                    {
                        color: colors.text,
                        backgroundColor: colors.background
                    },
                    styles.descriptionContainer,
                    styles.bottomMargin
                ]}
            >
                {chore?.description}
            </Text>

            <View style={[{ backgroundColor: colors.background }, styles.frequencyContainer]}>
                <View style={styles.testContainer}>
                    <View>
                        <Text style={[{ color: colors.text }, styles.testText]}>Återkommer: </Text>
                    </View>
                    <View>
                        <Text style={[{ color: colors.text }]}> var </Text>
                    </View>
                    <View style={styles.freqNrContainer}>
                        <Text style={styles.frequencyNumberText}>{chore?.frequency}</Text>
                    </View>
                    <View>
                        <Text style={[{ color: colors.text }, styles.dayPadding]}> dag </Text>
                    </View>
                </View>
            </View>

            <View style={[{ backgroundColor: colors.background }, styles.energyContainer]}>
                <View style={styles.columnStyle}>
                    <Text style={[{ color: colors.text }, styles.text]}>Värde: </Text>
                    <Text style={[styles.valueDescription]}>Hur energikrävande är sysslan?</Text>
                </View>
                <View style={styles.energyNrContainer}>
                    <Text style={[{ color: colors.text }, styles.energyText]}>{chore?.frequency}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    testContainer: {
        width: '95%',
        borderRadius: 10,
        margin: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        elevation: 20,
        alignContent: 'center',
        alignItems: 'center'
    },
    testText: {
        margin: 5,
        fontSize: 20,
        fontWeight: 'bold',
        paddingRight: '41%'
    },
    descriptionContainer: {
        width: '95%',
        height: '20%',
        borderRadius: 10,
        padding: 5,
        elevation: 20,
        fontSize: 20
    },
    frequencyContainer: {
        width: '95%',
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'baseline',
        flexDirection: 'row',
        elevation: 20,
        marginBottom: 15
    },
    energyContainer: {
        width: '95%',
        borderRadius: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        elevation: 20,
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
        fontSize: 20
    },
    freqNrContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        borderRadius: 100,
        backgroundColor: 'red',
        width: 30,
        height: 30
    },
    energyText: {
        fontSize: 15
    },
    energyNrContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        marginRight: 15,
        alignSelf: 'center',
        padding: 4,
        borderRadius: 100,
        backgroundColor: 'red',
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
    dayPadding: {
        paddingRight: 10
    }
});
