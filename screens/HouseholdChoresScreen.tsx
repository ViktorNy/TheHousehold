import { useTheme } from 'react-native-paper';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import RenderChores from '../component/choreComponent/RenderChores';
import { RootStackScreenProps } from '../navigation/RootStackNavigator';
import { useAppSelector } from '../store/store';

export default function HouseholdChoresScreen({ navigation, route }: RootStackScreenProps<'HouseholdChores'>) {
    const { colors } = useTheme();
    const currentHousehold = useAppSelector((state) => state.household.currentHousehold);
    const memberList = useAppSelector((state) => state.member.memberList.filter((m) => m.householdId === currentHousehold?.id));

    const [toggleEdit, setToggleEdit] = useState<boolean>(false);

    console.log('toggleEdit: ' + toggleEdit);

    if (currentHousehold) {
        return (
            <View>
                {/* TODO: route and navigation may be pased as props to RenderChores -> ChoreButton */}
                {/* TODO: For more view in choreSlider, only rename label for those screens */}
                <RenderChores label={'All'} currentHousehold={currentHousehold} members={memberList} editChore={toggleEdit} />
                {!toggleEdit && (
                    <View>
                        <TouchableOpacity onPress={() => console.log('Lägg till en syssla')}>
                            <Text>Lägg till</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setToggleEdit(!toggleEdit)}>
                            <Text>Ändra</Text>
                        </TouchableOpacity>
                    </View>
                )}
                {toggleEdit && (
                    <View>
                        <TouchableOpacity onPress={() => setToggleEdit(!toggleEdit)}>
                            <Text>Avbryt</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    }
    return (
        <View>
            <Text style={[{ color: colors.text }]}>Något gick fel! Inget hushåll hittades.</Text>
        </View>
    );
}
