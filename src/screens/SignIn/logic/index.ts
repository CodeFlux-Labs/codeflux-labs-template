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
    return useCallback(
        (
            auth: SignInFormValuesDummy,
            mutate: UseMutateFunction<any, Error, SignInFormValuesDummy, unknown>,
        ) => {
            try {
                mutate({ username: auth.username, password: auth.password });
                console.log("Auth: ", auth);
            } catch (error) {
                console.error("Validation error: ", error);
            }
        },
        [],
    );
};
