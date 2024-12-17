import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";

export default function RootNavigator() {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    let [fontsLoaded] = useFonts({
        "SFUIText-Bold": require("../assets/fonts/SFUIText-Bold.ttf"),
        "SFUIText-Heavy": require("../assets/fonts/SFUIText-Heavy.ttf"),
        "SFUIText-Light": require("../assets/fonts/SFUIText-Light.ttf"),
        "SFUIText-Medium": require("../assets/fonts/SFUIText-Medium.ttf"),
        "SFUIText-Regular": require("../assets/fonts/SFUIText-Regular.ttf"),
        "SFUIText-Semibold": require("../assets/fonts/SFUIText-Semibold.ttf"),
    });

    // Simulate fetching the auth state
    useEffect(() => {
        const checkLoginState = async () => {
            try {
                // Replace this logic with your actual auth logic
                const token = await AsyncStorage.getItem("authToken");
                setIsLoggedIn(!!token); // If token exists, user is logged in
            } catch (error) {
                console.error("Failed to fetch auth state:", error);
            } finally {
                setIsLoading(false);
            }
        };

        checkLoginState();
    }, []);

    if (isLoading || !fontsLoaded) {
        return (
            <ActivityIndicator
                style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                size="large"
                color="#0000ff"
            />
        );
    }

    return isLoggedIn ? <AppNavigator /> : <AuthNavigator />;
}
