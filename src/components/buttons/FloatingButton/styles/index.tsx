import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { colors } from "@/src/assets/colors";

interface FloatingBtnProps {
    bottom?: string;
}

export const FloatingBtn = styled(TouchableOpacity)<FloatingBtnProps>`
    position: absolute;
    bottom: 5%;
    right: 44%;
    background-color: ${colors.purple};
    width: 55px;
    height: 55px;
    border-radius: ${55 / 2}px;
    align-self: center;
    align-items: center;
    justify-content: center;
`;
