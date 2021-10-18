import { Button, Text } from 'react-native';
import React from 'react';
import { mockedUserData, User } from '../data/data';
import {  RootStackScreenProps } from '../navigation/RootStackNavigator';

export default function StartScreen({navigation,route}: RootStackScreenProps<'Start'> ){
    const newUser = mockedUserData[0];
    return (
        <Button title="Gå till hushåll" onPress={() => navigation.navigate('Household', {user: newUser})}></Button>
    )
}