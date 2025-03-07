import { useGlobalStore } from "@/src/stores/useGlobalStore";
import { useState, useEffect, useCallback } from "react";
import { useBetween } from "use-between";

// ----------- Sharabled State -----------
const useLogicStates = () => {
    const [example, setExample] = useState([]);

    return {
        example,
        setExample,
    };
};

// ----------- All Shared States -----------
export const useSharedState = () => useBetween(useLogicStates);

//= ==============================================================================================
export function useInit() {
    const { example } = useSharedState();

    useEffect(() => {
        (async () => {})();
    }, [example]);
}

//= ==============================================================================================
export function useOnOboardingIsCompleted() {
    const { setIsOnboardingCompleted } = useGlobalStore();

    return useCallback(() => {
        setIsOnboardingCompleted(true);
    }, []);
}
