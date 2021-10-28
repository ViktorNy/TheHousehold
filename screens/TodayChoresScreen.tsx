import { CompositeScreenProps } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import RenderChores from '../component/choreComponent/RenderChores';
import { ChoreTabScreenProps } from '../navigation/ChoresTabNavigator';
import { RootStackScreenProps } from '../navigation/RootStackNavigator';
import { getAllHouseholdsByUserIdSelector } from '../store/household/householdSelectors';
import { useAppSelector } from '../store/store';

type Props = CompositeScreenProps<ChoreTabScreenProps<'Today'>, RootStackScreenProps>;

export default function TodayChoresScreen({ navigation, route }: Props) {
    const userHousehold = useAppSelector((state) => getAllHouseholdsByUserIdSelector(state, route.params.userId));
    const currentHousehold = useAppSelector((state) =>
        state.household.householdList.find((h) => h.id === route.params.householdId)
    );
    const members = useAppSelector((state) => state.member.memberList);
    return (
        <RenderChores prop={{ navigation, route }} userHousehold={userHousehold} currentHousehold={currentHousehold} members={members} />
    );
}
