import { QueryClient } from "@tanstack/react-query";
import { mmkvStorage } from "./mmkv-config";
import {
    persistQueryClient,
    persistQueryClientRestore,
} from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

//= ==============================================================================================
const persistor = createSyncStoragePersister({
    storage: {
        setItem: (key, value) => mmkvStorage.set(key, value),
        getItem: key => mmkvStorage.getString(key) || null,
        removeItem: key => mmkvStorage.delete(key),
    },
});

//= ==============================================================================================
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            gcTime: Infinity,
        },
    },
});

//= ==============================================================================================
(async () => {
    try {
        await persistQueryClientRestore({
            queryClient,
            persister: persistor,
        });
    } catch (error) {
        console.warn("Failed to restore query client cache:", error);
    }
})();

//= ==============================================================================================
persistQueryClient({
    queryClient,
    persister: persistor,
    maxAge: Infinity,
});

export { queryClient };
