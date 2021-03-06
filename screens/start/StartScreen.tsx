import React from 'react';
import { useTheme } from '@react-navigation/native';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomActionButton } from '../../component/CustomActionButton';
import { RootStackScreenProps } from '../../navigation/RootStackNavigator';

export default function StartScreen({ navigation }: RootStackScreenProps<'Start'>) {
    const { colors } = useTheme();

    return (
        <SafeAreaView style={[{ backgroundColor: colors.background }, styles.containerView]}>
            <Text style={[styles.homeTextStyle, { color: colors.text }]}>Hemmet</Text>

            <Text style={[styles.simplifyText, { color: colors.text }]}>Förenkla din vardag</Text>
            <Text style={[styles.pitchText, { color: colors.text }]}>
                Få koll på era sysslor, fördela och engagera. Att glömma bort blir nu ett minne blott!
            </Text>
            <Image style={styles.imageStyle} source={require('../../assets/ladyontrashcan.png')} />
            <View style={styles.viewStyle}>
                <CustomActionButton buttonText="Logga in" action={() => navigation.navigate('Login')} />
                <Text style={[styles.notMemberText, { color: colors.text }]}>Är du inte medlem?</Text>
                <CustomActionButton buttonText="Registrera" action={() => navigation.navigate('Register')} />
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
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 10
    },
    imageStyle: {
        width: 100,
        height: 170,
        marginLeft: 280
    },
    containerView: {
        width: '100%',
        height: '100%'
    }
});
