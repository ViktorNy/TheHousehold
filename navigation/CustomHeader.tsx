import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import React from 'react';
import { View } from 'react-native';
import { ChoresSlider } from '../component/choreComponent/ChoresSlider';
import { ProfileHeader } from '../component/ProfileHeader';
import { User } from '../data/data';

export default function CustomHeader(props: MaterialTopTabBarProps) {
    const currentRoute = props.state.routes[props.state.index];
    const nextRoute = props.state.routes[props.state.index + 1];
    const previousRoute = props.state.routes[props.state.index - 1];
    const { options } = props.descriptors[currentRoute.key];

    const label = options.tabBarLabel || options.title || currentRoute.name;

    return (
        <View>
            <ProfileHeader userInformation={{ user: {} as User }} openMenu={() => {}} />
            <ChoresSlider
                label={label}
                headline={'Sysslor'}
                onLeftPress={() => props.navigation.navigate(previousRoute.name)}
                onRightPress={() => props.navigation.navigate(nextRoute.name)}
            />
        </View>
    );
}
