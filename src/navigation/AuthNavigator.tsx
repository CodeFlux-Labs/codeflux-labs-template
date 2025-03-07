import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UpdatePassword from "../screens/UpdatePassword";
import SignIn from "../screens/SignIn";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
            <Stack.Screen
                name="UpdatePassword"
                component={UpdatePassword}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
