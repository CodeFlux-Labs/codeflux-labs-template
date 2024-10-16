import React from "react";
import { TouchableOpacityProps, GestureResponderEvent } from "react-native";
import { DefaultBtn, DefaultTextBtn } from "./styles";

//= ==============================================================================================
interface DefaultButtonProps extends TouchableOpacityProps {
    onPress: (event: GestureResponderEvent) => void;
    label: string;
}

//= ==============================================================================================
const DefaultButton: React.FC<DefaultButtonProps> = ({ onPress, label, ...rest }) => {
    return (
        <DefaultBtn onPress={onPress} {...rest}>
            <DefaultTextBtn>{label}</DefaultTextBtn>
        </DefaultBtn>
    );
};

export default DefaultButton;
