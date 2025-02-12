import { useInfiniteQuery, useQuery, keepPreviousData } from "@tanstack/react-query";
import { apiDummy } from "../services/apiDummy";

//= ==============================================================================================
const getQuotes = async ({ pageParam = 0 }: { pageParam?: number }) => {
    const limit = 10;
    const { data } = await apiDummy.get(`/quotes?limit=${limit}&skip=${pageParam}`);
    return data;
};

//= ==============================================================================================
// --- Hook for infinity scroll
export const useGetQuotesInfinityScroll = () =>
    useInfiniteQuery({
        queryKey: ["quotes"], // Unique key for caching
        initialPageParam: 1,
        queryFn: ({ pageParam }) => getQuotes({ pageParam }), // Pass pageParam
        getNextPageParam: lastPage => {
            const nextSkip = lastPage.skip + lastPage.limit;
            return lastPage.total > nextSkip ? nextSkip : undefined;
        },
        staleTime: 1000 * 60 * 1,
    });

//= ==============================================================================================
// --- Hook for Pagination
export const useGetQuotesPaginated = ({ skip }: { skip: number }) =>
    useQuery({
        queryKey: ["paginatedQuotes", skip],
        queryFn: () => getQuotes({ pageParam: skip }),
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60 * 1, // Data will not be fresh after 1mn and when screen focus data will be refetched
    });
