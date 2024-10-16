import { useRef } from "react";
import { GestureResponderEvent } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { FloatingBtn } from "./styles";

//= ==============================================================================================
interface FloatingButtonProps {
    onPress: (event: GestureResponderEvent) => void; // Type the onPress prop
}

//= ==========================================================================================
const FloatingButton: React.FC<FloatingButtonProps> = ({ onPress }) => {
    return (
        <FloatingBtn onPress={onPress}>
            <FontAwesome name="plus" size={24} color="white" />
        </FloatingBtn>
    );
};

export default FloatingButton;
