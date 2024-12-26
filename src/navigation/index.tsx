import React from "react";
import { ActivityIndicator } from "react-native";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";
import { useFonts } from "expo-font";
import { useStore } from "../stores/useGlobalStore";
import OnboardingNavigator from "./OnboardingNavigator";
import { useGetUserQuery } from "../api/hooks/useUserQuery";

export default function RootNavigator() {
    const { isOnboardingCompleted } = useStore();
    const { data, isError, error, isLoading } = useGetUserQuery();

    if (error) console.log("ERROR_ROOT_NAVIGATION: ", error);
    console.log("isLoading: ", isLoading);

    let [fontsLoaded] = useFonts({
        "SFUIText-Bold": require("../assets/fonts/SFUIText-Bold.ttf"),
        "SFUIText-Heavy": require("../assets/fonts/SFUIText-Heavy.ttf"),
        "SFUIText-Light": require("../assets/fonts/SFUIText-Light.ttf"),
        "SFUIText-Medium": require("../assets/fonts/SFUIText-Medium.ttf"),
        "SFUIText-Regular": require("../assets/fonts/SFUIText-Regular.ttf"),
        "SFUIText-Semibold": require("../assets/fonts/SFUIText-Semibold.ttf"),
    });

    if (isLoading || !fontsLoaded) {
        return (
            <ActivityIndicator
                style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                size="large"
                color="#0000ff"
            />
        );
    }

    return !isOnboardingCompleted ? (
        <OnboardingNavigator />
    ) : data ? (
        <AppNavigator />
    ) : (
        <AuthNavigator />
    );
}
