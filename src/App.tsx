import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { CopilotProvider } from "react-native-copilot";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ModalPortal } from "react-native-modals";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./libs/react-query-config";
import RootNavigator from "./navigation";
import { NotificationProvider } from "./context/NotificationContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
    const copilotLabels = {
        previous: "Anterior",
        next: "Próximo",
        skip: "Pular",
        finish: "Finalizar",
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <QueryClientProvider client={queryClient}>
                <SafeAreaProvider>
                    <NavigationContainer>
                        <NotificationProvider>
                            <CopilotProvider labels={copilotLabels}>
                                <RootNavigator />
                                <ModalPortal />
                            </CopilotProvider>
                        </NotificationProvider>
                    </NavigationContainer>
                </SafeAreaProvider>
            </QueryClientProvider>
        </GestureHandlerRootView>
    );
}
