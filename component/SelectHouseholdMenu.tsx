import React from 'react';
import { Modal } from 'react-native';
import { RootStackScreenProps } from '../navigation/RootStackNavigator';

interface Props {
    isShowingMenu: boolean,
    toggleIsShowing: (toggleValue: boolean) => void,
    rootStackProps: RootStackScreenProps<'Household'>,
}

export default function SelectHouseholdMenu({ isShowingMenu, toggleIsShowing, rootStackProps }: Props) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isShowingMenu}
        >
        </Modal>
    );
}