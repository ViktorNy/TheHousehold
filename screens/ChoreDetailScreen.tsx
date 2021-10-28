import { Text, View, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { RootStackScreenProps } from '../navigation/RootStackNavigator';
import { useAppSelector } from '../store/store';
import { getChoreByIdSelector } from '../store/household/householdSelectors';
import { useTheme } from '@react-navigation/native';

export default function ChoreDetailScreen({ navigation, route }: RootStackScreenProps<'ChoreDetail'>) {
    const { colors } = useTheme();
    const chore = useAppSelector((state) =>
        getChoreByIdSelector(state, route.params.choreId, route.params.householdId)
    );

    // Update page title to chore name
    useEffect(() => {
        navigation.setOptions({ title: chore?.name });
    }, []);

    return (
        <View style={[{ backgroundColor: colors.border }, styles.root]}>
            <Text
                style={[{
                    color: colors.text,
                    backgroundColor: colors.background
                },
                styles.descriptionContainer,
                styles.bottomMargin]}>
                {chore?.description}
            </Text>

            <View style={[{ backgroundColor: colors.background }, styles.frequencyContainer]}>
                <Text style={[{ color: colors.text }, styles.text]}>Återkommer: </Text>
                <Text style={[{ color: colors.text }, styles.frequencyText]}>var {chore?.frequency} dag</Text>
            </View>

            <View style={[{ backgroundColor: colors.background }, styles.frequencyContainer]}>
                <View style={styles.columnStyle}>
                    <Text style={[{ color: colors.text }, styles.text]}>Värde: </Text>
                    <Text style={[styles.valueDescription]}>Hur energikrävande är sysslan?</Text>
                </View>
                <Text style={[{ color: colors.text }, styles.frequencyText]}>var {chore?.frequency} dag</Text>
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
    descriptionContainer: {
        width: '95%',
        height: '20%',
        borderRadius: 5,
        padding: 5,
        elevation: 20,
        fontSize: 20
    },
    frequencyContainer: {
        width: '95%',
        borderRadius: 5,
        justifyContent: 'space-between',
        flexDirection: 'row',
        elevation: 20
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
    }
});