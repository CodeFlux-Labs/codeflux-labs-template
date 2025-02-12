import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mmkvStorageAdapter } from "../libs/mmkv-config";

interface AppState {
    theme: "light" | "dark";
    setTheme: (theme: "light" | "dark") => void;
    isOnboardingCompleted: boolean;
    setIsOnboardingCompleted: (isOnboardingCompleted: boolean) => void;
}

export const useGlobalStore = create<AppState>()(
    persist(
        set => ({
            theme: "light",
            setTheme: theme => set({ theme }),
            isOnboardingCompleted: false,
            setIsOnboardingCompleted: isOnboardingCompleted => set({ isOnboardingCompleted }),
        }),
        {
            name: "app-name-global-storage",
            storage: mmkvStorageAdapter,
        },
    ),
);
