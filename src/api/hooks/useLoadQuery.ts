import { useQuery } from "@tanstack/react-query";
import apiMobile from "../services/apiMobile";

const fetchUser = async () => {
    const { data } = await apiMobile.get("/api/user");
    return data;
};

export const useUserQuery = () => useQuery(["user"], fetchUser);
