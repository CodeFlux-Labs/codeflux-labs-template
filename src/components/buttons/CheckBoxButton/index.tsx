import { Label, Row } from "@/src/styles-global";
import React from "react";
import { TouchableOpacityProps } from "react-native";
import Checkbox from "expo-checkbox";

//= ==============================================================================================
interface CheckBoxButtonProps extends TouchableOpacityProps {
    label: string;
    toggleCheckBox: boolean;
    setToggleCheckBox: (active: boolean) => void;
}

//= ==============================================================================================
const CheckBoxButton: React.FC<CheckBoxButtonProps> = ({
    label,
    toggleCheckBox,
    setToggleCheckBox,
}) => {
    return (
        <Row gap="10px">
            <Checkbox value={toggleCheckBox} onValueChange={setToggleCheckBox} />
            <Label>{label}</Label>
        </Row>
    );
};

export default CheckBoxButton;
