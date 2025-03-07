import { useNotification } from "@/src/context/NotificationContext";
import { useUserStore } from "@/src/stores/useUserStore";
import { SignInFormValuesDummy } from "@/src/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { UseMutateFunction } from "@tanstack/react-query";
import { useState, useCallback, useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useBetween } from "use-between";
import { z } from "zod";

//= ==============================================================================================
// 🔹 Schema Validation
export const SignInSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});

export type SignInFormValues = z.infer<typeof SignInSchema>;

export type SignInProps = {
    navigation: StackNavigationProp<any>;
};

// 🔹 Extract default form values
export const defaultValues: SignInFormValues = {
    username: "",
    password: "",
};

//= ==============================================================================================
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

//= ==============================================================================================
export const usePrefillEmailIfExists = (setValue: UseFormSetValue<SignInFormValues>) => {
    const { email } = useUserStore();

    useEffect(() => {
        if (email) setValue("username", email);
    }, [email, setValue]);
};
