import React from "react";
import { TouchableOpacityProps, GestureResponderEvent, TouchableOpacity } from "react-native";
import { DefaultTextBtn } from "./styles";

//= ==============================================================================================
interface LinkButtonProps extends TouchableOpacityProps {
    onPress: (event: GestureResponderEvent) => void;
    label: string;
}

//= ==============================================================================================
const LinkButton: React.FC<LinkButtonProps> = ({ onPress, label, ...rest }) => {
    return (
        <TouchableOpacity onPress={onPress} {...rest}>
            <DefaultTextBtn>{label}</DefaultTextBtn>
        </TouchableOpacity>
    );
};

export default LinkButton;
