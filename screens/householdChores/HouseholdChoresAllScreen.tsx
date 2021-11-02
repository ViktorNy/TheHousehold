import { CompositeScreenProps } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import RenderChores from '../../component/choreComponent/RenderChores';
import { CustomEditButton } from '../../component/CustomEditButton';
import { CustomPlusButton } from '../../component/CustomPlusButton';
import { CustomWideButton } from '../../component/CustomWideButton';
import { HouseholdChoresTabScreenProx } from '../../navigation/HouseholdChoresTabNavigator';
import { RootStackScreenProps } from '../../navigation/RootStackNavigator';
import { useAppSelector } from '../../store/store';

type Props = CompositeScreenProps<HouseholdChoresTabScreenProx<'HouseholdChoresAll'>, RootStackScreenProps>;

export default function HouseholdChoresAllScreen(props: Props) {
    const { colors } = useTheme();
    const currentHousehold = useAppSelector((state) => state.household.householdList.find(h => h.id === state.household.currentHouseholdId));
    const memberList = useAppSelector((state) => state.member.memberList.filter((m) => m.householdId === currentHousehold?.id));

    const [toggleEdit, setToggleEdit] = useState<boolean>(false);

    if (currentHousehold) {
        return (
            <View style={styles.root}>
                {/* TODO: route and navigation may be pased as props to RenderChores -> ChoreButton */}
                {/* TODO: For more view in choreSlider, only rename label for those screens */}
                <RenderChores prop={props} label={'All'} currentHousehold={currentHousehold} members={memberList} editChore={toggleEdit} />
                {!toggleEdit && (
                    <View style={[styles.buttons, { justifyContent: 'space-between' }]}>
                        <CustomPlusButton goto={() => console.log('Lägg till en syssla')} buttonText={'Lägg till'} />
                        <CustomEditButton goto={() => setToggleEdit(!toggleEdit)} buttonText={'Ändra'} />
                    </View>
                )}
                {toggleEdit && (
                    <View style={[styles.buttons, { justifyContent: 'center' }]}>
                        <CustomWideButton goto={() => setToggleEdit(!toggleEdit)} buttonText={'Avbryt'} />
                        {/* <CustomNavigateButton goto={() => setToggleEdit(!toggleEdit)} buttonText={'Avbryt'} /> */}
                    </View>
                )}
            </View>
        );
    } else {
        return (
            <View>
                <Text style={[{ color: colors.text }]}>Något gick fel! Inget hushåll hittades.</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        height: '100%'
    },
    buttons: {
        width: '100%',
        position: 'absolute',
        padding: 10,
        bottom: 5,
        alignItems: 'center',
        flexDirection: 'row'
    }
});
