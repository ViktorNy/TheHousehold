import { useTheme } from "@react-navigation/native";
import React from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { CustomNavigateButton } from "../component/CustomNavigateButton";
import { mockedUserData } from "../data/data";
import { RootStackScreenProps } from "../navigation/RootStackNavigator";
import { CustomPopupBox }from "../component/CustomPopupBox";

export default function StartScreen({ navigation }: RootStackScreenProps<"Start">) {
    const newUser = mockedUserData[1];
    const { colors } = useTheme();
    
    return (
        
        <View>
            <CustomNavigateButton buttonText="Gå till hushåll" goto={() => navigation.navigate("Household", { user: newUser }) }/>
            <CustomPopupBox modalCase={'JH'} id={'1'}/>
            
        </View>
        
    );
}
