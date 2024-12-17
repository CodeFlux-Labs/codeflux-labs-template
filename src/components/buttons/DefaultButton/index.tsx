import React from "react";
import { TouchableOpacityProps, GestureResponderEvent, ActivityIndicator } from "react-native";
import { DefaultBtn, DefaultTextBtn } from "./styles";

//= ==============================================================================================
interface DefaultButtonProps extends TouchableOpacityProps {
    onPress: (event: GestureResponderEvent) => void;
    label: string;
    loading?: boolean;
}

//= ==============================================================================================
const DefaultButton: React.FC<DefaultButtonProps> = ({ onPress, label, loading, ...rest }) => {
    return (
        <DefaultBtn onPress={onPress} {...rest}>
            {!loading && <DefaultTextBtn>{label}</DefaultTextBtn>}
            {loading && <ActivityIndicator size="large" color="#FFF" />}
        </DefaultBtn>
    );
};

export default DefaultButton;
