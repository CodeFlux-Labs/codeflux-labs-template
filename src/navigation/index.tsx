import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";
import { useFonts } from "expo-font";
import { useStore } from "../stores/useGlobalStore";
import OnboardingNavigator from "./OnboardingNavigator";
import { queryClient } from "../libs/react-query-config";
import { useIsFetching, useQuery, MutationCache } from "@tanstack/react-query";
import { useGetUserQuery } from "../api/hooks/useUserQuery";

export default function RootNavigator() {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { isOnboardingCompleted } = useStore();
    const isFetchingAuthUser = useIsFetching({ queryKey: ["authUser"] });
    const { data, isError, error } = useGetUserQuery();

    if (error) console.log("ERROR_ROOT_NAVIGATION: ", error);

    let [fontsLoaded] = useFonts({
        "SFUIText-Bold": require("../assets/fonts/SFUIText-Bold.ttf"),
        "SFUIText-Heavy": require("../assets/fonts/SFUIText-Heavy.ttf"),
        "SFUIText-Light": require("../assets/fonts/SFUIText-Light.ttf"),
        "SFUIText-Medium": require("../assets/fonts/SFUIText-Medium.ttf"),
        "SFUIText-Regular": require("../assets/fonts/SFUIText-Regular.ttf"),
        "SFUIText-Semibold": require("../assets/fonts/SFUIText-Semibold.ttf"),
    });

    useEffect(() => {
        const checkLoginState = async () => {
            try {
                console.log("USER_APP_NAVIGATION: ", data);

                setIsLoggedIn(!!data);
            } catch (error) {
                console.error("Failed to fetch auth state:", error);
            } finally {
                setIsLoading(false);
            }
        };

        checkLoginState();
    }, [data]);

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
    ) : isLoggedIn ? (
        <AppNavigator />
    ) : (
        <AuthNavigator />
    );
}
