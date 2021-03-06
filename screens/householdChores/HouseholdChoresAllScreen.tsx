import { CompositeScreenProps } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import RenderChores from '../../component/choreComponent/RenderChores';
import { CustomEditButton } from '../../component/CustomEditButton';
import { CustomPlusButton } from '../../component/CustomPlusButton';
import { CreateChoreModal } from '../../component/customPopupBox/CreateChoreModal';
import { CustomWideButton } from '../../component/CustomWideButton';
import { HouseholdChoresTabScreenProx } from '../../navigation/HouseholdChoresTabNavigator';
import { RootStackScreenProps } from '../../navigation/RootStackNavigator';
import { useAppSelector } from '../../store/store';

type Props = CompositeScreenProps<HouseholdChoresTabScreenProx<'HouseholdChoresAll'>, RootStackScreenProps>;

export default function HouseholdChoresAllScreen(props: Props) {
    const { colors } = useTheme();
    const currentHousehold = useAppSelector((state) => state.household.householdList.find((h) => h.id === state.household.currentHouseholdId));
    const memberList = useAppSelector((state) => state.member.memberList.filter((m) => m.householdId === currentHousehold?.id));

    const user = useAppSelector((state) => state.user.user);
    const currentMember = memberList.find((m) => m.householdId === currentHousehold?.id && m.userId === user?.id);

    const [toggleEdit, setToggleEdit] = useState<boolean>(false);
    const [isShowingCreateModal, setIsShowingCreateModal] = useState(false);

    if (currentHousehold) {
        return (
            <View style={styles.root}>
                <RenderChores navigation={props} label={'All'} currentHousehold={currentHousehold} members={memberList} editChore={toggleEdit} />
                {!toggleEdit && currentMember?.memberType === 'owner' && (
                    <View style={[styles.buttons, { justifyContent: 'space-between' }]}>
                        <CustomPlusButton goto={() => setIsShowingCreateModal(!isShowingCreateModal)} buttonText={'L??gg till'} />
                        <CustomEditButton goto={() => setToggleEdit(!toggleEdit)} buttonText={'??ndra'} />
                    </View>
                )}
                {toggleEdit && (
                    <View style={[styles.buttons, { justifyContent: 'center' }]}>
                        <CustomWideButton goto={() => setToggleEdit(!toggleEdit)} buttonText={'Avbryt'} />
                    </View>
                )}
                <CreateChoreModal
                    modalCase={'CC'}
                    isShowing={isShowingCreateModal}
                    toggleModal={() => setIsShowingCreateModal(!isShowingCreateModal)}
                />
            </View>
        );
    } else {
        return (
            <View>
                <Text style={[{ color: colors.text }]}>N??got gick fel! Inget hush??ll hittades.</Text>
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
