import React from 'react';
import { useTheme } from '@react-navigation/native';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomNavigateButton } from '../component/CustomNavigateButton';
import { RootStackScreenProps } from '../navigation/RootStackNavigator';

export default function StartScreen({ navigation }: RootStackScreenProps<'Start'>) {
    const { colors } = useTheme();

    return (
        <SafeAreaView style={[{ backgroundColor: colors.background }, { height: '100%' }]}>
            <Text style={[styles.homeTextStyle, { color: colors.text }]}>Hemmet</Text>

            <Text style={[styles.simplifyText, { color: colors.text }]}>Förenkla din vardag</Text>
            <Text style={[styles.pitchText, { color: colors.text }]}>
                Få koll på era sysslor, fördela och engagera. Att glömma bort blir nu ett minne blott!
            </Text>
            <Image style={styles.imageStyle} source={require('../assets/ladyontrashcan.png')} />
            <View style={styles.viewStyle}>
                <CustomNavigateButton buttonText="Logga in" goto={() => navigation.navigate('Login')} />
                <Text style={[styles.notMemberText, { color: colors.text }]}>Är du inte medlem?</Text>
                <CustomNavigateButton buttonText="Registrera" goto={() => navigation.navigate('Register')} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    homeTextStyle: {
        marginTop: 100,
        fontSize: 40,
        marginLeft: 30
    },
    simplifyText: {
        fontSize: 15,
        marginLeft: 30,
        marginTop: 100,
        fontWeight: 'bold'
    },
    pitchText: {
        marginLeft: 30,
        marginRight: 100,
        marginTop: 10
    },
    notMemberText: {
        alignSelf: 'center',
        marginTop: 10
    },
    viewStyle: {
        margin: 10
    },
    imageStyle: {
        width: 100,
        height: 170,
        marginLeft: 280
    }
});
