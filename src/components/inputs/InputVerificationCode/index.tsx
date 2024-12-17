import { colors } from "@/src/assets/colors";
import React, { useRef, useState } from "react";
import { ActivityIndicator, TextInput } from "react-native";
import { InputBox, InputContainer } from "./styles";

interface InputVerifcationCodeProps {
    length: number;
    onComplete: (text: string) => void;
    loading?: boolean;
}

const InputVerifcationCode: React.FC<InputVerifcationCodeProps> = ({
    length,
    onComplete,
    loading,
}) => {
    const [inputValues, setInputValues] = useState(Array(length).fill(""));
    const inputRefs = useRef<TextInput[]>([]);

    const handleChangeText = (text: string, index: number) => {
        const newValues = [...inputValues];
        newValues[index] = text;
        setInputValues(newValues);

        if (text && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        if (newValues.every(val => val !== "")) {
            onComplete(newValues.join(""));
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        const isBackspace = e.nativeEvent.key === "Backspace";

        if (isBackspace && inputValues[index] === "" && index > 0) {
            const newValues = [...inputValues];
            newValues[index - 1] = "";
            setInputValues(newValues);
            inputRefs.current[index - 1]?.focus();
        }

        if (isBackspace && index === length - 1 && inputValues[index] !== "") {
            const newValues = [...inputValues];
            newValues[index] = "";
            setInputValues(newValues);
        }
    };

    return (
        <InputContainer>
            {!loading &&
                inputValues.map((value, index) => (
                    <InputBox
                        key={index}
                        ref={ref => (inputRefs.current[index] = ref as TextInput)}
                        value={value}
                        onChangeText={text => handleChangeText(text, index)}
                        onKeyPress={e => handleKeyPress(e, index)}
                        keyboardType="numeric"
                        maxLength={1}
                        autoFocus={index === 0}
                    />
                ))}
            {loading && <ActivityIndicator size="large" color={colors.purple} />}
        </InputContainer>
    );
};

export default InputVerifcationCode;
