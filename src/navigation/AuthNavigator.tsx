import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UpdatePassword from "../screens/UpdatePassword";
import SignIn from "../screens/SignIn";
import Onboarding from "../screens/Onboarding";
import { useStore } from "../stores/useGlobalStore";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
    const { isOnboardingCompleted } = useStore();
    console.log("isOnboardingCompleted:", isOnboardingCompleted);

    return (
        <Stack.Navigator initialRouteName={!isOnboardingCompleted ? "Onboarding" : "Home"}>
            <Stack.Screen
                name="Onboarding"
                component={Onboarding}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
            <Stack.Screen
                name="UpdatePassword"
                component={UpdatePassword}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
