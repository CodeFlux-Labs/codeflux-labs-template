import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mmkvStorageAdapter } from "../libs/mmkv-config";

interface AppState {
    homeTutorialCompleted: boolean;
    setHomeTutorialCompleted: (homeTutorialCompleted: boolean) => void;
}

export const useTutorialStore = create<AppState>()(
    persist(
        set => ({
            homeTutorialCompleted: false,
            setHomeTutorialCompleted: homeTutorialCompleted => set({ homeTutorialCompleted }),
        }),
        {
            name: "app-name-tutorial-storage",
            storage: mmkvStorageAdapter,
        },
    ),
);
