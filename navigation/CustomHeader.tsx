import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import React from 'react';
import { View } from 'react-native';
import { ChoresSlider } from '../component/choreComponent/ChoresSlider';
import { ProfileHeader } from '../component/ProfileHeader';
import { User } from '../data/data';

interface Props {
    newProps: MaterialTopTabBarProps,
    userId?: 'string'
}

export default function CustomHeader({ newProps, userId } : Props) {
    const currentRoute = newProps.state.routes[newProps.state.index];
    const nextRoute = newProps.state.routes[newProps.state.index + 1];
    const previousRoute = newProps.state.routes[newProps.state.index - 1];
    const { options } = newProps.descriptors[currentRoute.key];

    const label = options.tabBarLabel || options.title || currentRoute.name;

    // const [isShowingModal, setIsShowingModal] = useState(false);

    console.log('user id in custom header: ' + userId);

    return (
        <View>
            <ProfileHeader userInformation={{ user: {} as User }} openMenu={() => {}} />
            <ChoresSlider
                label={label}
                headline={'Sysslor'}
                onLeftPress={() => newProps.navigation.navigate(previousRoute.name)}
                onRightPress={() => newProps.navigation.navigate(nextRoute.name)}
            />
            {/* <HamburgerMenu
                isShowingMenu={isShowingModal}
                toggleIsShowing={setIsShowingModal}
                rootStackProps={{ navigation, route }}
                householdID={currentHousehold.id}
                currentMember={userMemberInfo}
            /> */}
        </View>
    );
}
