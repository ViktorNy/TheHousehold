import { CompositeScreenProps } from '@react-navigation/native';
import React from 'react';
import RenderChores from '../../component/choreComponent/RenderChores';
import { ChoreTabScreenProps } from '../../navigation/ChoresTabNavigator';
import { RootStackScreenProps } from '../../navigation/RootStackNavigator';
import { getAllHouseholdsByUserIdSelector } from '../../store/household/householdSelectors';
import { useAppSelector } from '../../store/store';

type Props = CompositeScreenProps<ChoreTabScreenProps<'All'>, RootStackScreenProps>;

export default function AllChoresScreen({ navigation, route }: Props) {
    const user = useAppSelector((state) => state.user.user);
    const userHousehold = useAppSelector((state) => getAllHouseholdsByUserIdSelector(state, user?.id));
    const currentHousehold = useAppSelector((state) => state.household.householdList.find((h) => h.id === route.params.householdId));
    const members = useAppSelector((state) => state.member.memberList);
    return (
        <RenderChores
            label={'All'}
            prop={{ navigation, route }}
            userHousehold={userHousehold}
            currentHousehold={currentHousehold}
            members={members}
        />
    );
}
