import * as LocalAuthentication from "expo-local-authentication";

const authenticationTypes = {
    1: "FINGERPRINT",
    2: "FACIAL_RECOGNITION",
    3: "IRIS",
};

export const useCheckBiometricHardware = async () => {
    let hasBiometricHardware = await LocalAuthentication.hasHardwareAsync();
    return hasBiometricHardware;
};

export const useCheckForSavedFingerprints = async () => {
    let hasSavedFingerprints = await LocalAuthentication.isEnrolledAsync();
    return hasSavedFingerprints;
};

export const useCheckForAuthenticationTypesAvailability = async () => {
    let authenticationTypesAvailables =
        await LocalAuthentication.supportedAuthenticationTypesAsync();

    return authenticationTypesAvailables.map(authTypes => authenticationTypes[authTypes]);
};

export const useBiometricLogin = async () => {
    let biometricLoginResult = null;

    const checkBiometricHardware = await useCheckBiometricHardware();

    const checkForAuthenticationTypesAvailability =
        await useCheckForAuthenticationTypesAvailability();

    const checkForSavedFingerprints = await useCheckForSavedFingerprints();

    const hasFingerprintAuthType = checkForAuthenticationTypesAvailability.includes(
        authenticationTypes[1],
    );

    console.log("hasFingerprintAuthType: ", hasFingerprintAuthType);

    if (
        checkForAuthenticationTypesAvailability &&
        checkBiometricHardware &&
        checkForSavedFingerprints
    )
        biometricLoginResult = await LocalAuthentication.authenticateAsync({
            cancelLabel: "Cancel",
            promptMessage: "We can change this text",
        });

    return biometricLoginResult;
};
