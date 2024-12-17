import React from "react";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import { Ionicons } from "@expo/vector-icons";

type RootTabParamList = {
    Home: undefined;
    Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function AppNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({
                route,
            }: {
                route: RouteProp<RootTabParamList, keyof RootTabParamList>;
            }) => ({
                tabBarIcon: ({ color, size }: { color: string; size: number }) => {
                    if (route.name === "Home") {
                        return <Ionicons name="home" size={size} color={color} />;
                    } else if (route.name === "Profile") {
                        return <Ionicons name="person" size={size} color={color} />;
                    }
                },
                tabBarActiveTintColor: "tomato",
                tabBarInactiveTintColor: "gray",
            })}>
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}
