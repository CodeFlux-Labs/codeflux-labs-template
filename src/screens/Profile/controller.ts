import { useRemoveUserQuery } from "@/src/api/hooks/useUserQuery";
import { SignInFormValuesDummy } from "@/src/types";
import { UseMutateFunction } from "@tanstack/react-query";
import { useState, useCallback, useRef } from "react";
import { Modalize } from "react-native-modalize";
import { useBetween } from "use-between";

// ----------- Sharabled State -----------
const useLogicStates = () => {
    const [darkModeEnabled, setDarkModeEnable] = useState(false);
    const [notificationEnabled, setNotificationEnabled] = useState(false);
    const modalRef = useRef<Modalize>(null);

    return {
        darkModeEnabled,
        setDarkModeEnable,
        notificationEnabled,
        setNotificationEnabled,
        modalRef,
    };
};

// ----------- All Shared States -----------
export const useSharedState = () => useBetween(useLogicStates);

// ------------------------------------------------------------------------------------------
export const useOnHandleLogout = () => {
    return useCallback(() => {
        useRemoveUserQuery();
        // ... Another actions below ...
    }, []);
};
