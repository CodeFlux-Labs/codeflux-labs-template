import { useState, useEffect } from "react";
import { useBetween } from "use-between";
import { useTutorialStore } from "@/src/stores/useTutorialStore";
import { useCopilot } from "react-native-copilot";

// ----------- Sharabled State -----------
const useLogicStates = () => {
    const [index, setIndex] = useState(0);
    const [page, setPage] = useState(1);
    const limit = 10;

    return {
        index,
        setIndex,
        page,
        setPage,
        limit,
    };
};

// ----------- All Shared States -----------
export const useSharedState = () => useBetween(useLogicStates);

//= ==============================================================================================
export function useStartTutorial() {
    const { homeTutorialCompleted } = useTutorialStore();
    const { start } = useCopilot();

    useEffect(() => {
        if (!homeTutorialCompleted) start();
    }, []);
}

//= ==============================================================================================
export function useHandleCopilotEventChanges() {
    const { copilotEvents } = useCopilot();
    const { setHomeTutorialCompleted } = useTutorialStore();

    useEffect(() => {
        copilotEvents.on("stepChange", step => {
            console.log(`stepChange: ${step?.name}`);
        });
        copilotEvents.on("start", () => {
            console.log(`start`);
        });
        copilotEvents.on("stop", () => {
            console.log(`stop`);
            setHomeTutorialCompleted(true);
        });
    }, [copilotEvents]);
}
