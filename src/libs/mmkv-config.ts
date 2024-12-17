import { MMKV } from "react-native-mmkv";

export const mmkvStorage = new MMKV({
    id: "my-app-storage", // Identificador único para seu armazenamento
    encryptionKey: "my-encryption-key", // (Opcional) chave de criptografia
});

export const mmkvStorageAdapter = {
    getItem: <T>(key: string): T | null => {
        try {
            const storedValue = mmkvStorage.getString(key);
            return storedValue ? JSON.parse(storedValue) : null;
        } catch {
            console.warn(`Failed to parse stored value for key: ${key}`);
            return null;
        }
    },
    setItem: (key: string, value: unknown): void => {
        mmkvStorage.set(key, JSON.stringify(value));
    },
    removeItem: (key: string): void => {
        mmkvStorage.delete(key);
    },
};
