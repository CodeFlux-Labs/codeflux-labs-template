import { DefaultTextInput, Row } from "@/src/styles-global";
import { TextInput, TextInputProps } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "@/src/assets/colors";
import { ContainerTextInp } from "./styles";

//= ==============================================================================================
interface ChildComponentProps extends TextInputProps {
    inputRef?: React.RefObject<TextInput>;
    iconName: string;
}

//= ==========================================================================================
const InputIcon: React.FC<ChildComponentProps> = ({ iconName, ...props }) => {
    return (
        <ContainerTextInp style={{ flex: 1 }}>
            <DefaultTextInput {...props} style={[props.style]} />
            <FontAwesome5
                name={iconName}
                size={20}
                color={colors.primaryLight}
                style={{ position: "absolute", right: 10, top: 15 }}
            />
        </ContainerTextInp>
    );
};

export default InputIcon;
