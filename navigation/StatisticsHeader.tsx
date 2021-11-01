import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import React from 'react';
import { View } from 'react-native';
import { StatisticsSlider } from '../component/pieChartComponents/StatisticsSlider';

export default function StatisticsHeader(props: MaterialTopTabBarProps) {
    const currentRoute = props.state.routes[props.state.index];
    const nextRoute = props.state.routes[props.state.index + 1];
    const previousRoute = props.state.routes[props.state.index - 1];
    const { options } = props.descriptors[currentRoute.key];

    const label = options.tabBarLabel || options.title || currentRoute.name;

    // const [isShowingModal, setIsShowingModal] = useState(false);
    return (
        <View>
            <StatisticsSlider
                label={label}
                headline={'Sysslor'}
                onLeftPress={() => props.navigation.navigate(previousRoute.name)}
                onRightPress={() => props.navigation.navigate(nextRoute.name)}
            />
        </View>
    );
}