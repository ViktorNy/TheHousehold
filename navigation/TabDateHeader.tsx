import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import React from 'react';
import { View } from 'react-native';
import { TabDateSlider } from '../component/pieChartComponents/TabDateSlider';

interface Props {
    props: MaterialTopTabBarProps;
    headline: string;
}

export default function StatisticsHeader(headerProps: Props) {
    const currentRoute = headerProps.props.state.routes[headerProps.props.state.index];
    const nextRoute = headerProps.props.state.routes[headerProps.props.state.index + 1];
    const previousRoute = headerProps.props.state.routes[headerProps.props.state.index - 1];
    const { options } = headerProps.props.descriptors[currentRoute.key];

    const label = options.tabBarLabel || options.title || currentRoute.name;

    // const [isShowingModal, setIsShowingModal] = useState(false);
    return (
        <View>
            <TabDateSlider
                label={label}
                headline={headerProps.headline}
                onLeftPress={() => headerProps.props.navigation.navigate(previousRoute.name)}
                onRightPress={() => headerProps.props.navigation.navigate(nextRoute.name)}
            />
        </View>
    );
}