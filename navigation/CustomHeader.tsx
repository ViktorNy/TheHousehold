import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import React, { useState } from 'react';
import { View } from 'react-native';
import { ChoresSlider } from '../component/choreComponent/ChoresSlider';
import { CustomPopupBox } from '../component/customPopupBox/CustomPopupBox';
import HouseholdModal from '../component/customPopupBox/HouseholdModal';
import HamburgerMenu from '../component/HamburgerMenu';
import { ProfileHeader } from '../component/ProfileHeader';
import SelectHouseholdMenu from '../component/SelectHouseholdMenu';
import { User } from '../data/data';
import { getAllHouseholdsByUserIdSelector } from '../store/household/householdSelectors';
import { useAppSelector } from '../store/store';

export default function CustomHeader(props: MaterialTopTabBarProps) {
    const currentRoute = props.state.routes[props.state.index];
    const nextRoute = props.state.routes[props.state.index + 1];
    const previousRoute = props.state.routes[props.state.index - 1];
    const { options } = props.descriptors[currentRoute.key];

    const label = options.tabBarLabel || options.title || currentRoute.name;

    const user = useAppSelector((state) => state.user.user) as User;
    const currentHousehold = useAppSelector((state) => state.household.householdList.find((h) => h.id === state.household.currentHouseholdId));
    const allHouseholdsConnectedToUser = useAppSelector((state) => getAllHouseholdsByUserIdSelector(state, user.id));
    const allMemberInfoOnUser = useAppSelector((state) => state.member.memberList.filter((m) => m.userId === user.id));
    const userMemberInfo = useAppSelector((state) =>
        state.member.memberList.find((m) => m.userId === user.id && m.householdId === currentHousehold?.id)
    );

    const [modalCase, setModalCase] = useState('JH');
    const [isShowingModal, setIsShowingModal] = useState(false);
    const [isShowingHouseholdModal, setIsShowingHouseholdModal] = useState(false);
    const [isShowModalCaseModal, setIsShowMoadCaseModal] = useState(false);

    const toggleModalAndSetModalCase = (toggle: boolean, modalCase?: string) => {
        setIsShowMoadCaseModal(toggle);
        modalCase ? setModalCase(modalCase) : setModalCase('JH');
    };

    // useEffect(() => {
    //     navigation.setOptions({ title: chore?.name });
    // }, []);

    return (
        <View>
            <HamburgerMenu
                isShowingMenu={isShowingModal}
                toggleIsShowing={setIsShowingModal}
                rootStackProps={props}
                currentHousehold={currentHousehold}
                currentMember={userMemberInfo}
                toggleExternalModal={toggleModalAndSetModalCase}
            />
            <SelectHouseholdMenu
                isShowingMenu={isShowingHouseholdModal}
                toggleIsShowing={setIsShowingHouseholdModal}
                rootStackProps={props}
                householdList={allHouseholdsConnectedToUser}
                user={user}
                memberList={allMemberInfoOnUser}
                isHouseholdSelected={!!currentHousehold}
                toggleExternalModal={toggleModalAndSetModalCase}
            />
            <ProfileHeader
                household={currentHousehold}
                userInformation={{ user: user, member: userMemberInfo }}
                openMainMenu={setIsShowingModal}
                openHouseholdMenu={setIsShowingHouseholdModal}
            />
            <ChoresSlider
                label={label}
                headline={'Sysslor'}
                onLeftPress={() => props.navigation.navigate(previousRoute.name, { userId: user.id })}
                onRightPress={() => props.navigation.navigate(nextRoute.name, { userId: user.id })}
            />
            {/* eslint-disable-next-line multiline-ternary */}
            {modalCase !== 'CH' && modalCase !== 'JH' ? (
                <CustomPopupBox
                    memberId={userMemberInfo?.id}
                    modalCase={modalCase}
                    isShowing={isShowModalCaseModal}
                    toggleModal={toggleModalAndSetModalCase}
                />
            ) : (
                <HouseholdModal
                    memberId={userMemberInfo?.id}
                    modalCase={modalCase}
                    isShowing={isShowModalCaseModal}
                    toggleModal={toggleModalAndSetModalCase}
                    navigationTo={() => props.navigation.navigate('Household')}
                />
            )}
        </View>
    );
}
