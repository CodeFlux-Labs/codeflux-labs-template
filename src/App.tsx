import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import { ModalPortal } from "react-native-modals";
import Onboarding from "@screens/Onboarding";
import Calendars from "@screens/Calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ONBOARDING_COMPLETE } from "./utils/storage-consts";

const Stack = createNativeStackNavigator();

export default function App() {
    const [isFirstTime, setIsFirstTime] = useState(null);

    let [fontsLoaded] = useFonts({
        "SFUIText-Bold": require("./assets/fonts/SFUIText-Bold.ttf"),
        "SFUIText-Heavy": require("./assets/fonts/SFUIText-Heavy.ttf"),
        "SFUIText-Light": require("./assets/fonts/SFUIText-Light.ttf"),
        "SFUIText-Medium": require("./assets/fonts/SFUIText-Medium.ttf"),
        "SFUIText-Regular": require("./assets/fonts/SFUIText-Regular.ttf"),
        "SFUIText-Semibold": require("./assets/fonts/SFUIText-Semibold.ttf"),
    });

    //= ==============================================================================================
    useEffect(() => {
        (async () => {
            try {
                const hasSeenOnboarding = await AsyncStorage.getItem(ONBOARDING_COMPLETE);

                setIsFirstTime(hasSeenOnboarding === null);
            } catch (error) {
                console.error("Error reading onboarding status: ", error);
            }
        })();
    }, []);

    //= ==============================================================================================
    if (!fontsLoaded || isFirstTime === null) {
        return (
            <ActivityIndicator
                style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                size="large"
                color="#0000ff"
            />
        );
    }

    //= ==============================================================================================
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={isFirstTime ? "Onboarding" : "Calendars"}>
                    <Stack.Screen name="Onboarding" options={{ headerShown: false }}>
                        {props => <Onboarding {...props} />}
                    </Stack.Screen>
                    <Stack.Screen
                        name="Calendars"
                        component={Calendars}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
                <ModalPortal />
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}
