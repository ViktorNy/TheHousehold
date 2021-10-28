import { useTheme } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { CustomNavigateButton } from '../component/CustomNavigateButton';
import { RootStackScreenProps } from '../navigation/RootStackNavigator';
import { getChoreByIdSelector } from '../store/household/householdSelectors';
import { useAppSelector } from '../store/store';
import { choreStyles } from '../style/choreDetailStyle';

export default function ChoreDetailScreen({ navigation, route }: RootStackScreenProps<'ChoreDetail'>) {
    const { colors } = useTheme();
    const chore = useAppSelector((state) => getChoreByIdSelector(state, route.params.choreId, route.params.householdId));

    useEffect(() => {
        navigation.setOptions({ title: chore?.name });
    }, []);

    return (
        <View style={[{ backgroundColor: colors.background }, choreStyles.root]}>
            <Text
                style={[
                    {
                        color: colors.text,
                        backgroundColor: colors.card
                    },
                    choreStyles.descriptionContainer,
                    choreStyles.bottomMargin
                ]}
            >
                {chore?.description}
            </Text>

            <View style={[{ backgroundColor: colors.card }, choreStyles.frequencyContainer]}>
                <View style={choreStyles.middleContainer}>
                    <View>
                        <Text style={[{ color: colors.text }, choreStyles.recurrenceText]}>Återkommer: </Text>
                    </View>
                    <View style={choreStyles.innerContainer}>
                        <View>
                            <Text style={[{ color: colors.text }]}> var </Text>
                        </View>
                        <View style={choreStyles.freqNrContainer}>
                            <Text style={choreStyles.frequencyNumberText}>{chore?.frequency}</Text>
                        </View>
                        <View>
                            <Text style={[{ color: colors.text }]}> dag </Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={[{ backgroundColor: colors.card }, choreStyles.energyContainer]}>
                <View style={choreStyles.columnStyle}>
                    <Text style={[{ color: colors.text }, choreStyles.text]}>Värde: </Text>
                    <Text style={[choreStyles.valueDescription]}>Hur energikrävande är sysslan?</Text>
                </View>
                <View style={choreStyles.energyNrContainer}>
                    <Text style={[{ color: colors.text }, choreStyles.energyText]}>{chore?.frequency}</Text>
                </View>
            </View>
            <View style={choreStyles.buttonContainer}>
                <CustomNavigateButton goto={() => navigation.goBack()} buttonText='Klar' />
            </View>
        </View>
    );
}
