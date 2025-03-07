import * as LocalAuthentication from "expo-local-authentication";

export type BiometricAuthType = "FINGERPRINT" | "FACIAL_RECOGNITION" | "IRIS";

const authenticationTypes: Record<number, BiometricAuthType> = {
    1: "FINGERPRINT",
    2: "FACIAL_RECOGNITION",
    3: "IRIS",
};

// 🔹 Check if device has biometric hardware
export async function checkBiometricHardware(): Promise<boolean> {
    return await LocalAuthentication.hasHardwareAsync();
}

// 🔹 Check if fingerprints/biometrics are saved
export async function checkSavedFingerprints(): Promise<boolean> {
    return await LocalAuthentication.isEnrolledAsync();
}

// 🔹 Get available biometric authentication types
export async function getAvailableAuthenticationTypes(): Promise<BiometricAuthType[]> {
    const availableTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
    return availableTypes.map(type => authenticationTypes[type]);
}

// 🔹 Authenticate user using biometrics
export async function biometricLogin(): Promise<LocalAuthentication.LocalAuthenticationResult> {
    return await LocalAuthentication.authenticateAsync({
        cancelLabel: "Cancel",
        promptMessage: "Authenticate to continue",
    });
}
