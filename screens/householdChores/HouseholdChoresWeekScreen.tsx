import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import RenderChores from '../../component/choreComponent/RenderChores';
import { CustomEditButton } from '../../component/CustomEditButton';
import { CustomPlusButton } from '../../component/CustomPlusButton';
import { CustomWideButton } from '../../component/CustomWideButton';
import { RootStackScreenProps } from '../../navigation/RootStackNavigator';
import { getHouseholdByIdSelector } from '../../store/household/householdSelectors';
import { useAppSelector } from '../../store/store';

export default function HouseholdChoresWeekScreen({ navigation, route }: RootStackScreenProps<'HouseholdChores'>) {
    const { colors } = useTheme();
    const household = useAppSelector((state) => getHouseholdByIdSelector(state, route.params.householdId));
    const memberList = useAppSelector((state) => state.member.memberList.filter((m) => m.householdId === household?.id));

    const [toggleEdit, setToggleEdit] = useState<boolean>(false);

    console.log('toggleEdit: ' + toggleEdit);
    if (household) {
        return (
            <View style={styles.root}>
                {/* TODO: route and navigation may be pased as props to RenderChores -> ChoreButton */}
                {/* TODO: For more view in choreSlider, only rename label for those screens */}
                <RenderChores label={'Week'} currentHousehold={household} members={memberList} editChore={toggleEdit} />
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
