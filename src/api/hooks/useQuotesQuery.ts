import { queryClient } from "@/src/libs/react-query-config";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const getQuotes = async ({ pageParam = 0 }: { pageParam?: number }) => {
    const { data } = await axios.get(`https://dummyjson.com/quotes?limit=10&skip=${pageParam}`);
    return data;
};

// Hook using useInfiniteQuery
export const useGetQuotes = () =>
    useInfiniteQuery({
        queryKey: ["quotes"], // Unique key for caching
        initialPageParam: 1,
        queryFn: ({ pageParam }) => getQuotes({ pageParam }), // Pass pageParam
        getNextPageParam: lastPage => {
            const nextSkip = lastPage.skip + lastPage.limit;
            return lastPage.total > nextSkip ? nextSkip : undefined;
        },
    });
