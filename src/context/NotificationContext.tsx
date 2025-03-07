import React, { createContext, useState, useContext } from "react";
import { Snackbar } from "react-native-paper";

interface NotificationContextProps {
    showNotification: (message: string) => void;
    hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw "useNotification must be used within a NotificationProvider";
    }
    return context;
};

export const NotificationProvider: React.FC = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");

    const showNotification = (NotificationMessage: any) => {
        if (typeof NotificationMessage === "string") {
            setMessage(NotificationMessage);
        } else {
            setMessage(JSON.stringify(NotificationMessage));
        }

        setVisible(true);
    };

    const hideNotification = () => {
        setVisible(false);
        setMessage("");
    };

    return (
        <NotificationContext.Provider value={{ showNotification, hideNotification }}>
            {children}
            <Snackbar
                visible={visible}
                onDismiss={hideNotification}
                action={{
                    label: "Close",
                    onPress: hideNotification,
                }}>
                {message}
            </Snackbar>
        </NotificationContext.Provider>
    );
};
