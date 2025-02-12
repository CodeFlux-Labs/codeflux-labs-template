import { useNotification } from "@/src/context/NotificationContext";
import { useUserStore } from "@/src/stores/useUserStore";
import { SignInFormValuesDummy } from "@/src/types";
import { UseMutateFunction } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { useBetween } from "use-between";

// ----------- Sharabled State -----------
const useLogicStates = () => {
    const [tooglePassword, setTooglePassword] = useState(false);

    return {
        tooglePassword,
        setTooglePassword,
    };
};

// ----------- All Shared States -----------
export const useSharedState = () => useBetween(useLogicStates);

// ------------------------------------------------------------------------------------------
export const useOnHandleSubmit = () => {
    const { setEmail } = useUserStore();
    const { showNotification } = useNotification();

    return useCallback(
        (
            auth: SignInFormValuesDummy,
            mutate: UseMutateFunction<any, Error, SignInFormValuesDummy, unknown>,
        ) => {
            try {
                mutate(
                    { username: auth.username, password: auth.password },
                    {
                        onSuccess: data => {
                            setEmail(auth.username);
                            console.log("Mutation success, received data:", data);
                        },
                        onError: error => {
                            console.error("Mutation error:", error);
                            if (error?.response?.data) showNotification(error?.response?.data);
                        },
                    },
                );
                console.log("Auth: ", auth);
            } catch (error) {
                console.error("Validation error: ", error);
            }
        },
        [],
    );
};
