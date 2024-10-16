import { GestureResponderEvent } from "react-native";
import { DefaultBtn, DefaultTextBtn } from "./styles";

//= ==============================================================================================
interface DefaultButtonProps {
    onPress: (event: GestureResponderEvent) => void;
    label: string;
}

//= ==========================================================================================
const DefaultButton: React.FC<DefaultButtonProps> = ({ onPress, label }) => {
    return (
        <DefaultBtn onPress={onPress}>
            <DefaultTextBtn>{label}</DefaultTextBtn>
        </DefaultBtn>
    );
};

export default DefaultButton;
