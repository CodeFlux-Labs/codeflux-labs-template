import { queryClient } from "@/src/libs/react-query-config";
import User, { SignInFormValuesDummy } from "@/src/types";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

//= ==============================================================================================
const authUser = async (user: SignInFormValuesDummy) => {
    const { data } = await axios.post("https://dummyjson.com/auth/login", user);
    return data;
};

export const useAuthUserQuery = () =>
    useMutation({
        mutationKey: ["authUser"],
        mutationFn: (user: SignInFormValuesDummy) => authUser(user),
        onSuccess: data => queryClient.setQueryData(["authUser"], data),
    });

export const useGetUserQuery = () => {
    return useQuery({
        queryKey: ["authUser"],
        queryFn: () => {
            // Fetch the user data from the query client cache, if any
            return queryClient.getQueryData<User>(["authUser"]);
        },
        enabled: false, // Disables automatic fetching since data is already available in the cache
    });
};