import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mmkvStorageAdapter } from "../libs/mmkv-config";

interface UserState {
    email: string | null;
    setEmail: (email: string) => void;
    token: string | null;
    setToken: (token: string) => void;
}

export const useUserStore = create<UserState>()(
    persist(
        set => ({
            email: null,
            setEmail: email => set({ email }),
            token: null,
            setToken: token => set({ token }),
        }),
        {
            name: "app-name-user-storage",
            storage: mmkvStorageAdapter,
        },
    ),
);
