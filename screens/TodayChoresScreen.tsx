import { CompositeScreenProps } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import RenderChores from '../component/choreComponent/RenderChores';
import { ChoreTabScreenProps } from '../navigation/ChoresTabNavigator';
import { RootStackScreenProps } from '../navigation/RootStackNavigator';

type Props = CompositeScreenProps<ChoreTabScreenProps<'Today'>, RootStackScreenProps>;

export default function TodayChoresScreen(props: Props) {
    return (
        <View></View>
        // <RenderChores test={props} />
    );
}
