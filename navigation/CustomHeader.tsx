import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import React, { useState } from 'react';
import { View } from 'react-native';
import { ChoresSlider } from '../component/choreComponent/ChoresSlider';
import { CustomPopupBox } from '../component/customPopupBox/CustomPopupBox';
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

    const user = useAppSelector(state => state.user.user) as User;
    const currentHousehold = useAppSelector(state => state.household.currentHousehold);
    const allHouseholdsConnectedToUser = useAppSelector((state) => getAllHouseholdsByUserIdSelector(state, user.id));
    const allMemberInfoOnUser = useAppSelector((state) => state.member.memberList.filter(m => m.userId === user.id));
    const userMemberInfo = useAppSelector((state) =>
        state.member.memberList.find((m) => m.userId === user.id && m.householdId === currentHousehold?.id)
    );

    const [isShowingModal, setIsShowingModal] = useState(false);
    const [isShowingHouseholdModal, setIsShowingHouseholdModal] = useState(false);
    const [isShowJoinHouseholdModal, setIsShowJoinHouseholdModal] = useState(false);

    return (
        <View>
            <HamburgerMenu
                isShowingMenu={isShowingModal}
                toggleIsShowing={setIsShowingModal}
                rootStackProps={props}
                householdID={currentHousehold?.id}
                currentMember={userMemberInfo}
            />
            <SelectHouseholdMenu
                isShowingMenu={isShowingHouseholdModal}
                toggleIsShowing={setIsShowingHouseholdModal}
                rootStackProps={props}
                householdList={allHouseholdsConnectedToUser}
                user={user}
                memberList={allMemberInfoOnUser}
                isHouseholdSelected={!!currentHousehold}
                toggleExternalModal={setIsShowJoinHouseholdModal}
            />
            <ProfileHeader household={currentHousehold} userInformation={{ user: user, member: userMemberInfo }} openMainMenu={setIsShowingModal} openHouseholdMenu={setIsShowingHouseholdModal} />
            <ChoresSlider
                label={label}
                headline={'Sysslor'}
                onLeftPress={() => props.navigation.navigate(previousRoute.name, { userId: user.id })}
                onRightPress={() => props.navigation.navigate(nextRoute.name, { userId: user.id })}
            />
            <CustomPopupBox modalCase={'CH'} isShowing={isShowJoinHouseholdModal} toggleModal={setIsShowJoinHouseholdModal} />
        </View>
    );
}
