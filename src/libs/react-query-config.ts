import { QueryClient } from "@tanstack/react-query";
import { mmkvStorage } from "./mmkv-config";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

const persistor = createSyncStoragePersister({
    storage: {
        setItem: (key, value) => mmkvStorage.set(key, value),
        getItem: key => mmkvStorage.getString(key) || null,
        removeItem: key => mmkvStorage.delete(key),
    },
});

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Adjust query behavior as needed
            staleTime: 1000 * 60 * 5, // 5 minutes
        },
    },
});

persistQueryClient({
    queryClient,
    persistor,
    maxAge: 0,
});

export { queryClient };
