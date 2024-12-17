import { useQuery, useMutation, UseMutationOptions } from "@tanstack/react-query";
import apiMobile from "../services/apiMobile";

//= ==============================================================================================
interface User {
    name: string;
    email: string;
}

//= ==============================================================================================
const authUser = async () => {
    // const { data } = await apiMobile.post("/api/getUser");
    const { data } = await apiMobile.post("https://reqres.in/api/login");
    return data;
};

export const useAuthUserQuery = () =>
    useQuery({
        queryKey: ["user"],
        queryFn: authUser,
        enabled: false,
    });

//= ==============================================================================================
const createUser = async (user: User): Promise<any> => {
    const response = await apiMobile.post<any>("/api/createUser", user);

    if (response.status !== 200) {
        throw new Error("Error creating user");
    }

    return response.data;
};

export const useCreateUser = (options?: UseMutationOptions<string, Error, User>) => {
    return useMutation<string, Error, User>({
        mutationFn: createUser,
        ...options,
    });
};
