import { DefaultTextInput, TextError } from "@/src/styles-global";
import { TextInput, TextInputProps, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "@/src/assets/colors";
import { ContainerTextInp } from "./styles";

//= ==============================================================================================
interface ChildComponentProps extends TextInputProps {
    inputRef?: React.RefObject<TextInput>;
    iconName?: string;
    onPressIcon?: () => void;
    errors: string | null;
}

//= ==========================================================================================
const InputIcon: React.FC<ChildComponentProps> = ({ iconName, onPressIcon, errors, ...props }) => {
    return (
        <>
            <ContainerTextInp>
                <DefaultTextInput {...props} style={props.style} />
                {iconName && (
                    <TouchableOpacity
                        onPress={onPressIcon}
                        disabled={onPressIcon == undefined}
                        style={{ position: "absolute", right: 10, top: 12 }}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                        <FontAwesome5 name={iconName} size={20} color={colors.primaryLight} />
                    </TouchableOpacity>
                )}
            </ContainerTextInp>
            {errors && <TextError>{errors}</TextError>}
        </>
    );
};

export default InputIcon;
