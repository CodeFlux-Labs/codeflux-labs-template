import { queryClient } from "@/src/libs/react-query-config";
import User, { SignInFormValuesDummy } from "@/src/types";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiDummy } from "../services/apiDummy";

//= ==============================================================================================
const authUser = async (user: SignInFormValuesDummy) => {
    const { data } = await apiDummy.post("/auth/login", user);
    return data;
};

//= ==============================================================================================
export const useAuthUserQuery = () =>
    useMutation({
        mutationKey: ["authUser"],
        mutationFn: (user: SignInFormValuesDummy) => authUser(user),
        onSuccess: data => {
            queryClient.setQueryData(["authUser"], data);
            return data;
        },
    });

//= ==============================================================================================
export const useGetUserQuery = () =>
    useQuery({
        queryKey: ["authUser"],
        queryFn: () => {
            // Fetch the user data from the query client cache, if any
            return queryClient.getQueryData<User>(["authUser"]);
        },
        enabled: false, // Disables automatic fetching since data is already available in the cache
    });

//= ==============================================================================================
// Removes the authUser data from the cache
export const useRemoveUserQuery = () =>
    queryClient.resetQueries({ queryKey: ["authUser"], exact: true });
