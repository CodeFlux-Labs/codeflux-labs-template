import { useEffect, useState } from "react";
import {
    checkBiometricHardware,
    checkSavedFingerprints,
    getAvailableAuthenticationTypes,
    biometricLogin,
    BiometricAuthType,
} from "./biometricServices";

// 🔹 Hook to check biometric hardware availability
export function useBiometricHardware() {
    const [hasHardware, setHasHardware] = useState<boolean | null>(null);

    useEffect(() => {
        async function fetchHardwareStatus() {
            setHasHardware(await checkBiometricHardware());
        }
        fetchHardwareStatus();
    }, []);

    return hasHardware;
}

// 🔹 Hook to check if there are saved fingerprints/biometrics
export function useSavedFingerprints() {
    const [hasFingerprints, setHasFingerprints] = useState<boolean | null>(null);

    useEffect(() => {
        async function fetchFingerprintStatus() {
            setHasFingerprints(await checkSavedFingerprints());
        }
        fetchFingerprintStatus();
    }, []);

    return hasFingerprints;
}

// 🔹 Hook to get available biometric authentication types
export function useAuthenticationTypes() {
    const [authTypes, setAuthTypes] = useState<BiometricAuthType[]>([]);

    useEffect(() => {
        async function fetchAuthTypes() {
            setAuthTypes(await getAvailableAuthenticationTypes());
        }
        fetchAuthTypes();
    }, []);

    return authTypes;
}

// 🔹 Hook to handle biometric login
export function useBiometricLogin() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    async function authenticate() {
        const result = await biometricLogin();
        setIsAuthenticated(result.success);
    }

    return { isAuthenticated, authenticate };
}
