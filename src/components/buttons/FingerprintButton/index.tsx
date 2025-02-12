import React from "react";
import { TouchableOpacityProps, GestureResponderEvent, TouchableOpacity } from "react-native";
import { FingerprintContainer } from "./styles";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "@/src/assets/colors";
import { Subtitle } from "@/src/styles-global";

//= ==============================================================================================
interface FingerprintButtonProps extends TouchableOpacityProps {
    onPress: (event: GestureResponderEvent) => void;
}

//= ==============================================================================================
const FingerprintButton: React.FC<FingerprintButtonProps> = ({ onPress, ...rest }) => {
    return (
        <FingerprintContainer {...rest}>
            <TouchableOpacity onPress={onPress}>
                <FontAwesome5 color={colors.purple} size={45} name="fingerprint" />
            </TouchableOpacity>
            <Subtitle>Figerprint Login</Subtitle>
        </FingerprintContainer>
    );
};

export default FingerprintButton;
