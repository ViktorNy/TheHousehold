import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { Button, FlatList, Modal, Pressable, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { CustomNavigateButton } from "../component/CustomNavigateButton";
import HamburgerMenu from "../component/HamburgerMenu";
import { RootStackScreenProps } from "../navigation/RootStackNavigator";
import { getAllHouseholdsByUserIdSelector } from "../store/household/householdSelectors";
import { useAppSelector } from "../store/store";

export default function HouseholdScreen({ navigation, route }: RootStackScreenProps<"Household">) {
    const { colors } = useTheme();
    const [isShowingModal, setIsShowingModal] = useState(false);
    const userHousehold = useAppSelector((state) => getAllHouseholdsByUserIdSelector(state, route.params.user.id));
    const currentHousehold = useAppSelector((state) =>
        state.household.householdList.find((h) => h.id === route.params.householdId)
    );
    const currentMember = useAppSelector((state) => state.member.memberList.find(m => m.userId === route.params.user.id && m.householdId === currentHousehold?.id))


    if (currentHousehold) {
        const houseHoldChores = currentHousehold.chores.filter((item) =>
            item.signedToUserId.filter((item) => item === route.params.user.id)
        );
        return (
            <View>
                <HamburgerMenu
                    isShowingMenu={isShowingModal}
                    toggleIsShowing={setIsShowingModal}
                    rootStackProps={{ navigation, route }}
                    householdID={currentHousehold.id}
                    currentMember={currentMember}
                />
                <Button title="Show menu" onPress={() => setIsShowingModal(!isShowingModal)} />
                <Text style={[{ color: colors.text }]}>{currentHousehold.name}</Text>
                <FlatList
                    data={houseHoldChores}
                    renderItem={({ item }) => (
                        <CustomNavigateButton buttonText={item.name} goto={() => navigation.navigate("ChoreDetail", { choreId: item.id, householdId: currentHousehold.id })} />
                    )}
                />
            </View>
        );
    } else {
        return (
            <View>
                <HamburgerMenu
                    isShowingMenu={isShowingModal}
                    toggleIsShowing={setIsShowingModal}
                    rootStackProps={{ navigation, route }}
                />
                <Button title="Show menu" onPress={() => setIsShowingModal(!isShowingModal)} />
                <Text style={[{ color: colors.text }]}>Welcome {route.params.user.username}</Text>
                <FlatList
                    data={userHousehold}
                    renderItem={({ item }) => (
                        <View>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.push("Household", { user: route.params.user, householdId: item.id })
                                }
                            >
                                <Text style={[{ color: colors.text }]}>{item.name}</Text>
                            </TouchableOpacity>

                            {item.chores.map(chore => {
                                return <CustomNavigateButton key={chore.id} buttonText={chore.name} goto={() => navigation.navigate("ChoreDetail", { choreId: chore.id, householdId: item.id })} />
                            })}
                        </View>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 0,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '100%'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
