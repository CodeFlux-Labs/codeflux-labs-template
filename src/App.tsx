import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ModalPortal } from "react-native-modals";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./libs/react-query-config";
import RootNavigator from "./navigation";
import { NotificationProvider } from "./context/NotificationContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

export default function App() {
    //= ==============================================================================================
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <QueryClientProvider client={queryClient}>
                <SafeAreaProvider>
                    <NavigationContainer>
                        <NotificationProvider>
                            <RootNavigator />
                            <ModalPortal />
                        </NotificationProvider>
                    </NavigationContainer>
                </SafeAreaProvider>
            </QueryClientProvider>
        </GestureHandlerRootView>
    );
}
